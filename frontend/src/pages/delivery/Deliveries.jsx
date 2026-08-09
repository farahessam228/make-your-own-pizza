import { useState } from 'react'
import { Link } from 'react-router-dom'
import Tabs from '../../components/ui/Tabs'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Icon from '../../components/ui/Icon'
import { getAssignedDeliveries } from '../../services/deliveryApi'

const { deliveries } = getAssignedDeliveries()

export default function Deliveries() {
  const [tab, setTab] = useState('active')

  const filtered = deliveries.filter((d) =>
    tab === 'active' ? d.status !== 'DELIVERED' : d.status === 'DELIVERED'
  )

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-text">Your deliveries</h1>

      <Tabs
        className="mt-4"
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'active', label: 'Active' },
          { value: 'completed', label: 'Completed' },
        ]}
      />

      <div className="mt-5 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <EmptyState
            title={tab === 'active' ? 'No active deliveries' : 'No completed deliveries'}
          />
        ) : (
          filtered.map((order) => (
            <Link key={order.id} to={`/delivery/deliveries/${order.id}`}>
              <Card className="flex items-center justify-between gap-4 p-5 active:scale-[0.99]">
                <div>
                  <p className="font-mono text-sm font-semibold text-text-muted">#{order.id}</p>
                  <p className="mt-0.5 text-lg font-bold text-text">{order.customer}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-text-muted">
                    <Icon name="location" className="h-4 w-4 shrink-0" />
                    {order.address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-base font-bold text-text">EGP {order.total}</p>
                  <Icon name="chevronRight" className="ml-auto mt-2 h-5 w-5 text-text-muted" />
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
