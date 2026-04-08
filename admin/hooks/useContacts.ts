'use client';

import { useQuery } from '@tanstack/react-query';
import { getContacts } from '@/lib/api/contacts';

export const contactKeys = {
  all: ['contacts'] as const,
};

export function useContacts() {
  return useQuery({
    queryKey: contactKeys.all,
    queryFn: () => getContacts(1, 50),
    staleTime: 30_000,
  });
}
