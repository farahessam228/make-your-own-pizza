import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Tabs from '../../components/ui/Tabs'
import Input from '../../components/ui/Input'
import Icon from '../../components/ui/Icon'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import OrderStatusBadge from '../../components/orders/OrderStatusBadge'
import { getAllOrders } from '../../services/orderApi'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

function bucketOf(status) {
  if (status === 'ASSIGNING') return 'pending'
  if (status === 'DELIVERED') return 'completed'
  return 'in-progress'
}

const { orders } = getAllOrders()

export default function ManagerOrders() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesFilter = filter === 'all' || bucketOf(o.status) === filter
      const matchesSearch =
        !search ||
        o.id.includes(search) ||
        o.customer.toLowerCase().includes(search.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [filter, search])

  return (
    <div>
      <PageHeader eyebrow="Manager" title="Orders" />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Tabs tabs={FILTERS} value={filter} onChange={setFilter} />
        <div className="relative w-full max-w-xs">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-card border border-border">
        {filtered.length === 0 ? (
          <EmptyState title="No matching orders" description="Try a different filter or search term." />
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs font-bold uppercase tracking-wide text-text-muted">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="hidden px-5 py-3 sm:table-cell">Customer</th>
                <th className="hidden px-5 py-3 md:table-cell">Items</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-surface/60">
                  <td className="px-5 py-4 font-mono font-semibold text-text">#{order.id}</td>
                  <td className="hidden px-5 py-4 text-text sm:table-cell">{order.customer}</td>
                  <td className="hidden px-5 py-4 text-text-muted md:table-cell">
                    {order.items.reduce((s, i) => s + i.qty, 0)} pizza(s)
                  </td>
                  <td className="px-5 py-4 font-mono text-text">EGP {order.total}</td>
                  <td className="px-5 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button as={Link} to={`/manager/orders/${order.id}`} variant="secondary" size="sm">
                      View Order
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
