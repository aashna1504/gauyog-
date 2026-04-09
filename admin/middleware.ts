import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    const role = token?.role as string | undefined;

    // Admin-only routes — SALES cannot access
    const isAdminOnly =
      pathname.startsWith('/users') ||
      pathname.startsWith('/settings') ||
      pathname.startsWith('/carts');

    if (isAdminOnly && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard?error=unauthorized', req.url));
    }

    // Product write routes — SALES cannot access
    const isProductWrite =
      pathname === '/products/new' ||
      /^\/products\/[^/]+\/edit/.test(pathname);

    if (isProductWrite && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/products?error=unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Allow both ADMIN and SALES through the auth gate
      authorized: ({ token }) => {
        if (!token) return false;
        return token.role === 'ADMIN' || token.role === 'SALES';
      },
    },
    pages: {
      signIn: '/login',
    },
  },
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/users/:path*',
    '/products/:path*',
    '/orders/:path*',
    '/contacts/:path*',
    '/carts/:path*',
    '/settings/:path*',
  ],
};
