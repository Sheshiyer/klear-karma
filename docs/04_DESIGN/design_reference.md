# Design System Reference — Klear Karma v2
> Full design system specification in `../DESIGN.md`

## Quick Reference

### Colors
| Token | Hex | Use |
|-------|-----|-----|
| Canvas Warm | `#FAFAF8` | App background |
| Surface Pure | `#FFFFFF` | Cards |
| Ink Deep | `#1C1917` | Headings |
| Stone Secondary | `#78716C` | Body text |
| Sage Accent | `#16A34A` | CTAs, success, primary actions |
| Sage Soft | `#DCFCE7` | Badges, subtle highlights |
| Error | `#DC2626` | Destructive actions, validation |

### Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Outfit | 28px | 700 |
| H2 | Outfit | 22px | 600 |
| Body | Outfit | 16px | 400 |
| Caption | Outfit | 13px | 400 |
| Button | Outfit | 15px | 600 |

### Spacing Scale
`4 → 8 → 12 → 16 → 24 → 32 → 48 → 64 → 96`

### Border Radius
- Small (chips, tags): `8px`
- Medium (cards, inputs): `12px`
- Large (modals, sheets): `16px`
- Full (avatars, pills): `9999px`

### Motion
- All animations: spring physics (stiffness: 100, damping: 20)
- No linear easing anywhere
- Entrance: `opacity 0→1 + translateY 8→0`
- Stagger delay: `50ms` between siblings

## Anti-Patterns (BANNED)

- ❌ Inter font — use Outfit
- ❌ Pure black `#000000` — use Stone-950 `#1C1917`
- ❌ Circular loading spinners — use skeleton pulse
- ❌ 3-column equal card grids — use asymmetric layouts
- ❌ Linear easing — use spring physics
- ❌ Emojis in UI — use icons or nothing
- ❌ Words: "Seamless", "Elevate", "Next-Gen", "Unleash"

## Component Patterns

### Card (Practitioner)
```
┌─────────────────────────────┐
│  [Avatar 48px]  Name        │
│                 Modality     │
│                 ★ 4.8 (127) │
│─────────────────────────────│
│  ₹1,500/session  [Book →]  │
└─────────────────────────────┘
```
- Background: `#FFFFFF`
- Border: `rgba(214,211,209,0.6)` 1px
- Shadow: `0 1px 3px rgba(28,25,23,0.04)`
- Radius: `12px`
- Padding: `16px`

### Button (Primary)
- Background: Sage `#16A34A`
- Text: White, Outfit 600 15px
- Height: `48px`
- Radius: `12px`
- Press: scale(0.97) spring

### Input Field
- Border: `rgba(214,211,209,0.6)` → Sage on focus
- Height: `48px`
- Radius: `12px`
- Label: above, Stone Secondary 13px

## App Icon Specification
See `../VISUAL-PROMPTS.md` Prompt #1 for generation instructions.
- Shape: Faceted sage-green ceramic stone
- Background: Warm off-white
- Style: Soft 3D, tactile, no text in icon
