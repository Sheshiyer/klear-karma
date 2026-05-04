# Klear Karma v2 — API Endpoints Reference

> **Base URL**: `https://kkv2-api.{domain}.workers.dev`
> **Auth**: `Authorization: Bearer <access_token>`
> **Content-Type**: `application/json`

---

## Auth Endpoints

### POST /api/auth/register

**Request:**
```json
{
  "email": "priya@example.com",
  "password": "SecurePass123!",
  "fullName": "Priya Sharma",
  "phone": "+919876543210",
  "role": "seeker"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123",
      "email": "priya@example.com",
      "fullName": "Priya Sharma",
      "role": "seeker",
      "isVerified": false
    },
    "tokens": {
      "accessToken": "eyJ...",
      "refreshToken": "eyJ...",
      "expiresIn": 900
    }
  }
}
```

### POST /api/auth/login

**Request:**
```json
{
  "email": "priya@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": { "id": "usr_abc123", "email": "...", "role": "seeker" },
    "tokens": { "accessToken": "...", "refreshToken": "...", "expiresIn": 900 }
  }
}
```

### POST /api/auth/refresh

**Request:**
```json
{
  "refreshToken": "eyJ..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "expiresIn": 900
  }
}
```

### POST /api/auth/send-otp

**Request:**
```json
{
  "phone": "+919876543210"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": { "message": "OTP sent", "expiresIn": 300 }
}
```

### POST /api/auth/verify-otp

**Request:**
```json
{
  "phone": "+919876543210",
  "otp": "123456"
}
```

---

## Practitioner Search

### GET /api/practitioners

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `lat` | number | User latitude |
| `lng` | number | User longitude |
| `radius` | number | Search radius in km (default: 10, max: 50) |
| `modality` | string | Filter by modality ID |
| `minRating` | number | Minimum rating (1-5) |
| `minPrice` | number | Min session price (paise) |
| `maxPrice` | number | Max session price (paise) |
| `availability` | string | `today` \| `this_week` \| `any` |
| `sort` | string | `distance` \| `rating` \| `price_asc` \| `price_desc` |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 20, max: 50) |

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "prc_xyz789",
      "fullName": "Anita Desai",
      "avatarUrl": "https://kkv2-assets-r2.../avatar.webp",
      "modalities": ["reiki", "energy"],
      "rating": 4.8,
      "reviewCount": 127,
      "distanceMeters": 2340,
      "priceRange": { "min": 80000, "max": 150000 },
      "isVerified": true,
      "verificationTier": "trusted",
      "nextAvailable": "2026-05-05T10:00:00+05:30"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "total": 47 }
}
```

### GET /api/practitioners/:id

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "prc_xyz789",
    "fullName": "Anita Desai",
    "avatarUrl": "...",
    "coverUrl": "...",
    "bio": "8 years of experience in Reiki and energy healing...",
    "modalities": ["reiki", "energy"],
    "experienceYears": 8,
    "rating": 4.8,
    "reviewCount": 127,
    "sessionCount": 342,
    "isVerified": true,
    "verificationTier": "trusted",
    "location": {
      "area": "Indiranagar",
      "city": "Bangalore",
      "lat": 12.9716,
      "lng": 77.6412
    },
    "certifications": [
      { "title": "Reiki Master (Usui)", "issuer": "International Reiki Association", "year": 2019 }
    ],
    "services": [
      { "id": "svc_001", "name": "Reiki Healing", "durationMinutes": 60, "pricePaise": 150000 },
      { "id": "svc_002", "name": "Distance Reiki", "durationMinutes": 30, "pricePaise": 80000 }
    ]
  }
}
```

---

## Bookings

### POST /api/bookings

