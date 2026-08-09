import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Icon from '../../components/ui/Icon'
import OrderStatusBadge from '../../components/orders/OrderStatusBadge'
import { getOrderById } from '../../services/orderApi'
import { useToast } from '../../lib/toastContext'

export default function DeliveryDetails() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { order } = getOrderById(orderId)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [delivered, setDelivered] = useState(false)

  if (!order) return null

  const status = delivered ? 'DELIVERED' : order.status

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-1 text-sm font-semibold text-text-muted"
      >
        <Icon name="chevronRight" className="h-4 w-4 rotate-180" />
        Back
      </button>

      <h1 className="font-display text-2xl font-bold text-text">Order #{order.id}</h1>

      <Card className="mt-5 divide-y divide-border p-5">
        <div className="pb-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">Customer</p>
          <p className="mt-1.5 text-lg font-bold text-text">{order.customer}</p>
          <p className="mt-2 flex items-start gap-1.5 text-[15px] text-text-muted">
            <Icon name="location" className="mt-0.5 h-5 w-5 shrink-0" />
            {order.address}
          </p>
        </div>

        <div className="py-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">Order</p>
          {order.items.map((item, i) => (
            <p key={i} className="mt-1.5 text-[15px] text-text">
              {item.pizza} × {item.qty}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-between py-4">
          <span className="text-[15px] font-medium text-text-muted">Total</span>
          <span className="font-mono text-xl font-bold text-text">EGP {order.total}</span>
        </div>

        <div className="flex items-center justify-between pt-4">
          <span className="text-[15px] font-medium text-text-muted">Status</span>
          <OrderStatusBadge status={status} />
        </div>
      </Card>

      {!delivered && (
        <Button
          size="lg"
          className="mt-6 w-full"
          onClick={() => setConfirmOpen(true)}
        >
          Mark as Delivered
        </Button>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setDelivered(true)
          toast('Order marked as delivered')
        }}
        title="Confirm delivery?"
        description={`Confirm that Order #${order.id} has been handed to the customer.`}
        confirmLabel="Confirm Delivered"
      />
    </div>
  )
}
