'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateMonitor } from '../services/monitors.client';
import type { MonitorFormValues } from '../schemas';

interface UseEditMonitorReturn {
  onSubmit: (data: MonitorFormValues) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
}

/**
 * Handles the edit monitor form submission flow:
 * calls the update service and redirects to the monitors list on success.
 *
 * @param id - Monitor UUID to update
 */
export function useEditMonitor(id: string): UseEditMonitorReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(data: MonitorFormValues) {
    setIsLoading(true);
    setServerError(null);

    try {
      await updateMonitor(id, data);
      router.push('/monitors');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading, serverError };
}
