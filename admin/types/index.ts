// ─── Auth ────────────────────────────────────────────────────────────────────

export type Role = 'USER' | 'ADMIN';

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryDetails {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string | null;
  building: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserWithDetails extends User {
  deliveryDetails?: DeliveryDetails | null;
  cart?: Cart | null;
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: string;
  userId: string;
  createdAt: string;
  items: CartItem[];
  user?: User;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalCartItems: number;
  lowStockProducts: number;
  revenueEstimate: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  revenue?: number;
}
