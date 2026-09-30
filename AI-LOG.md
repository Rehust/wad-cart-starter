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
