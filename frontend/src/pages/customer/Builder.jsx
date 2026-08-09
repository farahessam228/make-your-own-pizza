import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ui/Button'
import PizzaCanvas from '../../components/pizza/PizzaCanvas'
import IngredientTray from '../../components/pizza/IngredientTray'
import { getIngredients } from '../../services/pizzaApi'
import { useToast } from '../../lib/toastContext'

const { ingredients, basePrice } = getIngredients()

export default function Builder() {
  const navigate = useNavigate()
  const toast = useToast()
  const [selectedIds, setSelectedIds] = useState(['pepperoni', 'basil'])

  const selectedIngredients = useMemo(
    () => ingredients.filter((i) => selectedIds.includes(i.id)),
    [selectedIds]
  )

  const total = basePrice + selectedIngredients.reduce((sum, i) => sum + i.price, 0)

  function toggle(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function addToCart() {
    toast('Pizza added to cart')
    navigate('/customer/cart')
  }

  return (
    <div>
      <PageHeader
        eyebrow="Pizza Builder"
        title="Build your pizza"
        description="Make it exactly how you like it — tap toppings on and off and watch the price update as you go."
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="order-2 lg:order-1">
          <IngredientTray
            ingredients={ingredients}
            selectedIds={selectedIds}
            onToggle={toggle}
          />
        </div>

        <div className="order-1 lg:order-2">
          <div className="sticky top-24 rounded-card border border-border bg-surface p-6">
            <PizzaCanvas selectedIngredients={selectedIngredients} />

            <div className="mt-6 flex flex-wrap gap-1.5">
              {selectedIngredients.length === 0 ? (
                <span className="text-sm text-text-muted">No toppings yet — pick a few.</span>
              ) : (
                selectedIngredients.map((i) => (
                  <span
                    key={i.id}
                    className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-text-muted"
                  >
                    {i.name}
                  </span>
                ))
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
              <span className="text-sm font-medium text-text-muted">Total</span>
              <span className="font-mono text-2xl font-bold text-text">
                EGP {total.toFixed(0)}
              </span>
            </div>

            <Button size="lg" className="mt-4 w-full" onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
