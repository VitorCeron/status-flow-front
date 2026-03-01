import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, AUTH_ROLE_COOKIE_NAME, AUTH_COOKIE_MAX_AGE } from '@/features/auth/constants';
import type { AuthResponse } from '@/features/auth/types';

const API_BASE_URL = process.env.API_URL ?? '';

const cookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: AUTH_COOKIE_MAX_AGE,
  path: '/',
};

async function handleAuthResponse(apiResponse: Response): Promise<NextResponse> {
  if (!apiResponse.ok) {
    const errorData = await apiResponse.json().catch(() => ({}));
    return NextResponse.json(
      { message: errorData?.message ?? 'Request failed' },
      { status: apiResponse.status },
    );
  }

  const data: AuthResponse = await apiResponse.json();
  const { access_token, user } = data.data;

  const response = NextResponse.json({ user });

  response.cookies.set(AUTH_COOKIE_NAME, access_token, {
    ...cookieOptions,
    httpOnly: true,
  });

  response.cookies.set(AUTH_ROLE_COOKIE_NAME, user.role, {
    ...cookieOptions,
    httpOnly: false,
  });

  return response;
}

async function handleDeleteAccount(token: string | undefined): Promise<NextResponse> {
  if (token) {
    await fetch(`${API_BASE_URL}/auth/account`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }).catch(() => {});
  }

  const response = new NextResponse(null, { status: 204 });
  response.cookies.delete(AUTH_COOKIE_NAME);
  response.cookies.delete(AUTH_ROLE_COOKIE_NAME);
  return response;
}

async function handleLogout(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (token) {
    // Best-effort: invalidate the token server-side
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }).catch(() => {
      // Swallow errors — cookies are cleared regardless
    });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete(AUTH_COOKIE_NAME);
  response.cookies.delete(AUTH_ROLE_COOKIE_NAME);
  return response;
}

async function handleRequest(request: NextRequest, segments: string[]): Promise<NextResponse> {
  const apiPath = segments.join('/');
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  // Special-case: auth endpoints that need cookie management
  if (apiPath === 'auth/login' || apiPath === 'auth/register') {
    const body = await request.json();
    const apiResponse = await fetch(`${API_BASE_URL}/${apiPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    return handleAuthResponse(apiResponse);
  }

  if (apiPath === 'auth/logout') {
    return handleLogout();
  }

  if (apiPath === 'auth/account' && request.method === 'DELETE') {
    return handleDeleteAccount(token);
  }

  // Generic transparent proxy for all other routes
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const body = request.method !== 'GET' && request.method !== 'HEAD'
    ? await request.text()
    : undefined;

  const queryString = request.nextUrl.searchParams.toString();
  const upstreamUrl = queryString
    ? `${API_BASE_URL}/${apiPath}?${queryString}`
    : `${API_BASE_URL}/${apiPath}`;

  const apiResponse = await fetch(upstreamUrl, {
    method: request.method,
    headers,
    body,
  });

  if (!apiResponse.ok) {
    const errorData = await apiResponse.json().catch(() => ({}));
    return NextResponse.json(
      { message: errorData?.message ?? 'Request failed' },
      { status: apiResponse.status },
    );
  }

  const contentLength = apiResponse.headers.get('content-length');
  const hasBody = contentLength !== '0' && apiResponse.status !== 204;

  if (!hasBody) {
    return new NextResponse(null, { status: apiResponse.status });
  }

  const data = await apiResponse.json().catch(() => null);
  return NextResponse.json(data, { status: apiResponse.status });
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  return handleRequest(request, path);
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  return handleRequest(request, path);
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  return handleRequest(request, path);
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  return handleRequest(request, path);
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  return handleRequest(request, path);
}
