import { Link } from 'react-router-dom'
import Card from '../ui/Card'
import Button from '../ui/Button'
import OrderStatusBadge from './OrderStatusBadge'

export default function OrderCard({ order, to }) {
  const itemCount = order.items.reduce((sum, i) => sum + i.qty, 0)
  const date = new Date(order.date)

  return (
    <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-mono text-sm font-semibold text-text-muted">#{order.id}</p>
        <p className="mt-0.5 font-display text-lg font-semibold text-text">
          {itemCount} Pizza{itemCount > 1 ? 's' : ''}
        </p>
        <p className="text-sm text-text-muted">
          {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ·{' '}
          {date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
        </p>
      </div>
      <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
        <span className="font-mono text-base font-bold text-text">EGP {order.total}</span>
        <OrderStatusBadge status={order.status} />
      </div>
      <Button as={Link} to={to} variant="secondary" size="sm">
        View Order
      </Button>
    </Card>
  )
}
