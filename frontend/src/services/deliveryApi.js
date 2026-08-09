import { ORDERS } from '../data/fixtures'

export function getAssignedDeliveries() {
  return { deliveries: ORDERS.filter((o) => o.deliveryPerson === 'Ahmed Mohamed') }
}
