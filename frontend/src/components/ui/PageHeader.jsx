import { cn } from '../../lib/cn'

export default function PageHeader({ eyebrow, title, description, actions, className }) {
  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-4', className)}>
      <div>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-dark">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 font-display text-3xl font-semibold text-text sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-xl text-[15px] text-text-muted">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}
