# Product Roadmap — Klear Karma v2

## Phases Overview

```
Phase 1: Foundation    ──→  Phase 2: Core Build  ──→  Phase 3: Launch
(Contracts + Scaffold)      (Features + Integration)   (Hardening + Ship)
```

## Phase 1 — Foundation

### Milestone: "It runs"
At the end of Phase 1, we have:
- ✅ OpenAPI spec defining all contracts
- ✅ Database migrations that create the full schema
- ✅ Rork.com scaffold running in Expo Go
- ✅ API skeleton responding to health checks
- ✅ CI pipeline running on every push

### Key Deliverables
1. `api/openapi.yaml` — frozen API contract
2. `api/migrations/` — PostgreSQL schema
3. `app/` — React Native scaffold from Rork.com
4. `.github/workflows/` — CI/CD pipelines

---

## Phase 2 — Core Build

### Milestone: "It works"
At the end of Phase 2, we have:
- ✅ Full auth flow (register, login, OTP, refresh)
- ✅ Seeker can search, browse, book, pay, and review
- ✅ Practitioner can set availability, accept bookings, track earnings
- ✅ Real-time chat between seeker and practitioner
- ✅ Push notifications for booking events
- ✅ End-to-end integration tested on both platforms

### Feature Priority (MoSCoW)

| Feature | Priority | Phase |
|---------|:---:|:---:|
| Auth (email + social + OTP) | Must | 2.1 |
| Practitioner search (geo + filters) | Must | 2.2 |
| Booking flow (select → pay → confirm) | Must | 2.2 |
| Practitioner dashboard | Must | 2.2 |
| Reviews and ratings | Must | 2.2 |
| In-app chat | Should | 2.2 |
| Push notifications | Should | 2.2 |
| Practitioner subscription tier | Could | 3.2 |
| AI matching recommendations | Won't (v3) | — |
| Video consultations | Won't (v3) | — |
| Wearable integrations | Won't (v3+) | — |

---

## Phase 3 — Launch

### Milestone: "It ships"
At the end of Phase 3, we have:
- ✅ Security audit passed (OWASP top 10)
- ✅ API p95 <300ms
- ✅ App bundle <15MB
- ✅ App Store + Play Store listings live
- ✅ TestFlight / internal testing complete
- ✅ Production infrastructure hardened

### Launch Cities
1. **Bangalore** — High density of wellness practitioners, tech-savvy seekers
2. **Mumbai** — Largest wellness market, premium segment
3. *(Phase 4)* Pune, Delhi NCR, Hyderabad

---

## Success Metrics Per Phase

| Phase | North Star Metric | Target |
|-------|-------------------|--------|
| 1 | Time to scaffold complete | <1 week |
| 2 | End-to-end booking works | 100% of happy paths |
| 3 | App store approval | First submission accepted |
| Post-launch | Weekly active seekers | 50 in month 1 |

---

## What's Explicitly Deferred to v3+

- AI-powered practitioner matching
- Video/telehealth sessions
- Marketplace for wellness products
- Corporate wellness packages
- Multi-language support
- Biofield / Bio Well integrations
- Certification and training programs
- International expansion
