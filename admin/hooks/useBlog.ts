'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axios from 'axios';
import { getBlogs, getBlog, createBlog, updateBlog, deleteBlog } from '@/lib/api/blog';
import type { CreateBlogInput, UpdateBlogInput } from '@/types';

export const blogKeys = {
  all: ['blog-posts'] as const,
  detail: (id: string) => ['blog-posts', id] as const,
};

function extractMsg(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    if (err.code === 'ERR_NETWORK' || err.message === 'Network Error')
      return 'Cannot reach the server — make sure the backend is running.';
    return (err.response?.data as any)?.message ?? err.message ?? fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

export function useBlogs() {
  return useQuery({ queryKey: blogKeys.all, queryFn: getBlogs, staleTime: 30_000 });
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => getBlog(id),
    enabled: !!id,
  });
}

export function useCreateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateBlogInput) => createBlog(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: blogKeys.all });
      toast.success('Blog post created');
    },
    onError: (err) => toast.error(extractMsg(err, 'Failed to create blog post')),
  });
}

export function useUpdateBlog(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateBlogInput) => updateBlog(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: blogKeys.all });
      qc.invalidateQueries({ queryKey: blogKeys.detail(id) });
      toast.success('Blog post updated');
    },
    onError: (err) => toast.error(extractMsg(err, 'Failed to update blog post')),
  });
}

export function useDeleteBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: blogKeys.all });
      toast.success('Blog post deleted');
    },
    onError: (err) => toast.error(extractMsg(err, 'Failed to delete blog post')),
  });
}
