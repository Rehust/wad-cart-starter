# Self-assessment — IA#1

Submitted by: 24120327 - Trịnh Đỗ Minh Huy

Total I claim: 100 / 100

| Criterion | Max | I claim | Evidence |
|---|---|---|---|
| Behaviour | 30 | 30 | `npm run verify` exits 0; `test/cart.test.js` — worked example 467400, empty cart 0, threshold shipping 0, negative price and non-integer qty both throw `RangeError`, result is a number. Rounding per the session 2 slides: `Math.round` on the total, so a half đồng goes up |
| Tests | 20 | 20 | 7 tests in `test/cart.test.js`, one reason to fail each. Threshold test uses `vatRate: 0` so only the shipping rule can break it; the rounding test was checked by swapping `Math.round` for `Math.floor`, which turned that test red and the other six green (commit 36cd3f4) |
| Harness | 20 | 20 | `AGENTS.md` — stack, style, commands, tests, never, plus run-verify and log-the-AI-use rules. Gate is `npm run verify` (`npm test` + `node --check` on source and test). `.github/workflows/ci.yml` runs it on push and pull_request |
| Brief | 15 | 15 | `brief.md` — files it may and may not touch, contract, error cases, "no dependencies", must-not-invent list, and the rounding rule confirmed against the session 2 slides |
| AI-LOG.md | 15 | 15 | 3 entries, one per task, written as I went. `Rejected` and `By hand` lines name what I threw away (prettier, `npm ci`, invented defaults) and what I wrote myself (the contract, the nevers, the rounding rule, the threshold-test fix) |

## What I did not manage

Confirm the behaviour of missing `options` fields and a non-numeric `price`. The spec
is silent, so I left them undefined rather than inventing defaults, and the brief
forbids doing otherwise. Nothing in the rubric's stated cases depends on them.

## What I would do differently

Push before building the harness, so the first CI run is green rather than a run I
had to declare as red. I built the gate around a stub, so the first and only CI
execution I could point to was on unfinished code.
