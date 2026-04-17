import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { useAdminAuthStore } from '@/store/authStore';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Attach JWT on every request.
// Primary: Zustand store (persisted in localStorage, always in sync).
// Fallback: NextAuth getSession() in case the store is empty.
apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    let token = useAdminAuthStore.getState().accessToken;
    if (!token) {
      const session = await getSession();
      token = session?.accessToken ?? null;
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        signOut({ callbackUrl: '/login' });
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;

// ─── Server-side API client (for Server Components / Route Handlers) ──────────

export function createServerClient(accessToken: string) {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    timeout: 15000,
  });
}
