'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/i18n';
import { loginSchema, type LoginFormValues } from '../schemas';
import { useLogin } from '../hooks/use-login';

export function LoginForm() {
  const t = useTranslations('auth');
  const { onSubmit, isLoading, serverError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{t('login.title')}</CardTitle>
        <CardDescription>{t('login.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <Input
            type="email"
            label={t('login.email')}
            placeholder={t('login.emailPlaceholder')}
            error={errors.email?.message}
            {...register('email')}
          />
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-primary">{t('login.password')}</label>
              <Link
                href="/forgot-password"
                className="text-xs text-text-link hover:underline underline-offset-4"
              >
                {t('login.forgotPassword')}
              </Link>
            </div>
            <Input
              type="password"
              placeholder={t('login.passwordPlaceholder')}
              error={errors.password?.message}
              {...register('password')}
            />
          </div>
          {serverError && (
            <p role="alert" className="text-sm text-status-down">
              {serverError}
            </p>
          )}
          <Button type="submit" loading={isLoading} className="w-full mt-2">
            {t('login.submit')}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-text-secondary">
          {t('login.noAccount')}{' '}
          <Link
            href="/register"
            className="text-text-link hover:underline underline-offset-4 font-medium"
          >
            {t('login.register')}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
