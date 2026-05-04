# Klear Karma v2 — Screen Specifications

> **Platform**: React Native (Expo) | **Design System**: `docs/DESIGN.md`
> **Font**: Outfit | **Accent**: Sage #16A34A | **Background**: Canvas #FAFAF8

---

## Navigation Architecture

```
Tab Navigator (Bottom)
├── Home (Seeker) / Dashboard (Practitioner)
├── Search
├── Bookings
├── Messages
└── Profile
```

**Tab bar**: 5 icons, Sage active state, Stone-400 inactive. Height: 56px + safe area.

---

# SEEKER FLOW

## 1. Authentication

### 1.1 Welcome Screen
- Full-screen Canvas Warm background
- App icon (ceramic stone) centered upper third
- "Klear Karma" in Outfit 700, 28px, Ink Deep
- "Find healers you can trust" in Outfit 400, 16px, Stone Secondary
- [Get Started] — Sage button, full width, 48px height
- "Already have an account? Sign in" — text link below

### 1.2 Sign Up
- Header: "Create Account" (H2, left-aligned)
- Fields (stacked, 12px gap):
  - Full name (text)
  - Email (email keyboard)
  - Phone with +91 prefix (numeric keyboard)
  - Password (secure, show/hide toggle)
- [Create Account] — Sage button
- Divider: "or continue with"
- Social buttons: [Google] [Apple] — outlined, side by side
- Footer: "Already have an account? Sign in"

### 1.3 Login
- Header: "Welcome back"
- Email/phone input
- Password input
- "Forgot password?" link (right-aligned, Sage color)
- [Sign In] — Sage button
- Social login row
- Footer: "New here? Create account"

### 1.4 OTP Verification
- Header: "Verify your phone"
- Subtext: "We sent a code to +91 98XXXX1234"
- 6-digit OTP input (individual boxes, auto-advance)
- [Verify] — Sage button
- "Didn't receive? Resend in 0:30" (countdown timer)

---

## 2. Onboarding (3 Steps)

### 2.1 Profile Basics (Step 1/3)
- Progress bar: 33% filled (Sage)
- Avatar upload (camera + gallery option, 80px circle)
- Name (pre-filled from signup)
- Location: "Allow location" button or manual city picker
- [Continue] — Sage button

### 2.2 Preferences (Step 2/3)
- Progress bar: 66%
- "What are you looking for?" (H3)
- Modality chips (multi-select, wrap layout):
  - Reiki, Yoga, Meditation, Massage, Sound Therapy, Ayurveda, Acupuncture, Crystal Healing, Life Coaching, Energy Work
- Selected state: Sage background + white text
- Unselected: Surface Pure + Stone border
- Budget range: Dual slider (₹500 – ₹10,000)
- Gender preference: "No preference" | "Female" | "Male" (radio)
- [Continue]

### 2.3 Notifications (Step 3/3)
- Progress bar: 100%
- Illustration: bell icon with schedule indicators
- "Stay updated on bookings and messages"
- [Enable Notifications] — Sage button
- "Skip for now" — text link

---

## 3. Home Screen

### Layout (top to bottom):
1. **Header row**: "Hi, [Name] 👋" (left) + notification bell (right, badge count)
2. **Location bar**: 📍 "Bangalore, Indiranagar" (tappable to change)
3. **Search bar**: Rounded input, placeholder "Search practitioners or modalities..."
4. **Category scroll**: Horizontal chips (icon + label), 12px gap between
5. **Section: "Recommended for You"**: Horizontal scroll of practitioner cards
6. **Section: "Top Rated Nearby"**: Vertical list of practitioner cards

### Practitioner Card (Horizontal scroll variant):
```
┌────────────────────────┐  Width: 260px
│  [Avatar 48px]         │  Radius: 12px
│  Priya Sharma          │  Shadow: card
│  Reiki Master          │  Padding: 16px
│  ★ 4.8 (127 reviews)  │
│  2.3 km away           │
│  ₹1,500/session        │
└────────────────────────┘
```

---

## 4. Search & Discovery

### 4.1 Search Screen
- Sticky search bar at top (auto-focused on entry)
- Recent searches (chips, clearable)
- Filter bar: [Modality ▾] [Distance ▾] [Price ▾] [Rating ▾] [Availability ▾]
- Results: Vertical list of practitioner cards
- Empty state: "No practitioners found. Try broadening your filters."

### 4.2 Filter Bottom Sheet
- Modality multi-select (chips)
- Distance slider (1-50 km)
- Price range (₹500-₹10,000)
- Minimum rating (1-5 stars, tap to select)
- Availability: "Today" | "This week" | "Any"
- [Apply Filters] + "Reset all" link

