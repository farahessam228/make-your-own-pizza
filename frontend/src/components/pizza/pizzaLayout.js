function hashSeed(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return h
}

function seededRandom(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

// Deterministically scatter `count` topping pieces within the pizza's radius,
// biased away from the exact center and edge so pieces read as "placed by hand".
export function scatterTopping(ingredientId, count = 6) {
  const rand = seededRandom(hashSeed(ingredientId))
  const pieces = []
  for (let i = 0; i < count; i++) {
    const angle = rand() * Math.PI * 2
    const radius = 0.22 + rand() * 0.62
    pieces.push({
      x: 50 + Math.cos(angle) * radius * 42,
      y: 50 + Math.sin(angle) * radius * 42,
      rotate: rand() * 360,
      scale: 0.85 + rand() * 0.3,
    })
  }
  return pieces
}
