import { prisma } from '../../config/db';
// import { redisClient } from '../../config/redis';
import bcrypt from 'bcrypt';
import { AppError } from '../../utils/helpers';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { z } from 'zod';
import { signupSchema, loginSchema } from './auth.schema';
import { AuthResponse } from './auth.types';

export class AuthService {
  static async signup(data: z.infer<typeof signupSchema>['body']): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role || 'USER',
      },
    });

    // Create an empty cart for the user upon signup
    await prisma.cart.create({
      data: { userId: user.id },
    });

    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

    // Store refresh token in Redis (7 days TTL)
    // await redisClient.set(`refresh_token:${user.id}`, refreshToken, {
    //   EX: 7 * 24 * 60 * 60,
    // });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    };
  }

  static async login(data: z.infer<typeof loginSchema>['body']): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

    // Store new refresh token in Redis
    // await redisClient.set(`refresh_token:${user.id}`, refreshToken, {
    //   EX: 7 * 24 * 60 * 60,
    // });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    };
  }

  static async logout(userId: string): Promise<void> {
    // await redisClient.del(`refresh_token:${userId}`);
  }

  static async refreshToken(token: string): Promise<{ accessToken: string }> {
    try {
      const payload = verifyRefreshToken(token);
      // const storedToken = await redisClient.get(`refresh_token:${payload.userId}`);

      // if (!storedToken || storedToken !== token) {
      //   throw new AppError('Invalid or expired refresh token', 401);
      // }

      const accessToken = generateAccessToken({
        userId: payload.userId,
        role: payload.role,
      });

      return { accessToken };
    } catch (error) {
      throw new AppError('Invalid or expired refresh token', 401);
    }
  }
}
