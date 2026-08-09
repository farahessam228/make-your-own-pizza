import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-text p-10 lg:flex">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, #E85D4A, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #F4C45E, transparent 70%)' }}
        />
        <span className="relative font-display text-2xl font-bold text-white">
          Make Your Own Pizza
        </span>
        <div className="relative">
          <p className="font-display text-4xl font-medium leading-tight text-white">
            A clean digital pizza studio.
            <br />
            Build yours, ingredient by ingredient.
          </p>
          <p className="mt-4 max-w-sm text-sm text-white/60">
            Real toppings, real-time pricing, and a pizza that looks exactly
            how you built it.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
