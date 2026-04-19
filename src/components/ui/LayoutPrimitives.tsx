import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-primary text-white hover:brightness-110 shadow-glow border-none',
      secondary: 'bg-bg-tertiary border border-border-primary text-text-primary hover:bg-bg-hover',
      outline: 'bg-transparent border border-border-secondary text-text-primary hover:bg-bg-tertiary',
      ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-hover',
      danger: 'bg-accent-error/10 text-accent-error border border-accent-error/20 hover:bg-accent-error/20',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

export const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={cn(
      'rounded-xl border border-border-primary bg-bg-secondary p-6 shadow-md transition-all hover:border-border-secondary',
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
);

export const Badge = ({ variant = 'default', children, className }: { variant?: 'success' | 'warning' | 'error' | 'info' | 'default', children?: React.ReactNode, className?: string }) => {
  const styles = {
    success: 'bg-accent-success/10 text-accent-success border-accent-success/20',
    warning: 'bg-accent-warning/10 text-accent-warning border-accent-warning/20',
    error: 'bg-accent-error/10 text-accent-error border-accent-error/20',
    info: 'bg-accent-info/10 text-accent-info border-accent-info/20',
    default: 'bg-bg-tertiary text-text-secondary border-border-secondary',
  };

  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', styles[variant], className)}>
      {children}
    </span>
  );
};

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary/20 focus:border-accent-primary disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
          className
        )}
        {...props}
      />
    );
  }
);