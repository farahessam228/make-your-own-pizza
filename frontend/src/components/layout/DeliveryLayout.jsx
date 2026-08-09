import { NavLink, Outlet } from 'react-router-dom'
import Icon from '../ui/Icon'

export default function DeliveryLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <span className="font-display text-lg font-bold text-text">Deliveries</span>
          <NavLink to="/login" className="text-text-muted">
            <Icon name="profile" />
          </NavLink>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-6">
        <Outlet />
      </main>
    </div>
  )
}
