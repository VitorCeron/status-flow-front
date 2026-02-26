import { cn } from '@/utils/cn';

type BadgeVariant = 'up' | 'down' | 'paused' | 'default' | 'brand';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  up:      'bg-status-up-bg text-status-up-text',
  down:    'bg-status-down-bg text-status-down-text',
  paused:  'bg-status-paused-bg text-status-paused-text',
  default: 'bg-bg-sunken text-text-secondary',
  brand:   'bg-brand-subtle text-brand-text',
};

const dotClasses: Record<BadgeVariant, string> = {
  up:      'bg-status-up',
  down:    'bg-status-down',
  paused:  'bg-status-paused',
  default: 'bg-text-tertiary',
  brand:   'bg-brand',
};

export function Badge({ variant = 'default', children, className, dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {dot && (
        <span className={cn('h-1.5 w-1.5 rounded-full', dotClasses[variant])} />
      )}
      {children}
    </span>
  );
}
