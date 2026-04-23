import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginRequest, refreshTokenRequest } from '@/lib/api/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        // Pre-fetched tokens passed from the login page to avoid a second backend call
        accessToken: { label: 'Access Token', type: 'text' },
        refreshToken: { label: 'Refresh Token', type: 'text' },
        userId: { label: 'User ID', type: 'text' },
        userName: { label: 'User Name', type: 'text' },
        userRole: { label: 'User Role', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Fast path: tokens already validated by the login page
        if (credentials.accessToken && credentials.refreshToken && credentials.userId && credentials.userRole) {
          return {
            id: credentials.userId,
            email: credentials.email,
            name: credentials.userName || null,
            role: credentials.userRole,
            accessToken: credentials.accessToken,
            refreshToken: credentials.refreshToken,
          };
        }

        // Fallback: fetch from backend (used if called without pre-fetched tokens)
        if (!credentials.email || !credentials.password) return null;
        try {
          const result = await loginRequest(credentials.email, credentials.password);
          if (result.user.role !== 'ADMIN' && result.user.role !== 'SALES') {
            throw new Error('Access denied. Staff portal only.');
          }
          return {
            id: result.user.id,
            email: result.user.email,
            name: result.user.name ?? null,
            role: result.user.role,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
          };
        } catch (error: unknown) {
          if (error instanceof Error) throw new Error(error.message);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as { id: string; name: string | null; role: string; accessToken: string; refreshToken: string };
        token.id = u.id;
        token.name = u.name ?? null;
        token.role = u.role;
        token.accessToken = u.accessToken;
        token.refreshToken = u.refreshToken;
        // Store expiry: backend default is 15m, refresh 1 min before
        token.accessTokenExpiry = Date.now() + 14 * 60 * 1000;
        return token;
      }

      // Token still valid
      if (Date.now() < token.accessTokenExpiry) {
        return token;
      }

      // Access token expired — try to refresh
      try {
        const { accessToken } = await refreshTokenRequest(token.refreshToken);
        token.accessToken = accessToken;
        token.accessTokenExpiry = Date.now() + 14 * 60 * 1000;
        delete token.error;
      } catch {
        token.error = 'RefreshAccessTokenError';
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = (token.name as string | null) ?? null;
      session.user.role = token.role as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      if (token.error) session.error = token.error as string;
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 1 day
  },

  secret: process.env.NEXTAUTH_SECRET,
};
