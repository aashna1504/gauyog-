import app from './app';
import { config } from './config/env';
import { connectDB, disconnectDB } from './config/db';
import { connectRedis } from './config/redis';
import { logger } from './utils/logger';

const startServer = async () => {
  try {
    await connectDB();
    // await connectRedis();

    const server = app.listen(config.port, () => {
      logger.info(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        logger.info('HTTP server closed.');
      });
      await disconnectDB();
      process.exit(0);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
