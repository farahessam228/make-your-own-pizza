import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import OrderTimeline from '../../components/orders/OrderTimeline'
import { getOrderById } from '../../services/orderApi'
import { useToast } from '../../lib/toastContext'

export default function Track() {
  const { orderId } = useParams()
  const toast = useToast()
  const { order } = getOrderById(orderId)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  if (!order) return null

  const canCancel = order.status === 'ASSIGNING' && !cancelled

  return (
    <div className="mx-auto max-w-lg">
      <PageHeader eyebrow="Order Tracking" title={`Order #${order.id}`} />

      <Card className="mt-6 p-6">
        {cancelled ? (
          <p className="text-sm font-semibold text-error">This order has been cancelled.</p>
        ) : (
          <OrderTimeline status={order.status} />
        )}
      </Card>

      {canCancel && (
        <div className="mt-4">
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            Cancel Order
          </Button>
          <p className="mt-2 text-xs text-text-muted">
            Free cancellation while your order is still being assigned.
          </p>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setCancelled(true)
          toast('Order cancelled')
        }}
        title="Cancel this order?"
        description={`Are you sure you want to cancel Order #${order.id}?`}
        confirmLabel="Cancel Order"
        cancelLabel="Keep Order"
        destructive
      />
    </div>
  )
}
