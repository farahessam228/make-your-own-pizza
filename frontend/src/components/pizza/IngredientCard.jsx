import { cn } from '../../lib/cn'
import ToppingIcon from './ToppingIcon'

export default function IngredientCard({ ingredient, selected, onToggle }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(ingredient.id)}
      aria-pressed={selected}
      className={cn(
        'group flex flex-col items-center gap-2 rounded-chip border bg-surface p-3 text-center transition-all',
        selected
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-border hover:-translate-y-0.5 hover:border-text-muted/40 hover:shadow-md'
      )}
    >
      <span
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full p-2.5 transition-transform',
          selected ? 'bg-primary/10 scale-105' : 'bg-background group-hover:scale-105'
        )}
      >
        <ToppingIcon id={ingredient.id} color={ingredient.color} />
      </span>
      <span className="text-sm font-semibold leading-tight text-text">{ingredient.name}</span>
      <span className="font-mono text-xs text-text-muted">+EGP {ingredient.price}</span>
    </button>
  )
}
