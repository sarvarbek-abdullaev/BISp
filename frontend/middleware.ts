import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { usage } from 'browserslist';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const session = await getToken({ req, secret });

  if (currentPath.startsWith('/api')) {
    return NextResponse.next();
  }

  if (!req.cookies.has('next-auth.session-token') && !currentPath.includes('api')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (session) {
    const {
      user: { role },
    } = session;

    const isAdmin = role.toLowerCase() === 'admin';

    if (isAdmin && !currentPath.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    if (!isAdmin && (currentPath === '/' || currentPath.startsWith('/admin'))) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|auth/login).*)', '/(admin|trpc)(.*)'],
};
