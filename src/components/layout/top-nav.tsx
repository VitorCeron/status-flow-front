'use client';

import Link from 'next/link';
import { Activity, Menu } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebar-store';
import { ThemeToggle } from './theme-toggle';

export function TopNav() {
  const toggle = useSidebarStore((s) => s.toggle);

  return (
    <header className="flex lg:hidden h-[var(--height-topnav)] items-center justify-between border-b border-border-default bg-bg-surface px-4">
      <button
        onClick={toggle}
        aria-label="Open menu"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-sunken transition-colors outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-text-primary">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-brand">
          <Activity className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-sm">StatusFlow</span>
      </Link>

      <ThemeToggle />
    </header>
  );
}
