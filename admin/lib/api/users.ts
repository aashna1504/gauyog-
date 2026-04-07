import apiClient from './axios';
import type { User, ApiResponse } from '@/types';

export interface UsersResult {
  users: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getUsers(page = 1, limit = 20, search?: string): Promise<UsersResult> {
  const params: Record<string, string | number> = { page, limit };
  if (search) params.search = search;
  const { data } = await apiClient.get<ApiResponse<UsersResult>>('/users', { params });
  return data.data;
}

export async function getUser(id: string): Promise<User> {
  const { data } = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  return data.data;
}

export async function updateUser(id: string, input: Partial<Pick<User, 'name' | 'email' | 'role'>>): Promise<User> {
  const { data } = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, input);
  return data.data;
}

export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}
