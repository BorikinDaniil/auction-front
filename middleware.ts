import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTHORIZED_ROTES = ['/', '/auctions/new'];

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('accessToken');
  console.log('cookie', cookie);

  if (!AUTHORIZED_ROTES.includes(request.nextUrl.pathname) && cookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!request.nextUrl.pathname.startsWith('/auth') && !cookie) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  // Routes for middleware
  matcher: ['/', '/auth/login', '/auth/registration', '/auctions/new'],
};