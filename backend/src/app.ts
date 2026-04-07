import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/error.middleware';

// Routes

import authRoutes from './modules/auth/auth.routes';
import productRoutes from './modules/product/product.routes';
import cartRoutes from './modules/cart/cart.routes';
import deliveryRoutes from './modules/delivery/delivery.routes';
import userRoutes from './modules/user/user.routes';

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/users', userRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
