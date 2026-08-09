import { ORDERS } from '../data/fixtures'

export function getCustomerOrders() {
  return { orders: ORDERS.filter((o) => o.customer === 'Karim Ahmed') }
}

export function getAllOrders() {
  return { orders: ORDERS }
}

export function getOrderById(id) {
  return { order: ORDERS.find((o) => o.id === id) }
}
