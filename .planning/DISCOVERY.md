# Klear Karma v2 — Swarm Architect Discovery

## 1. Planning Profile
- **Planning depth:** `standard`
- **Delivery mode:** `production`
- **Release model:** `phased rollout`
- **CI/CD expectation:** `basic` (GitHub Actions, Cloudflare deploy)

## 2. Quality Bar
- **Testing depth:** Unit tests for API routes + integration tests for booking flow
- **Observability:** Cloudflare Analytics (`kkv2-analytics`) + structured logging
- **Performance:** <2s cold start, <300ms API p95, <3s app launch
- **Security/compliance:** JWT auth, bcrypt passwords, PCI via Razorpay, GDPR-aware data handling
- **Rollback:** Cloudflare Worker versioning, database migrations with down scripts

## 3. Team and Agent Topology
- **Human team shape:** `solo` (founder-operator)
- **Available coding agents:** Claude Code, Copilot CLI, Rork.com (React Native scaffold)
- **Primary planner/orchestrator:** Claude Code (this session)
- **Default ownership split:**
  - Planner / orchestrator: Claude Code
  - UI / app implementation: Rork.com (initial scaffold) → Claude Code (refinement)
  - Cloud / backend: Claude Code
  - Validation: Claude Code + manual QA

## 4. Repository / Delivery Constraints
- **Repo:** `Sheshiyer/klear-karma` (public)
- **Target base branch:** `main`
- **Monorepo or single app:** Monorepo — `app/` (React Native) + `api/` (Node.js)
- **Sensitive/shared files:** `.env`, payment credentials, JWT secrets
- **Environment:** Cloudflare Workers (API), Expo/EAS (mobile builds)
- **Deadline:** No hard deadline — quality over speed

## 5. Integration Risk Areas
- **Contract surfaces:** REST API between React Native app and Node.js backend
- **Shared ownership risk:** Database migrations (app and API both depend on schema)
- **External dependencies:** Razorpay (payments), Cloudflare (hosting), PostGIS (geo search)
- **Migration concerns:** None — greenfield build, no legacy data

## 6. Planning Defaults
- Target: ~40 tasks (lean for solo operator)
- Phase 1: 3 waves (contracts → scaffold → validate)
- Phase 2: 3 waves (parallel frontend + backend → integrate → test)
- Phase 3: 2 waves (harden → ship)
- One task = one branch = one PR
- Database migrations serialized, UI components parallelizable

## 7. Discovery Summary

### Confirmed Inputs
- React Native + Node.js + PostgreSQL stack
- Cloudflare Workers for API edge, R2 for assets
- Razorpay for INR payments (amounts in paise)
- Rork.com generates initial React Native scaffold from PRD.md + DESIGN.md
- Solo operator with AI coding agents

### Assumptions Made
- Expo/EAS for mobile builds and OTA updates
- PostGIS extension for practitioner location search
- Redis for session caching and rate limiting
- WebSocket via Cloudflare Durable Objects for chat

### Unresolved Questions
- Push notification provider (Firebase FCM vs OneSignal)
- Email transactional provider (Resend vs Postmark vs SES)
- Image CDN for practitioner photos (Cloudflare Images vs R2 direct)

### Recommended Rollout Shape
3 phases, 8 waves total, ~40 tasks
- Phase 1: Foundation (contracts, scaffold, baseline CI)
- Phase 2: Core Build (parallel UI + API, integration, E2E test)
- Phase 3: Hardening & Launch (security, performance, app store submission)
