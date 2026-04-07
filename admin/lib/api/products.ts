import apiClient from './axios';
import type { Product, CreateProductInput, UpdateProductInput, ApiResponse } from '@/types';

interface ProductsResponse {
  products: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<ApiResponse<ProductsResponse>>('/products');
  return data.data.products;
}

export async function getProduct(id: string): Promise<Product> {
  const { data } = await apiClient.get<ApiResponse<Product>>(`/products/${id}`);
  return data.data;
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  const { data } = await apiClient.post<ApiResponse<Product>>('/products', input);
  return data.data;
}

export async function updateProduct(id: string, input: UpdateProductInput): Promise<Product> {
  const { data } = await apiClient.patch<ApiResponse<Product>>(`/products/${id}`, input);
  return data.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}
