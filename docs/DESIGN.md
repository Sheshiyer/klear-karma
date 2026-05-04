# Klear Karma v2 — Design System
**Skill origin**: taste-design (Google Stitch) | **Platform**: React Native (iOS + Android)

---

## Configuration Dials

| Dial | Level | Rationale |
|------|-------|-----------|
| **Creativity** | `7` | Wellness needs warmth and personality, not clinical sterility. Editorial touches without chaos |
| **Density** | `4` | Gallery-airy with breathing room. Healing app = calm spatial rhythm. Never cramped |
| **Variance** | `6` | Enough asymmetry to feel alive, enough structure to feel trustworthy |
| **Motion Intent** | `5` | Subtle entrance cues and hover states. No theatrical orchestration — this is a booking tool, not a showreel |

---

## 1. Visual Theme and Atmosphere

A warm, grounded interface that feels like walking into a well-designed wellness studio — not a generic health app. Clean surfaces with intentional negative space. Every element earns its place through function. The overall impression: **trustworthy, calm, alive**.

The app should feel like the intersection of a premium booking experience (ClassPass/Mindbody quality) and a wellness brand (Headspace/Calm warmth) — without copying either.

**Key atmosphere words**: Grounded. Warm. Intentional. Premium-quiet. Trust-forward.

---

## 2. Color Palette and Roles

### Core Palette

| Token | Hex | Role |
|-------|-----|------|
| **Canvas Warm** | `#FAFAF8` | Primary background. Warm off-white, never blue-white |
| **Surface Pure** | `#FFFFFF` | Card fill, elevated containers |
| **Ink Deep** | `#1C1917` | Primary text. Stone-950 warmth — never pure black |
| **Stone Secondary** | `#78716C` | Body text, descriptions, metadata. Stone-500 |
| **Mist Tertiary** | `#A8A29E` | Timestamps, disabled states, helper text. Stone-400 |
| **Whisper Border** | `rgba(214, 211, 209, 0.6)` | Card borders, dividers. Semi-transparent Stone-300 |
| **Diffused Shadow** | `rgba(28, 25, 23, 0.04)` | Card elevation. Wide blur, soft offset |

### Accent Color (ONE accent — Sage Signal)

| Token | Hex | Role |
|-------|-----|------|
| **Sage Primary** | `#16A34A` | Primary action buttons, success states, verification badges. Green-600 |
| **Sage Light** | `#DCFCE7` | Light backgrounds for success/verified states. Green-100 |
| **Sage Dark** | `#15803D` | Pressed/active state for primary buttons. Green-700 |

### Semantic Colors

| Token | Hex | Role |
|-------|-----|------|
| **Warning Amber** | `#D97706` | Pending states, caution indicators |
| **Error Rose** | `#DC2626` | Error states, destructive actions, cancellations |
| **Info Slate** | `#475569` | Informational badges, neutral indicators |

### Banned Colors
- Purple/violet neon gradients (the "AI Purple" aesthetic)
- Pure black (`#000000`) — always Stone-950 or warmer
- Oversaturated accents above 80% saturation
- Chakra rainbow gradients anywhere in the UI
- Mixed warm/cool gray systems

---

## 3. Typography

### Font Stack

| Role | Font | Weight | Tracking | Leading |
|------|------|--------|----------|---------|
| **Display / Headlines** | `Outfit` | 600–700 | `-0.02em` | `1.15` |
| **Body** | `Outfit` | 400 | `0` | `1.6` |
| **Mono / Metadata** | `JetBrains Mono` | 400 | `0.01em` | `1.5` |
| **Accent Labels** | `Outfit` | 500 | `0.05em` | `1.2` |

### Type Scale (React Native)

| Token | Size | Usage |
|-------|------|-------|
| `display-lg` | 28px | Screen titles, hero text |
| `display-sm` | 22px | Section headers |
| `heading` | 18px | Card titles, practitioner names |
| `body` | 15px | Body text, descriptions |
| `body-sm` | 13px | Secondary text, captions |
| `caption` | 11px | Timestamps, metadata, badges |
| `mono` | 12px | Prices, IDs, codes |

### Banned Fonts
- `Inter` — banned everywhere. Generic AI default
- `Times New Roman`, `Georgia`, `Garamond` — no generic serifs
- `Poppins` — overused in wellness apps. We are not another Poppins app
- System default sans-serif as display font

---

## 4. Component Styling

### Buttons
- **Primary**: Sage fill (`#16A34A`), white text, `border-radius: 12px`, `padding: 16px 24px`. Active: `scale(0.98)` + darken to Sage Dark. No outer glow. No gradient
- **Secondary**: Ghost/outline with Stone border. Ink Deep text. Hover: light Stone fill
- **Destructive**: Error Rose fill, white text. Same radius and padding
- **Icon buttons**: 44px minimum tap target, 8px padding, subtle background on press
- **Full-width on mobile**: All CTAs stretch to container width on screens < 768px

### Cards
- `border-radius: 16px`
- Surface Pure fill
- Whisper Border (`1px`, semi-transparent)
- Diffused Shadow (`0 8px 24px -8px rgba(28,25,23,0.04)`)
- Internal padding: `16px`
- **Practitioner cards**: Avatar (48px circle) + name/title/rating row + price + action button
- **Booking cards**: Status indicator dot + practitioner summary + date/time + service

