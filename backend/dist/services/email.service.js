"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const resend_1 = require("resend");
const env_1 = require("../config/env");
const logger_1 = require("../utils/logger");
class EmailService {
    client = env_1.config.resendApiKey ? new resend_1.Resend(env_1.config.resendApiKey) : null;
    async sendMail(input) {
        if (!this.client || !env_1.config.resendFromEmail) {
            logger_1.logger.warn('Email skipped: Resend is not configured');
            return { skipped: true };
        }
        await this.client.emails.send({
            from: env_1.config.resendFromEmail,
            to: input.to,
            subject: input.subject,
            html: input.html,
            text: input.text,
        });
        return { skipped: false };
    }
}
exports.emailService = new EmailService();
