"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = void 0;
const logger_1 = require("../utils/logger");
// Mock Redis client
exports.redisClient = {
    set: async () => { },
    get: async () => null,
    del: async () => { },
    on: () => { },
    connect: async () => { },
    isOpen: true,
};
const connectRedis = async () => {
    logger_1.logger.info('Redis connection skipped for now');
};
exports.connectRedis = connectRedis;
