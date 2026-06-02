"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const resend_1 = require("resend");
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const logger_1 = require("../utils/logger");
class EmailService {
    get gmailTransporter() {
        if (!env_1.config.gmailUser || !env_1.config.gmailAppPassword)
            return null;
        return nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: { user: env_1.config.gmailUser, pass: env_1.config.gmailAppPassword },
        });
    }
    resendClient = env_1.config.resendApiKey ? new resend_1.Resend(env_1.config.resendApiKey) : null;
    async sendMail(input) {
        // ── Gmail SMTP (primary — works for any recipient) ──────────────────────
        const gmail = this.gmailTransporter;
        if (gmail) {
            logger_1.logger.info(`[Email/Gmail] → ${input.to} | ${input.subject}`);
            const info = await gmail.sendMail({
                from: `Gauyog Kendr <${env_1.config.gmailUser}>`,
                to: input.to,
                subject: input.subject,
                html: input.html,
                text: input.text,
            });
            logger_1.logger.info(`[Email/Gmail] ✓ delivered to ${input.to} | messageId: ${info.messageId}`);
            return { skipped: false, transport: 'gmail', id: info.messageId };
        }
        // ── Resend fallback ─────────────────────────────────────────────────────
        if (!this.resendClient || !env_1.config.resendFromEmail) {
            logger_1.logger.warn('[Email] ✗ No email transport configured. Add GMAIL_APP_PASSWORD to .env');
            return { skipped: true };
        }
        logger_1.logger.info(`[Email/Resend] → ${input.to} | ${input.subject}`);
        const { data, error } = await this.resendClient.emails.send({
            from: env_1.config.resendFromEmail,
            to: input.to,
            subject: input.subject,
            html: input.html,
            text: input.text,
        });
        if (error) {
            const msg = `[${error.name}] ${error.message}`;
            logger_1.logger.error(`[Email/Resend] ✗ rejected for ${input.to}: ${msg}`);
            throw new Error(msg);
        }
        logger_1.logger.info(`[Email/Resend] ✓ delivered to ${input.to} | id: ${data?.id}`);
        return { skipped: false, transport: 'resend', id: data?.id };
    }
}
exports.emailService = new EmailService();
