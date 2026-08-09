import { cn } from '../../lib/cn'

export function Field({ label, error, children, hint, className }) {
  return (
    <label className={cn('flex flex-col gap-1.5 text-left', className)}>
      {label && (
        <span className="text-sm font-semibold text-text">{label}</span>
      )}
      {children}
      {hint && !error && (
        <span className="text-xs text-text-muted">{hint}</span>
      )}
      {error && (
        <span className="text-xs font-medium text-error">{error}</span>
      )}
    </label>
  )
}

export default function Input({ className, error, ...props }) {
  return (
    <input
      className={cn(
        'h-11 rounded-input border bg-surface px-3.5 text-[15px] text-text placeholder:text-text-muted/70 outline-none transition-colors',
        'focus:border-primary focus:ring-2 focus:ring-primary/15',
        error ? 'border-error' : 'border-border',
        className
      )}
      {...props}
    />
  )
}
