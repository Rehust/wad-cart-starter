# AI-LOG.md — CSC13008 · IA#1 cartTotal

One entry per task where an assistant did part of the work. Three honest lines are
enough. This is an account, not a transcript.

## 2026-09-30 — project harness: rules file, lint gate, CI
Tool: OpenCode (this session).
Asked for: a rules file a stranger could follow, a working gate (`npm test` plus a
format/lint step) and CI that runs on push.
Kept: its argument that the lint gate has to stay dependency-free, so `node --check`
instead of prettier or eslint.
Changed: the rules file twice. First into stack / style / commands / tests / never,
then cut down again because the first version ran long enough that nobody would read
it before pushing. Also replaced its "record failures here" rule with one that sends
lessons to the rules file, since the same lesson in two files drifts apart.
Rejected: prettier as a devDependency with a `format:check` script — the spec says no
dependencies, and a real formatter would have broken the rule the rubric reads.
Rejected `npm ci` in CI too: there is no lockfile in this repo, so it fails before the
tests run, which would have been a red CI on top of a green local run. `npm install`
instead.
By hand: the `cartTotal` contract and the five nevers, from the README spec and the
rubric. I wrote those; the tool only arranged them into sections.

## 2026-09-30 — brief.md
Tool: OpenCode (this session).
Asked for: the brief for implementing `cartTotal`, in the five parts the rubric
names, concise and specific.
Kept: the case table from the README spec, unaltered, so the numbers in the brief
match the numbers the grader runs.
Changed: on my own reading of the rubric, three things — moved `AGENTS.md` and
`AI-LOG.md` out of the must-not-touch list into a "say so and stop" clause, because
the rules file told me to log every task while the brief forbade the log; gave the
error cases their own heading, so a marker scanning for them finds them; and added
a rule for `options` fields the spec never mentions, to close a gap that let a
stranger guess.
Rejected: leaving the rounding vague. The agent first wrote "rounded to the whole đồng"
and only caught on review that it does not say what gets rounded or which way a
half goes, so a stranger could write code that passes my tests and fails the
grader's.
By hand: the rounding rule — round the total once at the end with `Math.round`, so
a half đồng goes up. I have not seen the session 2 slides, so I am declaring it
rather than claiming they back me up. If they differ, the brief says to follow the
slides and note the difference, not to keep my version.

## 2026-09-30 — implementing cartTotal
Tool: OpenCode (this session).
Asked for: implement `brief.md` — `cartTotal` in `src/cart.js` plus tests, following
YAGNI, no unrelated or unused code.
Kept: validating each item before it adds to the subtotal, so a bad price throws
even when a later line item would have changed the total. And the early return for
the empty cart, because without it `0 >= freeShipFrom` is false and an empty cart
picks up the shipFee — that test fails on the missing guard and nothing else.
Changed: the free-shipping test. It asserted 540000, which is subtotal plus VAT, so
a VAT bug and a shipping bug failed identically and the failure said nothing about
which. Set `vatRate: 0` there, so the expected number is 500000 and only the shipping
rule can break it. Then added a rounding test, after realising nothing pinned the
tiebreak — the one decision in the brief the grader could disagree with.
By hand: nothing in `src/cart.js` beyond the arithmetic and the two guards; every
line is load-bearing. The test names, the `vatRate: 0` change and the rounding case
were mine. Verified rather than assumed: swapping `Math.round` for `Math.floor` turned
exactly the rounding test red and the other six green, then I restored the file, so
that test fails for the reason it claims to.
