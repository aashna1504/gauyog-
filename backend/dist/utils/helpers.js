"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.formatResponse = void 0;
const formatResponse = (success, message, data = null) => {
    return {
        success,
        message,
        data,
    };
};
exports.formatResponse = formatResponse;
class AppError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
