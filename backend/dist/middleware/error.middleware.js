"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const helpers_1 = require("../utils/helpers");
const logger_1 = require("../utils/logger");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error(`[Error] ${err.name}: ${err.message}`, { stack: err.stack });
    if (err instanceof helpers_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    if (err instanceof zod_1.ZodError) {
        const errors = err.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message,
        }));
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors,
        });
    }
    // Prisma known request errors (FK violations, unique constraint, etc.)
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
            return res.status(400).json({ success: false, message: 'Cannot complete operation: record is referenced by other data.' });
        }
        if (err.code === 'P2025') {
            return res.status(404).json({ success: false, message: 'Record not found.' });
        }
        if (err.code === 'P2002') {
            return res.status(409).json({ success: false, message: 'A record with this value already exists.' });
        }
        return res.status(400).json({ success: false, message: err.message });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    return res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
};
exports.errorHandler = errorHandler;
