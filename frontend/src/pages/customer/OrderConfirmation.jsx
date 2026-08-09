import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import LottiePlayer from '../../components/ui/LottiePlayer'
import Icon from '../../components/ui/Icon'

const SUCCESS_LOTTIE = 'https://assets9.lottiefiles.com/packages/lf20_jbrw3hcz.json'

export default function OrderConfirmation() {
  const orderId = '1842'

  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-10 text-center">
      <div className="h-40 w-64">
        <LottiePlayer
          src={SUCCESS_LOTTIE}
          className="h-full w-full"
          fallback={
            <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-accent-green/15 text-accent-green">
              <Icon name="check" className="h-16 w-16" strokeWidth={2.5} />
            </div>
          }
        />
      </div>

      <h1 className="font-display text-3xl font-semibold text-text">Order confirmed</h1>
      <p className="mt-2 text-[15px] text-text-muted">Your pizza adventure has begun.</p>

      <p className="mt-6 font-mono text-sm text-text-muted">Order #PZ-{orderId}</p>
      <p className="font-mono text-2xl font-bold text-text">EGP 500</p>

      <div className="mt-8 flex w-full flex-col gap-3">
        <Button as={Link} to={`/customer/track/${orderId}`} size="lg">
          Track My Pizza
        </Button>
        <Button as={Link} to="/customer/builder" variant="secondary" size="lg">
          Build Another Pizza
        </Button>
      </div>
    </div>
  )
}
