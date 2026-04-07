import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginRequest } from '@/lib/api/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const result = await loginRequest(credentials.email, credentials.password);

          // Only allow ADMIN users
          if (result.user.role !== 'ADMIN') {
            throw new Error('Access denied. Admin only.');
          }

          return {
            id: result.user.id,
            email: result.user.email,
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
        const u = user as unknown as { id: string; role: string; accessToken: string; refreshToken: string };
        token.id = u.id;
        token.role = u.role;
        token.accessToken = u.accessToken;
        token.refreshToken = u.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
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