---

## 5. Practitioner Profile

### Layout:
1. **Cover area**: Large photo (240px height) + back button overlay
2. **Info card** (overlaps cover by 24px):
   - Name (H2), Verified badge (✓ green)
   - Modalities (chips)
   - Rating: ★ 4.8 (127 reviews)
   - Location: "Indiranagar, Bangalore · 2.3 km"
   - Experience: "8 years"
3. **Tab row**: About | Services | Reviews | Availability
4. **About tab**: Bio text, certifications list, peer endorsements
5. **Services tab**: List of offered services with price + duration
6. **Reviews tab**: Rating breakdown (5-bar chart) + review cards
7. **Availability tab**: Calendar (next 14 days) + time slots
8. **Sticky footer**: [Book Session — ₹1,500] Sage button

---

## 6. Booking Flow

### 6.1 Select Service
- Practitioner mini-card (avatar + name + modality)
- Service options (radio list):
  - "Reiki Healing — 60 min — ₹1,500"
  - "Distance Reiki — 30 min — ₹800"
- [Continue]

### 6.2 Select Date & Time
- Calendar picker (next 14 days, greyed-out unavailable dates)
- Time slots grid (morning / afternoon / evening sections)
- Selected slot: Sage fill + white text
- [Continue]

### 6.3 Confirm & Pay
- Booking summary card:
  - Practitioner name + avatar
  - Service name + duration
  - Date + time
  - Location (or "Online")
- Price breakdown:
  - Session fee: ₹1,500
  - Platform fee: ₹0 (absorbed into commission)
  - **Total: ₹1,500**
- Payment method selector (UPI, Card, Wallet)
- [Pay ₹1,500] — Sage button

### 6.4 Confirmation
- ✓ Checkmark animation (Sage, spring physics)
- "Booking Confirmed!"
- Summary card (date, time, practitioner)
- "Add to Calendar" button
- [View Booking] | [Back to Home]

---

## 7. Bookings List

- Tab row: "Upcoming" | "Past" | "Cancelled"
- **Upcoming card**:
  - Practitioner avatar + name
  - Date + time
  - Modality
  - [Message] [Cancel] buttons
- **Past card**:
  - Same as above + "★ Leave Review" CTA (if not reviewed)
- Empty state: "No bookings yet. Find a practitioner to get started."

---

## 8. Messages

- Conversation list (avatar + name + last message + timestamp)
- Unread indicator: Sage dot
- Individual chat: Standard chat UI (messages left/right, timestamps)
- Input bar: Text field + send button (Sage)

---

## 9. Profile (Seeker)

- Avatar (large, 80px) + name + email
- Sections:
  - Personal Information → Edit screen
  - Payment Methods → List + add
  - Notifications → Toggle settings
  - Help & Support → FAQ + contact
  - About Klear Karma → Version info
  - Sign Out → Confirmation dialog

---

# PRACTITIONER FLOW

## 10. Dashboard

### Layout:
1. **Header**: "Good morning, Priya" + notification bell
2. **Stats row** (3 cards, horizontal scroll):
   - "Today: 3 sessions"
   - "This week: ₹12,500"
   - "Rating: ★ 4.8"
3. **Section: "Upcoming Sessions"**: List of next 3 bookings
4. **Section: "Recent Activity"**: Booking requests, reviews, messages

---

## 11. Availability Management

- Weekly calendar view (Mon-Sun columns)
- Time blocks (morning/afternoon/evening)
- Tap to toggle available/unavailable
- "Set recurring schedule" toggle
- Block specific dates (holiday mode)
- [Save Availability] — Sage button

---

## 12. Earnings

- Period selector: "This Week" | "This Month" | "All Time"
- Earnings card: "₹12,500 earned" (large H1, Sage)
- Breakdown:
  - Completed sessions: 8
  - Commission deducted: ₹3,125
  - Pending payout: ₹9,375
- Transaction list (date, seeker name, amount, status)
- [Request Payout] if balance > ₹500

---

## 13. Practitioner Profile Edit

- Photo management (cover + avatar)
- Bio (multiline text, 500 char max)
- Modalities (chip multi-select)
- Services (add/edit/remove):
  - Name + description + duration + price
- Certifications (upload photos + titles)
- [Save Changes]

---

## Loading & Error States

| State | Implementation |
|-------|---------------|
| Loading | Skeleton pulse (Sage-Soft → Canvas Warm animation) |
| Empty | Illustration + message + CTA button |
| Error | Inline red banner (Error color) + retry button |
| Offline | Top banner "No connection" + cached content |
| Pull to refresh | Spring physics, Sage indicator |
