# Klear Karma v2 — Constants & Design Tokens

> **Stack**: React Native (Expo) + Hono on Cloudflare Workers
> **Design origin**: taste-design (Google Stitch) — see `docs/DESIGN.md`

---

## Design Tokens (React Native)

### Colors

```typescript
export const colors = {
  // Core
  canvasWarm: '#FAFAF8',      // App background
  surfacePure: '#FFFFFF',      // Cards, modals
  inkDeep: '#1C1917',          // Headings (Stone-950, never pure black)
  stoneSecondary: '#78716C',   // Body text (Stone-500)
  mistTertiary: '#A8A29E',     // Captions, disabled (Stone-400)
  whisperBorder: 'rgba(214, 211, 209, 0.6)', // Borders (Stone-300)
  diffusedShadow: 'rgba(28, 25, 23, 0.04)',  // Card shadows

  // Accent
  sage: '#16A34A',             // Primary CTA, success, active states
  sageSoft: '#DCFCE7',         // Badges, subtle highlights
  sageHover: '#15803D',        // Pressed state

  // Semantic
  error: '#DC2626',            // Destructive, validation errors
  errorSoft: '#FEE2E2',       // Error backgrounds
  warning: '#F59E0B',         // Warnings
  warningSoft: '#FEF3C7',     // Warning backgrounds

  // Overlays
  scrim: 'rgba(28, 25, 23, 0.5)',  // Modal backdrop
} as const;
```

### Typography

```typescript
export const typography = {
  // Font family — Outfit ONLY (Inter BANNED, Poppins BANNED)
  fontFamily: 'Outfit',

  // Scale
  display: { size: 32, weight: '700', lineHeight: 40 },
  h1: { size: 28, weight: '700', lineHeight: 36 },
  h2: { size: 22, weight: '600', lineHeight: 28 },
  h3: { size: 18, weight: '600', lineHeight: 24 },
  body: { size: 16, weight: '400', lineHeight: 24 },
  bodySmall: { size: 14, weight: '400', lineHeight: 20 },
  caption: { size: 13, weight: '400', lineHeight: 18 },
  button: { size: 15, weight: '600', lineHeight: 20 },
  tabLabel: { size: 11, weight: '500', lineHeight: 14 },
} as const;
```

### Spacing

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
} as const;
```

### Border Radius

```typescript
export const radius = {
  sm: 8,     // Chips, tags
  md: 12,    // Cards, inputs, buttons
  lg: 16,    // Modals, bottom sheets
  full: 9999, // Avatars, pills
} as const;
```

### Shadows

```typescript
export const shadows = {
  card: {
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  elevated: {
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
} as const;
```

### Motion (Spring Physics)

```typescript
export const motion = {
  // Standard spring — all UI transitions
  spring: { stiffness: 100, damping: 20, mass: 1 },

  // Snappy spring — button presses, toggles
  snappy: { stiffness: 300, damping: 30, mass: 1 },

  // Gentle spring — modal entrances, page transitions
  gentle: { stiffness: 80, damping: 20, mass: 1.2 },

  // Entrance animation
  entrance: {
    from: { opacity: 0, translateY: 8 },
    to: { opacity: 1, translateY: 0 },
  },

  // Stagger delay between sibling items
  staggerMs: 50,

  // Press feedback
  pressScale: 0.97,
} as const;
```

---

## API Constants

```typescript
export const api = {
  baseUrl: __DEV__
    ? 'http://localhost:8787'
    : 'https://kkv2-api.yourname.workers.dev',

  endpoints: {
    health: '/health',
    auth: {
      register: '/api/auth/register',
      login: '/api/auth/login',
      refresh: '/api/auth/refresh',
      logout: '/api/auth/logout',
      forgotPassword: '/api/auth/forgot-password',
      verifyEmail: '/api/auth/verify-email',
      verifyOtp: '/api/auth/verify-otp',
    },
    users: '/api/users',
    practitioners: '/api/practitioners',
    bookings: '/api/bookings',
    payments: '/api/payments',
    reviews: '/api/reviews',
    messages: '/api/messages',
    search: '/api/search',
  },

  // Token storage keys (expo-secure-store)
  tokenKeys: {
    access: 'kkv2_access_token',
    refresh: 'kkv2_refresh_token',
  },

  // Timeouts
  timeout: 15000, // 15s
  uploadTimeout: 60000, // 60s for file uploads
} as const;
```

---

## App Constants

```typescript
export const app = {
  name: 'Klear Karma',
  tagline: 'Find healers you can trust',
  version: '2.0.0',

  // Modality categories
  modalities: [
    { id: 'reiki', label: 'Reiki', icon: 'hand-sparkles' },
    { id: 'yoga', label: 'Yoga', icon: 'person-yoga' },
    { id: 'meditation', label: 'Meditation', icon: 'brain' },
    { id: 'massage', label: 'Massage', icon: 'hand-holding-heart' },
    { id: 'sound', label: 'Sound Therapy', icon: 'music' },
    { id: 'ayurveda', label: 'Ayurveda', icon: 'leaf' },
    { id: 'acupuncture', label: 'Acupuncture', icon: 'pen-nib' },
    { id: 'crystal', label: 'Crystal Healing', icon: 'gem' },
    { id: 'coaching', label: 'Life Coaching', icon: 'comments' },
    { id: 'energy', label: 'Energy Work', icon: 'bolt' },
  ],

  // Session durations
  durations: [30, 45, 60, 90, 120], // minutes

  // Price range (INR)
  priceRange: { min: 500, max: 10000 },

  // Search radius (km)
  searchRadius: { default: 10, max: 50 },

  // Pagination
  pageSize: 20,
} as const;
```

---

## Anti-Patterns (BANNED)

| ❌ NEVER | ✅ ALWAYS |
|----------|----------|
| Inter font | Outfit font |
| Pure black `#000000` | Stone-950 `#1C1917` |
| Circular spinner | Skeleton pulse loader |
| Linear easing | Spring physics |
| 3-column equal grids | Asymmetric layouts |
| Blue primary color | Sage green `#16A34A` |
| Emojis in UI | Icons or nothing |
| "Seamless", "Elevate", "Next-Gen" | Clear, direct language |
| Glassmorphism | Clean surfaces with subtle shadow |
| Gradient backgrounds | Solid `#FAFAF8` canvas |
