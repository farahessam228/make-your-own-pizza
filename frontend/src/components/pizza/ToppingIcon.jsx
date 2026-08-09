const SHAPES = {
  pepperoni: (c) => (
    <>
      <circle cx="12" cy="12" r="10" fill={c} />
      <circle cx="12" cy="12" r="10" fill="none" stroke="#00000018" strokeWidth="1.5" />
      <circle cx="9.5" cy="9" r="0.9" fill="#00000030" />
      <circle cx="14.5" cy="10.5" r="0.7" fill="#00000030" />
      <circle cx="11" cy="14.5" r="0.8" fill="#00000030" />
      <circle cx="15" cy="14.5" r="0.6" fill="#00000030" />
    </>
  ),
  sausage: (c) => <circle cx="12" cy="12" r="9" fill={c} />,
  mushroom: (c) => (
    <path
      d="M12 3c5 0 8 3.2 8 6.4 0 1.6-1.3 2.6-3 2.6H7c-1.7 0-3-1-3-2.6C4 6.2 7 3 12 3Z M9 12v6a3 3 0 0 0 6 0v-6"
      fill={c}
    />
  ),
  olives: (c) => (
    <>
      <circle cx="12" cy="12" r="7" fill={c} />
      <circle cx="12" cy="12" r="2.6" fill="#FFF7ED" />
    </>
  ),
  basil: (c) => (
    <path
      d="M12 3c6 2 8 8 4 15-2-1-4-3-5-6-3 3-6 2-8-1 4 0 6-2 7-5-2-1-3-3-3-6 2 2 3 2 5-3Z"
      fill={c}
    />
  ),
  pepper: (c) => (
    <path
      d="M4 9c3-1 5 0 8 0s5-1 8 0c-1 3-1 5 0 7-3 1-5 0-8 0s-5 1-8 0c1-2 1-4 0-7Z"
      fill={c}
    />
  ),
  onion: (c) => (
    <g fill="none" stroke={c} strokeWidth="2.4">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
    </g>
  ),
  corn: (c) => (
    <g fill={c}>
      <circle cx="7" cy="8" r="2" />
      <circle cx="12" cy="7" r="2" />
      <circle cx="17" cy="8" r="2" />
      <circle cx="6" cy="13" r="2" />
      <circle cx="12" cy="13" r="2" />
      <circle cx="18" cy="13" r="2" />
      <circle cx="8" cy="18" r="2" />
      <circle cx="14" cy="18" r="2" />
    </g>
  ),
  jalapeno: (c) => (
    <path d="M4 12c4-4 12-6 16-3-2 5-9 9-16 8-1-2-1-4 0-5Z" fill={c} />
  ),
  cheese: (c) => (
    <g fill={c}>
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="7" cy="8" r="2" opacity="0.6" />
      <circle cx="17" cy="15" r="2" opacity="0.6" />
    </g>
  ),
}

export default function ToppingIcon({ id, color, className = 'h-full w-full' }) {
  const shape = SHAPES[id] || SHAPES.pepperoni
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {shape(color)}
    </svg>
  )
}
