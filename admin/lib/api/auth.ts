import axios from 'axios';
import type { AuthResponse, ApiResponse } from '@/types';

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function loginRequest(email: string, password: string): Promise<AuthResponse> {
  const { data } = await axios.post<ApiResponse<AuthResponse>>(
    `${BASE}/auth/login`,
    { email, password },
  );
  return data.data;
}

export async function refreshTokenRequest(refreshToken: string): Promise<AuthResponse> {
  const { data } = await axios.post<ApiResponse<AuthResponse>>(
    `${BASE}/auth/refresh`,
    { refreshToken },
  );
  return data.data;
}
