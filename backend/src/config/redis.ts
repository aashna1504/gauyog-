import { logger } from '../utils/logger';

// Mock Redis client
export const redisClient = {
  set: async () => {},
  get: async () => null,
  del: async () => {},
  on: () => {},
  connect: async () => {},
  isOpen: true,
};

export const connectRedis = async () => {
  logger.info('Redis connection skipped for now');
};
