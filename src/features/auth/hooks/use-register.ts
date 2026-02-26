'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../services/auth.client';
import { useAuthStore } from '../stores/auth-store';
import { DEFAULT_REDIRECT } from '../constants';
import type { RegisterFormValues } from '../schemas';

interface UseRegisterReturn {
  onSubmit: (data: RegisterFormValues) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
}

/**
 * Handles the register form submission flow:
 * calls the auth service, updates the store, and redirects to the user dashboard.
 */
export function useRegister(): UseRegisterReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    setServerError(null);

    try {
      const user = await registerUser(data);
      setUser(user);
      router.push(DEFAULT_REDIRECT);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading, serverError };
}
