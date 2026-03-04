import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { getBackofficeUserById } from '@/features/backoffice/users/services/users.server';
import { UserRole } from '@/features/backoffice/users/types';

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function BackofficeUserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
  const user = await getBackofficeUserById(id);

  if (!user) notFound();

  const isActive = user.deleted_at === null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/backoffice/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar name={user.name} size="lg" />
            <div>
              <CardTitle>{user.name}</CardTitle>
              <p className="text-sm text-text-secondary">{user.email}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-text-secondary">Timezone</dt>
              <dd className="mt-1 text-sm text-text-primary">{user.timezone}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-text-secondary">Role</dt>
              <dd className="mt-1">
                <Badge variant={user.role === UserRole.ADMIN ? 'brand' : 'default'}>
                  {user.role}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-text-secondary">Status</dt>
              <dd className="mt-1">
                <Badge variant={isActive ? 'up' : 'down'} dot>
                  {isActive ? 'Active' : 'Deleted'}
                </Badge>
              </dd>
            </div>
          </dl>
        </CardContent>

        <CardFooter className="gap-6 text-xs text-text-secondary">
          <span>Registered: {formatDate(user.created_at)}</span>
          <span>Updated: {formatDate(user.updated_at)}</span>
          {!isActive && <span>Deleted: {formatDate(user.deleted_at)}</span>}
        </CardFooter>
      </Card>
    </div>
  );
}
