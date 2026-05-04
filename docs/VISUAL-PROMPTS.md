# Klear Karma v2 — Visual Asset Generation Prompts
**Tools**: Nano Banana Pro (Gemini Image) / Midjourney / DALL-E  
**Design System Reference**: See `DESIGN.md` for color tokens and typography

---

## Prompt 1: App Icon (iOS + Android + Store Listing)

**Purpose**: Primary app icon for App Store, Play Store, home screen, and all brand touchpoints.

**Design direction**: A minimal, sculptural, warm-toned mark that communicates trust + healing + clarity. NOT a chakra wheel, NOT a lotus, NOT a generic heart. Think: the intersection of Headspace's orange dot and Stripe's clean geometry — but with organic warmth.

```text
KLEAR KARMA — App Icon Design

A premium, minimal app icon rendered as a single sculptural 3D object on a clean background. The icon depicts a stylized, abstract "seed of clarity" — a smooth, softly faceted organic gemstone shape (somewhere between a river stone, a prism, and a seed pod) that suggests both natural origin and intentional precision.

SHAPE & FORM:
The object is a single, cohesive form — NOT multiple overlapping shapes. It has smooth, gently beveled facets that catch light differently on each surface, creating depth without complexity. The silhouette reads clearly at 16px (notification badge size). The overall shape is vertically oriented, slightly taller than wide, with a subtle asymmetry that makes it feel alive rather than geometric.

MATERIAL & FINISH:
The surface material is polished matte ceramic with a warm undertone — like a handcrafted Japanese tea bowl. It is NOT glossy, NOT metallic, NOT translucent. The material has microscopic surface variation (subtle grain) visible only at high resolution, giving it tactile warmth. One facet catches a gentle specular highlight, suggesting light passing through a window.

COLOR (CRITICAL — SINGLE ACCENT):
The object is rendered in a warm sage green (#16A34A desaturated 20% to approximately #2D9F56) with natural tonal variation across its facets — darker sage in shadow areas, lighter sage where light hits. The darkest shadow tone should approach #1A7A3A. The lightest highlight should approach #3DB86A.

NO other colors on the object itself. No gradients, no rainbow, no chakra spectrum.

BACKGROUND:
The icon sits on an infinite, perfectly smooth Canvas Warm surface (#FAFAF8) — the same warm off-white from the app's design system. The shadow beneath the object is soft, diffused, and warm-toned (NOT cool gray) — cast slightly to the bottom-right. Shadow color: rgba(28, 25, 23, 0.08).

LIGHTING:
Soft, enveloping top-left studio lighting. One primary softbox and one fill. The lighting is warm (5500K), creating gentle shadows that define the facets without harsh contrast. A subtle rim light on the right edge separates the object from the background.

CAMERA:
Shot straight-on (no dramatic angle). 100mm macro lens equivalent. The object is perfectly centered with generous negative space (the object occupies approximately 60% of the frame). Sharp focus throughout — no depth of field blur on the icon itself.

COMPOSITION FOR APP ICON:
The image will be cropped to a 1024x1024 square for iOS (with automatic superellipse mask applied by the OS). Ensure the object has at least 12% padding from all edges. The object must read as a clear, distinctive silhouette when reduced to 60x60px.

ANTI-PATTERNS:
- NO lotus flowers, chakra wheels, om symbols, or mandala patterns
- NO human figures, hands, or body parts
- NO gradients or color transitions across the object
- NO metallic chrome or glass materials
- NO glow effects, neon edges, or outer shadows
- NO text, letters, or wordmarks on the icon
- NO pure black (#000000) anywhere
- NO purple/violet tones
```

**Generate at**: 1024x1024, PNG, transparent background variant also needed  
**Variations to request**: 3 facet variations (3-facet, 5-facet, 7-facet) to test silhouette readability at small sizes

---

## Prompt 2: App Store Hero / Feature Graphic (Home Screen Showcase)

**Purpose**: App Store screenshot #1 / Play Store feature graphic. Shows the home screen in context with a headline that communicates the value proposition. This is the first thing users see in the store listing.

**Design direction**: Adapted from Amir Mushich's Brand Kit prompt (2.1) and the Product Design Catalog approach (Firat Bilal). A single editorial-quality image showing the app in use, NOT a generic phone mockup floating in space.

