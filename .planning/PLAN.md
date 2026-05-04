# Klear Karma v2 — Delivery Plan
**Method:** Phase → Wave → Swarm (Swarm Architect) | **Operator:** Solo + AI agents

---

## Assumptions and Constraints
1. Rork.com generates the React Native scaffold from PRD.md + DESIGN.md — no hand-coding the initial app shell
2. Backend API is Node.js on Cloudflare Workers (Hono framework for routing)
3. PostgreSQL hosted externally (Neon or Supabase Postgres) — Cloudflare D1 used only as edge cache
4. All Cloudflare resources prefixed `kkv2-`
5. Razorpay is the sole payment gateway — all amounts in paise (integer)
6. Solo operator → waves are sequential, swarms within a wave can parallelize

---

## Agent Ownership Model

| Concern | Primary Owner | Backup | Notes |
|---------|--------------|--------|-------|
| Planning & orchestration | Claude Code | Human | This plan drives all work |
| UI scaffold | Rork.com | Claude Code | First pass only — then hand-tuned |
| UI refinement | Claude Code | Human | Post-scaffold: design system compliance |
| API backend | Claude Code | Human | Hono routes + Drizzle ORM |
| Database | Claude Code | Human | Migrations as SQL files |
| Testing | Claude Code | Human | Vitest (API) + Detox/Maestro (E2E) |
| DevOps | Claude Code | Human | GitHub Actions + Cloudflare Wrangler |

---

## Phase 1 — Foundation & Contracts

**Goal:** Freeze API contracts, generate app scaffold, establish CI baseline.
**Exit criteria:** Frozen OpenAPI spec, running Rork scaffold on Expo Go, green CI pipeline.

### Wave 1.1 — Contract Freeze

#### Swarm A — API Contract Definition
- **Goal:** Produce OpenAPI 3.1 spec from BACKEND.md endpoints
- **Owner:** Claude Code
- **Inputs:** `docs/BACKEND.md` (40+ endpoints)
- **Outputs:** `api/openapi.yaml`, `api/README.md`
- **Tasks:**
  1. Convert BACKEND.md endpoint inventory to OpenAPI 3.1 YAML
  2. Define request/response schemas for all 15 entities
  3. Add authentication scheme (Bearer JWT)
  4. Add error response schemas (400, 401, 403, 404, 422, 500)
  5. Validate spec with `@redocly/cli lint`

#### Swarm B — Database Contract Definition
- **Goal:** Produce versioned migration files from BACKEND.md schema
- **Owner:** Claude Code
- **Inputs:** `docs/BACKEND.md` (15 tables + enums)
- **Outputs:** `api/migrations/001_initial.sql`, `api/migrations/002_indexes.sql`
- **Tasks:**
  6. Extract CREATE TYPE and CREATE TABLE from BACKEND.md into `001_initial.sql`
  7. Extract CREATE INDEX statements into `002_indexes.sql`
  8. Add PostGIS extension setup to migration 001
  9. Add migration runner script (`api/scripts/migrate.sh`)

### Wave 1.2 — Scaffold Generation

#### Swarm A — React Native Scaffold (Rork.com)
- **Goal:** Generate the initial app shell via Rork.com
- **Owner:** Rork.com → Human (upload PRD.md + DESIGN.md)
- **Inputs:** `docs/PRD.md`, `docs/DESIGN.md`
- **Outputs:** Rork-generated React Native project → `app/` directory
- **Tasks:**
  10. Upload PRD.md + DESIGN.md to Rork.com
  11. Review and download generated scaffold
  12. Copy scaffold into `app/` directory
  13. Run `npx expo start` — verify it launches in Expo Go
  14. Commit scaffold as baseline (tag: `scaffold-v1`)

