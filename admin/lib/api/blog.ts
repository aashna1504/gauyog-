import apiClient from './axios';
import type { BlogPost, CreateBlogInput, UpdateBlogInput, ApiResponse } from '@/types';

interface BlogListResponse {
  blogs: BlogPost[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export async function getBlogs(): Promise<BlogPost[]> {
  const { data } = await apiClient.get<ApiResponse<BlogListResponse>>('/blog/admin/all');
  return data.data.blogs;
}

export async function getBlog(id: string): Promise<BlogPost> {
  const { data } = await apiClient.get<ApiResponse<BlogPost>>(`/blog/${id}`);
  return data.data;
}

export async function createBlog(input: CreateBlogInput): Promise<BlogPost> {
  const { data } = await apiClient.post<ApiResponse<BlogPost>>('/blog', input);
  return data.data;
}

export async function updateBlog(id: string, input: UpdateBlogInput): Promise<BlogPost> {
  const { data } = await apiClient.patch<ApiResponse<BlogPost>>(`/blog/${id}`, input);
  return data.data;
}

export async function deleteBlog(id: string): Promise<void> {
  await apiClient.delete(`/blog/${id}`);
}
