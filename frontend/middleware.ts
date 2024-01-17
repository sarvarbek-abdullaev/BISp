import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (!request.cookies.has('next-auth.session-token') && !request.nextUrl.pathname.includes('api')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  } else if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  // matcher: ['/admin/:path*', '/dashboard', '/profile', '/timetable', '/events', '/settings'],
  matcher: ['/((?!.+\\.[\\w]+$|_next|auth/login|api).*)', '/(api|trpc)(.*)'],
};
