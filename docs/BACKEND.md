# Klear Karma v2 — Backend Architecture and Schema
**Stack**: Node.js + PostgreSQL | **Infra**: Cloudflare Workers (edge API) | **Prefix**: `kkv2-`

---

## Architecture Overview

```
┌───────────────────────────────────────────────────────┐
│                    MOBILE APP                          │
│              React Native (iOS + Android)              │
└──────────────────────┬────────────────────────────────┘
                       │ HTTPS / REST
                       ▼
┌───────────────────────────────────────────────────────┐
│               kkv2-api (Cloudflare Workers)            │
│                                                        │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  Auth    │  │  Users   │  │ Bookings │  │  Chat  │ │
│  │  Routes  │  │  Routes  │  │  Routes  │  │ Routes │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘ │
│       └──────────────┴──────────────┴───────────┘      │
│                       │                                 │
└───────────────────────┼─────────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
┌──────────────┐ ┌─────────────┐ ┌──────────────┐
│  PostgreSQL  │ │  Redis      │ │  Cloudflare  │
│  (Primary)   │ │  (Sessions  │ │  R2 / KV     │
│              │ │   + Cache)  │ │  (Assets)    │
│  Users       │ │             │ │              │
│  Practitioners│ │  Rate Limit │ │  kkv2-assets │
│  Bookings    │ │  JWT Tokens │ │  kkv2-kv     │
│  Payments    │ │  OTP Codes  │ │              │
│  Messages    │ │             │ │              │
│  Reviews     │ │             │ │              │
└──────────────┘ └─────────────┘ └──────────────┘
```

---

## Cloudflare Resource Naming

| Resource | Name | Type |
|----------|------|------|
| API Worker | `kkv2-api` | Workers |
| User KV | `kkv2-users-kv` | KV Namespace |
| Session KV | `kkv2-sessions-kv` | KV Namespace |
| Cache KV | `kkv2-cache-kv` | KV Namespace |
| Asset Storage | `kkv2-assets-r2` | R2 Bucket |
| Analytics | `kkv2-analytics` | Analytics Engine |
| Edge DB | `kkv2-edge-db` | D1 (edge cache layer) |

---

## Database Schema (PostgreSQL)

### ENUM Types

```sql
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended', 'deleted');
CREATE TYPE user_type AS ENUM ('seeker', 'practitioner');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'non_binary', 'prefer_not_to_say');
CREATE TYPE auth_provider AS ENUM ('email', 'google', 'apple');
CREATE TYPE verification_status AS ENUM ('pending', 'under_review', 'verified', 'rejected');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');
CREATE TYPE session_location AS ENUM ('practitioner', 'seeker', 'virtual');
CREATE TYPE message_status AS ENUM ('sent', 'delivered', 'read');
CREATE TYPE payout_status AS ENUM ('pending', 'processing', 'completed', 'failed');
```

### Users

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    password_hash VARCHAR(255) NOT NULL,
    user_type user_type NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    phone_verified BOOLEAN DEFAULT FALSE,
    profile_image_url TEXT,
    date_of_birth DATE,
    gender gender_type,
    status user_status DEFAULT 'active',
    timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
    language VARCHAR(10) DEFAULT 'en',
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_type ON users(user_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_status ON users(status) WHERE deleted_at IS NULL;
```

### User Profiles

```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(2) DEFAULT 'IN',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    preferences JSONB DEFAULT '{}',
    notification_settings JSONB DEFAULT '{
        "push_enabled": true,
        "booking_reminders": true,
        "new_messages": true,
        "promotions": false
    }',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_user ON user_profiles(user_id);
CREATE INDEX idx_profiles_location ON user_profiles(city, state, country);
CREATE INDEX idx_profiles_geo ON user_profiles USING gist (
    ST_MakePoint(longitude, latitude)
);
```

### User Authentication

```sql
CREATE TABLE user_auth (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider auth_provider NOT NULL,
    provider_id VARCHAR(255),
    refresh_token_hash VARCHAR(255),
    token_expires_at TIMESTAMPTZ,
    last_used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, provider)
);