#### Swarm B — API Scaffold
- **Goal:** Set up Hono + Drizzle project for Cloudflare Workers
- **Owner:** Claude Code
- **Inputs:** OpenAPI spec from Wave 1.1
- **Outputs:** `api/` directory with Hono routes, Drizzle config, Wrangler setup
- **Tasks:**
  15. Initialize Node.js project: `api/package.json` with Hono, Drizzle, Wrangler
  16. Create `api/wrangler.toml` with `kkv2-api` worker config
  17. Scaffold route files from OpenAPI spec (auth, users, practitioners, bookings, etc.)
  18. Configure Drizzle ORM schema from migration files
  19. Add health check endpoint (`GET /health`)
  20. Verify `wrangler dev` starts locally

### Wave 1.3 — CI Baseline

#### Swarm A — Pipeline Setup
- **Goal:** GitHub Actions for lint, test, deploy
- **Owner:** Claude Code
- **Tasks:**
  21. Create `.github/workflows/api-ci.yml` (lint + test on PR)
  22. Create `.github/workflows/api-deploy.yml` (deploy to Cloudflare on main push)
  23. Create `.github/workflows/app-ci.yml` (lint + type-check on PR)
  24. Add `api/.env.example` and `app/.env.example`

---

## Phase 2 — Core Build

**Goal:** Build all MVP features. Frontend and backend developed in parallel against frozen contracts.
**Exit criteria:** All 10 seeker flows + 6 practitioner flows functional. Payments working in Razorpay test mode.

### Wave 2.1 — Auth + Core Entities (Serial — shared dependency)

#### Swarm A — Backend Auth
- **Owner:** Claude Code
- **Tasks:**
  25. Implement JWT auth middleware (access + refresh tokens)
  26. Build auth routes: register, login, logout, refresh, forgot-password, verify-email
  27. Implement OTP verification (phone number)
  28. Add rate limiting middleware (Cloudflare KV: `kkv2-sessions-kv`)
  29. Seed database with test users and practitioners

#### Swarm B — Frontend Auth (after Swarm A routes are live)
- **Owner:** Claude Code
- **Tasks:**
  30. Wire up auth screens to API (login, register, forgot password)
  31. Implement secure token storage (expo-secure-store)
  32. Add auth context provider with auto-refresh
  33. Build onboarding flow (3-step wizard from PRD)

### Wave 2.2 — Parallel Feature Build

#### Swarm A — Seeker Features (Frontend + Backend)
- **Tasks:**
  34. Practitioner search with PostGIS radius query + filters
  35. Practitioner profile view (reviews, availability, modalities)
  36. Booking flow: select slot → confirm → pay (Razorpay integration)
  37. Session history and upcoming bookings
  38. Review submission after completed session

#### Swarm B — Practitioner Features (Frontend + Backend)
- **Tasks:**
  39. Practitioner dashboard (stats, upcoming, earnings)
  40. Availability calendar management (weekly schedule + blocks)
  41. Session management (accept, start, complete, cancel)
  42. Earnings and payout tracking
  43. Profile editing (bio, modalities, certifications, photos)

#### Swarm C — Shared Services
- **Tasks:**
  44. Real-time chat (Cloudflare Durable Objects or polling fallback)
  45. Push notifications (Firebase FCM)
  46. Image upload to `kkv2-assets-r2` with resize
  47. Email transactional templates (booking confirmation, OTP, etc.)

### Wave 2.3 — Integration

#### Swarm A — End-to-End Flow Validation
- **Tasks:**
  48. Test complete seeker journey: signup → search → book → pay → review
  49. Test complete practitioner journey: signup → set availability → accept booking → complete → payout
  50. Fix contract mismatches between app and API
  51. Cross-platform test: iOS + Android in Expo Go

---

## Phase 3 — Hardening & Launch

**Goal:** Production-ready security, performance, and app store submission.
**Exit criteria:** Lighthouse mobile >90, zero critical security findings, TestFlight + Play Console uploaded.

### Wave 3.1 — Security & Performance

