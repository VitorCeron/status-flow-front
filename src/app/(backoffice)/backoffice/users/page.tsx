'use client';

import { useUsersList } from '@/features/backoffice/users/hooks/use-users-list';
import { UsersFilters } from '@/features/backoffice/users/components/users-filters';
import { UsersTable } from '@/features/backoffice/users/components/users-table';
import { Pagination } from '@/components/ui/pagination';

export default function BackofficeUsersPage() {
  const { users, meta, filters, setSearch, setIsDeleted, setPage, setPerPage, isLoading, error } =
    useUsersList();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-text-primary">Users</h1>

      <UsersFilters
        search={filters.search}
        isDeleted={filters.is_deleted}
        onSearchChange={setSearch}
        onIsDeletedChange={setIsDeleted}
      />

      {error && (
        <p role="alert" className="text-sm text-status-down-text">
          {error}
        </p>
      )}

      <UsersTable users={users} isLoading={isLoading} />

      {meta && (
        <Pagination
          currentPage={meta.current_page}
          lastPage={meta.last_page}
          perPage={meta.per_page}
          total={meta.total}
          from={meta.from}
          to={meta.to}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
}
