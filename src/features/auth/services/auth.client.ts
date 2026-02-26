import { clientApi } from '@/services/client-api';
import type { AuthUser, LoginRequest, RegisterRequest, ForgotPasswordRequest } from '../types';

/**
 * Sends login credentials through the proxy Route Handler.
 * The proxy forwards to the real API and sets the HttpOnly cookie.
 *
 * @param credentials - Email and password
 * @returns The authenticated user object
 */
export async function loginUser(credentials: LoginRequest): Promise<AuthUser> {
  const data = await clientApi<{ user: AuthUser }>('/auth/login', {
    method: 'POST',
    body: credentials,
  });
  return data.user;
}

/**
 * Registers a new user through the proxy Route Handler.
 * The proxy forwards to the real API and sets the HttpOnly cookie.
 *
 * @param payload - Registration form data
 * @returns The newly created user object
 */
export async function registerUser(payload: RegisterRequest): Promise<AuthUser> {
  const data = await clientApi<{ user: AuthUser }>('/auth/register', {
    method: 'POST',
    body: payload,
  });
  return data.user;
}

/**
 * Calls logout through the proxy Route Handler, which invalidates the server-side
 * token and clears both auth cookies.
 */
export async function logoutUser(): Promise<void> {
  await clientApi<{ success: boolean }>('/auth/logout', { method: 'POST' });
}

/**
 * Requests a password reset email through the proxy Route Handler.
 * NOTE: This endpoint is not yet in the API spec. Will be wired once available.
 *
 * @param payload - Email address to send the reset link to
 */
export async function requestPasswordReset(payload: ForgotPasswordRequest): Promise<void> {
  await clientApi<void>('/auth/forgot-password', {
    method: 'POST',
    body: payload,
  });
}
