'use client';

import { useState } from 'react';
import { changePassword } from '../services/settings.client';
import type { ChangePasswordFormValues } from '../schemas';

interface UseChangePasswordReturn {
  onSubmit: (data: ChangePasswordFormValues) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
  isSuccess: boolean;
}

/**
 * Handles the change-password form submission flow:
 * maps form values to API payload, calls the service, and exposes loading/error/success state.
 */
export function useChangePassword(): UseChangePasswordReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  async function onSubmit(data: ChangePasswordFormValues) {
    setIsLoading(true);
    setServerError(null);
    setIsSuccess(false);

    try {
      await changePassword({
        old_password: data.currentPassword,
        password: data.newPassword,
        password_confirmation: data.confirmPassword,
      });
      setIsSuccess(true);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading, serverError, isSuccess };
}
