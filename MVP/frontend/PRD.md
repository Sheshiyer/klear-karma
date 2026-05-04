# Klear Karma v2 — Frontend PRD

> **Platform**: React Native (Expo) | **Builder**: Rork.com (initial scaffold)
> **Design System**: `docs/DESIGN.md` | **Screens**: `frontend/screens.md`

---

## Overview

The Klear Karma mobile app is a dual-sided marketplace with two user roles:
- **Seekers** — browse, book, and review alternative healing practitioners
- **Practitioners** — manage availability, accept bookings, track earnings

Single app binary with role-based navigation after auth.

---

## Technical Stack

| Layer | Tool |
|-------|------|
| Framework | React Native (Expo SDK 52+) |
| Navigation | Expo Router (file-based) |
| State | Zustand (lightweight global state) |
| API Client | TanStack Query + fetch |
| Forms | React Hook Form + Zod validation |
| Animations | React Native Reanimated (spring physics) |
| Storage | expo-secure-store (tokens), AsyncStorage (preferences) |
| Maps | react-native-maps (practitioner search) |
| Payments | Razorpay React Native SDK |
| Push | expo-notifications + Firebase FCM |

---

## User Flows (Seeker)

### Flow 1: Registration → Onboarding
```
Welcome → Sign Up → OTP Verify → Profile Setup → Preferences → Notifications → Home
```

### Flow 2: Discovery → Booking
```
Home → Search/Browse → Practitioner Profile → Select Service → Pick Slot → Pay → Confirmation
```

### Flow 3: Session Lifecycle
```
Upcoming Booking → Reminder Notification → Session → Review Prompt → Submit Review
```

### Flow 4: Rebooking
```
Past Bookings → View Practitioner → Book Again → Pay → Confirmation
```

---

## User Flows (Practitioner)

### Flow 5: Registration → Verification
```
Welcome → Sign Up (Practitioner) → Upload Credentials → Submit → Pending Review → Approved
```

### Flow 6: Dashboard → Session Management
```
Dashboard → Accept Booking → Session Day → Mark Complete → View Earnings
```

### Flow 7: Availability Management
```
Dashboard → Availability → Set Weekly Schedule → Block Dates → Save
```

---

## Navigation Structure

```
app/
├── (auth)/
│   ├── welcome.tsx
│   ├── login.tsx
│   ├── register.tsx
│   ├── verify-otp.tsx
│   └── forgot-password.tsx
├── (onboarding)/
│   ├── profile.tsx
│   ├── preferences.tsx
│   └── notifications.tsx
├── (seeker)/
│   ├── (tabs)/
│   │   ├── home.tsx
│   │   ├── search.tsx
│   │   ├── bookings.tsx
│   │   ├── messages.tsx
│   │   └── profile.tsx
│   ├── practitioner/[id].tsx
│   ├── booking/[id].tsx
│   ├── booking/new.tsx
│   ├── review/new.tsx
│   └── chat/[id].tsx
├── (practitioner)/
│   ├── (tabs)/
│   │   ├── dashboard.tsx
│   │   ├── bookings.tsx
│   │   ├── messages.tsx
│   │   ├── earnings.tsx
│   │   └── profile.tsx
│   ├── availability.tsx
│   ├── booking/[id].tsx
│   └── chat/[id].tsx
└── _layout.tsx
```

---

## Key Components

### Shared Components
| Component | Description |
|-----------|-------------|
| `Button` | Primary (Sage fill) / Secondary (outlined) / Ghost |
| `Input` | Text, email, phone, password, OTP |
| `Card` | Surface white, 12px radius, card shadow |
| `Avatar` | Circle image with fallback initials |
| `Chip` | Selectable tag (modality, filter) |
| `Rating` | Star display (read) / star picker (write) |
| `SkeletonLoader` | Pulse animation placeholder |
| `BottomSheet` | Filters, confirmations, actions |
| `Toast` | Success/error notifications |

### Domain Components
| Component | Description |
|-----------|-------------|
| `PractitionerCard` | Avatar + name + modality + rating + price |
| `BookingCard` | Practitioner + date/time + status + actions |
| `ReviewCard` | Avatar + name + rating + text + date |
| `ServiceOption` | Radio list item (name + duration + price) |
| `TimeSlotGrid` | Available slots grouped by period |
| `CategoryScroll` | Horizontal modality chips with icons |

---

## Data Contracts

### Auth State
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}
```

### User
```typescript
interface User {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  avatarUrl: string | null;
  role: 'seeker' | 'practitioner';
  isVerified: boolean;
  preferences?: SeekerPreferences;
}
```

### Practitioner (Search Result)
```typescript
interface PractitionerCard {
  id: string;
  fullName: string;
  avatarUrl: string;
  modalities: string[];
  rating: number;
  reviewCount: number;
  distanceKm: number;
  priceRange: { min: number; max: number }; // paise
  isVerified: boolean;
  verificationTier: 'basic' | 'trusted' | 'expert';
}
```

### Booking
```typescript
interface Booking {
  id: string;
  practitionerId: string;
  practitionerName: string;
  practitionerAvatar: string;
  serviceId: string;
  serviceName: string;
  date: string; // ISO date
  startTime: string; // HH:mm
  durationMinutes: number;
  amountPaise: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  location: string | 'online';
}
```

---

## Performance Requirements

| Metric | Target |
|--------|--------|
| App launch → interactive | <3s |
| Screen transitions | <300ms (spring animation) |
| Search results render | <1.5s |
| Image load (with placeholder) | <2s |
| Bundle size (initial download) | <15MB |
| Memory usage (idle) | <150MB |

---

## Rork.com Generation Notes

When uploading to Rork.com, include:
1. This file (`frontend/PRD.md`) — for flow structure
2. `docs/DESIGN.md` — for visual system
3. `frontend/screens.md` — for screen-by-screen specs
4. `MVP/constants.md` — for exact color/token values

**Rork.com prompt hints:**
- "Use Expo Router file-based navigation"
- "Outfit font family only — no Inter"
- "Sage green #16A34A as single accent color"
- "Background #FAFAF8, never pure white for app background"
- "Spring physics for all animations (react-native-reanimated)"
- "Skeleton loaders instead of spinners"
