'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteMonitor } from '../services/monitors.client';

interface UseDeleteMonitorReturn {
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Handles monitor deletion:
 * calls the delete service and refreshes the current route on success.
 */
export function useDeleteMonitor(): UseDeleteMonitorReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onDelete(id: string) {
    setIsLoading(true);
    setError(null);

    try {
      await deleteMonitor(id);
      toast.success('Monitor deleted.');
      router.refresh();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete monitor');
      toast.error(deleteError instanceof Error ? deleteError.message : 'Failed to delete monitor');
    } finally {
      setIsLoading(false);
    }
  }

  return { onDelete, isLoading, error };
}