#### Swarm A — Security Hardening
- **Tasks:**
  52. OWASP top-10 audit on API routes
  53. Input validation with Zod on all endpoints
  54. SQL injection protection audit (parameterized queries via Drizzle)
  55. CORS and CSP headers on Cloudflare Worker
  56. Rate limiting tuning (per-user, per-IP)

#### Swarm B — Performance Optimization
- **Tasks:**
  57. Add Redis caching layer for practitioner search results
  58. Implement skeleton loading states (per DESIGN.md)
  59. Image optimization (WebP, lazy loading, progressive)
  60. API response time profiling — target <300ms p95
  61. App bundle size audit — target <15MB initial download

### Wave 3.2 — Ship

#### Swarm A — App Store Preparation
- **Tasks:**
  62. Generate app icons from VISUAL-PROMPTS.md prompt #1
  63. Create App Store screenshots (6.5" iPhone, 5.5" iPhone, iPad)
  64. Write store listing copy (title, subtitle, description, keywords)
  65. Build production release: `eas build --platform all`
  66. Submit to TestFlight + Play Console internal track

#### Swarm B — Infrastructure Production
- **Tasks:**
  67. Configure production PostgreSQL (connection pooling, backups)
  68. Set up Cloudflare production environment (`kkv2-api` prod worker)
  69. Configure Razorpay production credentials
  70. Set up error alerting (Sentry or Cloudflare Tail Workers)
  71. DNS and domain setup for API endpoint

---

## Dependency Rationale

### Must happen before parallelization
- API contracts (Wave 1.1) must freeze before any frontend work begins
- Database migrations (Wave 1.1) must run before any backend work
- Auth (Wave 2.1) must be complete before feature waves — every route needs auth middleware

### Can run independently
- Frontend auth screens and backend auth routes (once contract is frozen)
- Seeker features and practitioner features in Wave 2.2
- Security hardening and performance optimization in Wave 3.1

### Must remain serialized
- Database migrations (always sequential)
- Auth implementation → feature routes (middleware dependency)
- Integration testing → hardening (must validate before optimizing)

---

## Verification Strategy

| Wave | Proof |
|------|-------|
| 1.1 | OpenAPI spec passes Redocly lint, migrations run on clean DB |
| 1.2 | `expo start` loads app, `wrangler dev` serves health check |
| 1.3 | GitHub Actions green on push to main |
| 2.1 | Login/register works end-to-end, tokens refresh |
| 2.2 | Each feature has at least one API integration test |
| 2.3 | Full seeker + practitioner journeys complete without errors |
| 3.1 | Zero critical OWASP findings, API p95 <300ms |
| 3.2 | Builds upload to TestFlight + Play Console |

---

## Risks and Fallback Plan

| Risk | Trigger | Fallback |
|------|---------|----------|
| Rork.com scaffold doesn't match DESIGN.md | >50% components need rework | Use Expo Router template + hand-build |
| PostGIS not available on chosen host | Neon/Supabase doesn't support | Use Haversine formula in application layer |
| Razorpay integration delays | API approval takes >2 weeks | Build with test mode, defer live payments |
| Cloudflare Durable Objects complexity | Chat latency >1s | Fall back to polling-based chat |
| Solo operator burnout | Phase 2 exceeds 6 weeks | Cut Wave 2.2 Swarm C (chat, notifications) to Phase 3 |

---

## Task Summary

| Phase | Wave | Tasks | Duration Estimate |
|-------|------|-------|-------------------|
| Phase 1 | 1.1 Contract Freeze | 9 | Short |
| Phase 1 | 1.2 Scaffold | 11 | Short |
| Phase 1 | 1.3 CI Baseline | 4 | Short |
| Phase 2 | 2.1 Auth | 9 | Medium |
| Phase 2 | 2.2 Features | 14 | Long |
| Phase 2 | 2.3 Integration | 4 | Medium |
| Phase 3 | 3.1 Hardening | 10 | Medium |
| Phase 3 | 3.2 Ship | 10 | Medium |
| **Total** | | **71** | |
