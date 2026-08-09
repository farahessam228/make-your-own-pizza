import { cn } from '../../lib/cn'

export default function Tabs({ tabs, value, onChange, className }) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex gap-1 rounded-full border border-border bg-surface p-1',
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          type="button"
          aria-selected={value === tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
            value === tab.value
              ? 'bg-primary text-white'
              : 'text-text-muted hover:text-text'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
