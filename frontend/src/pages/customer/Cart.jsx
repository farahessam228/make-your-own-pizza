import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import Icon from '../../components/ui/Icon'
import PizzaCanvas from '../../components/pizza/PizzaCanvas'
import { INGREDIENTS } from '../../data/fixtures'

const byId = Object.fromEntries(INGREDIENTS.map((i) => [i.id, i]))

const INITIAL_CART = [
  { id: 'c1', toppingIds: ['pepperoni', 'mushroom', 'basil'], unitPrice: 175, qty: 2 },
  { id: 'c2', toppingIds: ['cheese', 'olives'], unitPrice: 150, qty: 1 },
]

export default function Cart() {
  const navigate = useNavigate()
  const [items, setItems] = useState(INITIAL_CART)

  function updateQty(id, delta) {
    setItems((list) =>
      list
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        )
    )
  }

  function removeItem(id) {
    setItems((list) => list.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div>
      <PageHeader eyebrow="Cart" title="Your cart" description={`${itemCount} item${itemCount === 1 ? '' : 's'}`} />

      {items.length === 0 ? (
        <EmptyState
          className="mt-8"
          title="Your cart is empty"
          description="Your perfect pizza is waiting."
          action={<Button onClick={() => navigate('/customer/builder')}>Build a Pizza</Button>}
        />
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-4">
            {items.map((item) => {
              const toppings = item.toppingIds.map((id) => byId[id])
              return (
                <Card key={item.id} className="flex gap-4 p-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full">
                    <PizzaCanvas selectedIngredients={toppings} />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-text">
                          Custom Pizza
                        </h3>
                        <p className="text-sm text-text-muted">
                          {toppings.map((t) => t.name).join(' · ')}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="rounded-full p-1.5 text-text-muted hover:bg-error/10 hover:text-error"
                        aria-label="Remove pizza"
                      >
                        <Icon name="trash" className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-border px-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, -1)}
                          className="flex h-8 w-8 items-center justify-center text-text-muted hover:text-text"
                          aria-label="Decrease quantity"
                        >
                          <Icon name="minus" className="h-4 w-4" />
                        </button>
                        <span className="w-4 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, 1)}
                          className="flex h-8 w-8 items-center justify-center text-text-muted hover:text-text"
                          aria-label="Increase quantity"
                        >
                          <Icon name="plus" className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-mono font-bold text-text">
                        EGP {item.unitPrice * item.qty}
                      </span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <Card className="h-fit p-6">
            <div className="flex justify-between text-sm text-text-muted">
              <span>Subtotal</span>
              <span className="font-mono">EGP {subtotal}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-4 text-base font-semibold text-text">
              <span>Total</span>
              <span className="font-mono">EGP {subtotal}</span>
            </div>
            <Button
              size="lg"
              className="mt-5 w-full"
              onClick={() => navigate('/customer/checkout')}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
