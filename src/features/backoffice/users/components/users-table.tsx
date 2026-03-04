import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import type { BackofficeUser } from '../types';
import { UserRole } from '../types';

interface UsersTableProps {
  users: BackofficeUser[];
  isLoading: boolean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function UsersTable({ users, isLoading }: UsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-default">
            <th className="pb-2 text-left text-xs font-medium text-text-secondary">User</th>
            <th className="pb-2 text-left text-xs font-medium text-text-secondary">Timezone</th>
            <th className="pb-2 text-left text-xs font-medium text-text-secondary">Role</th>
            <th className="pb-2 text-left text-xs font-medium text-text-secondary">Status</th>
            <th className="pb-2 text-left text-xs font-medium text-text-secondary">Registered</th>
            <th className="pb-2 text-right text-xs font-medium text-text-secondary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6}>
                <div className="flex h-32 items-center justify-center">
                  <Spinner size="md" />
                </div>
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <div className="flex h-32 items-center justify-center text-sm text-text-secondary">
                  No users found
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => {
              const isActive = user.deleted_at === null;
              return (
                <tr key={user.id} className="border-b border-border-default last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-text-primary">{user.name}</p>
                        <p className="truncate text-xs text-text-secondary">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{user.timezone}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={user.role === UserRole.ADMIN ? 'brand' : 'default'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant={isActive ? 'up' : 'down'} dot>
                      {isActive ? 'Active' : 'Deleted'}
                    </Badge>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary whitespace-nowrap">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="py-3 text-right">
                    <Link href={`/backoffice/users/${user.id}`}>
                      <Button variant="ghost" size="sm" aria-label={`View ${user.name}`}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
