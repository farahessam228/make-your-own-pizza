export default function EmptyState({ title, description, action, icon }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border bg-surface/60 px-6 py-16 text-center">
      {icon && <div className="text-5xl">{icon}</div>}
      <h3 className="font-display text-xl font-semibold text-text">{title}</h3>
      {description && (
        <p className="max-w-xs text-sm text-text-muted">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
