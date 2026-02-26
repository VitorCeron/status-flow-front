'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/i18n';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../schemas';
import { useForgotPassword } from '../hooks/use-forgot-password';

export function ForgotPasswordForm() {
  const t = useTranslations('auth');
  const { onSubmit, isLoading, serverError, isSuccess } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  if (isSuccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('forgotPassword.successTitle')}</CardTitle>
          <CardDescription>{t('forgotPassword.successMessage')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/login"
            className="text-sm text-text-link hover:underline underline-offset-4 font-medium"
          >
            ← {t('forgotPassword.back')}
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{t('forgotPassword.title')}</CardTitle>
        <CardDescription>{t('forgotPassword.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <Input
            type="email"
            label={t('forgotPassword.email')}
            placeholder={t('forgotPassword.emailPlaceholder')}
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          {serverError && (
            <p role="alert" className="text-sm text-status-down">
              {serverError}
            </p>
          )}
          <Button type="submit" loading={isLoading} className="w-full mt-2">
            {t('forgotPassword.submit')}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-text-secondary">
          <Link
            href="/login"
            className="text-text-link hover:underline underline-offset-4 font-medium"
          >
            ← {t('forgotPassword.back')}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
