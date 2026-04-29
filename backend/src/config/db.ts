import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export const connectDB = async () => {
  const maxRetries = 5;
  const retryDelayMs = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await prisma.$connect();
      logger.info('PostgreSQL connected successfully');
      return;
    } catch (error) {
      logger.error(`PostgreSQL connection failed (attempt ${attempt}/${maxRetries})`, error);
      if (attempt < maxRetries) {
        logger.info(`Retrying in ${retryDelayMs / 1000}s... (Neon may be waking from auto-suspend)`);
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      } else {
        logger.error('All connection attempts failed. Exiting.');
        process.exit(1);
      }
    }
  }
};

export const disconnectDB = async () => {
  await prisma.$disconnect();
};
