import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input, { Field } from '../../components/ui/Input'
import { requestOtp } from '../../services/authApi'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    requestOtp(email)
    navigate('/verify-otp', { state: { email } })
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-text">Forgot your password?</h1>
      <p className="mt-1.5 text-[15px] text-text-muted">
        Enter the email on your account and we'll send a verification code.
      </p>

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
        <Button type="submit" size="lg" className="mt-1">
          Send Code
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        <Link to="/login" className="font-semibold text-primary-dark hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  )
}
