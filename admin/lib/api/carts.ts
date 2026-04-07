import apiClient from './axios';
import type { Cart, ApiResponse } from '@/types';

export async function getMyCart(): Promise<Cart> {
  const { data } = await apiClient.get<ApiResponse<Cart>>('/cart');
  return data.data;
}

// Admin: if backend exposes /admin/carts — adjust accordingly
export async function getAllCarts(): Promise<Cart[]> {
  const { data } = await apiClient.get<ApiResponse<Cart[]>>('/admin/carts');
  return data.data;
}
