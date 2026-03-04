'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '@/features/auth/stores/auth-store';
import { getTimezones, updateProfile } from '../services/settings.client';
import type { UpdateProfileFormValues } from '../schemas';
import type { TimezoneOption } from '../types';

interface UseUpdateProfileReturn {
  onSubmit: (data: UpdateProfileFormValues) => Promise<void>;
  isLoading: boolean;
  serverError: string | null;
  timezones: TimezoneOption[];
  isLoadingTimezones: boolean;
}

export function useUpdateProfile(): UseUpdateProfileReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [timezones, setTimezones] = useState<TimezoneOption[]>([]);
  const [isLoadingTimezones, setIsLoadingTimezones] = useState(true);

  useEffect(() => {
    getTimezones()
      .then(setTimezones)
      .catch(() => {
        toast.error('Failed to load timezones.');
      })
      .finally(() => setIsLoadingTimezones(false));
  }, []);

  async function onSubmit(data: UpdateProfileFormValues) {
    setIsLoading(true);
    setServerError(null);

    try {
      const updatedUser = await updateProfile({
        name: data.name,
        timezone: data.timezone,
      });
      useAuthStore.getState().setUser(updatedUser);
      toast.success('Profile updated successfully.');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      setServerError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading, serverError, timezones, isLoadingTimezones };
}
