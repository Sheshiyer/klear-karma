# Operations Manual — Klear Karma v2 (MVP)

## Operating Model

This is a **solo-founder operation** with AI coding agents. No employees until proven PMF.

### Roles (Month 1-6)

| Function | Who | Hours/Week |
|----------|-----|:---:|
| Product + Engineering | Founder + AI agents | 30 |
| Practitioner onboarding | Founder | 10 |
| Customer support | Founder + canned responses | 5 |
| Marketing | Founder | 5 |
| **Total** | | **50** |

---

## Practitioner Verification Process

### Onboarding Steps (Manual for MVP)

1. **Application** — Practitioner submits via app: name, modality, experience years, certifications (photo upload), 2 peer references
2. **Document review** (Founder, <48h) — Verify certification photos are legit, check reference LinkedIn/social profiles
3. **Reference check** (Founder, <24h) — WhatsApp message to 2 references: "Do you know [Name]? Would you recommend them?"
4. **Approval** — Mark as verified in admin panel, trigger welcome email
5. **Profile completion** — Practitioner adds bio, availability, session pricing, photos

### Verification Tiers

| Tier | Requirements | Badge |
|------|---|---|
| **Basic Verified** | ID + 1 certification + 2 references | ✓ Verified |
| **Community Trusted** | 10+ reviews with avg >4.0 | ★ Trusted |
| **Expert** | 50+ sessions + 4.5+ avg + peer endorsements | ◆ Expert |

### Red Flags (Immediate Rejection)
- Claims to cure cancer, diabetes, or other serious illness
- No verifiable credentials or training
- References don't respond or deny knowing them
- Social media shows misleading health claims

---

## Booking Operations

### Happy Path
```
Seeker books → Razorpay payment captured → Practitioner notified →
Session happens → Seeker prompted for review → Practitioner paid (T+2 days)
```

### Cancellation Policy
| Who Cancels | When | Action |
|---|---|---|
| Seeker | >24h before | Full refund |
| Seeker | <24h before | 50% refund, 50% to practitioner |
| Seeker | No-show | No refund, full payment to practitioner |
| Practitioner | Anytime | Full refund + ₹100 credit to seeker |

### Dispute Resolution
1. Seeker raises complaint via in-app "Report Issue" button
2. Founder reviews within 24h
3. If valid: refund seeker, flag practitioner
4. If 3+ valid complaints: practitioner suspended pending review

---

## Payout Operations

- **Frequency**: Weekly (every Monday for previous week's completed sessions)
- **Method**: Bank transfer via Razorpay Route (split payments)
- **Commission deducted at source**: Practitioner receives (session price - commission - payment fee)
- **Minimum payout**: ₹500

### Payout Calculation Example
```
Session price: ₹2,000
Commission (25%): -₹500
Payment fee (2%): -₹40
Practitioner receives: ₹1,460
```

---

## Support Operations

### Channels
1. **In-app chat** (primary) — canned responses + async founder reply
2. **WhatsApp** (practitioners only) — direct line for onboarded practitioners
3. **Email** (escalations) — support@klearkarma.in

### Response Time SLAs

| Channel | First Response | Resolution |
|---------|:-:|:-:|
| In-app (seeker) | <4h | <24h |
| WhatsApp (practitioner) | <1h | <4h |
| Email | <24h | <48h |

### Canned Responses (Top 5 Issues)
1. "How do I cancel?" → Link to cancellation flow in app
2. "Where's my refund?" → "Refunds process in 5-7 business days to your original payment method"
3. "Practitioner didn't show up" → Trigger full refund + flag practitioner
4. "How do I get verified?" → Link to verification steps
5. "Payment failed" → "Try again or use a different payment method. Contact us if it persists."

---

## Incident Management

| Severity | Example | Response Time | Escalation |
|---|---|---|---|
| P1 (critical) | Payments broken, data breach | Immediate | Founder drops everything |
| P2 (high) | Search not returning results, booking failures | <2h | Founder investigates same day |
| P3 (medium) | Slow performance, notification delays | <24h | Next work session |
| P4 (low) | UI glitch, typo, non-blocking bug | <72h | Batch with other fixes |

---

## Weekly Operations Rhythm

| Day | Focus |
|-----|-------|
| Monday | Process payouts, review metrics dashboard |
| Tuesday | Practitioner onboarding reviews + approvals |
| Wednesday-Thursday | Engineering (feature development) |
| Friday | Marketing content creation, community engagement |
| Saturday | Support catchup, user feedback review |
| Sunday | Off |