CREATE INDEX idx_auth_user ON user_auth(user_id);
CREATE INDEX idx_auth_provider ON user_auth(provider, provider_id);
```

### Practitioners

```sql
CREATE TABLE practitioners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    bio TEXT NOT NULL,
    years_experience INTEGER DEFAULT 0,
    certifications JSONB DEFAULT '[]',
    languages VARCHAR(50)[] DEFAULT '{en}',
    session_fee_min INTEGER,  -- in paise (INR smallest unit)
    session_fee_max INTEGER,
    session_duration_min INTEGER DEFAULT 30,  -- minutes
    session_duration_max INTEGER DEFAULT 120,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    total_sessions INTEGER DEFAULT 0,
    verification_status verification_status DEFAULT 'pending',
    verification_documents JSONB DEFAULT '[]',
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES users(id),
    is_featured BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_practitioners_user ON practitioners(user_id);
CREATE INDEX idx_practitioners_status ON practitioners(verification_status);
CREATE INDEX idx_practitioners_rating ON practitioners(rating DESC);
CREATE INDEX idx_practitioners_featured ON practitioners(is_featured) WHERE is_featured = TRUE;
```

### Modalities (Healing Types)

```sql
CREATE TABLE modalities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data
INSERT INTO modalities (name, slug, icon_name, display_order) VALUES
    ('Reiki', 'reiki', 'hand', 1),
    ('Sound Therapy', 'sound-therapy', 'music', 2),
    ('Massage Therapy', 'massage-therapy', 'sparkles', 3),
    ('Life Coaching', 'life-coaching', 'compass', 4),
    ('Meditation', 'meditation', 'brain', 5),
    ('Yoga', 'yoga', 'stretch', 6),
    ('Acupuncture', 'acupuncture', 'target', 7),
    ('Ayurveda', 'ayurveda', 'leaf', 8),
    ('Crystal Healing', 'crystal-healing', 'gem', 9),
    ('Energy Work', 'energy-work', 'zap', 10);
```

### Practitioner Modalities (Many-to-Many)

```sql
CREATE TABLE practitioner_modalities (
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    modality_id UUID NOT NULL REFERENCES modalities(id) ON DELETE CASCADE,
    PRIMARY KEY (practitioner_id, modality_id)
);
```

### Services

```sql
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    modality_id UUID REFERENCES modalities(id),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    price INTEGER NOT NULL,  -- in paise
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_practitioner ON services(practitioner_id) WHERE is_active = TRUE;
```

### Availability

```sql
CREATE TABLE practitioner_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),  -- 0=Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

CREATE TABLE practitioner_blocked_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    blocked_date DATE NOT NULL,
    start_time TIME,  -- NULL = full day blocked
    end_time TIME,
    reason VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_availability_practitioner ON practitioner_availability(practitioner_id);
CREATE INDEX idx_blocked_practitioner ON practitioner_blocked_slots(practitioner_id, blocked_date);
```

### Bookings

```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seeker_id UUID NOT NULL REFERENCES users(id),
    practitioner_id UUID NOT NULL REFERENCES practitioners(id),
    service_id UUID NOT NULL REFERENCES services(id),
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location_type session_location NOT NULL,
    location_address TEXT,
    location_lat DECIMAL(10, 8),
    location_lng DECIMAL(11, 8),
    virtual_meeting_url TEXT,
    status booking_status DEFAULT 'pending',
    special_requests TEXT,
    total_amount INTEGER NOT NULL,  -- in paise
    commission_amount INTEGER NOT NULL,  -- platform cut in paise
    practitioner_amount INTEGER NOT NULL,  -- practitioner payout in paise
    cancelled_at TIMESTAMPTZ,
    cancelled_by UUID REFERENCES users(id),
    cancellation_reason TEXT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_seeker ON bookings(seeker_id);
CREATE INDEX idx_bookings_practitioner ON bookings(practitioner_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date, start_time);
CREATE INDEX idx_bookings_status ON bookings(status);
```

### Payments

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    user_id UUID NOT NULL REFERENCES users(id),
    amount INTEGER NOT NULL,  -- in paise
    currency VARCHAR(3) DEFAULT 'INR',
    payment_method VARCHAR(50),
    payment_gateway VARCHAR(50),  -- 'razorpay' | 'stripe'
    gateway_payment_id VARCHAR(255),
    gateway_order_id VARCHAR(255),
    status payment_status DEFAULT 'pending',
    paid_at TIMESTAMPTZ,
    refunded_at TIMESTAMPTZ,
    refund_amount INTEGER,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_gateway ON payments(gateway_payment_id);
```

