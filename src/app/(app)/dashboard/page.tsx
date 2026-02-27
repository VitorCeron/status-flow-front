import Link from 'next/link';
import { Activity, CheckCircle2, XCircle, PauseCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getDashboard } from '@/features/dashboard/services/dashboard.server';
import { StatsCard } from '@/features/dashboard/components/stats-card';
import { LastMonitorsList } from '@/features/dashboard/components/last-monitors-list';

export default async function DashboardPage() {
  const { data } = await getDashboard();

  const totalPaused = data.total_monitors - data.total_up - data.total_down;
  const hasMonitors = data.total_monitors > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <Link href="/monitors/new">
          <Button size="sm">
            <Activity className="h-3.5 w-3.5" />
            New monitor
          </Button>
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard label="Total Monitors" value={data.total_monitors} icon={Activity} iconClass="text-brand" iconBg="bg-brand-subtle" />
        <StatsCard label="Up" value={data.total_up} icon={CheckCircle2} iconClass="text-status-up" iconBg="bg-status-up-bg" />
        <StatsCard label="Down" value={data.total_down} icon={XCircle} iconClass="text-status-down" iconBg="bg-status-down-bg" />
        <StatsCard label="Paused" value={totalPaused} icon={PauseCircle} iconClass="text-status-paused" iconBg="bg-status-paused-bg" />
      </div>

      {/* Empty state or last monitors list */}
      {!hasMonitors ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-subtle">
              <Activity className="h-7 w-7 text-brand" />
            </div>
            <div className="text-center">
              <h2 className="font-semibold text-text-primary">No monitors yet</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Create your first monitor to start tracking your APIs.
              </p>
            </div>
            <Link href="/monitors/new">
              <Button>
                <Activity className="h-4 w-4" />
                Create monitor
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <LastMonitorsList monitors={data.last_monitors} />
      )}
    </div>
  );
}
