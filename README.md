# Klear Karma v2

Community-verified marketplace for authentic alternative healing practitioners.

**Stack**: React Native (iOS + Android) + Node.js + PostgreSQL  
**Infra**: Cloudflare Workers (`kkv2-*` namespace)  
**Status**: Pre-build — documentation and architecture phase

---

## Quick Start (For Rork.com)

Upload these files to [rork.com](https://rork.com) for initial React Native scaffolding:

| File | Purpose |
|------|---------|
| [`docs/PRD.md`](docs/PRD.md) | Product requirements — all screens, flows, features |
| [`docs/DESIGN.md`](docs/DESIGN.md) | Design system — colors, typography, components, motion |
| [`docs/BACKEND.md`](docs/BACKEND.md) | Backend architecture — schema, API endpoints, auth flow |
| [`docs/VISUAL-PROMPTS.md`](docs/VISUAL-PROMPTS.md) | AI image generation prompts for app icon, store assets, brand board |

## What is Klear Karma?

A dual-sided marketplace connecting healing **seekers** with verified **practitioners** across modalities like Reiki, Sound Therapy, Massage, Meditation, Yoga, Acupuncture, and Ayurveda.

**Core thesis**: Trust is the product. The marketplace is the delivery mechanism.

### Key Features (MVP)
- Practitioner discovery with search, filters, and location awareness
- Community-based verification and peer review
- Booking flow with service selection, scheduling, and payments (Razorpay)
- Real-time messaging between seekers and practitioners
- Review and rating system
- Practitioner dashboard with earnings, availability, and client management

### Revenue Model
- 20% booking commission
- Optional premium memberships (seekers + practitioners)
- Featured placement for practitioners

## Project Phases

| Phase | Scope | Status |
|-------|-------|--------|
| 0 — Documentation | PRD, Design System, Backend Schema, Visual Assets | Current |
| 1 — Scaffolding | Rork.com React Native app generation | Next |
| 2 — Backend | Node.js API on Cloudflare Workers, PostgreSQL setup | Planned |
| 3 — Integration | Connect UI to API, auth flow, payments | Planned |
| 4 — Hardening | Testing, performance, security, store submission | Planned |

## Design Philosophy

Built on [taste-design](https://github.com/google-labs-code/stitch-skills/tree/main/skills/taste-design) principles:
- Outfit font (Inter is banned)
- Single sage-green accent (`#16A34A`)
- Warm canvas backgrounds (`#FAFAF8`)
- Spring physics motion, no linear easing
- Skeleton loaders, no spinners
- 44px minimum touch targets
- No emojis, no AI cliches, no generic layouts

## Origin

Extracted and upgraded from the original Klear Karma wiki (v1), which contained 45+ documents across 12 categories. This v2 consolidates the valuable concepts while dropping conflicting tech stacks, over-scoped features, and unsubstantiated claims.
