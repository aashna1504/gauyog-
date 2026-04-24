// ─── Auth ────────────────────────────────────────────────────────────────────

export type Role = 'USER' | 'ADMIN' | 'SALES';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
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
  scientificName: string | null;
  description: string;
  ingredients: string | null;
  price: number;
  discountPrice: number | null;
  category: string;
  inStock: boolean;
  weight: string | null;
  weightOptions: string[];
  imageUrl: string | null;
  image5kg: string | null;
  galleryImages: string[];
  benefits: string[];
  sku: string | null;
  batchNo: string | null;
  mfgDate: string | null;
  bestBefore: string | null;
  usageInstructions: string | null;
  storageInstructions: string | null;
  safetyInstructions: string | null;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  scientificName?: string;
  description: string;
  ingredients?: string;
  price: number;
  discountPrice?: number;
  category: string;
  inStock?: boolean;
  weight?: string;
  weightOptions?: string[];
  imageUrl?: string;
  image5kg?: string;
  galleryImages?: string[];
  benefits?: string[];
  sku?: string;
  batchNo?: string;
  mfgDate?: string;
  bestBefore?: string;
  usageInstructions?: string;
  storageInstructions?: string;
  safetyInstructions?: string;
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

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string | null;
  interest: string | null;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
