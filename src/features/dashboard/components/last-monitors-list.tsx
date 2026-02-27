import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/i18n';
import { MonitorStatus } from '@/features/monitors/types';
import type { DashboardMonitor } from '../types';

interface LastMonitorsListProps {
  monitors: DashboardMonitor[];
}

const STATUS_BADGE_VARIANT: Record<MonitorStatus, 'up' | 'down' | 'paused' | 'default'> = {
  [MonitorStatus.UP]: 'up',
  [MonitorStatus.DOWN]: 'down',
  [MonitorStatus.PAUSED]: 'paused',
  [MonitorStatus.UNKNOWN]: 'default',
};

export function LastMonitorsList({ monitors }: LastMonitorsListProps) {
  const t = useTranslations('dashboard');
  const tMonitors = useTranslations('monitors');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('lastMonitors')}</CardTitle>
        <CardDescription>{t('lastMonitorsDesc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y divide-border-default">
          {monitors.map((monitor) => (
            <div
              key={monitor.id}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-subtle">
                  <Globe className="h-4 w-4 text-brand" />
                </div>
                <div className="min-w-0">
                  <Link
                    href={`/monitors/${monitor.id}`}
                    className="block truncate text-sm font-medium text-text-primary hover:text-brand"
                  >
                    {monitor.name}
                  </Link>
                  <p className="truncate text-xs text-text-secondary">{monitor.url}</p>
                </div>
              </div>
              <Badge variant={STATUS_BADGE_VARIANT[monitor.status]} dot>
                {tMonitors(`status.${monitor.status}`)}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
