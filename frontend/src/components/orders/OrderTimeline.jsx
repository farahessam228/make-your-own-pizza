import { motion } from 'framer-motion'
import { STATUS_FLOW, STATUS_LABEL } from '../../data/fixtures'
import Icon from '../ui/Icon'
import { cn } from '../../lib/cn'

export default function OrderTimeline({ status }) {
  const currentIndex = STATUS_FLOW.indexOf(status)

  return (
    <ol className="flex flex-col gap-0">
      {STATUS_FLOW.map((step, i) => {
        const done = i < currentIndex
        const active = i === currentIndex
        const isLast = i === STATUS_FLOW.length - 1
        return (
          <li key={step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <motion.span
                initial={false}
                animate={{ scale: active ? 1.15 : 1 }}
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2',
                  done && 'border-accent-green bg-accent-green text-white',
                  active && 'border-primary bg-primary text-white',
                  !done && !active && 'border-border bg-surface text-text-muted'
                )}
              >
                {done ? <Icon name="check" className="h-4 w-4" /> : (i === 4 ? <Icon name="scooter" className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-current" />)}
              </motion.span>
              {!isLast && (
                <span
                  className={cn('w-0.5 flex-1 min-h-8', done ? 'bg-accent-green' : 'bg-border')}
                />
              )}
            </div>
            <div className={cn('pb-8', isLast && 'pb-0')}>
              <p
                className={cn(
                  'text-sm font-semibold',
                  active ? 'text-primary-dark' : done ? 'text-text' : 'text-text-muted'
                )}
              >
                {STATUS_LABEL[step]}
              </p>
              {active && <p className="text-xs text-text-muted">In progress</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
