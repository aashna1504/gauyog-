import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '992028642246-c7b2ic4m1031ko1irio6929b7bok0lb6.apps.googleusercontent.com',
  appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:5173',
  adminEmailTo: process.env.ADMIN_EMAIL_TO,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFromEmail: process.env.RESEND_FROM_EMAIL,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
};
