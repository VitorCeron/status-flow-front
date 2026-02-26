import { serverApi } from '@/services/server-api';
import type { AuthUser, MeResponse } from '../types';

/**
 * Fetches the currently authenticated user from the real API.
 * Uses the Bearer token stored in the HttpOnly cookie.
 * Safe to call from Server Components and layouts.
 *
 * @returns The authenticated user, or null if the request fails (not authenticated or token expired)
 */
export async function getAuthenticatedUser(): Promise<AuthUser | null> {
  try {
    const response = await serverApi<MeResponse>('/auth/me');
    return response.data;
  } catch {
    return null;
  }
}
