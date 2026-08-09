import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input, { Field } from '../../components/ui/Input'
import { resetPassword } from '../../services/authApi'

export default function NewPassword() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (password.length < 8) return setError('Use at least 8 characters.')
    if (password !== confirm) return setError('Passwords do not match.')
    resetPassword()
    navigate('/login', { state: { passwordReset: true } })
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-text">Create a new password</h1>
      <p className="mt-1.5 text-[15px] text-text-muted">Choose something you'll remember.</p>

      <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
        <Field label="New password">
          <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field label="Confirm new password">
          <Input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </Field>

        {error && (
          <p className="rounded-input bg-error/10 px-3.5 py-2.5 text-sm font-medium text-error">{error}</p>
        )}

        <Button type="submit" size="lg" className="mt-1">
          Update Password
        </Button>
      </form>
    </div>
  )
}
