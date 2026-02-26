'use client';

import { useEffect } from 'react';
import { useAuthStore } from '../stores/auth-store';
import type { AuthUser } from '../types';

interface AuthStoreHydratorProps {
  user: AuthUser | null;
}

export function AuthStoreHydrator({ user }: AuthStoreHydratorProps) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [setUser, user]);

  return null;
}
