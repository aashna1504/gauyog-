"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = require("../../config/db");
// import { redisClient } from '../../config/redis';
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const helpers_1 = require("../../utils/helpers");
const jwt_1 = require("../../utils/jwt");
const env_1 = require("../../config/env");
const email_service_1 = require("../../services/email.service");
class AuthService {
    static async signup(data) {
        const existingUser = await db_1.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new helpers_1.AppError('Email already in use', 400);
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await db_1.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                role: data.role || 'USER',
            },
        });
        await db_1.prisma.cart.create({
            data: { userId: user.id },
        });
        const accessToken = (0, jwt_1.generateAccessToken)({ userId: user.id, role: user.role });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ userId: user.id, role: user.role });
        return {
            user: { id: user.id, email: user.email, role: user.role },
            accessToken,
            refreshToken,
        };
    }
    static async login(data) {
        const user = await db_1.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user || !user.password) {
            throw new helpers_1.AppError('Invalid email or password', 401);
        }
        const isValidPassword = await bcrypt_1.default.compare(data.password, user.password);
        if (!isValidPassword) {
            throw new helpers_1.AppError('Invalid email or password', 401);
        }
        const accessToken = (0, jwt_1.generateAccessToken)({ userId: user.id, role: user.role });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ userId: user.id, role: user.role });
        return {
            user: { id: user.id, email: user.email, role: user.role },
            accessToken,
            refreshToken,
        };
    }
    static async googleAuth(credential) {
        const verifyResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
        if (!verifyResponse.ok) {
            throw new helpers_1.AppError('Invalid Google credential', 401);
        }
        const tokenInfo = (await verifyResponse.json());
        const email = tokenInfo.email?.toLowerCase().trim();
        if (!email || tokenInfo.email_verified !== 'true') {
            throw new helpers_1.AppError('Google email is not verified', 401);
        }
        if (env_1.config.googleClientId && tokenInfo.aud !== env_1.config.googleClientId) {
            throw new helpers_1.AppError('Google token audience mismatch', 401);
        }
        let user = await db_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            user = await db_1.prisma.user.create({
                data: {
                    email,
                    name: tokenInfo.name || null,
                    role: 'USER',
                },
            });
        }
        await db_1.prisma.cart.upsert({
            where: { userId: user.id },
            update: {},
            create: { userId: user.id },
        });
        const accessToken = (0, jwt_1.generateAccessToken)({ userId: user.id, role: user.role });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ userId: user.id, role: user.role });
        return {
            user: { id: user.id, email: user.email, role: user.role },
            accessToken,
            refreshToken,
        };
    }
    static async forgotPassword(email) {
        const normalizedEmail = email.toLowerCase().trim();
        const user = await db_1.prisma.user.findUnique({ where: { email: normalizedEmail } });
        if (!user)
            return;
        await db_1.prisma.passwordResetToken.deleteMany({
            where: {
                userId: user.id,
                usedAt: null,
            },
        });
        const rawToken = crypto_1.default.randomBytes(32).toString('hex');
        const tokenHash = crypto_1.default.createHash('sha256').update(rawToken).digest('hex');
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
        await db_1.prisma.passwordResetToken.create({
            data: {
                userId: user.id,
                tokenHash,
                expiresAt,
            },
        });
        const resetLink = `${env_1.config.appBaseUrl}/reset-password?token=${rawToken}`;
        await email_service_1.emailService.sendMail({
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
    static async resetPassword(token, newPassword) {
        const tokenHash = crypto_1.default.createHash('sha256').update(token).digest('hex');
        const resetToken = await db_1.prisma.passwordResetToken.findUnique({
            where: { tokenHash },
        });
        if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
            throw new helpers_1.AppError('Invalid or expired reset token', 400);
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await db_1.prisma.$transaction([
            db_1.prisma.user.update({
                where: { id: resetToken.userId },
                data: { password: hashedPassword },
            }),
            db_1.prisma.passwordResetToken.update({
                where: { id: resetToken.id },
                data: { usedAt: new Date() },
            }),
        ]);
    }
    static async logout(userId) {
        // await redisClient.del(`refresh_token:${userId}`);
    }
    static async refreshToken(token) {
        try {
            const payload = (0, jwt_1.verifyRefreshToken)(token);
            const accessToken = (0, jwt_1.generateAccessToken)({
                userId: payload.userId,
                role: payload.role,
            });
            return { accessToken };
        }
        catch (error) {
            throw new helpers_1.AppError('Invalid or expired refresh token', 401);
        }
    }
}
exports.AuthService = AuthService;
