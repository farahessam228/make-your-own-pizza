import { cn } from '../../lib/cn'

const tones = {
  neutral: 'bg-black/[0.05] text-text-muted',
  primary: 'bg-primary/10 text-primary-dark',
  gold: 'bg-accent-gold/25 text-[#7A5A18]',
  green: 'bg-accent-green/15 text-[#3C6B4E]',
  error: 'bg-error/10 text-error',
}

export default function Badge({ tone = 'neutral', className, children, icon }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        tones[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  )
}
