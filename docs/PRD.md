# Klear Karma v2 — Product Requirements Document
**Version**: 2.0 | **Codename**: kkv2 | **Platform**: React Native (iOS + Android)

---

## Product Vision

Klear Karma is a **community-verified marketplace** that connects seekers with authentic alternative healing practitioners. The platform replaces trust gaps in the wellness industry with structured verification, transparent reviews, and measurable session outcomes.

**Core thesis**: Trust is the product. The marketplace is the delivery mechanism.

### What We Are
- A dual-sided marketplace connecting healing seekers with verified practitioners
- A trust layer built on community verification, peer review, and outcome tracking
- A mobile-first booking and session management platform

### What We Are NOT
- A medical diagnosis or treatment platform
- A "scientific validation" or biofield measurement tool
- A content/media platform or social network

---

## Target Users

### Seekers (Customers)
- Age 25–42, urban, wellness-conscious
- Skeptical of unverified practitioners
- Comfortable with mobile booking flows (Uber/ClassPass mental model)
- Willing to pay for quality and trust signals

### Practitioners (Healers)
- Independent or small-practice alternative healers
- Modalities: Reiki, Sound Therapy, Massage Therapy, Life Coaching, Meditation, Yoga, Acupuncture, Ayurveda, Crystal Healing, Energy Work
- Need client acquisition, scheduling, and payment infrastructure
- Value peer community and professional credibility

---

## MVP Scope (v2.0)

### Seeker App Flows

#### 1. Authentication
- Email/password registration with email verification
- Social login (Google, Apple)
- Phone number verification (OTP)
- Password reset flow

#### 2. Onboarding (3-step)
- **Step 1**: Profile basics (name, photo, location)
- **Step 2**: Healing preferences (modalities, budget range, gender preference)
- **Step 3**: Notification permissions

#### 3. Home / Discovery
- Location-aware header
- Search bar with autocomplete
- Horizontal category scroll (modality chips)
- Featured practitioners section (card grid)
- "Recommended for You" section (based on preferences)
- Recent bookings quick-access

#### 4. Search & Filter
- Full-text search across practitioner names, modalities, bios
- Filters: modality, price range, distance radius, availability, minimum rating, gender
- Sort: distance, price (low/high), rating, availability
- Results displayed as scrollable card list

#### 5. Practitioner Profile
- Cover image + avatar
- Name, credentials, years of experience
- Verification badge (community-verified status)
- Rating (aggregate) + review count
- About/bio section
- Services offered (name, duration, price per service)
- Availability calendar (next 7 days, time slots)
- Reviews section (rating breakdown + recent reviews)
- Action buttons: "Book Now", "Message"

#### 6. Booking Flow
- **Service selection**: pick service → pick date → pick time slot
- **Location choice**: practitioner's place / seeker's place / virtual
- **Booking confirmation**: summary card with all details + special requests
- **Payment**: saved cards, add new card, Apple Pay / Google Pay, promo code
- **Success screen**: confirmation + "Add to Calendar" + "Message Practitioner"

#### 7. Messaging
- Conversation list (sorted by recency)
- Real-time chat with practitioner
- Message status indicators (sent, delivered, read)
- Shared booking context in chat header
- Image/file sharing

#### 8. My Bookings
- Tabs: Upcoming / Past / Cancelled
- Booking card: practitioner, service, date/time, status
- Actions: reschedule, cancel, leave review
- Post-session review prompt

#### 9. Reviews & Ratings
- 5-star rating
- Written review with optional tags (punctual, skilled, warm, professional)
- Review appears on practitioner profile after submission

#### 10. Profile & Settings
- Edit profile info
- Payment methods management
- Notification preferences
- Privacy settings
- Help & support
- Terms & privacy policy
- Logout / delete account

### Practitioner App Flows

#### 1. Registration & Verification
- Professional profile creation (title, bio, specializations, experience, certifications)
- Document upload for verification
- Peer review / community verification process
- Verification status tracking

#### 2. Dashboard
- Today's schedule overview
- Upcoming appointments
- Earnings summary (weekly/monthly)
- New booking notifications
- Rating/review summary

#### 3. Services Management
- Add/edit/remove services
- Set pricing and duration per service
- Service descriptions

#### 4. Availability Management
- Weekly recurring schedule
- Block specific dates/times
- Vacation mode (temporarily unavailable)

#### 5. Client Management
- Client list with booking history
- Session notes (private)
- Client communication via messaging

#### 6. Earnings & Payouts
- Transaction history
- Payout schedule and status
- Revenue analytics (weekly, monthly trends)
- Tax document generation

---

## Revenue Model

| Stream | Mechanism | Rate |
|--------|-----------|------|
| Booking commission | Per-session fee | 20% of booking value |
| Seeker membership (optional) | Monthly subscription | Free tier + Premium (reduced commission, priority booking) |
| Practitioner membership | Monthly subscription | Basic (free listing) / Pro (featured placement, analytics) |
| Featured placement | Promotional boost | Pay-per-impression or weekly fee |

---

## Non-Functional Requirements

- **Performance**: App cold start < 3s, screen transitions < 300ms, 60fps animations
- **Offline**: Cached practitioner profiles, booking confirmations viewable offline
- **Accessibility**: WCAG 2.1 AA, 44px minimum touch targets, screen reader support
- **Security**: JWT auth with refresh tokens, encrypted PII, PCI-compliant payment processing
- **Privacy**: GDPR-compliant data handling, user data export, account deletion
- **Localization**: English (default), Hindi (Phase 2), extensible i18n

---

## Infrastructure Tags (Cloudflare)

All Cloudflare resources use the `kkv2-` prefix:
- `kkv2-api` — API Workers
- `kkv2-users-kv` — User data KV namespace
- `kkv2-sessions-kv` — Session management
- `kkv2-assets-r2` — Media/file storage (R2)
- `kkv2-analytics` — Analytics Engine dataset
- `kkv2-db` — D1 database (if used for edge caching)

---

## Out of Scope (Future Phases)

- AI-powered practitioner matching algorithm
- Wearable device integrations
- Virtual reality healing sessions
- Corporate wellness B2B packages
- Biofield/energy measurement integrations
- White-label SaaS for healing centers
- International expansion beyond India
