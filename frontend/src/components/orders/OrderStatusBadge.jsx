import Badge from '../ui/Badge'
import { STATUS_LABEL } from '../../data/fixtures'

const TONE = {
  ASSIGNING: 'neutral',
  PREPARING: 'primary',
  PACKING: 'gold',
  WAITING_FOR_DELIVERY: 'gold',
  ON_THE_WAY: 'primary',
  DELIVERED: 'green',
}

export default function OrderStatusBadge({ status }) {
  return <Badge tone={TONE[status] || 'neutral'}>{STATUS_LABEL[status]}</Badge>
}
