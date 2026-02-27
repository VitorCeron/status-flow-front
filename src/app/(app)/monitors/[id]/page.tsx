import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Pencil, Globe, Clock, Mail, AlertTriangle, Timer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getMonitorById } from '@/features/monitors/services/monitors.server';
import { MonitorStatus } from '@/features/monitors/types';

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

export default async function MonitorDetailPage({ params }: MonitorDetailPageProps) {
  const { id } = await params;
  const monitor = await getMonitorById(id);

  if (!monitor) {
    notFound();
  }

  const details = [
    { icon: Globe, label: 'URL', value: monitor.url },
    { icon: Clock, label: 'Interval', value: `${monitor.interval / 60} min` },
    { icon: Timer, label: 'Timeout', value: `${monitor.timeout}s` },
    { icon: AlertTriangle, label: 'Fail threshold', value: `${monitor.fail_threshold} failures` },
    { icon: Mail, label: 'Notify email', value: monitor.notify_email },
  ];

  return (
    <div className="flex flex-col gap-6">
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
        <Link href={`/monitors/${monitor.id}/edit`}>
          <Button size="sm" variant="secondary">
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl flex flex-col gap-4">
        {/* Status card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Badge variant={STATUS_BADGE_VARIANT[monitor.status]} dot>
              {STATUS_LABEL[monitor.status]}
            </Badge>
            <Badge variant="default">{monitor.method}</Badge>
            {!monitor.is_active && <Badge variant="paused">Inactive</Badge>}
          </CardContent>
        </Card>

        {/* Details card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="flex flex-col gap-4">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-sunken">
                    <Icon className="h-4 w-4 text-text-secondary" />
                  </div>
                  <div>
                    <dt className="text-xs text-text-secondary">{label}</dt>
                    <dd className="text-sm font-medium text-text-primary break-all">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        {/* Last checked */}
        {monitor.last_checked_at && (
          <p className="text-xs text-text-tertiary">
            Last checked: {new Date(monitor.last_checked_at).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
