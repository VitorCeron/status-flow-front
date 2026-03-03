import { Users, Activity, CheckCircle2, XCircle } from 'lucide-react';
import { StatsCard } from '@/features/dashboard/components/stats-card';
import { getBackofficeDashboard } from '@/features/backoffice/dashboard/services/dashboard.server';
import { LastUsersTable } from '@/features/backoffice/dashboard/components/last-users-table';
import { TimezonesTable } from '@/features/backoffice/dashboard/components/timezones-table';

export default async function BackofficeDashboardPage() {
  const { data } = await getBackofficeDashboard();

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Backoffice</h1>
          <p className="mt-0.5 text-sm text-text-secondary">System overview and administration</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard label="Total Users" value={data.total_users} icon={Users} iconClass="text-brand" iconBg="bg-brand-subtle" />
        <StatsCard label="Total Monitors" value={data.total_monitors} icon={Activity} iconClass="text-text-secondary" iconBg="bg-bg-sunken" />
        <StatsCard label="Monitors Up" value={data.total_up} icon={CheckCircle2} iconClass="text-status-up" iconBg="bg-status-up-bg" />
        <StatsCard label="Monitors Down" value={data.total_down} icon={XCircle} iconClass="text-status-down" iconBg="bg-status-down-bg" />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-10 items-stretch gap-4">
        <div className="col-span-10 lg:col-span-7">
          <LastUsersTable users={data.last_users} />
        </div>
        <div className="col-span-10 h-full lg:col-span-3">
          <TimezonesTable timezones={data.timezones} />
        </div>
      </div>
    </div>
  );
}
