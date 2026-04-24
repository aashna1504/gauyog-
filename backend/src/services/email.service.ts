import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { config } from '../config/env';
import { logger } from '../utils/logger';

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface SendResult {
  skipped: boolean;
  transport?: 'gmail' | 'resend';
  id?: string;
}

class EmailService {
  private get gmailTransporter() {
    if (!config.gmailUser || !config.gmailAppPassword) return null;
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user: config.gmailUser, pass: config.gmailAppPassword },
    });
  }

  private resendClient = config.resendApiKey ? new Resend(config.resendApiKey) : null;

  async sendMail(input: SendEmailInput): Promise<SendResult> {
    // ── Gmail SMTP (primary — works for any recipient) ──────────────────────
    const gmail = this.gmailTransporter;
    if (gmail) {
      logger.info(`[Email/Gmail] → ${input.to} | ${input.subject}`);
      const info = await gmail.sendMail({
        from: `Gauyog Kendr <${config.gmailUser}>`,
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
      });
      logger.info(`[Email/Gmail] ✓ delivered to ${input.to} | messageId: ${info.messageId}`);
      return { skipped: false, transport: 'gmail', id: info.messageId };
    }

    // ── Resend fallback ─────────────────────────────────────────────────────
    if (!this.resendClient || !config.resendFromEmail) {
      logger.warn('[Email] ✗ No email transport configured. Add GMAIL_APP_PASSWORD to .env');
      return { skipped: true };
    }

    logger.info(`[Email/Resend] → ${input.to} | ${input.subject}`);
    const { data, error } = await this.resendClient.emails.send({
      from:    config.resendFromEmail,
      to:      input.to,
      subject: input.subject,
      html:    input.html,
      text:    input.text,
    });

    if (error) {
      const msg = `[${(error as any).name}] ${(error as any).message}`;
      logger.error(`[Email/Resend] ✗ rejected for ${input.to}: ${msg}`);
      throw new Error(msg);
    }

    logger.info(`[Email/Resend] ✓ delivered to ${input.to} | id: ${data?.id}`);
    return { skipped: false, transport: 'resend', id: data?.id };
  }
}

export const emailService = new EmailService();
