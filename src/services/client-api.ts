const PROXY_BASE = '/api/proxy';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * Makes a request through the Next.js catch-all proxy Route Handler (same-origin).
 * The proxy attaches the auth token server-side and forwards the request to the real API.
 * Cookies are sent automatically by the browser.
 *
 * @param path - API path, e.g. '/auth/login' or '/monitors'
 * @param options - Request options
 * @returns Parsed JSON response
 * @throws Error with message from handler or generic message on failure
 */
export async function clientApi<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers: extraHeaders = {} } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...extraHeaders,
  };

  const response = await fetch(`${PROXY_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message ?? `Request failed: ${response.status}`);
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
