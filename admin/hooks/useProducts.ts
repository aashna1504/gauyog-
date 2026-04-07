'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/lib/api/products';
import type { CreateProductInput, UpdateProductInput } from '@/types';

export const productKeys = {
  all: ['products'] as const,
  detail: (id: string) => ['products', id] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: getProducts,
    staleTime: 30_000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.all });
      toast.success('Product created successfully');
    },
    onError: (err: Error) => toast.error(err.message || 'Failed to create product'),
  });
}

export function useUpdateProduct(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateProductInput) => updateProduct(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.all });
      qc.invalidateQueries({ queryKey: productKeys.detail(id) });
      toast.success('Product updated successfully');
    },
    onError: (err: Error) => toast.error(err.message || 'Failed to update product'),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.all });
      toast.success('Product deleted');
    },
    onError: (err: Error) => toast.error(err.message || 'Failed to delete product'),
  });
}
