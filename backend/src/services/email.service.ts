import { Resend } from 'resend';
import { config } from '../config/env';
import { logger } from '../utils/logger';

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private client = config.resendApiKey ? new Resend(config.resendApiKey) : null;

  async sendMail(input: SendEmailInput) {
    if (!this.client || !config.resendFromEmail) {
      logger.warn('Email skipped: Resend is not configured');
      return { skipped: true };
    }

    await this.client.emails.send({
      from: config.resendFromEmail,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    });

    return { skipped: false };
  }
}

export const emailService = new EmailService();