### Practitioner Payouts

```sql
CREATE TABLE payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practitioner_id UUID NOT NULL REFERENCES practitioners(id),
    amount INTEGER NOT NULL,  -- in paise
    currency VARCHAR(3) DEFAULT 'INR',
    status payout_status DEFAULT 'pending',
    payout_method VARCHAR(50),  -- 'bank_transfer' | 'upi'
    bank_details JSONB,  -- encrypted reference
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    booking_ids UUID[] DEFAULT '{}',
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payouts_practitioner ON payouts(practitioner_id);
CREATE INDEX idx_payouts_status ON payouts(status);
```

### Reviews

```sql
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id),
    seeker_id UUID NOT NULL REFERENCES users(id),
    practitioner_id UUID NOT NULL REFERENCES practitioners(id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    tags VARCHAR(50)[] DEFAULT '{}',  -- ['punctual', 'skilled', 'warm', 'professional']
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_practitioner ON reviews(practitioner_id) WHERE is_visible = TRUE;
CREATE INDEX idx_reviews_seeker ON reviews(seeker_id);
CREATE INDEX idx_reviews_rating ON reviews(practitioner_id, rating);
```

### Conversations and Messages

```sql
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seeker_id UUID NOT NULL REFERENCES users(id),
    practitioner_id UUID NOT NULL REFERENCES practitioners(id),
    booking_id UUID REFERENCES bookings(id),
    last_message_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(seeker_id, practitioner_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text',  -- 'text' | 'image' | 'file' | 'booking_ref'
    attachment_url TEXT,
    status message_status DEFAULT 'sent',
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversations_seeker ON conversations(seeker_id);
CREATE INDEX idx_conversations_practitioner ON conversations(practitioner_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_messages_unread ON messages(conversation_id, sender_id) WHERE status != 'read';
```

### Notifications

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,  -- 'booking_confirmed' | 'booking_reminder' | 'new_message' | 'new_review'
    reference_type VARCHAR(50),  -- 'booking' | 'message' | 'review'
    reference_id UUID,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at DESC);
```

---

## API Endpoints

### Base URL
```
Production:  https://kkv2-api.klearkarma.com/v1
Staging:     https://kkv2-api-staging.klearkarma.com/v1
```

### Standard Response Envelope
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed",
  "timestamp": "2026-05-04T08:00:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable description",
    "field": "email"
  },
  "timestamp": "2026-05-04T08:00:00Z"
}
```

