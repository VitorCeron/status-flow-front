'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/i18n';
import { listMonitors } from '../services/monitors.client';
import { useDeleteMonitor } from '../hooks/use-delete-monitor';
import { MonitorCard } from './monitor-card';
import { DeleteMonitorDialog } from './delete-monitor-dialog';
import type { Monitor, PaginationMeta } from '../types';

interface MonitorListProps {
  monitors: Monitor[];
  meta: PaginationMeta;
}

export function MonitorList({ monitors: initialMonitors, meta: initialMeta }: MonitorListProps) {
  const t = useTranslations('monitors');
  const { onDelete, isLoading: isDeleting } = useDeleteMonitor();
  const [monitors, setMonitors] = useState<Monitor[]>(initialMonitors);
  const [meta, setMeta] = useState<PaginationMeta>(initialMeta);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);

  const pendingMonitor = monitors.find((monitor) => monitor.id === pendingDeleteId);
  const hasMore = meta.current_page < meta.last_page;

  async function handleLoadMore() {
    setIsLoadingMore(true);
    setLoadMoreError(null);

    try {
      const response = await listMonitors({ page: meta.current_page + 1, perPage: meta.per_page });
      setMonitors((current) => [...current, ...response.data]);
      setMeta(response.meta);
    } catch (error) {
      setLoadMoreError(error instanceof Error ? error.message : 'Failed to load more monitors');
    } finally {
      setIsLoadingMore(false);
    }
  }

  async function handleConfirmDelete() {
    if (!pendingDeleteId) return;
    await onDelete(pendingDeleteId);
    setMonitors((current) => current.filter((monitor) => monitor.id !== pendingDeleteId));
    setPendingDeleteId(null);
  }

  if (monitors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border-default bg-bg-surface py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-subtle">
          <Activity className="h-7 w-7 text-brand" />
        </div>
        <div>
          <h2 className="font-semibold text-text-primary">{t('emptyTitle')}</h2>
          <p className="mt-1 text-sm text-text-secondary">{t('emptyDescription')}</p>
        </div>
        <Link href="/monitors/new">
          <Button>
            <Activity className="h-4 w-4" />
            {t('new')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {monitors.map((monitor) => (
          <MonitorCard
            key={monitor.id}
            monitor={monitor}
            onDelete={setPendingDeleteId}
            isDeleting={isDeleting && pendingDeleteId === monitor.id}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex flex-col items-center gap-2">
          {loadMoreError && (
            <p role="alert" className="text-sm text-status-down">
              {loadMoreError}
            </p>
          )}
          <Button variant="secondary" loading={isLoadingMore} onClick={handleLoadMore}>
            {t('loadMore')}
          </Button>
          <p className="text-xs text-text-tertiary">
            {monitors.length} {t('of')} {meta.total}
          </p>
        </div>
      )}

      {pendingMonitor && (
        <DeleteMonitorDialog
          monitorName={pendingMonitor.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDeleteId(null)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
