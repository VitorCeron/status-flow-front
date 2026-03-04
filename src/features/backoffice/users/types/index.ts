import type { PaginationMeta, PaginationLinks } from '@/features/monitors/types';
import { UserRole } from '@/features/auth/types';

export { UserRole };

export interface BackofficeUser {
  id: string;
  name: string;
  email: string;
  timezone: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface BackofficeUserListResponse {
  data: BackofficeUser[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

export interface BackofficeUserResponse {
  data: BackofficeUser;
}

export interface BackofficeUsersFilters {
  search: string;
  is_deleted: boolean | undefined;
  page: number;
  per_page: number;
}
