import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Activity, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getMonitorById, getMonitorStats } from '@/features/monitors/services/monitors.server';
import { MonitorStatus } from '@/features/monitors/types';
import { ResponseTimeChart } from '@/features/monitors/components/response-time-chart';
import { ChecksHistoryTable } from '@/features/monitors/components/checks-history-table';
import { StatusTimeline } from '@/features/monitors/components/status-timeline';
import { MonitorDetailActions } from '@/features/monitors/components/monitor-detail-actions';

const STATUS_BADGE_VARIANT: Record<MonitorStatus, 'up' | 'down' | 'paused' | 'default'> = {
  [MonitorStatus.UP]: 'up',
  [MonitorStatus.DOWN]: 'down',
  [MonitorStatus.PAUSED]: 'paused',
  [MonitorStatus.UNKNOWN]: 'default',
};

const STATUS_LABEL: Record<MonitorStatus, string> = {
  [MonitorStatus.UP]: 'Up',
  [MonitorStatus.DOWN]: 'Down',
  [MonitorStatus.PAUSED]: 'Paused',
  [MonitorStatus.UNKNOWN]: 'Unknown',
};

interface MonitorDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatLastFail(lastFail: string | null) {
  if (!lastFail) return 'Never';
  return new Date(lastFail).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function MonitorDetailPage({ params }: MonitorDetailPageProps) {
  const { id } = await params;

  const [monitor, stats] = await Promise.all([
    getMonitorById(id),
    getMonitorStats(id),
  ]);

  if (!monitor) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/monitors">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-text-primary">{monitor.name}</h1>
        </div>
        <MonitorDetailActions monitorId={monitor.id} monitorName={monitor.name} />
      </div>

      {/* Top 3 summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 flex-wrap">
            <Badge variant={STATUS_BADGE_VARIANT[monitor.status]} dot>
              {STATUS_LABEL[monitor.status]}
            </Badge>
            <Badge variant="default">{monitor.method}</Badge>
            {!monitor.is_active && <Badge variant="paused">Inactive</Badge>}
          </CardContent>
        </Card>

        {/* Uptime card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Uptime (7 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats ? (
              <p className="text-2xl font-bold text-text-primary">
                {stats.uptime_percentage.toFixed(1)}
                <span className="text-base font-medium text-text-secondary ml-1">%</span>
              </p>
            ) : (
              <p className="text-sm text-text-secondary">No data yet</p>
            )}
          </CardContent>
        </Card>

        {/* Last fail card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Last fail
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats ? (
              <p className={`text-sm font-medium ${stats.last_fail ? 'text-status-down' : 'text-status-up'}`}>
                {formatLastFail(stats.last_fail)}
              </p>
            ) : (
              <p className="text-sm text-text-secondary">No data yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chart + History table */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponseTimeChart data={stats?.response_time_chart ?? []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Checks History</CardTitle>
          </CardHeader>
          <CardContent className="p-0 px-6 pb-6">
            <ChecksHistoryTable checks={stats?.checks_history ?? []} />
          </CardContent>
        </Card>
      </div>

      {/* Status timeline */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Status Timeline</CardTitle>
          <p className="text-xs text-text-secondary">Oldest → newest (last 50 checks)</p>
        </CardHeader>
        <CardContent>
          <StatusTimeline timeline={stats?.status_timeline ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
