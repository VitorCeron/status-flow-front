import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, AUTH_ROLE_COOKIE_NAME, ROLE_REDIRECT, DEFAULT_REDIRECT } from '@/features/auth/constants';

const PROTECTED_PREFIXES = ['/dashboard', '/monitors', '/settings', '/backoffice'];
const GUEST_ONLY_ROUTES = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const role = request.cookies.get(AUTH_ROLE_COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(token);

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isGuestOnly = GUEST_ONLY_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuestOnly && isAuthenticated) {
    const redirectTo = (role && ROLE_REDIRECT[role]) ?? DEFAULT_REDIRECT;
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (pathname.startsWith('/backoffice') && isAuthenticated && role !== 'admin') {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg|api/).*)',],
};
