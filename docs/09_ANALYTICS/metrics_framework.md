# Analytics & Metrics — Klear Karma v2

## North Star Metric

**Weekly Completed Bookings** — the single number that proves the marketplace is working.

---

## Metric Categories

### 1. Marketplace Health

| Metric | Definition | Target (Month 6) |
|--------|-----------|:-:|
| **Liquidity** | % searches that result in a booking | >12% |
| **Supply utilization** | % of available practitioner slots booked | >25% |
| **Time to first booking** | Days from seeker signup to first booking | <7 days |
| **Practitioner response rate** | % booking requests accepted within 4h | >85% |
| **Search-to-profile ratio** | % searches that lead to a profile view | >40% |

### 2. Growth

| Metric | Definition | Target (Month 6) |
|--------|-----------|:-:|
| **WAU (seekers)** | Weekly active seekers | 250 |
| **New seekers/week** | Organic + paid signups | 50 |
| **Practitioner supply** | Active practitioners with ≥1 available slot | 150 |
| **Referral rate** | % bookings from referred users | >20% |

### 3. Revenue

| Metric | Definition | Target (Month 6) |
|--------|-----------|:-:|
| **GMV** | Total session value booked | ₹6L/month |
| **Net revenue** | Commission - payment fees | ₹1.2L/month |
| **ARPU (seeker)** | Revenue per active seeker per month | ₹600 |
| **Take rate** | Effective commission % after discounts | >22% |

### 4. Retention

| Metric | Definition | Target |
|--------|-----------|:-:|
| **D7 retention (seeker)** | % still active 7 days after signup | >40% |
| **D30 retention (seeker)** | % still active 30 days after signup | >20% |
| **Monthly churn (practitioner)** | % practitioners going inactive | <5% |
| **Repeat booking rate** | % seekers who book 2+ in a month | >30% |

### 5. Quality

| Metric | Definition | Target |
|--------|-----------|:-:|
| **Average rating** | Mean practitioner rating | >4.3 |
| **Review rate** | % completed sessions that get reviewed | >40% |
| **Complaint rate** | Disputes per 100 bookings | <3 |
| **Cancellation rate** | % bookings cancelled before session | <15% |
| **NPS** | Net Promoter Score (quarterly survey) | >50 |

---

## Instrumentation Plan

### Events to Track (Mixpanel / PostHog)

```
# Seeker funnel
app_opened
search_performed (query, filters, results_count)
practitioner_profile_viewed (practitioner_id)
booking_initiated (practitioner_id, session_type)
payment_completed (amount, method)
session_completed
review_submitted (rating, has_text)

# Practitioner funnel
practitioner_signup_started
verification_completed
availability_set
booking_received
booking_accepted
session_marked_complete
payout_received

# Engagement
message_sent (sender_role)
notification_opened (type)
referral_shared
referral_converted
```

### Infrastructure

| Tool | Purpose | Cost |
|------|---------|------|
| Cloudflare Analytics (`kkv2-analytics`) | API request metrics, error rates | Free |
| PostHog (self-hosted or cloud) | Product analytics, funnels, session replay | Free tier |
| Uptime monitoring (Cloudflare) | API health checks | Free |
| Expo Analytics | App crashes, performance | Free |

---

## Dashboard (Week 1 MVP)

A single dashboard with 6 numbers:

```
┌─────────────────────────────────────────┐
│  This Week                              │
│                                         │
│  Bookings: 47  │  GMV: ₹94,000         │
│  New Seekers: 23  │  Active Pracs: 38   │
│  Avg Rating: 4.4  │  Cancellations: 3   │
└─────────────────────────────────────────┘
```

Build this as a simple SQL query against PostgreSQL — no BI tool needed for MVP.

---

## What We're NOT Tracking (Yet)

- Cohort analysis (wait until Month 3+ data)
- Attribution modeling (too early, not enough channels)
- Predictive churn scoring (need 6+ months of data)
- A/B test framework (premature optimization)
- Revenue forecasting models (wait for PMF signals)
