import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { BackofficeDashboardUser } from '../types';

interface LastUsersTableProps {
  users: BackofficeDashboardUser[];
}

function formatJoinedAt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function LastUsersTable({ users }: LastUsersTableProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Last Users</CardTitle>
        <CardDescription>Most recently registered accounts</CardDescription>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-text-secondary">
            No users yet
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="pb-2 text-left text-xs font-medium text-text-secondary">User</th>
                <th className="pb-2 text-left text-xs font-medium text-text-secondary">Timezone</th>
                <th className="pb-2 text-right text-xs font-medium text-text-secondary">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border-default last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-xs font-semibold text-brand">
                        {getInitials(user.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-text-primary">{user.name}</p>
                        <p className="truncate text-xs text-text-secondary">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{user.timezone}</td>
                  <td className="py-3 text-right text-text-secondary whitespace-nowrap">
                    {formatJoinedAt(user.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
