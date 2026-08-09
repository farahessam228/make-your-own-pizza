import { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { verifyOtp } from '../../services/authApi'
import { cn } from '../../lib/cn'

export default function VerifyOtp() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [digits, setDigits] = useState(Array(6).fill(''))
  const [error, setError] = useState('')
  const refs = useRef([])

  function updateDigit(i, value) {
    const v = value.replace(/\D/g, '').slice(-1)
    setDigits((d) => {
      const next = [...d]
      next[i] = v
      return next
    })
    if (v && i < 5) refs.current[i + 1]?.focus()
  }

  function onKeyDown(i, e) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
  }

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    const res = verifyOtp(digits.join(''))
    if (!res.ok) return setError(res.error)
    navigate('/new-password')
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-text">Enter verification code</h1>
      <p className="mt-1.5 text-[15px] text-text-muted">
        We sent a 6-digit code to {state?.email || 'your email'}.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <div className="flex justify-between gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={d}
              onChange={(e) => updateDigit(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              className={cn(
                'h-14 w-12 rounded-input border bg-surface text-center text-xl font-bold text-text outline-none transition-colors',
                'focus:border-primary focus:ring-2 focus:ring-primary/15',
                error ? 'border-error' : 'border-border'
              )}
            />
          ))}
        </div>

        {error && (
          <p className="rounded-input bg-error/10 px-3.5 py-2.5 text-sm font-medium text-error">{error}</p>
        )}

        <Button type="submit" size="lg" className="mt-1">
          Verify
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Didn't get a code?{' '}
        <Link to="/forgot-password" className="font-semibold text-primary-dark hover:underline">
          Resend
        </Link>
      </p>
    </div>
  )
}
