'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/i18n';
import { registerSchema, type RegisterFormValues } from '../schemas';
import { useRegister } from '../hooks/use-register';

export function RegisterForm() {
  const t = useTranslations('auth');
  const { onSubmit, isLoading, serverError } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{t('register.title')}</CardTitle>
        <CardDescription>{t('register.subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <Input
            label={t('register.name')}
            placeholder={t('register.namePlaceholder')}
            autoComplete="name"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            type="email"
            label={t('register.email')}
            placeholder={t('register.emailPlaceholder')}
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            type="password"
            label={t('register.password')}
            placeholder={t('register.passwordPlaceholder')}
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            type="password"
            label={t('register.passwordConfirmation')}
            placeholder={t('register.passwordConfirmationPlaceholder')}
            autoComplete="new-password"
            error={errors.password_confirmation?.message}
            {...register('password_confirmation')}
          />
          {serverError && (
            <p role="alert" className="text-sm text-status-down">
              {serverError}
            </p>
          )}
          <Button type="submit" loading={isLoading} className="w-full mt-2">
            {t('register.submit')}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-text-secondary">
          {t('register.haveAccount')}{' '}
          <Link
            href="/login"
            className="text-text-link hover:underline underline-offset-4 font-medium"
          >
            {t('register.login')}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
