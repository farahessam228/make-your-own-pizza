const paths = {
  pizza: 'M12 2 22 20H2L12 2Z M12 9v6 M9 13h6',
  orders: 'M4 4h16v4H4z M4 10h16v10H4z M9 14h6',
  cart: 'M3 4h2l2.4 12.2a2 2 0 0 0 2 1.8h7.6a2 2 0 0 0 2-1.6L21 8H6',
  profile: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M4 20c1.6-4 5-6 8-6s6.4 2 8 6',
  chevronRight: 'm9 6 6 6-6 6',
  chevronDown: 'm6 9 6 6 6-6',
  check: 'm5 13 4 4L19 7',
  close: 'm6 6 12 12M18 6 6 18',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  trash: 'M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13',
  location: 'M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z M12 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  scooter: 'M4 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z M16 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z M6 18h8l3-6h-4l-2-4H7',
  search: 'm21 21-4.3-4.3 M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
}

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 2 }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}
