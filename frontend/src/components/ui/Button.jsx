import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-dark active:scale-[0.98] shadow-sm shadow-primary/20',
  secondary:
    'bg-surface text-text border border-border hover:border-text-muted/40 active:scale-[0.98]',
  ghost: 'bg-transparent text-text hover:bg-black/[0.03] active:scale-[0.98]',
  destructive: 'bg-error text-white hover:bg-error/90 active:scale-[0.98]',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  as: As = 'button',
  ...props
}) {
  return (
    <As
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-btn font-semibold transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}
