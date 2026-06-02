"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
exports.prisma = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
const connectDB = async () => {
    const maxRetries = 5;
    const retryDelayMs = 3000;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            await exports.prisma.$connect();
            logger_1.logger.info('PostgreSQL connected successfully');
            return;
        }
        catch (error) {
            logger_1.logger.error(`PostgreSQL connection failed (attempt ${attempt}/${maxRetries})`, error);
            if (attempt < maxRetries) {
                logger_1.logger.info(`Retrying in ${retryDelayMs / 1000}s... (Neon may be waking from auto-suspend)`);
                await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
            }
            else {
                logger_1.logger.error('All connection attempts failed. Exiting.');
                process.exit(1);
            }
        }
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    await exports.prisma.$disconnect();
};
exports.disconnectDB = disconnectDB;
