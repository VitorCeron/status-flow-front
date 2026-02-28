'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from '@/i18n';
import { MonitorStatus, type Monitor } from '../types';

interface MonitorCardProps {
  monitor: Monitor;
}

const STATUS_BADGE_VARIANT: Record<MonitorStatus, 'up' | 'down' | 'paused' | 'default'> = {
  [MonitorStatus.UP]: 'up',
  [MonitorStatus.DOWN]: 'down',
  [MonitorStatus.PAUSED]: 'paused',
  [MonitorStatus.UNKNOWN]: 'default',
};

export function MonitorCard({ monitor }: MonitorCardProps) {
  const t = useTranslations('monitors');

  return (
    <Link href={`/monitors/${monitor.id}`} className="group block focus:outline-none">
      <Card className="transition-shadow group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-border-focus">
        <CardContent className="pt-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-subtle">
                <Globe className="h-4 w-4 text-brand" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-text-primary group-hover:text-brand truncate transition-colors">
                  {monitor.name}
                </p>
                <p className="mt-0.5 text-xs text-text-secondary truncate">{monitor.url}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Badge variant={STATUS_BADGE_VARIANT[monitor.status]} dot>
                {t(`status.${monitor.status}`)}
              </Badge>
              <Badge variant="default">{monitor.method}</Badge>
            </div>
          </div>

          <div className="mt-4 border-t border-border-default pt-3">
            <p className="text-xs text-text-tertiary">
              {monitor.interval / 60}min interval
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
