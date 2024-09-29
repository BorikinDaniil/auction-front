import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTHORIZED_ROTES = ['/', '/auctions/new'];

export function middleware(request: NextRequest): void {
  const cookie = request.cookies.get('accessToken');

  if (!AUTHORIZED_ROTES.includes(request.nextUrl.pathname) && cookie) {
    NextResponse.redirect(new URL('/', request.url));

    return;
  }

  if (!request.nextUrl.pathname.startsWith('/auth') && !cookie) {
    NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  // Routes for middleware
  matcher: ['/', '/auth/login', '/auth/registration', '/auctions/new', '/404'],
};
