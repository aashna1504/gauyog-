import apiClient from './axios';

export interface StatsData {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  inventoryValue: number;
  lowStock: number;
  outOfStock: number;
  stockLevels: { name: string; stock: number }[];
  monthlyRevenue: { name: string; value: number }[];
  recentProducts: {
    id: string;
    name: string;
    price: number;
    stock: number;
    inStock: boolean;
    imageUrl?: string | null;
    createdAt: string;
  }[];
}

export async function getStats(): Promise<StatsData> {
  const { data } = await apiClient.get<{ status: string; data: StatsData }>('/orders/stats');
  return data.data;
}
