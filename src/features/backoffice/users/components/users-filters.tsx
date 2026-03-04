'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface UsersFiltersProps {
  search: string;
  isDeleted: boolean | undefined;
  onSearchChange: (value: string) => void;
  onIsDeletedChange: (value: boolean | undefined) => void;
}

function parseIsDeleted(value: string): boolean | undefined {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

export function UsersFilters({
  search,
  isDeleted,
  onSearchChange,
  onIsDeletedChange,
}: UsersFiltersProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary pointer-events-none" />
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>

      <select
        value={isDeleted === undefined ? '' : String(isDeleted)}
        onChange={(e) => onIsDeletedChange(parseIsDeleted(e.target.value))}
        className="h-9 rounded-lg border border-border-default bg-bg-surface px-3 text-sm text-text-primary focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-brand-subtle"
        aria-label="Filter by status"
      >
        <option value="">All</option>
        <option value="false">Active</option>
        <option value="true">Deleted</option>
      </select>
    </div>
  );
}
