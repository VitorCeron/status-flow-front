'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../services/auth.client';
import { useAuthStore } from '../stores/auth-store';
import { ROLE_REDIRECT, DEFAULT_REDIRECT } from '../constants';
import type { LoginFormValues } from '../schemas';

interface UseLoginReturn {
  onSubmit: (data: LoginFormValues) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
}

/**
 * Handles the login form submission flow:
 * calls the auth service, updates the store, and redirects by role.
 */
export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setServerError(null);

    try {
      const user = await loginUser(data);
      setUser(user);
      router.push(ROLE_REDIRECT[user.role] ?? DEFAULT_REDIRECT);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading, serverError };
}
