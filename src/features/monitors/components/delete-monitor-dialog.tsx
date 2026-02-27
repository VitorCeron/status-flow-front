'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from '@/i18n';

interface DeleteMonitorDialogProps {
  monitorName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function DeleteMonitorDialog({
  monitorName,
  onConfirm,
  onCancel,
  isLoading,
}: DeleteMonitorDialogProps) {
  const t = useTranslations('monitors');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-sm rounded-xl border border-border-default bg-bg-surface p-6 shadow-lg">
        <h2 id="delete-dialog-title" className="text-base font-semibold text-text-primary">
          {t('deleteConfirm')}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {t('deleteMessage')}{' '}
          <span className="font-medium text-text-primary">{monitorName}</span>
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" size="sm" onClick={onCancel} disabled={isLoading}>
            {t('cancel')}
          </Button>
          <Button variant="danger" size="sm" loading={isLoading} onClick={onConfirm}>
            {t('delete')}
          </Button>
        </div>
      </div>
    </div>
  );
}
