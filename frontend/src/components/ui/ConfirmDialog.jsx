import Modal from './Modal'
import Button from './Button'

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Go back',
  destructive = false,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="font-display text-xl font-semibold text-text">{title}</h2>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button
          variant={destructive ? 'destructive' : 'primary'}
          onClick={() => {
            onConfirm?.()
            onClose?.()
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
