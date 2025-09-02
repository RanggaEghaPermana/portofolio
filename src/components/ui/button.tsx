'use client';
import * as React from 'react';

type Variant = 'default' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

function classes(variant: Variant, size: Size) {
  const base =
    'inline-flex items-center justify-center rounded-xl font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 disabled:opacity-60 disabled:pointer-events-none';
  const variants: Record<Variant, string> = {
    default:
      'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100',
    outline:
      'border border-slate-300 text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900',
    ghost:
      'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900',
  };
  const sizes: Record<Size, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-5 text-base',
  };
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  children: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', asChild = false, className = '', children, ...props }, ref) => {
    const cls = `${classes(variant, size)} ${className}`.trim();

    if (asChild && React.isValidElement(children)) {
      // Nyatakan ke TS bahwa child mendukung className
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: [child.props.className ?? '', cls].join(' ').trim(),
      });
    }

    return (
      <button ref={ref} className={cls} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
