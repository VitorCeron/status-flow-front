import { clientApi } from '@/services/client-api';
import type { AuthUser } from '@/features/auth/types';
import type { ChangePasswordRequest, TimezoneOption, TimezoneListResponse, UpdateProfileRequest } from '../types';

/**
 * Sends a change-password request through the proxy Route Handler.
 * Returns 204 No Content on success.
 *
 * @param payload - Old password, new password, and confirmation
 */
export async function changePassword(payload: ChangePasswordRequest): Promise<void> {
  await clientApi<void>('/auth/change-password', {
    method: 'POST',
    body: payload,
  });
}

/**
 * Sends a DELETE request through the proxy Route Handler to permanently
 * remove the authenticated user's account.
 * Returns 204 No Content on success.
 */
export async function deleteAccount(): Promise<void> {
  await clientApi<void>('/auth/account', {
    method: 'DELETE',
  });
}

export async function getTimezones(): Promise<TimezoneOption[]> {
  const response = await clientApi<TimezoneListResponse>('/profile/timezones');
  return response.data;
}

export async function updateProfile(payload: UpdateProfileRequest): Promise<AuthUser> {
  const response = await clientApi<{ data: AuthUser }>('/profile/settings', {
    method: 'PATCH',
    body: payload,
  });
  return response.data;
}
