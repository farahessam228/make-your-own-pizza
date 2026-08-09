import { useState } from 'react'
import Button from '../../components/ui/Button'
import Input, { Field } from '../../components/ui/Input'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import { changePassword } from '../../services/authApi'
import { useToast } from '../../lib/toastContext'

export default function ChangePassword() {
  const toast = useToast()
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [error, setError] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.next !== form.confirm) return setError('New passwords do not match.')
    const res = changePassword(form.current)
    if (!res.ok) return setError(res.error)
    setForm({ current: '', next: '', confirm: '' })
    toast('Password changed successfully')
  }

  return (
    <div className="mx-auto max-w-md">
      <PageHeader eyebrow="Account" title="Change password" />
      <Card className="mt-6 p-6">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Field label="Current password">
            <Input type="password" required value={form.current} onChange={set('current')} />
          </Field>
          <Field label="New password">
            <Input type="password" required value={form.next} onChange={set('next')} />
          </Field>
          <Field label="Confirm new password">
            <Input type="password" required value={form.confirm} onChange={set('confirm')} />
          </Field>

          {error && (
            <p className="rounded-input bg-error/10 px-3.5 py-2.5 text-sm font-medium text-error">{error}</p>
          )}

          <Button type="submit" className="mt-1 self-start">
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  )
}
