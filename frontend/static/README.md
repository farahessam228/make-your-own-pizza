# Static HTML/CSS mockup

Plain HTML and CSS reference mockup for the pizza app. No JSX, no framework, no
build step — open any `.html` file directly in a browser, or serve the folder:

```sh
python -m http.server 8000
```

Start at [`index.html`](index.html), which links to every page.

## Files

```
static/
  index.html            page index (not part of the app)
  css/styles.css        the whole design system
  assets/favicon.svg
```

19 app pages, named `<section>-<page>.html`:

| Section  | Pages |
| -------- | ----- |
| Auth     | `login`, `signup`, `forgot-password`, `verify-otp`, `new-password` |
| Customer | `customer-builder`, `customer-cart`, `customer-checkout`, `customer-payment`, `customer-order-confirmation`, `customer-orders`, `customer-order-details`, `customer-track`, `customer-settings` |
| Manager  | `manager-orders`, `manager-order-details`, `manager-ingredients` |
| Delivery | `delivery-deliveries`, `delivery-details` |

Pages link to each other exactly as the React routes did, so you can click
through the whole flow.

`manager-ingredients.html` has no React counterpart — it is a new screen. It
manages ingredients and their categories on one page: an inline add-ingredient
form, a category panel, and the ingredient list grouped into a section per
category. Two fields it introduces, **availability** (in / out of stock) and
**swatch colour**, are not in the current fixtures; the backend will need them,
or you can drop those columns.

## Placeholder conventions

Dynamic regions are marked with HTML comments. Sample content is realistic on
purpose — it shows the design at full density rather than as an empty skeleton.

- `<!-- TEMPLATE: repeat X per Y -->` — a repeating region. Two or three example
  rows are rendered; keep one and loop it when you wire up data.
- `<!-- PLACEHOLDER: ... -->` — a single value to substitute (order id, total,
  customer name).
- `<!-- FORM: ... -->` — where the form posts and where it should redirect.
- `<!-- ERROR: ... -->` / `<!-- EMPTY STATE: ... -->` — states the page can enter.
  Error banners and toasts ship with the `hidden` attribute; remove it to show
  them. Empty-state markup is provided commented-out next to the list it replaces.

## Interactive state

There is no JavaScript. Anything that would toggle at runtime is represented as
a CSS class for your components to apply:

| Component | State |
| --------- | ----- |
| Nav link / tab bar item | `.is-active` |
| Tab button | `.is-active` + `aria-selected="true"` |
| Ingredient card | `aria-pressed="true"` |
| Timeline step | `.is-done`, `.is-active`, or neither |
| Dropdown menu | remove `hidden` from `.select__menu` |
| Modal / toast | remove `hidden` |
| Radio card | `:has(input:checked)` styles it automatically |

## CSS

One stylesheet, organised in eight sections (tokens, reset, layout primitives,
layout shells, components, feature blocks, utilities, responsive). Brand colours,
fonts, radii, and shadows are CSS custom properties on `:root` — the same tokens
the Tailwind theme defined, so restyling means editing one block.

Class naming is BEM-ish: `.block`, `.block__element`, `.block--modifier`.
Breakpoints match the original Tailwind ones (640px / 768px / 1024px).

The pizza toppings are inline SVG, positioned with inline
`left` / `top` / `--rotate` / `--scale` styles on `.pizza__topping`. Those
positions are baked into the HTML, so when you rebuild this in TSX you'll want
to generate them at runtime instead. The original algorithm — a seeded PRNG, so
a given topping always lands in the same spot — was:

```ts
function hashSeed(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return h
}

function seededRandom(seed: number): () => number {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

// Scatter `count` pieces within the pizza, biased away from the exact centre
// and the edge so they read as "placed by hand".
export function scatterTopping(ingredientId: string, count = 6) {
  const rand = seededRandom(hashSeed(ingredientId))
  return Array.from({ length: count }, () => {
    const angle = rand() * Math.PI * 2
    const radius = 0.22 + rand() * 0.62
    return {
      x: 50 + Math.cos(angle) * radius * 42,
      y: 50 + Math.sin(angle) * radius * 42,
      rotate: rand() * 360,
      scale: 0.85 + rand() * 0.3,
    }
  })
}
```

## Known gaps

These were present in the design but are not reproduced in static HTML:

- **Animations.** Transitions the original had (topping pop-in, modal and toast
  entrance, timeline dot scale) are absent. Static styles reflect the settled
  end state.
- **Lottie.** `customer-order-confirmation.html` uses a static checkmark where
  the design called for a success animation.
