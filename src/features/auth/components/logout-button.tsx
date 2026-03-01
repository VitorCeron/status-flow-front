'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { logoutUser } from '../services/auth.client';
import { useAuthStore } from '../stores/auth-store';
import { cn } from '@/utils/cn';

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  async function handleLogout() {
    setIsLoading(true);
    try {
      await logoutUser();
      clearAuth();
      toast.success('Signed out successfully.');
      router.push('/login');
    } catch {
      toast.error('Failed to sign out.');
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      aria-label="Sign out"
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-lg',
        'text-text-secondary hover:text-text-primary hover:bg-bg-sunken',
        'transition-colors duration-150 outline-none',
        'focus-visible:ring-2 focus-visible:ring-border-focus',
        'disabled:opacity-50 disabled:cursor-not-allowed',
      )}
    >
      <LogOut className="w-4 h-4" />
    </button>
  );
}
