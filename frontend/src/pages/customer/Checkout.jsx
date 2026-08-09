import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input, { Field } from '../../components/ui/Input'
import Icon from '../../components/ui/Icon'
import { cn } from '../../lib/cn'

const SAVED_ADDRESS = {
  name: 'Karim Ahmed',
  phone: '+20 100 123 4567',
  line: '14 Nile Corniche, Apt 6, Floor 3',
  city: 'Cairo',
}

export default function Checkout() {
  const navigate = useNavigate()
  const [addressMode, setAddressMode] = useState('saved')
  const [payment, setPayment] = useState('cod')

  function placeOrder(e) {
    e.preventDefault()
    if (payment === 'card') {
      navigate('/customer/payment')
    } else {
      navigate('/customer/order-confirmation')
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Checkout" title="Checkout" />

      <form onSubmit={placeOrder} className="mt-8 flex flex-col gap-6">
        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold text-text">Delivery address</h2>
          <div className="mt-4 flex flex-col gap-3">
            <label
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-input border p-4 transition-colors',
                addressMode === 'saved' ? 'border-primary ring-2 ring-primary/15' : 'border-border'
              )}
            >
              <input
                type="radio"
                name="address"
                className="mt-1 accent-primary"
                checked={addressMode === 'saved'}
                onChange={() => setAddressMode('saved')}
              />
              <div>
                <p className="text-sm font-semibold text-text">Saved address</p>
                <p className="text-sm text-text-muted">
                  {SAVED_ADDRESS.name} · {SAVED_ADDRESS.line}, {SAVED_ADDRESS.city}
                </p>
                <p className="text-sm text-text-muted">{SAVED_ADDRESS.phone}</p>
              </div>
            </label>

            <label
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-input border p-4 transition-colors',
                addressMode === 'new' ? 'border-primary ring-2 ring-primary/15' : 'border-border'
              )}
            >
              <input
                type="radio"
                name="address"
                className="mt-1 accent-primary"
                checked={addressMode === 'new'}
                onChange={() => setAddressMode('new')}
              />
              <p className="text-sm font-semibold text-text">Add a new address</p>
            </label>

            {addressMode === 'new' && (
              <div className="grid gap-3 rounded-input bg-background p-4 sm:grid-cols-2">
                <Field label="Full name"><Input required /></Field>
                <Field label="Phone number"><Input required type="tel" /></Field>
                <Field label="Street address" className="sm:col-span-2"><Input required /></Field>
                <Field label="Building number"><Input required /></Field>
                <Field label="Floor number"><Input required /></Field>
                <Field label="Apartment number"><Input required /></Field>
                <Field label="City"><Input required /></Field>
                <Field label="Postal code"><Input /></Field>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold text-text">Payment</h2>
          <div className="mt-4 flex flex-col gap-3">
            {[
              { id: 'cod', label: 'Cash on Delivery' },
              { id: 'card', label: 'Visa / Credit Card' },
            ].map((option) => (
              <label
                key={option.id}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-input border p-4 transition-colors',
                  payment === option.id ? 'border-primary ring-2 ring-primary/15' : 'border-border'
                )}
              >
                <input
                  type="radio"
                  name="payment"
                  className="accent-primary"
                  checked={payment === option.id}
                  onChange={() => setPayment(option.id)}
                />
                <span className="text-sm font-semibold text-text">{option.label}</span>
              </label>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-lg font-semibold text-text">Order summary</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-text-muted">
              <span>Custom Pizza × 2</span>
              <span className="font-mono">EGP 350</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Custom Pizza × 1</span>
              <span className="font-mono">EGP 150</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-semibold text-text">
              <span>Total</span>
              <span className="font-mono">EGP 500</span>
            </div>
          </div>
        </Card>

        <Button type="submit" size="lg" className="w-full">
          <Icon name="check" className="h-4 w-4" />
          Place Order
        </Button>
      </form>
    </div>
  )
}
