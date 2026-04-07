import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/dashboard') ||
      req.nextUrl.pathname.startsWith('/users') ||
      req.nextUrl.pathname.startsWith('/products') ||
      req.nextUrl.pathname.startsWith('/carts') ||
      req.nextUrl.pathname.startsWith('/settings');

    if (isAdminRoute && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
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
    '/carts/:path*',
    '/settings/:path*',
  ],
};