```text
KLEAR KARMA — App Store Hero Image

A high-end editorial product photograph showing the Klear Karma mobile app displayed on an iPhone 15 Pro (Natural Titanium finish), composed in an asymmetric split-screen layout optimized for App Store screenshot dimensions (1290 x 2796px portrait).

LAYOUT (ASYMMETRIC SPLIT — NOT CENTERED):
The composition is divided into two unequal zones:

LEFT ZONE (approximately 55% width):
Contains the headline text, stacked vertically, top-aligned with generous top padding (approximately 15% from top edge).

Line 1: "Find healers" — Outfit font, weight 600, warm off-white (#FAFAF8), approximately 48px equivalent at this canvas size. Tight tracking (-0.02em), standard case (not uppercase).
Line 2: "you can trust." — Same font specs but in Sage Green (#16A34A). This line creates the color accent and value proposition anchor.

Below the headline (approximately 40px gap): A single-line descriptor in Outfit 400, Stone Secondary color (#78716C), approximately 18px: "Community-verified alternative healing practitioners"

No CTA button. No "Download now". No app store badges in this zone. The text speaks for itself.

RIGHT ZONE (approximately 45% width):
The iPhone is positioned here, angled at approximately 8 degrees clockwise tilt, with the top-right corner of the phone extending slightly beyond the right edge of the frame (intentional crop — creates dynamism and suggests the app extends beyond the frame).

The phone screen displays the HOME SCREEN of the Klear Karma app:
- Top: Location header ("Mumbai") + notification bell + avatar
- Search bar: "Find your perfect healer..." in Stone Secondary
- Horizontal category chips: Reiki, Sound Therapy, Massage, Meditation (Sage chip = active)
- Featured practitioner cards (2 visible, third partially cropped):
  - Card 1: Female practitioner, "Priya Sharma · Reiki Master", 4.8 stars, "From 2,500"
  - Card 2: Male practitioner, "Arjun Mehta · Sound Therapist", 4.9 stars, "From 3,000"
- Cards use the design system: 16px radius, Whisper Border, Diffused Shadow, Outfit font
- Bottom tab bar visible: Home (active, Sage), Search, Bookings, Messages, Profile

PHONE RENDERING:
The iPhone frame is photorealistic — visible titanium chamfer edges, Dynamic Island at top, thin bezels. The screen content is rendered as if it were a real screenshot composited onto the device (perspective-correct, subtle screen reflection).

BACKGROUND:
A solid, warm Canvas background (#FAFAF8) — completely flat, no gradients, no patterns, no environmental context. This is a store listing, not a lifestyle shot. The phone casts a very subtle Diffused Shadow to the bottom-right.

LIGHTING:
Even, soft studio lighting. No dramatic shadows. The phone's titanium frame catches a gentle highlight on its left edge. The screen appears naturally lit (no visible glare or reflection artifacts beyond a subtle diagonal screen sheen).

TYPOGRAPHY RENDERING:
All text on the background (not on the phone screen) uses Outfit font. The text must look like crisp, rendered typography — NOT handwritten, NOT decorative. Clean, modern, confident.

ANTI-PATTERNS:
- NO floating phones in space with abstract blob backgrounds
- NO gradient backgrounds (solid Canvas Warm only)
- NO "Available on App Store" badges in this image
- NO multiple phones showing different screens
- NO decorative elements (stars, sparkles, circles, confetti)
- NO screenshots of settings or boring utility screens
- NO fake notification badges with "99+"
- NO emojis anywhere
- NO text overlapping the phone
- NO pure black (#000000) anywhere in the composition
```

**Generate at**: 1290 x 2796px (iPhone 15 Pro Max store screenshot size)  
**Also generate**: 1242 x 2688px (iPhone 11 Pro Max) and landscape 2048 x 1536px (iPad) variants

---

## Prompt 3: Brand Identity Board (Investor / Pitch / Social Asset)

**Purpose**: A single image that communicates the entire Klear Karma v2 visual identity at a glance. Used for pitch decks, social media brand announcements, Rork.com design reference, and team alignment. Adapted from Amir Mushich's Brand Kit Bento Grid prompt (2.1) calibrated to the Klear Karma design system.

