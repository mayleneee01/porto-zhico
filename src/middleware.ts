import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';

export async function middleware(request: NextRequest) {
  const isAuthRoute = request.nextUrl.pathname.startsWith('/admin/login');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;

  if (isAuthRoute) {
    if (token) {
      try {
        await decrypt(token);
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (e) {
        // Token invalid, allow to login page
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    await decrypt(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
