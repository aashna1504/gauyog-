"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const logger_1 = require("./utils/logger");
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        // await connectRedis();
        const server = app_1.default.listen(env_1.config.port, () => {
            logger_1.logger.info(`Server running in ${env_1.config.nodeEnv} mode on port ${env_1.config.port}`);
        });
        // Graceful shutdown
        process.on('SIGTERM', async () => {
            logger_1.logger.info('SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                logger_1.logger.info('HTTP server closed.');
            });
            await (0, db_1.disconnectDB)();
            process.exit(0);
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
