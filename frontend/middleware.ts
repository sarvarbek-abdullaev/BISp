import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const session = await getToken({ req, secret });

  if (currentPath.startsWith('/api')) {
    return NextResponse.next();
  }

  if (!session && !currentPath.includes('api')) {
    if (currentPath.includes('auth/forgot-password')) return NextResponse.next();

    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (session) {
    const {
      profile: { role },
    } = session;

    const isAdmin = role.toLowerCase() === 'admin';

    if (isAdmin && !currentPath.startsWith('/admin/')) {
      return NextResponse.redirect(new URL('/admin/users', req.url));
    }
    if (!isAdmin && (currentPath === '/' || currentPath.startsWith('/admin'))) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|auth/login).*)', '/(admin|trpc)(.*)'],
};
