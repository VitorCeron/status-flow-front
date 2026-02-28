'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { changePasswordSchema, type ChangePasswordFormValues } from '@/features/settings/schemas';
import { useChangePassword } from '@/features/settings/hooks/use-change-password';

export default function SettingsPage() {
  const { onSubmit, isLoading, serverError, isSuccess } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  async function handleChangePassword(data: ChangePasswordFormValues) {
    await onSubmit(data);
    reset();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <h1 className="text-2xl font-bold text-text-primary">Settings</h1>

      {/* Change password */}
      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>Update your account password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleChangePassword)} noValidate className="flex flex-col gap-4">
            <Input
              type="password"
              label="Current password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.currentPassword?.message}
              {...register('currentPassword')}
            />
            <Input
              type="password"
              label="New password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.newPassword?.message}
              {...register('newPassword')}
            />
            <Input
              type="password"
              label="Confirm new password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            {serverError && (
              <p className="text-sm text-status-down-text">{serverError}</p>
            )}
            {isSuccess && (
              <p className="text-sm text-status-up-text">Password changed successfully.</p>
            )}
            <div className="flex justify-end pt-2">
              <Button type="submit" loading={isLoading}>
                Save password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-status-down/30">
        <CardHeader>
          <CardTitle className="text-status-down-text">Danger zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all your monitors. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="danger">
            Delete my account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
