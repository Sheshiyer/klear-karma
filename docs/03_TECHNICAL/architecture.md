# Technical Architecture — Klear Karma v2
> Full schema and API documentation in `../BACKEND.md`

## Stack Decision

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Mobile App | React Native (Expo) | Cross-platform, single codebase, OTA updates |
| API | Node.js + Hono | Runs on Cloudflare Workers edge, fast cold starts |
| Database | PostgreSQL + PostGIS | Relational integrity, geo queries for practitioner search |
| Cache | Redis (Upstash) | Session tokens, rate limiting, search cache |
| Object Storage | Cloudflare R2 (`kkv2-assets-r2`) | Photos, documents, zero egress fees |
| Edge Cache | Cloudflare KV | Session state, OTP codes, feature flags |
| Payments | Razorpay | Indian market standard, UPI + cards + wallets |
| Auth | JWT (access + refresh) | Stateless, edge-compatible |
| ORM | Drizzle | Type-safe, works with Cloudflare Workers |
| CI/CD | GitHub Actions | Build, test, deploy pipeline |
| Hosting | Cloudflare Workers (`kkv2-api`) | Edge compute, auto-scaling, cheap |

## System Diagram

```
┌────────────────────────────────────┐
│       React Native App (Expo)       │
│   iOS + Android (single codebase)   │
└────────────────┬───────────────────┘
                 │ HTTPS REST + WebSocket
                 ▼
┌────────────────────────────────────┐
│     kkv2-api (Cloudflare Worker)    │
│                                     │
│  Auth │ Users │ Practitioners │     │
│  Bookings │ Payments │ Chat │ ...   │
│                                     │
│  Middleware: JWT verify, rate limit, │
│  CORS, request validation (Zod)     │
└──┬─────────────┬──────────────┬────┘
   │             │              │
   ▼             ▼              ▼
┌────────┐ ┌──────────┐ ┌────────────┐
│Postgres│ │  Redis   │ │Cloudflare  │
│+ PostGIS│ │(Upstash) │ │ R2 + KV    │
│        │ │          │ │            │
│15 tables│ │Sessions  │ │kkv2-assets │
│Users    │ │OTP codes │ │kkv2-kv     │
│Bookings │ │Rate limit│ │kkv2-sessions│
│Payments │ │Cache     │ │            │
└────────┘ └──────────┘ └────────────┘
                              │
                    ┌─────────┴──────────┐
                    ▼                    ▼
              ┌──────────┐      ┌─────────────┐
              │ Razorpay │      │ FCM (Push)  │
              │ Payments │      │ MSG91 (SMS) │
              │ Webhooks │      │ Resend (Email)│
              └──────────┘      └─────────────┘
```

## Cloudflare Resources

| Resource | ID | Type | Purpose |
|----------|-----|------|---------|
| `kkv2-api` | Worker | Compute | Main API |
| `kkv2-assets-r2` | R2 Bucket | Storage | User uploads, practitioner photos |
| `kkv2-sessions-kv` | KV Namespace | Cache | JWT sessions, refresh tokens |
| `kkv2-cache-kv` | KV Namespace | Cache | Search results, practitioner lists |
| `kkv2-analytics` | Analytics Engine | Telemetry | API metrics, error rates |
| `kkv2-edge-db` | D1 | Edge DB | Hot path data (optional) |

## Key Technical Decisions

### Why NOT Next.js?
- Mobile-first product → React Native, not web app
- API on Cloudflare Workers → no need for Next.js API routes
- Separate concerns: app is app, API is API

### Why NOT Supabase?
- Need Cloudflare edge proximity for Indian users
- Razorpay webhook handling needs custom logic
- Full control over auth flow (OTP + social login)
- PostGIS spatial queries with custom scoring

### Why NOT MongoDB?
- Booking + payment data requires ACID transactions
- Relational joins (practitioner → reviews → bookings → payments)
- PostGIS for geo-spatial practitioner search
- Drizzle ORM for type safety

## Performance Targets

| Metric | Target |
|--------|--------|
| API cold start | <200ms |
| API p50 latency | <100ms |
| API p95 latency | <300ms |
| App launch to interactive | <3s |
| Search results render | <1.5s |
| Booking confirmation | <2s |
| Image upload complete | <5s |

## Security Architecture

- Passwords: bcrypt (cost factor 12)
- Tokens: JWT RS256, 15min access / 7d refresh
- API: Rate limited per-user (100 req/min) and per-IP (200 req/min)
- Data: All PII encrypted at rest (PostgreSQL TDE)
- Payments: PCI DSS via Razorpay (no card data touches our servers)
- File uploads: Virus scan + type validation before R2 write
- CORS: Whitelist mobile app user-agent only
