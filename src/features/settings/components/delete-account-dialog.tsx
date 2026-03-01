'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from '@/i18n';

interface DeleteAccountDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function DeleteAccountDialog({ onConfirm, onCancel, isLoading }: DeleteAccountDialogProps) {
  const t = useTranslations('settings');
  const [confirmValue, setConfirmValue] = useState('');
  const isConfirmed = confirmValue === t('deleteAccountModalConfirmWord');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-account-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="w-full max-w-sm rounded-xl border border-border-default bg-bg-surface p-6 shadow-lg">
        <h2 id="delete-account-dialog-title" className="text-base font-semibold text-text-primary">
          {t('deleteAccountModalTitle')}
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          {t('deleteAccountModalDesc')}
        </p>
        <div className="mt-4">
          <Input
            placeholder={t('deleteAccountModalPlaceholder')}
            value={confirmValue}
            onChange={(e) => setConfirmValue(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" size="sm" onClick={onCancel} disabled={isLoading}>
            {t('cancel')}
          </Button>
          <Button
            variant="danger"
            size="sm"
            loading={isLoading}
            disabled={!isConfirmed}
            onClick={onConfirm}
          >
            {t('deleteAccountConfirm')}
          </Button>
        </div>
      </div>
    </div>
  );
}
