import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '../../lib/cn'
import Icon from '../ui/Icon'

const NAV = [
  { to: '/customer/builder', label: 'Build Pizza', icon: 'pizza' },
  { to: '/customer/orders', label: 'My Orders', icon: 'orders' },
  { to: '/customer/cart', label: 'Cart', icon: 'cart' },
  { to: '/customer/settings', label: 'Profile', icon: 'profile' },
]

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <NavLink to="/customer/builder" className="font-display text-xl font-bold text-text">
            Make Your Own Pizza
          </NavLink>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    isActive ? 'bg-primary text-white' : 'text-text-muted hover:text-text'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 md:pb-12">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface md:hidden">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold',
                isActive ? 'text-primary' : 'text-text-muted'
              )
            }
          >
            <Icon name={item.icon} className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
