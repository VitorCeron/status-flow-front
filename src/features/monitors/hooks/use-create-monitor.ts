'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createMonitor } from '../services/monitors.client';
import type { MonitorFormValues } from '../schemas';

interface UseCreateMonitorReturn {
  onSubmit: (data: MonitorFormValues) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
}

/**
 * Handles the create monitor form submission flow:
 * calls the monitor service and redirects to the monitors list on success.
 */
export function useCreateMonitor(): UseCreateMonitorReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(data: MonitorFormValues) {
    setIsLoading(true);
    setServerError(null);

    try {
      await createMonitor(data);
      toast.success('Monitor created successfully.');
      router.push('/monitors');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'An unexpected error occurred');
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading, serverError };
}
