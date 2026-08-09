import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '../../lib/cn'

export default function ManagerLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-text">Make Your Own Pizza</span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary-dark">
              Manager
            </span>
          </div>
          <nav className="flex items-center gap-1">
            <NavLink
              to="/manager/orders"
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  isActive ? 'bg-primary text-white' : 'text-text-muted hover:text-text'
                )
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/login"
              className="rounded-full px-4 py-2 text-sm font-semibold text-text-muted hover:text-text"
            >
              Log out
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
