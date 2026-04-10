import { prisma } from '../../config/db';
// import { redisClient } from '../../config/redis';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { AppError } from '../../utils/helpers';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { config } from '../../config/env';
import { z } from 'zod';
import { signupSchema, loginSchema } from './auth.schema';
import { AuthResponse } from './auth.types';
import { emailService } from '../../services/email.service';

interface GoogleTokenInfo {
  email?: string;
  email_verified?: 'true' | 'false';
  name?: string;
  aud?: string;
}

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

    await prisma.cart.create({
      data: { userId: user.id },
    });

    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    };
  }

  static async login(data: z.infer<typeof loginSchema>['body']): Promise<AuthResponse> {
    const normalizedEmail = data.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    if (!user.password) {
      throw new AppError('This account was created with Google. Please sign in with Google.', 401);
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    };
  }

  static async googleAuth(credential: string): Promise<AuthResponse> {
    const verifyResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
    );

    if (!verifyResponse.ok) {
      throw new AppError('Invalid Google credential', 401);
    }

    const tokenInfo = (await verifyResponse.json()) as GoogleTokenInfo;
    const email = tokenInfo.email?.toLowerCase().trim();

    if (!email || tokenInfo.email_verified !== 'true') {
      throw new AppError('Google email is not verified', 401);
    }

    if (config.googleClientId && tokenInfo.aud !== config.googleClientId) {
      throw new AppError('Google token audience mismatch', 401);
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: tokenInfo.name || null,
          role: 'USER',
        },
      });
    }

    await prisma.cart.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id },
    });

    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

    return {
      user: { id: user.id, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    };
  }

  static async forgotPassword(email: string): Promise<void> {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (!user) return;

    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
        usedAt: null,
      },
    });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    const resetLink = `${config.appBaseUrl}/reset-password?token=${rawToken}`;

    await emailService.sendMail({
      to: user.email,
      subject: 'Reset your Gauyog password',
      html: `
        <p>Hello,</p>
        <p>We received a request to reset your password.</p>
        <p><a href="${resetLink}">Click here to reset your password</a></p>
        <p>This link will expire in 30 minutes.</p>
      `,
      text: `Reset your password: ${resetLink}`,
    });
  }

  static async resetPassword(token: string, newPassword: string): Promise<void> {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
      throw new AppError('Invalid or expired reset token', 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
    ]);
  }

  static async logout(userId: string): Promise<void> {
    // await redisClient.del(`refresh_token:${userId}`);
  }

  static async refreshToken(token: string): Promise<{ accessToken: string }> {
    try {
      const payload = verifyRefreshToken(token);

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
