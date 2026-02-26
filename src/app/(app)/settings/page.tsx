'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });

  function onSubmit(data: ChangePasswordForm) {
    // TODO: call settings service
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Page header */}
      <h1 className="text-2xl font-bold text-text-primary">Settings</h1>

      {/* Change password */}
      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>Update your account password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
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
            <div className="flex justify-end pt-2">
              <Button type="submit" loading={isSubmitting}>
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
