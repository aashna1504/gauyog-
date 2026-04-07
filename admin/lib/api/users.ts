import apiClient from './axios';
import type { User, ApiResponse } from '@/types';

// Note: These endpoints assume the backend exposes admin user management routes.
// The backend's Prisma schema has a User model — extend as your backend grows.

export async function getUsers(): Promise<User[]> {
  const { data } = await apiClient.get<ApiResponse<User[]>>('/users');
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
