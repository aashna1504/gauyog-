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
import { logger } from '../../utils/logger';

interface GoogleTokenInfo {
  email?: string;
  email_verified?: 'true' | 'false';
  name?: string;
  aud?: string;
}

export class AuthService {
  static async signup(data: z.infer<typeof signupSchema>['body']): Promise<AuthResponse> {
    const normalizedEmail = data.email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        name: data.name?.trim() || null,
        role: data.role || 'USER',
      },
    });

    await prisma.cart.create({
      data: { userId: user.id },
    });

    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id, role: user.role });

    return {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
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
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
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
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      accessToken,
      refreshToken,
    };
  }

  static async forgotPassword(email: string): Promise<{ devResetLink?: string; emailDelivered?: boolean }> {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (!user) return {};

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
    const displayName = user.name ? user.name.split(' ')[0] : 'there';

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0"
       style="background:#ffffff;border-radius:20px;overflow:hidden;
              box-shadow:0 4px 32px rgba(0,0,0,.08);">

  <!-- Header -->
  <tr>
    <td style="background:#4a703f;padding:36px 40px;text-align:center;">
      <p style="margin:0 0 4px;font-size:10px;font-weight:800;text-transform:uppercase;
        letter-spacing:.2em;color:rgba(255,255,255,.5);">GAUYOG KENDR</p>
      <h1 style="margin:0 0 8px;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-.02em;">
        🔒 Reset Your Password
      </h1>
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,.7);">
        This link expires in <strong style="color:#e9aa43;">30 minutes</strong>
      </p>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:36px 40px;">
      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
        Hi <strong>${displayName}</strong>,
      </p>
      <p style="margin:0 0 28px;font-size:14px;color:#6b7280;line-height:1.75;">
        We received a request to reset the password for your Gauyog Kendr account
        (<strong style="color:#111827;">${user.email}</strong>).
        Click the button below to create a new password.
      </p>

      <!-- CTA Button -->
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" style="padding:8px 0 32px;">
            <a href="${resetLink}"
               style="display:inline-block;background:#4a703f;color:#ffffff;
                      font-size:13px;font-weight:800;text-transform:uppercase;
                      letter-spacing:.1em;text-decoration:none;
                      padding:16px 40px;border-radius:999px;">
              Reset My Password →
            </a>
          </td>
        </tr>
      </table>

      <!-- Fallback link -->
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px 20px;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;
          letter-spacing:.08em;color:#9ca3af;">
          Button not working? Copy this link:
        </p>
        <p style="margin:0;font-size:12px;color:#4a703f;word-break:break-all;font-weight:600;">
          ${resetLink}
        </p>
      </div>

      <!-- Security note -->
      <p style="margin:24px 0 0;font-size:12px;color:#9ca3af;line-height:1.7;">
        If you didn't request a password reset, you can safely ignore this email.
        Your password will not change unless you click the button above.
      </p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:18px 40px;text-align:center;">
      <p style="margin:0;font-size:11px;color:#9ca3af;">
        Gauyog Kendr · Village Badalpara, Veraval, Gir Somnath, Gujarat 362268
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;

    let emailDelivered = false;
    try {
      const result = await emailService.sendMail({
        to: user.email,
        subject: 'Reset your Gauyog Kendr password',
        html,
        text: [
          `Hi ${displayName},`,
          '',
          'Reset your Gauyog Kendr password using the link below.',
          'This link expires in 30 minutes.',
          '',
          resetLink,
          '',
          'If you did not request this, ignore this email.',
        ].join('\n'),
      });
      emailDelivered = !result.skipped;
    } catch (err: any) {
      // Never throw — token is already saved. Log clearly so dev knows what to fix.
      logger.error(`[ForgotPassword] Email failed for ${user.email}: ${err?.message}`);
      if (config.nodeEnv === 'development') {
        logger.warn('[ForgotPassword] To send real emails, add GMAIL_APP_PASSWORD to .env');
        logger.warn(`[ForgotPassword] Dev reset link: ${resetLink}`);
      }
    }

    // Development only: return the reset link in the API response so the full
    // flow can be tested without a working email provider.
    const isDev = config.nodeEnv === 'development';
    return isDev ? { devResetLink: resetLink, emailDelivered } : {};
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

  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });
    if (!user) throw new AppError('User not found', 404);
    return user;
  }

  static async updateProfile(userId: string, name: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name: name?.trim() || null },
      select: { id: true, email: true, name: true, role: true },
    });
    return user;
  }

  static async logout(_userId: string): Promise<void> {
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