### Endpoint Map

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | No | Register seeker or practitioner |
| POST | `/auth/login` | No | Email/password login |
| POST | `/auth/social` | No | Google/Apple social login |
| POST | `/auth/refresh` | No | Refresh access token |
| POST | `/auth/forgot-password` | No | Send password reset email |
| POST | `/auth/reset-password` | No | Reset password with token |
| POST | `/auth/verify-email` | No | Verify email with OTP |
| POST | `/auth/verify-phone` | Yes | Verify phone with OTP |
| GET | `/users/me` | Yes | Get current user profile |
| PUT | `/users/me` | Yes | Update profile |
| PUT | `/users/me/avatar` | Yes | Upload profile image |
| DELETE | `/users/me` | Yes | Delete account (soft) |
| GET | `/practitioners` | Yes | Search practitioners (filtered) |
| GET | `/practitioners/:id` | Yes | Get practitioner profile |
| GET | `/practitioners/:id/services` | Yes | Get practitioner services |
| GET | `/practitioners/:id/availability` | Yes | Get available time slots |
| GET | `/practitioners/:id/reviews` | Yes | Get practitioner reviews |
| PUT | `/practitioners/me` | Yes | Update practitioner profile (practitioner only) |
| POST | `/practitioners/me/services` | Yes | Add service |
| PUT | `/practitioners/me/services/:id` | Yes | Update service |
| DELETE | `/practitioners/me/services/:id` | Yes | Remove service |
| PUT | `/practitioners/me/availability` | Yes | Set weekly availability |
| POST | `/practitioners/me/blocked-slots` | Yes | Block time slot |
| GET | `/modalities` | No | List all healing modalities |
| POST | `/bookings` | Yes | Create booking |
| GET | `/bookings` | Yes | List user bookings (with status filter) |
| GET | `/bookings/:id` | Yes | Get booking details |
| PUT | `/bookings/:id/cancel` | Yes | Cancel booking |
| PUT | `/bookings/:id/complete` | Yes | Mark booking completed (practitioner) |
| POST | `/bookings/:id/review` | Yes | Submit review for completed booking |
| POST | `/payments/create-order` | Yes | Create payment order (Razorpay) |
| POST | `/payments/verify` | Yes | Verify payment after completion |
| GET | `/payments/history` | Yes | Payment history |
| GET | `/practitioners/me/earnings` | Yes | Earnings dashboard |
| GET | `/practitioners/me/payouts` | Yes | Payout history |
| GET | `/conversations` | Yes | List conversations |
| GET | `/conversations/:id/messages` | Yes | Get messages in conversation |
| POST | `/conversations/:id/messages` | Yes | Send message |
| PUT | `/messages/:id/read` | Yes | Mark message as read |
| GET | `/notifications` | Yes | List notifications |
| PUT | `/notifications/:id/read` | Yes | Mark notification read |
| PUT | `/notifications/read-all` | Yes | Mark all notifications read |

---

## Authentication Flow

```
1. Register → email + password hash → JWT access token (1h) + refresh token (30d)
2. Login → verify credentials → same token pair
3. Social → OAuth callback → create/link user → same token pair
4. Refresh → refresh token → new access token
5. All authenticated routes → Bearer token in Authorization header
6. Token payload: { user_id, user_type, email, iat, exp }
```

---

## Payment Flow (Razorpay)

```
1. Client → POST /payments/create-order { booking_id, amount }
2. Server → Creates Razorpay order → returns order_id
3. Client → Opens Razorpay checkout with order_id
4. Client → User completes payment
5. Client → POST /payments/verify { razorpay_order_id, razorpay_payment_id, razorpay_signature }
6. Server → Verifies signature → updates booking status to 'confirmed'
7. Server → Sends confirmation notification to both parties
```

---

## Search Query (Practitioner Discovery)

```sql
-- Example: Find verified practitioners near location, filtered by modality
SELECT
    p.id, p.title, p.bio, p.rating, p.total_reviews,
    p.session_fee_min, p.session_fee_max,
    u.first_name, u.last_name, u.profile_image_url,
    up.city, up.state,
    ST_Distance(
        ST_MakePoint(up.longitude, up.latitude)::geography,
        ST_MakePoint(:lng, :lat)::geography
    ) / 1000 AS distance_km,
    array_agg(m.name) AS modalities
FROM practitioners p
JOIN users u ON p.user_id = u.id
JOIN user_profiles up ON u.id = up.user_id
JOIN practitioner_modalities pm ON p.id = pm.practitioner_id
JOIN modalities m ON pm.modality_id = m.id
WHERE p.verification_status = 'verified'
  AND p.is_available = TRUE
  AND u.status = 'active'
  AND (:modality_slug IS NULL OR m.slug = :modality_slug)
  AND (:min_rating IS NULL OR p.rating >= :min_rating)
  AND ST_DWithin(
        ST_MakePoint(up.longitude, up.latitude)::geography,
        ST_MakePoint(:lng, :lat)::geography,
        :radius_meters
  )
GROUP BY p.id, u.id, up.id
ORDER BY
    CASE WHEN :sort = 'distance' THEN ST_Distance(ST_MakePoint(up.longitude, up.latitude)::geography, ST_MakePoint(:lng, :lat)::geography) END ASC,
    CASE WHEN :sort = 'rating' THEN p.rating END DESC,
    CASE WHEN :sort = 'price_low' THEN p.session_fee_min END ASC,
    CASE WHEN :sort = 'price_high' THEN p.session_fee_max END DESC
LIMIT :limit OFFSET :offset;
```
