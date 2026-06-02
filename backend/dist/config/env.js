"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    dbUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '992028642246-c7b2ic4m1031ko1irio6929b7bok0lb6.apps.googleusercontent.com',
    appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:5173',
    adminEmailTo: process.env.ADMIN_EMAIL_TO,
    resendApiKey: process.env.RESEND_API_KEY,
    resendFromEmail: process.env.RESEND_FROM_EMAIL,
    gmailUser: process.env.GMAIL_USER,
    // Treat placeholder value as unset so we don't attempt auth with a fake password
    gmailAppPassword: (() => {
        const p = process.env.GMAIL_APP_PASSWORD;
        return p && p !== 'your_16_char_app_password_here' && !p.startsWith('your_') ? p : undefined;
    })(),
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || 'dbpzzvcik',
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || 'secret',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
};
