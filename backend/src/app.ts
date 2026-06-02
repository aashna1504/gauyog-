import path from 'path';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/error.middleware';

// Routes

import authRoutes from './modules/auth/auth.routes';
import productRoutes from './modules/product/product.routes';
import cartRoutes from './modules/cart/cart.routes';
import wishlistRoutes from './modules/wishlist/wishlist.routes';
import deliveryRoutes from './modules/delivery/delivery.routes';
import userRoutes from './modules/user/user.routes';
import contactRoutes from './modules/contact/contact.routes';
import orderRoutes from './modules/order/order.routes';
import uploadRoutes from './modules/upload/upload.routes';

const app: Express = express();

// Middleware
// CORS must run before helmet so OPTIONS preflights are handled correctly
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3001',
      'https://gauyogkendr.com',
      'https://www.gauyogkendr.com',
    ],
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Helmet with cross-origin headers disabled — this is a REST API consumed by
// multiple origins. The default `crossOriginResourcePolicy: same-origin` is the
// exact header that makes Axios report "Network Error" on cross-origin requests.
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health Check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
