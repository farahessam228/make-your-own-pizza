import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import ChangePassword from '../auth/ChangePassword'

export default function Settings() {
  return (
    <div className="mx-auto max-w-md">
      <PageHeader eyebrow="Account" title="Profile" />

      <Card className="mt-6 flex items-center gap-4 p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 font-display text-xl font-bold text-primary-dark">
          KA
        </div>
        <div>
          <p className="font-semibold text-text">Karim Ahmed</p>
          <p className="text-sm text-text-muted">customer@pizza.com</p>
        </div>
      </Card>

      <div className="mt-8">
        <ChangePassword />
      </div>
    </div>
  )
}
