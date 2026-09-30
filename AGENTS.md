# Project rules — wad-cart-starter

## Stack
- Plain JavaScript, ESM (`"type": "module"`), Node 22+ (locally v26).
- Tests: `node:test` + `node:assert/strict`. No framework, no bundler, no build step.
- **No dependencies** — none, not even dev tooling. `node:` built-ins only. npm.
- `src/cart.js` is the only source file; `test/cart.test.js` the only test file.

## Style
- 2-space indent, single quotes, semicolons. `const` over `let`, never `var`.
- One export per file. Never mutate the `items` or `options` arguments.
- Name things after the spec: `subtotal`, `vat`, `shipping` — not `a`, `tmp`, `x`.

## Commands
| Command | Does |
|---|---|
| `npm test` | `node --test` — runs `test/cart.test.js` |
| `npm run lint` | `node --check` on `src/cart.js` and `test/cart.test.js` |
| `npm run verify` | `npm test && npm run lint` — **the gate, and what CI runs** |


## Contract — `cartTotal(items, options)`
- `items: [{ name, price, qty }]`, `options: { vatRate, freeShipFrom, shipFee }`
- subtotal = Σ `price × qty`; VAT = `vatRate` on the subtotal
- shipping = `0` when `subtotal >= freeShipFrom`, else `shipFee`
- returns subtotal + VAT + shipping as a **number**, rounded to whole đồng
- empty cart → `0` (no VAT, no shipping)
- negative `price`, or non-integer `qty` → `RangeError`
- worked example: 405000 + 32400 VAT + 30000 shipping = **467400**

## Tests
- One reason to fail per test. If the name has an "and" in it, split it.
- Assert the spec, not the implementation. No internal or call-count assertions.
- Cover all six: worked example, empty cart, threshold, negative price, bad qty,
  and that the result is a `number`.
- Add cases; never replace the worked example.

## Never
- **Never** add a dependency, dev tooling included. The lint gate is `node --check`
  for exactly that reason.
- **Never** edit `test/cart.test.js` to make a test pass. The tests come from the spec.
- **Never** return a formatted string — convert `toFixed()` with `Number(...)` first.
- **Never** weaken `.github/workflows/ci.yml` to get green.
- **Never** push on a failing local run.

## Run verify
Run `npm run verify` before every push and before any commit message claiming
something works. If you could not run it, say so in the commit — do not claim it
passed. A green local run with a red CI scores as a red CI.

## Log the AI use
Every task where an assistant did part of the work gets an entry in `AI-LOG.md`,
written **while the task is still in your head**.
Follow `template/AI-LOG-template.md` exactly: the `Tool / Asked for / Kept / Changed /
Rejected / By hand` lines, in that order. One entry per task, not per prompt. Several prompts on one task make one entry.

## When something goes wrong
A wrong turn, output you threw away, a CI failure you had to chase: **write the
lesson into this file, not into `AI-LOG.md`.** Add it under Never, Style, Tests, or
Commands — whichever section it belongs to. A lesson nobody can act on next time
was not worth writing down.
