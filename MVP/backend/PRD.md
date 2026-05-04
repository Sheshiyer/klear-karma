# Klear Karma v2 — Backend PRD

> **Runtime**: Cloudflare Workers (Hono) | **Database**: PostgreSQL + PostGIS
> **Full schema**: `docs/BACKEND.md` | **API code**: `functions/`

---

## Architecture

```
React Native App ──HTTPS──→ kkv2-api (Cloudflare Worker)
                                    │
                     ┌──────────────┼──────────────┐
                     ▼              ▼              ▼
               PostgreSQL      Upstash Redis    Cloudflare R2
              (Neon/Supabase)  (cache/sessions) (kkv2-assets-r2)
```

**NOT Cloudflare KV-only** (legacy was demo-mode KV storage). Production uses PostgreSQL for all persistent data.

---

## API Design Principles

1. **RESTful** — Standard HTTP verbs and status codes
2. **JSON** — All request/response bodies are JSON
3. **Versioned** — All routes under `/api/` (implicit v1)
4. **Authenticated** — JWT Bearer token required except auth routes + health
5. **Validated** — Zod schemas on every endpoint input
6. **Consistent** — Standard envelope: `{ success, data?, error?, meta? }`

---

## Response Envelope

### Success
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 147
  }
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "field": "email"
  }
}
```

### Error Codes

| HTTP | Code | When |
|:---:|------|------|
| 400 | `VALIDATION_ERROR` | Request body/params invalid |
| 401 | `UNAUTHORIZED` | Missing or invalid token |
| 401 | `TOKEN_EXPIRED` | Access token expired |
| 403 | `FORBIDDEN` | User lacks permission |
| 404 | `NOT_FOUND` | Resource doesn't exist |
| 409 | `CONFLICT` | Duplicate (email exists, slot taken) |
| 422 | `BUSINESS_ERROR` | Valid input but business rule violated |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Unhandled server error |

---

## Endpoint Inventory

### Auth (Public)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/auth/register` | Create account (seeker or practitioner) |
| POST | `/api/auth/login` | Email + password → tokens |
| POST | `/api/auth/refresh` | Refresh token → new access token |
| POST | `/api/auth/logout` | Invalidate refresh token |
| POST | `/api/auth/forgot-password` | Send reset email |
| POST | `/api/auth/reset-password` | Set new password with reset token |
| POST | `/api/auth/verify-email` | Confirm email with code |
| POST | `/api/auth/send-otp` | Send phone OTP via MSG91 |
| POST | `/api/auth/verify-otp` | Verify phone OTP |

### Users (Authenticated)

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/users/me` | Get current user profile |
| PATCH | `/api/users/me` | Update profile fields |
| DELETE | `/api/users/me` | Delete account (GDPR/DPDPA) |
| POST | `/api/users/me/avatar` | Upload profile photo |
| PATCH | `/api/users/me/preferences` | Update seeker preferences |
| GET | `/api/users/me/notifications` | Get notification settings |
| PATCH | `/api/users/me/notifications` | Update notification prefs |

### Practitioners

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/practitioners` | Search/list (with geo, filters) |
| GET | `/api/practitioners/:id` | Full profile detail |
| GET | `/api/practitioners/:id/services` | List services offered |
| GET | `/api/practitioners/:id/reviews` | Paginated reviews |
| GET | `/api/practitioners/:id/availability` | Available slots (next 14 days) |
| PATCH | `/api/practitioners/me` | Update own profile (practitioner role) |
| PUT | `/api/practitioners/me/availability` | Set weekly schedule |
| POST | `/api/practitioners/me/services` | Add a service |
| PATCH | `/api/practitioners/me/services/:id` | Update a service |
| DELETE | `/api/practitioners/me/services/:id` | Remove a service |

### Bookings

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/bookings` | Create booking (initiates payment) |
| GET | `/api/bookings` | List user's bookings (upcoming/past) |
| GET | `/api/bookings/:id` | Booking detail |
| PATCH | `/api/bookings/:id/cancel` | Cancel booking |
| PATCH | `/api/bookings/:id/accept` | Practitioner accepts |
| PATCH | `/api/bookings/:id/complete` | Mark session completed |

### Payments

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/payments/create-order` | Create Razorpay order |
| POST | `/api/payments/verify` | Verify Razorpay signature |
| POST | `/api/payments/webhook` | Razorpay webhook (public, signature verified) |
| GET | `/api/payments/history` | Payment history for user |
| GET | `/api/payments/earnings` | Practitioner earnings summary |

### Reviews

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/reviews` | Submit review (after completed session) |
| GET | `/api/reviews` | User's submitted reviews |
| PATCH | `/api/reviews/:id` | Edit own review (within 48h) |
| DELETE | `/api/reviews/:id` | Delete own review |

### Messages

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/messages/conversations` | List conversations |
| GET | `/api/messages/conversations/:id` | Messages in conversation |
| POST | `/api/messages/conversations/:id` | Send message |
| PATCH | `/api/messages/conversations/:id/read` | Mark as read |

### Search

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/search` | Full-text + geo search (unified) |
| GET | `/api/search/suggestions` | Autocomplete suggestions |

---

## Key Flows

### Booking + Payment Flow

```
1. Seeker selects service + slot
2. POST /api/bookings → creates booking (status: pending_payment)
3. POST /api/payments/create-order → Razorpay order created
4. App opens Razorpay checkout
5. User pays via UPI/Card/Wallet
6. Razorpay calls POST /api/payments/webhook
7. Webhook verifies signature → updates booking status to "confirmed"
8. Push notification sent to practitioner
9. Practitioner accepts (or auto-accept if configured)
```

### Practitioner Search (PostGIS)

```sql
SELECT p.*, 
  ST_Distance(
    p.location, 
    ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography
  ) AS distance_meters
FROM practitioners p
WHERE p.is_active = true
  AND p.is_verified = true
  AND ST_DWithin(
    p.location,
    ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
    :radius_meters
  )
  AND (:modality IS NULL OR :modality = ANY(p.modalities))
ORDER BY distance_meters ASC
LIMIT :limit OFFSET :offset;
```

---

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/kkv2

# Auth
JWT_SECRET=<64-char-random>
JWT_REFRESH_SECRET=<64-char-random>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Razorpay
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxx

# SMS (MSG91)
MSG91_AUTH_KEY=xxxxx
MSG91_TEMPLATE_ID=xxxxx

# Email (Resend)
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=bookings@klearkarma.in

# Storage
R2_ACCOUNT_ID=xxxxx
R2_ACCESS_KEY=xxxxx
R2_SECRET_KEY=xxxxx
R2_BUCKET=kkv2-assets-r2

# Cache
REDIS_URL=redis://default:xxxxx@host:6379
```

---

## What Changed from Legacy

| Legacy (v1) | v2 |
|---|---|
| Cloudflare KV-only storage | PostgreSQL + Redis + R2 |
| Mock data for demo | Real data, real payments |
| `USERS_KV`, `PRACTITIONERS_KV` namespaces | Relational tables with foreign keys |
| No auth middleware | JWT + refresh + OTP |
| No payment integration | Razorpay with webhooks |
| No geo search | PostGIS radius queries |
| Single health check endpoint | 40+ production endpoints |
