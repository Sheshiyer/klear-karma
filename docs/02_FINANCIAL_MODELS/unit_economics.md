# Financial Model — Klear Karma v2

## Model Assumptions

| Assumption | Value | Basis |
|------------|-------|-------|
| Average session price | ₹2,000 | India wellness market median |
| Blended commission rate | 25% | Weighted average across modalities |
| Payment gateway fee | 2% | Razorpay standard |
| Monthly active seekers (Month 6) | 200 | Organic + referral in 2 cities |
| Monthly active seekers (Month 12) | 1,000 | With paid acquisition |
| Sessions per seeker per month | 1.5 | Industry benchmark |
| Practitioner churn (monthly) | 5% | Marketplace average |
| Seeker churn (monthly) | 8% | Higher than supply-side |

## Revenue Projection (Year 1)

| Month | Active Seekers | Bookings | GMV | Commission | Net Revenue |
|-------|:-:|:-:|:-:|:-:|:-:|
| 1-3 | 50 | 75 | ₹1.5L | ₹37.5K | ₹30K |
| 4-6 | 200 | 300 | ₹6L | ₹1.5L | ₹1.2L |
| 7-9 | 500 | 750 | ₹15L | ₹3.75L | ₹3L |
| 10-12 | 1,000 | 1,500 | ₹30L | ₹7.5L | ₹6L |
| **Year 1 Total** | | **2,625** | **₹52.5L** | **₹13.1L** | **₹10.2L** |

## Cost Structure (Monthly at Scale — Month 12)

| Category | Monthly Cost | Notes |
|----------|:-:|---|
| Infrastructure (Cloudflare + DB) | ₹15,000 | Workers Pro + Neon Postgres |
| Payment processing (Razorpay) | ₹60,000 | 2% of ₹30L GMV |
| SMS/OTP (MSG91) | ₹5,000 | ~2,000 OTPs/month |
| Email (Resend) | ₹2,000 | Transactional only |
| Push notifications (FCM) | ₹0 | Free tier sufficient |
| Customer support (1 person) | ₹30,000 | Part-time initially |
| Marketing/Acquisition | ₹1,00,000 | CAC target: ₹200/seeker |
| **Total Monthly Burn** | **₹2.12L** | |

## Unit Economics

| Metric | Value |
|--------|-------|
| **Revenue per booking** | ₹500 |
| **Cost per booking** (infra + payment) | ₹65 |
| **Gross margin per booking** | ₹435 (87%) |
| **CAC (seeker)** | ₹200 |
| **LTV (seeker, 8-month avg lifetime)** | ₹6,000 |
| **LTV:CAC ratio** | 30:1 |
| **Payback period** | <1 month |

## Break-Even Analysis

- Monthly fixed costs: ~₹1.5L (infra + support, excluding marketing)
- Contribution per booking: ₹435
- **Break-even bookings/month: 345** (~230 active seekers)
- **Expected break-even: Month 5-6**

## Funding Requirements

| Stage | Amount | Use |
|-------|--------|-----|
| Self-funded (current) | ₹5L | MVP development, first 3 months |
| Friends & Family (if needed) | ₹15-25L | First 6 months runway + marketing |
| Angel round (Month 6-9) | ₹50L-1Cr | Scale to 3 cities, hire 2 people |

## Key Metrics to Track

- **GMV** (Gross Merchandise Value) — total session value
- **Take rate** — actual blended commission %
- **Liquidity** — % of search queries that result in a booking
- **Supply utilization** — % of practitioner available slots that get booked
- **Repeat rate** — % seekers who book 2+ sessions/month
- **NPS** — Net Promoter Score (target: >50)

## Scenario Analysis

| Scenario | Month 12 Seekers | Monthly Revenue | Status |
|----------|:-:|:-:|---|
| Conservative | 500 | ₹3L | Sustainable, slow growth |
| Base case | 1,000 | ₹6L | Break-even, reinvesting |
| Optimistic | 2,500 | ₹15L | Profitable, ready for scale |

## What's NOT in This Model

- No ₹90 crore pre-money valuation claims
- No "Series A" planning before product-market fit
- No revenue from "Bio Well" or hardware
- No multi-country projections before India PMF
- No "₹100 crore in 5 years" hockey sticks
