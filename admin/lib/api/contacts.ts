import apiClient from './axios';
import type { ApiResponse, ContactMessage } from '@/types';

export interface ContactsResult {
  messages: ContactMessage[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getContacts(page = 1, limit = 20, search?: string): Promise<ContactsResult> {
  const params: Record<string, string | number> = { page, limit };
  if (search) params.search = search;
  const { data } = await apiClient.get<ApiResponse<ContactsResult>>('/contact', { params });
  return data.data;
}
