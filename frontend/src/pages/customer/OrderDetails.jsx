import { useParams } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import OrderStatusBadge from '../../components/orders/OrderStatusBadge'
import { getOrderById } from '../../services/orderApi'

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-2 text-sm">
      <span className="text-text-muted">{label}</span>
      <span className="font-medium text-text">{value}</span>
    </div>
  )
}

export default function OrderDetails() {
  const { orderId } = useParams()
  const { order } = getOrderById(orderId)

  if (!order) return null

  return (
    <div className="mx-auto max-w-lg">
      <PageHeader
        eyebrow="Order Details"
        title={`Order #${order.id}`}
        actions={<OrderStatusBadge status={order.status} />}
      />

      <Card className="mt-6 divide-y divide-border p-6">
        <div className="pb-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
            Your pizzas
          </h2>
          {order.items.map((item, i) => (
            <div key={i} className="mt-3">
              <p className="text-sm font-semibold text-text">
                {item.pizza} × {item.qty}
              </p>
              <p className="text-sm text-text-muted">{item.toppings.join(', ')}</p>
            </div>
          ))}
        </div>

        <div className="py-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
            Delivery to
          </h2>
          <p className="mt-2 text-sm font-semibold text-text">{order.customer}</p>
          <p className="text-sm text-text-muted">{order.address}</p>
        </div>

        <div className="py-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
            Payment
          </h2>
          <Row label="Method" value={order.payment} />
          <Row label="Order date" value={new Date(order.date).toLocaleString()} />
        </div>

        <div className="flex items-center justify-between pt-4">
          <span className="text-sm font-medium text-text-muted">Total</span>
          <span className="font-mono text-xl font-bold text-text">EGP {order.total}</span>
        </div>
      </Card>
    </div>
  )
}
