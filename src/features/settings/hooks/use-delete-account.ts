'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import { deleteAccount } from '../services/settings.client';

interface UseDeleteAccountReturn {
  onDelete: () => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
}

/**
 * Handles the delete-account action:
 * calls the service, clears auth state, and redirects to /login on success.
 */
export function useDeleteAccount(): UseDeleteAccountReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  async function onDelete() {
    setIsLoading(true);
    setServerError(null);

    try {
      await deleteAccount();
      clearAuth();
      toast.success('Your account has been deleted.');
      router.push('/login');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'An unexpected error occurred');
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return { onDelete, isLoading, serverError };
}
