import { clientApi } from '@/services/client-api';
import type { ChangePasswordRequest } from '../types';

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
