'use client';

import { useState } from 'react';
import { requestPasswordReset } from '../services/auth.client';
import type { ForgotPasswordFormValues } from '../schemas';

interface UseForgotPasswordReturn {
  onSubmit: (data: ForgotPasswordFormValues) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
  isSuccess: boolean;
}

/**
 * Handles the forgot-password form submission flow:
 * calls the auth service and signals success so the form shows a confirmation message.
 */
export function useForgotPassword(): UseForgotPasswordReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);
    setServerError(null);

    try {
      await requestPasswordReset(data);
      setIsSuccess(true);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading, serverError, isSuccess };
}
