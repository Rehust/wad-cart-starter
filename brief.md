# Brief — implement `cartTotal`

## What to build
One exported function, `cartTotal(items, options)`, in `src/cart.js`. Nothing else.

## Files it may touch
- `src/cart.js` — the implementation
- `test/cart.test.js` — add cases only; keep the worked example

Must not touch: `package.json`, `.github/workflows/ci.yml`, `AGENTS.md`, `README.md`, `template/`.
No new source files, no new folders. If you judge one of them needs to change, say
so and stop; do not edit it on your own initiative.

## Contract
- `items` — `[{ name, price, qty }]`, possibly empty
- `options` — `{ vatRate, freeShipFrom, shipFee }`
- returns a **number**: `subtotal + vat + shipping`, rounded once at the end
  - `subtotal` = Σ `price × qty`
  - `vat` = `vatRate` × `subtotal`
  - `shipping` = `0` when `subtotal >= freeShipFrom`, else `shipFee`
  - round the **total**, not the parts — do not round `vat` or `shipping` first
  - use `Math.round`, so a half đồng goes up
- pure: does not mutate `items` or `options`

## Error cases
Both throw `RangeError`, before any arithmetic:
- `price` negative
- `qty` not a positive integer — so `0`, `1.5` and `-2` all throw

`price: 0` is valid. Missing or non-numeric `options` fields are outside this spec:
do not default them, and do not throw `RangeError` for them — leave the behaviour
undefined and say so in your hand-in.

## Cases

| Case | Expected |
|---|---|
| `subtotal >= freeShipFrom` | shipping is 0 |
| empty cart | returns 0, no VAT, no shipping |
| price negative, or qty not a positive integer | throws RangeError |
| result | a number, rounded to the whole đồng |
| dependencies | none — node:test only |

Worked example: 2 × 180000 + 1 × 45000 = 405000 subtotal, VAT 32400, shipping
30000 (below the 500000 threshold) → **467400**.

## How you will know it worked
`npm run verify` is green: `npm test` passes all cases above, `npm run lint` is clean.
Each test fails for exactly one reason, and no test asserts the implementation rather
than the specification.

If the session 2 slides settle a rounding rule that differs from the one above,
follow the slides and note the difference in your hand-in.

## What it must not invent
- **Libraries** — no dependency, no dev tooling. `node:` built-ins only. No prettier,
  eslint, jest, or a decimal-money package.
- **Endpoints** — no HTTP route, no server, no fetch. This is a pure function.
- **Database columns** — no persistence of any kind. No JSON file, no in-memory
  store, no cache of `items` between calls.
- No `options` defaults the spec does not state. If a value is missing, the function
  is not allowed to invent what it should be.
- No extra exports, no second source file, no rewrite of the existing test.
