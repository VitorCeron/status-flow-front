import { clientApi } from '@/services/client-api';
import type { BackofficeUserListResponse, BackofficeUsersFilters } from '../types';

const DEFAULT_PER_PAGE = 10;

export async function listBackofficeUsers(
  filters: Partial<BackofficeUsersFilters> = {}
): Promise<BackofficeUserListResponse> {
  const { page = 1, per_page = DEFAULT_PER_PAGE, search, is_deleted } = filters;
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('per_page', String(per_page));
  if (search) params.set('search', search);
  if (is_deleted !== undefined) params.set('is_deleted', String(is_deleted));
  return clientApi<BackofficeUserListResponse>(`/backoffice/users?${params.toString()}`);
}
