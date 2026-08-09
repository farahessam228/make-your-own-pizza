import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input, { Field } from '../../components/ui/Input'

export default function Payment() {
  const navigate = useNavigate()

  function onSubmit(e) {
    e.preventDefault()
    navigate('/customer/order-confirmation')
  }

  return (
    <div className="mx-auto max-w-md">
      <PageHeader eyebrow="Checkout" title="Payment" />
      <Card className="mt-8 p-6">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Field label="Card number">
            <Input required placeholder="4242 4242 4242 4242" inputMode="numeric" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Expiry">
              <Input required placeholder="MM/YY" />
            </Field>
            <Field label="CVV">
              <Input required placeholder="123" inputMode="numeric" />
            </Field>
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-medium text-text-muted">Total</span>
            <span className="font-mono text-xl font-bold text-text">EGP 500</span>
          </div>

          <Button type="submit" size="lg" className="mt-1 w-full">
            Pay Securely
          </Button>
        </form>
      </Card>
    </div>
  )
}
