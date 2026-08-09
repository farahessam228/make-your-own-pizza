import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Tabs from '../../components/ui/Tabs'
import EmptyState from '../../components/ui/EmptyState'
import Button from '../../components/ui/Button'
import OrderCard from '../../components/orders/OrderCard'
import { getCustomerOrders } from '../../services/orderApi'

const ACTIVE_STATUSES = ['ASSIGNING', 'PREPARING', 'PACKING', 'WAITING_FOR_DELIVERY', 'ON_THE_WAY']
const { orders } = getCustomerOrders()

export default function Orders() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('active')

  const filtered = orders.filter((o) =>
    tab === 'active' ? ACTIVE_STATUSES.includes(o.status) : o.status === 'DELIVERED'
  )

  return (
    <div>
      <PageHeader eyebrow="Orders" title="My orders" />

      <Tabs
        className="mt-6"
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'active', label: 'Active' },
          { value: 'past', label: 'Past Orders' },
        ]}
      />

      <div className="mt-6 flex flex-col gap-3">
        {filtered.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="Once you create your first pizza, you'll find your orders here."
            action={<Button onClick={() => navigate('/customer/builder')}>Build Your First Pizza</Button>}
          />
        ) : (
          filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              to={
                tab === 'active'
                  ? `/customer/track/${order.id}`
                  : `/customer/orders/${order.id}`
              }
            />
          ))
        )}
      </div>
    </div>
  )
}
