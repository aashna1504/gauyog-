'use client';

import { useQuery } from '@tanstack/react-query';
import { getStats } from '@/lib/api/stats';

export const statsKeys = {
  all: ['stats'] as const,
};

export function useStats() {
  return useQuery({
    queryKey: statsKeys.all,
    queryFn: getStats,
    staleTime: 30_000,
    retry: 1,
  });
}
