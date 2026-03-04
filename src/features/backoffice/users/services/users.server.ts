import { serverApi } from '@/services/server-api';
import type {
  BackofficeUser,
  BackofficeUserListResponse,
  BackofficeUserResponse,
  BackofficeUsersFilters,
} from '../types';

const DEFAULT_PER_PAGE = 10;

export async function getBackofficeUsers(
  filters: Partial<BackofficeUsersFilters> = {}
): Promise<BackofficeUserListResponse> {
  const { page = 1, per_page = DEFAULT_PER_PAGE, search, is_deleted } = filters;
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('per_page', String(per_page));
  if (search) params.set('search', search);
  if (is_deleted !== undefined) params.set('is_deleted', String(is_deleted));
  return serverApi<BackofficeUserListResponse>(`/backoffice/users?${params.toString()}`);
}

export async function getBackofficeUserById(id: string): Promise<BackofficeUser | null> {
  try {
    const data = await serverApi<BackofficeUserResponse>(`/backoffice/users/${id}`);
    return data.data;
  } catch {
    return null;
  }
}