```text
KLEAR KARMA v2 — Brand Identity System Board (Bento Grid)

A single, high-resolution brand identity presentation board in a clean bento-grid layout, presenting the complete visual system for Klear Karma — a community-verified marketplace for alternative healing practitioners.

CANVAS:
Orientation: Landscape (16:9 aspect ratio, 3840 x 2160px).
Background: Canvas Warm (#FAFAF8) — warm off-white, NOT clinical blue-white.
Grid gaps: 16px between all modules. 48px padding from canvas edges.

THE GRID LAYOUT (6 MODULES):
Arrange 6 distinct blocks in a bento grid with this specific structure:

Row 1 (top, approximately 55% height): 3 blocks
- Block A (left, 50% width): THE KEY VISUAL
- Block B (top-right, 25% width): THE PALETTE
- Block C (bottom-right, 25% width): THE TYPOGRAPHY

Row 2 (bottom, approximately 45% height): 3 blocks
- Block D (left, 33% width): THE APP ICON
- Block E (center, 34% width): THE APP SCREEN
- Block F (right, 33% width): THE BRAND DNA

---

BLOCK A — KEY VISUAL (Hero lifestyle image):
A warm, editorial-quality photograph of a real healing session in progress — a practitioner and seeker sitting across from each other in a calm, naturally-lit room with plants and warm wood surfaces. The practitioner's hands are positioned near (not touching) the seeker's shoulders in a reiki-like gesture. Both people appear calm and focused. The lighting is natural window light, warm and golden. The image has a warm color grade (slightly desaturated, lifted shadows).

Overlay element: The wordmark "Klear Karma" in Outfit 700, white, positioned bottom-left corner with generous padding. Below it in Outfit 400, white: "Trust is the product." — small, understated.

BLOCK B — THE PALETTE (Color specification):
A clean design block displaying 5 vertical color swatches, each a tall rectangle with rounded corners (8px radius):

Swatch 1: Canvas Warm (#FAFAF8) — labeled "Canvas"
Swatch 2: Ink Deep (#1C1917) — labeled "Ink"
Swatch 3: Stone Secondary (#78716C) — labeled "Stone"
Swatch 4: Sage Primary (#16A34A) — labeled "Sage"
Swatch 5: Surface Pure (#FFFFFF) — labeled "Surface"

Each swatch has its hex code rendered below in JetBrains Mono, 10px, Stone Secondary color. The labels are in Outfit 500, 11px, Ink Deep.

Background of this block: Surface Pure (#FFFFFF) with Whisper Border.

BLOCK C — THE TYPOGRAPHY (Font specimen):
Background: Ink Deep (#1C1917) — dark block for contrast.

Content: The word "Outfit" displayed in large Outfit 700 type, Canvas Warm color (#FAFAF8), approximately 48px. Below it, smaller text:
Line 1: "600 Semi-Bold — Headlines" in Outfit 600, 14px, Stone (#78716C lightened for dark bg to approximately #A8A29E)
Line 2: "400 Regular — Body text" in Outfit 400, 14px, same color
Line 3: "JetBrains Mono — Data" in JetBrains Mono 400, 14px, same color

No alphabet specimens (Aa Bb Cc is banned). The font name IS the specimen.

BLOCK D — THE APP ICON:
Background: Surface Pure (#FFFFFF) with Whisper Border.
Center: The Klear Karma app icon (the sage-green faceted seed/stone shape from Prompt 1) rendered at approximately 120px, perfectly centered in the block with generous negative space.
Below the icon: "Klear Karma" in Outfit 600, 14px, Ink Deep. And below that: "v2.0" in JetBrains Mono, 11px, Stone Secondary.

BLOCK E — THE APP SCREEN:
Background: Surface Pure (#FFFFFF) with Whisper Border.
Content: A small, clean rendering of the Klear Karma practitioner profile screen on an iPhone frame (approximately 60% of block height). The screen shows:
- Practitioner cover photo + avatar
- Name: "Priya Sharma"
- "Reiki Master · Verified" badge (Sage green)
- Rating: 4.8 stars
- "Book Session" button (Sage Primary fill, white text)

The phone is centered in the block, not angled.

BLOCK F — BRAND DNA:
Background: Canvas Warm (#FAFAF8) with Whisper Border.
Content: Three short text sections, left-aligned:

"POSITIONING" (label in Outfit 500, 10px, Stone Secondary, tracking 0.08em, uppercase)
"The trust layer for alternative healing" (Outfit 400, 14px, Ink Deep)

"VOICE" (same label style)
"Warm, grounded, clear, never mystical" (same body style)

"VALUES" (same label style)
"Community verification · Practitioner dignity · Accessible pricing · 20% giveback" (same body style)

---

OVERALL AESTHETIC:
- Style: Behance / Awwwards presentation board aesthetic
- Quality: 4K resolution, razor-sharp typography, photorealistic key visual
- Cohesion: Every block uses the SAME color system defined above — no rogue colors
- Lighting: Soft, even studio lighting across the whole grid
- The board should feel like it was designed by a senior brand designer, not generated by AI

ANTI-PATTERNS:
- NO emojis anywhere
- NO chakra/rainbow/gradient decorations
- NO "Aa Bb Cc" alphabet specimens
- NO construction lines or golden ratio overlays on the logo
- NO fake statistics or metrics
- NO generic stock photography (the key visual must feel authentic and specific)
- NO purple/violet/neon tones anywhere
- NO pure black (#000000)
- NO glassmorphism or blur effects
- NO overlapping elements — every block occupies its own clean zone
```

**Generate at**: 3840 x 2160px (4K landscape)  
**Also useful as**: Pitch deck cover slide, LinkedIn announcement image, GitHub repo social preview

---

## Usage Notes

1. **Generate with**: Nano Banana Pro (Gemini 3 Pro Image) for best results on structured layouts. Midjourney v6+ for the lifestyle key visual in Prompt 3, Block A.
2. **Post-processing**: Crop app icon to 1024x1024 with rounded corners for iOS preview. Export at 512x512 for Android adaptive icon foreground.
3. **Color calibration**: After generation, verify hex values match the DESIGN.md palette. AI generators sometimes drift warm greens toward teal — correct in Figma if needed.
4. **Attach to Rork.com**: Include the app icon PNG and the app store hero image when creating the project in Rork.com. Reference the DESIGN.md for all component styling rules.
