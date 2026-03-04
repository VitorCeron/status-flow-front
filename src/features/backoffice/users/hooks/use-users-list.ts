'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { listBackofficeUsers } from '../services/users.client';
import type { BackofficeUser, BackofficeUsersFilters } from '../types';
import type { PaginationMeta } from '@/features/monitors/types';

const DEFAULT_FILTERS: BackofficeUsersFilters = {
  search: '',
  is_deleted: undefined,
  page: 1,
  per_page: 10,
};

export function useUsersList() {
  const [filters, setFilters] = useState<BackofficeUsersFilters>(DEFAULT_FILTERS);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [users, setUsers] = useState<BackofficeUser[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: 1 }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(value), 300);
  }, []);

  const setIsDeleted = useCallback((value: boolean | undefined) => {
    setFilters((prev) => ({ ...prev, is_deleted: value, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const setPerPage = useCallback((per_page: number) => {
    setFilters((prev) => ({ ...prev, per_page, page: 1 }));
  }, []);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    listBackofficeUsers({ ...filters, search: debouncedSearch })
      .then((res) => {
        if (cancelled) return;
        setUsers(res.data);
        setMeta(res.meta);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load users');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, filters.is_deleted, filters.page, filters.per_page]);

  return { users, meta, filters, setSearch, setIsDeleted, setPage, setPerPage, isLoading, error };
}
