'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { useTranslations } from '@/i18n';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import { monitorSchema, type MonitorFormValues } from '../schemas';
import { HttpMethod, INTERVAL_OPTIONS } from '../types';

interface MonitorFormProps {
  defaultValues?: Partial<MonitorFormValues>;
  onSubmit: (data: MonitorFormValues) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
  submitLabel?: string;
}

const HTTP_METHODS = [HttpMethod.GET, HttpMethod.POST];

export function MonitorForm({
  defaultValues,
  onSubmit,
  isLoading,
  serverError,
  submitLabel,
}: MonitorFormProps) {
  const t = useTranslations('monitors');
  const userEmail = useAuthStore((state) => state.user?.email ?? '');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MonitorFormValues>({
    resolver: zodResolver(monitorSchema),
    defaultValues: {
      method: HttpMethod.GET,
      interval: 60,
      timeout: 10,
      fail_threshold: 3,
      is_active: true,
      notify_email: userEmail,
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input
        label={t('name')}
        placeholder={t('namePlaceholder')}
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label={t('url')}
        type="url"
        placeholder={t('urlPlaceholder')}
        error={errors.url?.message}
        {...register('url')}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Method select */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-primary">{t('method')}</label>
          <select
            className={cn(
              'h-9 w-full rounded-lg border bg-bg-surface px-3 text-sm text-text-primary',
              'outline-none transition-colors duration-150',
              errors.method
                ? 'border-status-down focus:border-status-down focus:ring-2 focus:ring-status-down-bg'
                : 'border-border-default focus:border-border-focus focus:ring-2 focus:ring-brand-subtle'
            )}
            {...register('method')}
          >
            {HTTP_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          {errors.method && <p className="text-xs text-status-down-text">{errors.method.message}</p>}
        </div>

        {/* Interval select */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-primary">{t('interval')}</label>
          <select
            className={cn(
              'h-9 w-full rounded-lg border bg-bg-surface px-3 text-sm text-text-primary',
              'outline-none transition-colors duration-150',
              errors.interval
                ? 'border-status-down focus:border-status-down focus:ring-2 focus:ring-status-down-bg'
                : 'border-border-default focus:border-border-focus focus:ring-2 focus:ring-brand-subtle'
            )}
            {...register('interval')}
          >
            {INTERVAL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.interval && <p className="text-xs text-status-down-text">{errors.interval.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label={t('timeout')}
          type="number"
          min={1}
          max={60}
          error={errors.timeout?.message}
          {...register('timeout')}
        />

        <Input
          label={t('failThreshold')}
          type="number"
          min={1}
          error={errors.fail_threshold?.message}
          {...register('fail_threshold')}
        />
      </div>

      <Input
        label={t('notifyEmail')}
        type="email"
        placeholder={t('notifyEmailPlaceholder')}
        error={errors.notify_email?.message}
        {...register('notify_email')}
      />

      {/* Active toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="is_active"
          className="h-4 w-4 rounded border-border-default accent-brand cursor-pointer"
          {...register('is_active')}
        />
        <label htmlFor="is_active" className="text-sm font-medium text-text-primary cursor-pointer">
          {t('isActive')}
        </label>
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-status-down">
          {serverError}
        </p>
      )}

      <Button type="submit" loading={isLoading} className="mt-2">
        {submitLabel ?? t('submit')}
      </Button>
    </form>
  );
}
