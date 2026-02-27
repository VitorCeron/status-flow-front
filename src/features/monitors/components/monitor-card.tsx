'use client';

import Link from 'next/link';
import { Globe, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/i18n';
import { MonitorStatus, type Monitor } from '../types';

interface MonitorCardProps {
  monitor: Monitor;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const STATUS_BADGE_VARIANT: Record<MonitorStatus, 'up' | 'down' | 'paused' | 'default'> = {
  [MonitorStatus.UP]: 'up',
  [MonitorStatus.DOWN]: 'down',
  [MonitorStatus.PAUSED]: 'paused',
  [MonitorStatus.UNKNOWN]: 'default',
};

export function MonitorCard({ monitor, onDelete, isDeleting }: MonitorCardProps) {
  const t = useTranslations('monitors');

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-subtle">
              <Globe className="h-4 w-4 text-brand" />
            </div>
            <div className="min-w-0">
              <Link
                href={`/monitors/${monitor.id}`}
                className="font-medium text-text-primary hover:text-brand truncate block"
              >
                {monitor.name}
              </Link>
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

        <div className="mt-4 flex items-center justify-between border-t border-border-default pt-3">
          <p className="text-xs text-text-tertiary">
            {monitor.interval / 60}min interval
          </p>
          <div className="flex items-center gap-1">
            <Link href={`/monitors/${monitor.id}/edit`}>
              <Button variant="ghost" size="sm" aria-label={t('edit')}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              aria-label={t('delete')}
              loading={isDeleting}
              onClick={() => onDelete(monitor.id)}
            >
              <Trash2 className="h-3.5 w-3.5 text-status-down" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
