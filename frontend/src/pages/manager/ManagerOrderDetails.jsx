import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Icon from '../../components/ui/Icon'
import { getOrderById } from '../../services/orderApi'
import { DELIVERY_PEOPLE, STATUS_FLOW, STATUS_LABEL } from '../../data/fixtures'
import { useToast } from '../../lib/toastContext'
import { cn } from '../../lib/cn'

export default function ManagerOrderDetails() {
  const { orderId } = useParams()
  const toast = useToast()
  const { order } = getOrderById(orderId)

  const [status, setStatus] = useState(order?.status)
  const [kitchen, setKitchen] = useState(order?.status !== 'ASSIGNING')
  const [driverId, setDriverId] = useState(
    DELIVERY_PEOPLE.find((d) => d.name === order?.deliveryPerson)?.id || ''
  )
  const [driverOpen, setDriverOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)

  if (!order) return null

  const driver = DELIVERY_PEOPLE.find((d) => d.id === driverId)

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Manager" title={`Order #${order.id}`} />

      <Card className="mt-6 divide-y divide-border p-6">
        <div className="pb-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">Customer</h2>
          <p className="mt-2 text-sm font-semibold text-text">{order.customer}</p>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
            Delivery address
          </p>
          <p className="mt-1 text-sm text-text-muted">{order.address}</p>
        </div>

        <div className="py-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">Items</h2>
          {order.items.map((item, i) => (
            <p key={i} className="mt-2 text-sm text-text">
              {item.pizza} × {item.qty} — {item.toppings.join(', ')}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-between py-4">
          <span className="text-sm font-medium text-text-muted">Payment</span>
          <span className="text-sm font-semibold text-text">{order.payment}</span>
        </div>

        <div className="flex items-center justify-between py-4">
          <span className="text-sm font-medium text-text-muted">Total</span>
          <span className="font-mono text-xl font-bold text-text">EGP {order.total}</span>
        </div>

        <div className="py-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">Order status</h2>
          <div className="relative mt-2">
            <button
              type="button"
              onClick={() => setStatusOpen((o) => !o)}
              className="flex w-full items-center justify-between rounded-input border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text"
            >
              {STATUS_LABEL[status]}
              <Icon name="chevronDown" className="h-4 w-4 text-text-muted" />
            </button>
            {statusOpen && (
              <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-input border border-border bg-surface shadow-lg">
                {STATUS_FLOW.slice(1).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setStatus(s)
                      setStatusOpen(false)
                      toast('Status updated')
                    }}
                    className={cn(
                      'block w-full px-4 py-2.5 text-left text-sm hover:bg-background',
                      status === s ? 'font-semibold text-primary-dark' : 'text-text'
                    )}
                  >
                    {STATUS_LABEL[s]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="py-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">Kitchen</h2>
          {kitchen ? (
            <p className="mt-2 text-sm font-semibold text-accent-green">Assigned to kitchen</p>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              className="mt-2"
              onClick={() => {
                setKitchen(true)
                toast('Order assigned to kitchen')
              }}
            >
              Assign to Kitchen
            </Button>
          )}
        </div>

        <div className="pt-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">
            Delivery person
          </h2>
          <div className="relative mt-2">
            <button
              type="button"
              onClick={() => setDriverOpen((o) => !o)}
              className="flex w-full items-center justify-between rounded-input border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text"
            >
              {driver ? driver.name : 'Unassigned'}
              <Icon name="chevronDown" className="h-4 w-4 text-text-muted" />
            </button>
            {driverOpen && (
              <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-input border border-border bg-surface shadow-lg">
                {DELIVERY_PEOPLE.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setDriverId(d.id)
                      setDriverOpen(false)
                      toast('Delivery person changed')
                    }}
                    className={cn(
                      'block w-full px-4 py-2.5 text-left text-sm hover:bg-background',
                      driverId === d.id ? 'font-semibold text-primary-dark' : 'text-text'
                    )}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
