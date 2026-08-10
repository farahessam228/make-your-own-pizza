import { Route, Routes } from 'react-router-dom'

import { Button } from '@/components/ui/button'

/**
 * App shell.
 *
 * Intentionally minimal — the pages are yours to write. The static HTML/CSS
 * mockup in `frontend/static/` is the reference for every screen; `styles.css`
 * (imported in main.tsx) is that mockup's stylesheet, so the class names in
 * those HTML files work here as-is.
 *
 * Suggested route map, mirroring the mockup:
 *   /login /signup /forgot-password /verify-otp /new-password
 *   /customer/builder /customer/cart /customer/checkout /customer/payment
 *   /customer/order-confirmation /customer/orders /customer/orders/:orderId
 *   /customer/track/:orderId /customer/settings
 *   /manager/orders /manager/orders/:orderId /manager/ingredients
 *   /delivery/deliveries /delivery/deliveries/:orderId
 */
export default function App() {
  return (
    <Routes>
      <Route path="*" element={<Placeholder />} />
    </Routes>
  )
}

function Placeholder() {
  return (
    <div className="page">
      <main className="container container--narrow app-main">
        <div className="page-header">
          <div>
            <p className="page-header__eyebrow">Make Your Own Pizza</p>
            <h1 className="page-header__title">Setup works</h1>
            <p className="page-header__description">
              Vite, React 19, TypeScript, and React Router are running, and the
              design system stylesheet is loaded — this page uses its classes.
            </p>
          </div>
        </div>

        <section className="card card--pad mt-8">
          <h2 className="card__title">Next steps</h2>
          <div className="stack stack--sm mt-4">
            <p className="text-sm text-muted">
              1. Open <span className="font-mono">frontend/static/index.html</span>{' '}
              in a browser for the full screen-by-screen reference.
            </p>
            <p className="text-sm text-muted">
              2. Build components under <span className="font-mono">src/</span>,
              reusing the class names from that markup.
            </p>
            <p className="text-sm text-muted">
              3. Replace the catch-all route in{' '}
              <span className="font-mono">src/App.tsx</span> with the real routes.
            </p>
          </div>

          <div className="row mt-6">
            <button className="btn btn--primary" type="button">
              Primary
            </button>
            <button className="btn btn--secondary" type="button">
              Secondary
            </button>
            <span className="badge badge--green">Styles loaded</span>
          </div>
        </section>

        <section className="card card--pad mt-6">
          <h2 className="card__title">shadcn/ui</h2>
          <p className="text-sm text-muted mt-1">
            Themed with the brand palette — these use Tailwind utilities, the
            buttons above use the design system's classes. Both work.
          </p>

          <div className="row row--wrap mt-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>
      </main>
    </div>
  )
}
