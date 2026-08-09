import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input, { Field } from '../../components/ui/Input'
import { signUp } from '../../services/authApi'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      return setError('Passwords do not match.')
    }
    const res = signUp(form)
    if (!res.ok) return setError(res.error)
    navigate('/login', { state: { justRegistered: true } })
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-text">Create your account</h1>
      <p className="mt-1.5 text-[15px] text-text-muted">Start building your first pizza in minutes.</p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <Field label="Full name">
          <Input required value={form.name} onChange={set('name')} placeholder="Karim Ahmed" />
        </Field>
        <Field label="Email">
          <Input type="email" required value={form.email} onChange={set('email')} placeholder="you@example.com" />
        </Field>
        <Field label="Password">
          <Input type="password" required value={form.password} onChange={set('password')} placeholder="••••••••" />
        </Field>
        <Field label="Confirm password">
          <Input type="password" required value={form.confirm} onChange={set('confirm')} placeholder="••••••••" />
        </Field>

        {error && (
          <p className="rounded-input bg-error/10 px-3.5 py-2.5 text-sm font-medium text-error">{error}</p>
        )}

        <Button type="submit" size="lg" className="mt-1">
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary-dark hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
