import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/features/auth/constants';

const API_BASE_URL = process.env.API_URL ?? '';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * Makes an authenticated server-side request to the external API.
 * Reads the Bearer token from the HttpOnly cookie automatically.
 *
 * @param path - API path, e.g. '/auth/me'
 * @param options - Request options
 * @returns Parsed JSON response
 * @throws Error with message from API or generic message on failure
 */
export async function serverApi<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers: extraHeaders = {} } = options;

  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...extraHeaders,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message ?? `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
