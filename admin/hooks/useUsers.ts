'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getUsers, getUser, updateUser, deleteUser } from '@/lib/api/users';
import { statsKeys } from '@/hooks/useStats';
import type { User } from '@/types';

export const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => ['users', id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: () => getUsers(1, 20),
    staleTime: 30_000,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}

export function useUpdateUser(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<Pick<User, 'name' | 'email' | 'role'>>) =>
      updateUser(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.all });
      qc.invalidateQueries({ queryKey: userKeys.detail(id) });
      qc.invalidateQueries({ queryKey: statsKeys.all });
      toast.success('User updated');
    },
    onError: (err: Error) => toast.error(err.message || 'Failed to update user'),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.all });
      qc.invalidateQueries({ queryKey: statsKeys.all });
      toast.success('User deleted');
    },
    onError: (err: Error) => toast.error(err.message || 'Failed to delete user'),
  });
}
