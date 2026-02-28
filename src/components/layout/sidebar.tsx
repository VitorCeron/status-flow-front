'use client';

import Link from 'next/link';
import { Activity, LayoutDashboard, Settings, Users, X } from 'lucide-react';
import { NavItem } from './nav-item';
import { ThemeToggle } from './theme-toggle';
import { Avatar } from '@/components/ui/avatar';
import { LogoutButton } from '@/features/auth/components/logout-button';
import { useSidebarStore } from '@/stores/sidebar-store';
import { cn } from '@/utils/cn';
import Image from 'next/image';

// Nav configs live inside this client component so icon functions
// never need to cross the server/client boundary as props.
const USER_NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/monitors', label: 'Monitors', icon: Activity },
];

const USER_BOTTOM_NAV_ITEMS = [
  { href: '/settings', label: 'Settings', icon: Settings },
];

const BACKOFFICE_NAV_ITEMS = [
  { href: '/backoffice/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/backoffice/users', label: 'Users', icon: Users },
  { href: '/backoffice/monitors', label: 'All Monitors', icon: Activity },
];

const BACKOFFICE_BOTTOM_NAV_ITEMS = [
  { href: '/backoffice/settings', label: 'Settings', icon: Settings },
];

export type SidebarVariant = 'user' | 'backoffice';

export interface SidebarProps {
  variant?: SidebarVariant;
  userName?: string;
  userEmail?: string;
  userAvatarSrc?: string;
}

function getNavConfig(variant: SidebarVariant) {
  if (variant === 'backoffice') {
    return {
      navItems: BACKOFFICE_NAV_ITEMS,
      bottomNavItems: BACKOFFICE_BOTTOM_NAV_ITEMS,
      homeHref: '/backoffice/dashboard',
    };
  }
  return {
    navItems: USER_NAV_ITEMS,
    bottomNavItems: USER_BOTTOM_NAV_ITEMS,
    homeHref: '/dashboard',
  };
}

function SidebarContent({
  variant = 'user',
  userName,
  userEmail,
  userAvatarSrc,
  onClose,
}: SidebarProps & { onClose?: () => void }) {
  const { navItems, bottomNavItems, homeHref } = getNavConfig(variant);

  return (
    <div className="flex h-full flex-col bg-bg-sidebar border-r border-border-sidebar">
      {/* Header */}
      <div className="flex h-[var(--height-topnav)] items-center justify-between px-4 border-b border-border-sidebar">
        <Link href={homeHref} className="flex items-center gap-2 font-semibold text-text-primary">
          <div className="flex h-7 w-7 items-center justify-center">
            <Activity className="h-4 w-4 text-white" />
            <Image
                src="/images/logo.png"
                className='rounded'
                alt="Logo"
                width={24}
                height={24}
                />
          </div>
          <span className="text-sm">StatusFlow</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-sunken transition-colors"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>

      {/* Bottom nav */}
      {bottomNavItems.length > 0 && (
        <div className="px-3 pb-4 space-y-1">
          {bottomNavItems.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </div>
      )}

      {/* User footer */}
      <div className="flex items-center gap-3 border-t border-border-sidebar px-4 py-3">
        <Avatar name={userName} src={userAvatarSrc} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="truncate text-xs font-medium text-text-primary">{userName}</p>
          <p className="truncate text-xs text-text-secondary">{userEmail}</p>
        </div>
        <ThemeToggle />
        <LogoutButton />
      </div>
    </div>
  );
}

export function Sidebar(props: SidebarProps) {
  const { isOpen, close } = useSidebarStore();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[var(--width-sidebar)] shrink-0 flex-col">
        <SidebarContent {...props} />
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" aria-hidden="true">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          {/* Drawer */}
          <aside
            className={cn(
              'absolute inset-y-0 left-0 z-50 w-[var(--width-sidebar)]',
              'flex flex-col shadow-lg'
            )}
          >
            <SidebarContent {...props} onClose={close} />
          </aside>
        </div>
      )}
    </>
  );
}