**Request:**
```json
{
  "practitionerId": "prc_xyz789",
  "serviceId": "svc_001",
  "date": "2026-05-06",
  "startTime": "10:00",
  "notes": "First time trying reiki"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "bkg_abc456",
    "status": "pending_payment",
    "practitionerId": "prc_xyz789",
    "practitionerName": "Anita Desai",
    "serviceName": "Reiki Healing",
    "date": "2026-05-06",
    "startTime": "10:00",
    "durationMinutes": 60,
    "amountPaise": 150000,
    "razorpayOrderId": "order_xyz..."
  }
}
```

### GET /api/bookings

**Query:** `?status=upcoming` or `?status=past` or `?status=cancelled`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "bkg_abc456",
      "status": "confirmed",
      "practitionerName": "Anita Desai",
      "practitionerAvatar": "...",
      "serviceName": "Reiki Healing",
      "date": "2026-05-06",
      "startTime": "10:00",
      "durationMinutes": 60,
      "amountPaise": 150000,
      "location": "Indiranagar, Bangalore"
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "total": 5 }
}
```

---

## Payments

### POST /api/payments/create-order

**Request:**
```json
{
  "bookingId": "bkg_abc456",
  "amountPaise": 150000
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "orderId": "order_xyz...",
    "amount": 150000,
    "currency": "INR",
    "razorpayKeyId": "rzp_live_xxxxx"
  }
}
```

### POST /api/payments/verify

**Request (from app after Razorpay checkout):**
```json
{
  "razorpayOrderId": "order_xyz...",
  "razorpayPaymentId": "pay_xyz...",
  "razorpaySignature": "..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "bookingId": "bkg_abc456",
    "status": "confirmed",
    "paymentId": "pay_xyz..."
  }
}
```

---

## Reviews

### POST /api/reviews

**Request:**
```json
{
  "bookingId": "bkg_abc456",
  "rating": 5,
  "comment": "Wonderful experience. Felt deeply relaxed afterwards.",
  "wouldRecommend": true
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "rev_def789",
    "rating": 5,
    "comment": "...",
    "createdAt": "2026-05-06T12:30:00+05:30"
  }
}
```

---

## Messages

### GET /api/messages/conversations

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "conv_123",
      "otherUser": { "id": "prc_xyz789", "fullName": "Anita Desai", "avatarUrl": "..." },
      "lastMessage": { "text": "See you tomorrow at 10!", "timestamp": "2026-05-05T18:30:00+05:30" },
      "unreadCount": 1
    }
  ]
}
```

### POST /api/messages/conversations/:id

**Request:**
```json
{
  "text": "Looking forward to the session!"
}
```

---

## Practitioner Availability

### GET /api/practitioners/:id/availability

**Query:** `?from=2026-05-05&to=2026-05-19`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "slots": [
      { "date": "2026-05-05", "times": ["09:00", "10:00", "14:00", "15:00", "16:00"] },
      { "date": "2026-05-06", "times": ["10:00", "11:00", "14:00"] },
      { "date": "2026-05-07", "times": [] }
    ]
  }
}
```

### PUT /api/practitioners/me/availability

**Request:**
```json
{
  "schedule": {
    "monday": { "start": "09:00", "end": "17:00", "breakStart": "12:00", "breakEnd": "13:00" },
    "tuesday": { "start": "09:00", "end": "17:00" },
    "wednesday": null,
    "thursday": { "start": "10:00", "end": "18:00" },
    "friday": { "start": "09:00", "end": "15:00" },
    "saturday": { "start": "10:00", "end": "14:00" },
    "sunday": null
  },
  "blockedDates": ["2026-05-15", "2026-05-16"]
}
```

---

## Pagination Convention

All list endpoints support:
- `page` (default: 1)
- `limit` (default: 20, max: 50)

Response includes `meta`:
```json
{ "page": 1, "pageSize": 20, "total": 147, "totalPages": 8 }
```

---

## Rate Limits

| Scope | Limit |
|-------|-------|
| Authenticated user | 100 requests/minute |
| Unauthenticated IP | 200 requests/minute |
| Auth endpoints | 10 requests/minute per IP |
| File uploads | 5 requests/minute per user |
