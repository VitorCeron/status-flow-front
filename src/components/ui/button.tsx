import { cn } from '@/utils/cn';
import { Spinner } from './spinner';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
  secondary:
    'bg-bg-sunken text-text-primary border border-border-default hover:bg-bg-surface hover:border-border-strong focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
  ghost:
    'text-text-secondary hover:text-text-primary hover:bg-bg-sunken focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2',
  danger:
    'bg-status-down text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-status-down focus-visible:ring-offset-2',
  link: 'text-text-link hover:underline underline-offset-4 p-0 h-auto',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
  md: 'h-9 px-4 text-sm rounded-lg gap-2',
  lg: 'h-11 px-6 text-base rounded-lg gap-2',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  ref,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-medium outline-none',
        'transition-colors duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variant !== 'link' && sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {loading && <Spinner size={size === 'lg' ? 'md' : 'sm'} />}
      {children}
    </button>
  );
}
