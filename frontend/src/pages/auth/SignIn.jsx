import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input, { Field } from '../../components/ui/Input'
import { signIn } from '../../services/authApi'

const ROLE_HOME = {
  customer: '/customer/builder',
  manager: '/manager/orders',
  delivery: '/delivery/deliveries',
}

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('customer@pizza.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    const res = signIn(email, password)
    if (!res.ok) return setError(res.error)
    navigate(ROLE_HOME[res.user.role])
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-text">Welcome back</h1>
      <p className="mt-1.5 text-[15px] text-text-muted">Sign in to keep building your pizza.</p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </Field>

        {error && (
          <p className="rounded-input bg-error/10 px-3.5 py-2.5 text-sm font-medium text-error">
            {error}
          </p>
        )}

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm font-semibold text-primary-dark hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="mt-1">
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        New here?{' '}
        <Link to="/signup" className="font-semibold text-primary-dark hover:underline">
          Create an account
        </Link>
      </p>

      <p className="mt-8 rounded-input border border-border bg-surface px-3.5 py-3 text-xs text-text-muted">
        Demo accounts — customer@pizza.com · manager@pizza.com · delivery@pizza.com, password: "password"
      </p>
    </div>
  )
}
