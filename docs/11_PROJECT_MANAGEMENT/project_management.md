# Project Management — Klear Karma v2
> Detailed delivery plan in `../.planning/PLAN.md`

## Project Structure

```
klear-karma/
├── docs/                    # You are here — business + product docs
├── .planning/
│   ├── DISCOVERY.md         # Swarm architect discovery pass
│   └── PLAN.md              # Phase → Wave → Swarm delivery plan
├── app/                     # React Native (Expo) — scaffolded by Rork.com
├── api/                     # Node.js + Hono on Cloudflare Workers
└── .github/workflows/       # CI/CD pipelines
```

## Workflow

### How We Build

1. **Plan** — Update `.planning/PLAN.md` with next wave goals
2. **Branch** — Create feature branch (`feat/wave-X-feature-name`)
3. **Build** — AI agent implements against frozen contracts
4. **Test** — Run test suite, verify against acceptance criteria
5. **PR** — Open pull request with description of what changed
6. **Merge** — Squash merge to main, auto-deploy

### Branching Strategy

```
main (production-ready)
├── feat/auth-flow
├── feat/practitioner-search
├── feat/booking-payment
├── fix/payment-webhook-retry
└── chore/ci-setup
```

- One branch per task
- Squash merge (clean history)
- Delete branch after merge
- Tag releases: `v1.0.0`, `v1.1.0`, etc.

---

## Quality Gates

| Gate | Check | Blocks Merge? |
|------|-------|:---:|
| Lint | ESLint + Prettier pass | ✅ |
| Types | TypeScript strict mode | ✅ |
| Tests | All unit tests pass | ✅ |
| Build | API builds for Cloudflare | ✅ |
| Review | At least 1 approval (or self-merge for solo) | ⚠️ |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|:---:|:---:|---|
| Rork.com scaffold doesn't match design system | Medium | Medium | Manual component rework guided by DESIGN.md |
| Razorpay approval delayed | Low | High | Build with test mode, defer live payments |
| PostGIS not on chosen host | Low | Medium | Haversine formula fallback in app layer |
| Scope creep (add features before PMF) | High | High | Strict MoSCoW in roadmap, "Won't" list |
| Solo founder burnout | Medium | Critical | 50h/week cap, Sunday off, cut scope not quality |

---

## Definition of Done

A feature is "done" when:
- [ ] Code is merged to main
- [ ] Tests pass in CI
- [ ] Feature works on both iOS and Android (if frontend)
- [ ] API endpoint responds correctly with valid and invalid inputs
- [ ] No console errors or warnings
- [ ] Design matches DESIGN.md specifications (colors, spacing, motion)

---

## Communication

| What | Where | Frequency |
|------|-------|-----------|
| Progress tracking | GitHub Issues + PRs | Per task |
| Architecture decisions | ADR files in `.planning/` | As needed |
| Status updates | README.md badges | Auto (CI) |
| User feedback | In-app + WhatsApp | Reviewed weekly |
