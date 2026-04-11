"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
exports.prisma = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
const connectDB = async () => {
    try {
        await exports.prisma.$connect();
        logger_1.logger.info('PostgreSQL connected successfully');
    }
    catch (error) {
        logger_1.logger.error('PostgreSQL connection failed', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    await exports.prisma.$disconnect();
};
exports.disconnectDB = disconnectDB;
