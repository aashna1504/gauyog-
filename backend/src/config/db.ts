import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info('PostgreSQL connected successfully');
  } catch (error) {
    logger.error('PostgreSQL connection failed', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await prisma.$disconnect();
};
