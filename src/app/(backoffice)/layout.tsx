import { Sidebar } from '@/components/layout/sidebar';
import { TopNav } from '@/components/layout/top-nav';
import { getAuthenticatedUser } from '@/features/auth/services/auth.server';
import { AuthStoreHydrator } from '@/features/auth/components/auth-store-hydrator';

export default async function BackofficeLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthenticatedUser();

  return (
    <div className="flex h-screen overflow-hidden bg-bg-app">
      <AuthStoreHydrator user={user} />
      <Sidebar variant="backoffice" userName={user?.name ?? ''} userEmail={user?.email ?? ''} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