### Inputs and Forms
- Label above input (Accent Label style, `caption` size, Stone Secondary color)
- Input: `border-radius: 10px`, Whisper Border, `padding: 14px 16px`, Body font
- Focus: 2px Sage ring, subtle background warmth
- Error: Error Rose border + error text below in `body-sm`
- Standard `8px` gap between label → input → error stack

### Navigation (Bottom Tab Bar)
- 5 tabs: Home, Search, Bookings, Messages, Profile
- Active tab: Sage Primary icon + label. Inactive: Stone Secondary
- No hamburger menus. Bottom tabs always visible
- Tab bar: Surface Pure background, top border Whisper Border, `padding-bottom: safe-area`

### Status Badges
- **Verified**: Sage Light background + Sage Primary text + check icon
- **Pending**: Amber-50 background + Warning Amber text
- **Cancelled**: Rose-50 background + Error Rose text
- All badges: `border-radius: 6px`, `padding: 4px 10px`, `caption` font, `font-weight: 500`

### Loading States
- Skeleton shimmer matching exact layout dimensions and border radius
- Warm shimmer gradient (Canvas Warm → Surface Pure → Canvas Warm)
- No circular spinners anywhere. Ever

### Empty States
- Centered illustration (line art, monochrome Stone) + heading + description + action CTA
- Never just "No data found"

---

## 5. Layout Principles

### Screen Structure
```
┌─────────────────────────┐
│  Status Bar (system)    │
├─────────────────────────┤
│  Header / Nav Bar       │  ← 56px, sticky
├─────────────────────────┤
│                         │
│  Scrollable Content     │  ← flex: 1
│  padding: 16px          │
│                         │
├─────────────────────────┤
│  Bottom Tab Bar         │  ← safe area aware
└─────────────────────────┘
```

### Spacing System
- Base unit: `4px`
- Section gaps: `24px`
- Card gaps: `12px`
- Internal card padding: `16px`
- Screen horizontal padding: `16px`
- Between label and input: `8px`

### Grid Rules
- Single column layout for all mobile screens (no multi-column on phone)
- Practitioner cards: vertical list, full width
- Category chips: horizontal scroll, no wrap
- Services list: vertical stack, full width per item
- Review cards: vertical stack

### Banned Layouts
- No 3-column equal card grids (phone screens are single column)
- No overlapping elements — clean spatial separation always
- No hero sections with text over images
- No horizontal scroll for primary content (only for chips/categories)
- No tab-within-tab nesting

---

## 6. Iconography

- **Style**: Outlined, 24px default, 1.5px stroke
- **Library**: Lucide React Native (consistent, open source)
- **Active state**: Filled variant at same size
- **Color**: inherits from context (Ink Deep for nav, Stone Secondary for metadata, Sage for active)

---

## 7. Motion and Interaction

### Principles
- Spring physics: `stiffness: 120, damping: 20` — weighty, premium feel
- All transitions via `transform` and `opacity` only
- Target 60fps minimum on all animations

### Screen Transitions
- Push navigation: slide-in from right, 250ms spring
- Modal presentation: slide-up from bottom, 300ms spring
- Tab switch: crossfade, 150ms

### Micro-Interactions
- Button press: `scale(0.97)`, 100ms spring
- Card press: subtle shadow deepening + `scale(0.99)`
- Pull-to-refresh: custom spring indicator with Sage accent
- List items: staggered fade-in on mount (`delay: index * 60ms`)
- Rating stars: sequential fill animation on selection

### Banned Motion
- No bounce effects
- No parallax scrolling
- No auto-playing carousels
- No "scroll to explore" prompts or bouncing arrows
- No linear easing — spring physics only

---

## 8. Anti-Patterns (Banned)

### Visual
- No emojis in UI
- No chakra/rainbow gradients
- No glassmorphism or heavy blur effects
- No neon outer glows
- No oversaturated colors
- No gradient text on headers
- No decorative illustrations that serve no function

### Typography
- No `Inter` font
- No generic serif fonts
- No ALL CAPS for body text (only for small labels/badges)
- No font sizes below 11px

### Content
- No AI copywriting cliches: "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize", "Transform Your Life"
- No fake statistics or fabricated metrics
- No generic placeholder names ("John Doe", "Jane Smith")
- No "Scroll to explore" or similar filler UI text
- No claims of "scientifically validated" healing outcomes

### Technical
- No `height: 100vh` — use `100dvh` or flex
- No z-index stacking beyond navbar/modal/overlay
- No circular loading spinners
- No broken Unsplash links — use `picsum.photos` or custom assets
- No horizontal overflow on any screen

---

## 9. Rork.com Generation Notes

When generating screens in Rork.com, apply these rules:

1. **Set font to Outfit** — override any default font selection
2. **Use the Sage accent palette** — override blue/purple defaults
3. **Bottom tab navigation** — 5 tabs as specified, not drawer/hamburger
4. **Card styling** — generous radius (16px), subtle shadow, warm borders
5. **Single column** — no grid experiments on mobile screens
6. **Every interactive element** — minimum 44px tap target
7. **Status bar** — dark content on light background
8. **Safe area** — respect bottom safe area for tab bar and top for status bar
