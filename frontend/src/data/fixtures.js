export const INGREDIENTS = [
  { id: 'pepperoni', name: 'Pepperoni', price: 20, category: 'Meats', color: '#C1432E' },
  { id: 'sausage', name: 'Italian Sausage', price: 22, category: 'Meats', color: '#8B4A2B' },
  { id: 'mushroom', name: 'Mushroom', price: 15, category: 'Veggies', color: '#C9A987' },
  { id: 'olives', name: 'Black Olives', price: 12, category: 'Veggies', color: '#3A3230' },
  { id: 'basil', name: 'Fresh Basil', price: 10, category: 'Veggies', color: '#4C7A3D' },
  { id: 'pepper', name: 'Bell Pepper', price: 14, category: 'Veggies', color: '#5FA857' },
  { id: 'onion', name: 'Red Onion', price: 10, category: 'Veggies', color: '#8E4B6B' },
  { id: 'corn', name: 'Sweet Corn', price: 12, category: 'Veggies', color: '#F0B93B' },
  { id: 'jalapeno', name: 'Jalapeño', price: 13, category: 'Veggies', color: '#3F8A4C' },
  { id: 'cheese', name: 'Extra Cheese', price: 18, category: 'Cheese', color: '#F4C45E' },
]

export const BASE_PRICE = 120

export const USERS = {
  'customer@pizza.com': { id: 'u1', name: 'Karim Ahmed', role: 'customer', password: 'password' },
  'manager@pizza.com': { id: 'u2', name: 'Yara Fathy', role: 'manager', password: 'password' },
  'delivery@pizza.com': { id: 'u3', name: 'Ahmed Mohamed', role: 'delivery', password: 'password' },
}

export const DELIVERY_PEOPLE = [
  { id: 'd1', name: 'Ahmed Mohamed' },
  { id: 'd2', name: 'Sara Naguib' },
  { id: 'd3', name: 'Omar Zaki' },
]

export const STATUS_LABEL = {
  ASSIGNING: 'Order is being assigned',
  PREPARING: 'Preparing',
  PACKING: 'Packing',
  WAITING_FOR_DELIVERY: 'Waiting for Delivery',
  ON_THE_WAY: 'On the Way',
  DELIVERED: 'Delivered',
}

export const STATUS_FLOW = [
  'ASSIGNING',
  'PREPARING',
  'PACKING',
  'WAITING_FOR_DELIVERY',
  'ON_THE_WAY',
  'DELIVERED',
]

export const ORDERS = [
  {
    id: '1842',
    customer: 'Karim Ahmed',
    address: '14 Nile Corniche, Apt 6, Cairo',
    items: [
      { pizza: 'Custom Pizza', toppings: ['Pepperoni', 'Mushroom', 'Basil'], qty: 2, price: 195 },
    ],
    total: 390,
    payment: 'Cash on Delivery',
    status: 'ON_THE_WAY',
    date: '2026-08-09T18:42:00',
    deliveryPerson: 'Ahmed Mohamed',
  },
  {
    id: '1771',
    customer: 'Karim Ahmed',
    address: '14 Nile Corniche, Apt 6, Cairo',
    items: [{ pizza: 'Custom Pizza', toppings: ['Cheese', 'Olives'], qty: 1, price: 190 }],
    total: 190,
    payment: 'Visa',
    status: 'DELIVERED',
    date: '2026-08-04T13:10:00',
    deliveryPerson: 'Sara Naguib',
  },
  {
    id: '1901',
    customer: 'Mona Adel',
    address: '5 Zamalek St, Giza',
    items: [{ pizza: 'Custom Pizza', toppings: ['Sausage', 'Onion', 'Corn'], qty: 1, price: 178 }],
    total: 178,
    payment: 'Cash on Delivery',
    status: 'PREPARING',
    date: '2026-08-09T19:05:00',
    deliveryPerson: null,
  },
  {
    id: '1898',
    customer: 'Youssef Tarek',
    address: '22 Maadi Corniche, Cairo',
    items: [{ pizza: 'Custom Pizza', toppings: ['Jalapeño', 'Pepper', 'Cheese'], qty: 3, price: 460 }],
    total: 460,
    payment: 'Visa',
    status: 'ASSIGNING',
    date: '2026-08-09T19:20:00',
    deliveryPerson: null,
  },
  {
    id: '1877',
    customer: 'Laila Hassan',
    address: '9 Heliopolis Sq, Cairo',
    items: [{ pizza: 'Custom Pizza', toppings: ['Mushroom', 'Basil'], qty: 1, price: 145 }],
    total: 145,
    payment: 'Cash on Delivery',
    status: 'PACKING',
    date: '2026-08-09T17:55:00',
    deliveryPerson: 'Omar Zaki',
  },
  {
    id: '1863',
    customer: 'Karim Ahmed',
    address: '14 Nile Corniche, Apt 6, Cairo',
    items: [{ pizza: 'Custom Pizza', toppings: ['Pepperoni', 'Cheese'], qty: 1, price: 158 }],
    total: 158,
    payment: 'Cash on Delivery',
    status: 'WAITING_FOR_DELIVERY',
    date: '2026-08-09T16:30:00',
    deliveryPerson: 'Ahmed Mohamed',
  },
]
