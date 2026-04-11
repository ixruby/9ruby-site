# 9Ruby Landing Page — Lovable Build Brief

## Reference Template
**Source:** https://v0.app/templates/newsletter-template-xU39T0XywpR
**Designer:** joyco (2.7K forks, 650 likes on v0)

This newsletter template IS the design direction. Study it closely. The 9Ruby landing page should feel exactly like this — same level of craft, same anime atmosphere, same editorial elegance — but adapted for 9Ruby's content and brand.

---

## What the reference template does right (replicate ALL of this):

1. **Full-bleed atmospheric background** — A dreamy anime sky scene with floating rock formations, volumetric clouds, warm golden light. This is NOT a CSS gradient. It's an immersive, illustrative background that fills the entire viewport. For 9Ruby, the background should be a mystical bioluminescent forest/dragon scene instead of floating rocks.

2. **Elegant oversized serif typography** — "Synecdoche®" is in a beautiful flowing serif, massive, centered. It doesn't look like a tech website. It looks like a fashion brand or art publication. For 9Ruby, the "9Ruby" wordmark should have this same editorial serif quality.

3. **Minimal, centered layout** — Everything is vertically centered on one screen. No clutter. Just: brand name, email input, description, one button. The content breathes.

4. **Glass-morphism on interactive elements** — The email input has a frosted glass look against the background. Semi-transparent, rounded-full, clean.

5. **Human-made craft** — Nothing about this looks AI-generated. The typography choices, the spacing, the color relationships — they all feel intentionally designed by a human with taste. THIS is the quality bar.

6. **Social links at the bottom** — Small, subtle, just icons. Not distracting.

---

## 9Ruby Brand

- **Name:** 9Ruby (by IX Ruby Agency)
- **Logo:** Just the number "9" as a typographic mark — bold, serif, elegant. No box, no badge. Like how Synecdoche uses the ® symbol, 9Ruby uses just the digit.
- **Tagline:** "Build. Ship. Scale."
- **What it is:** AI-powered development platform — autonomous agents, website builder, template marketplace, 200+ tools, 13,000+ app integrations.
- **CTA URL:** https://ai.9ruby.com
- **Domain:** 9ruby.com

---

## The Background Scene (this is the most important part)

Instead of the floating rocks/sky from the reference, 9Ruby's background should be:

**A mystical bioluminescent forest at twilight with a coral-red dragon.**

Imagine this scene:
- **Foreground:** Dark silhouetted rocks and a glassy teal river/pool with light reflections
- **Middle ground:** A majestic coral-red and turquoise dragon resting by the water, glowing softly. The dragon's scales shimmer between warm coral (#E85D4A) and cool teal (#4ABFCF)
- **Background:** Dark enchanted forest with towering trees, hanging vines, bioluminescent mushrooms emitting soft teal/cyan light
- **Atmosphere:** Warm golden light filtering through the canopy from the upper left. Floating particles (fireflies/spores) in coral, teal, and gold scattered throughout
- **Sky peek:** Through gaps in the canopy, a twilight sky in deep purple-blue
- **Overall tone:** Dark and moody but not gloomy. Magical, warm, alive.

This can be achieved with:
- A high-quality AI-generated background image (use Midjourney, DALL-E, or similar)
- OR a sophisticated CSS/SVG illustration with layered gradients, shapes, and glow effects
- The key is it must look HAND-PAINTED, not like generic AI art. Think Studio Ghibli meets concept art.

**Color extraction from the scene:**
- Deep forest: `#0A1A15`, `#0D2818`
- Teal water/glow: `#4ABFCF`, `#2D9AA8`
- Coral dragon: `#E85D4A`, `#FF7B6B`
- Warm gold light: `#D4A55A`, `#F0C878`
- Bioluminescent green: `#7BCCAA`
- Deep purple sky: `#1A0A2E`

---

## Page Layout (Single Screen, Centered)

Following the reference template exactly — everything fits on one viewport:

```
┌─────────────────────────────────────────────┐
│                                             │
│              [Background Scene]             │
│                                             │
│                                             │
│                  9Ruby                      │  ← Large serif, elegant
│                                             │
│          ┌─────────────────────┐            │
│          │  Enter your email →  │            │  ← Glass-morphism input
│          └─────────────────────┘            │
│                                             │
│     AI-powered platform. Build, deploy,     │  ← Soft description text
│     and scale with autonomous agents        │
│          that never sleep.                  │
│                                             │
│              [ Explore ]                    │  ← Ghost/outline button
│                                             │
│                                             │
│          [social] [social] [social]         │  ← Bottom social icons
│                                             │
└─────────────────────────────────────────────┘
```

### Element Details:

**"9Ruby" Headline:**
- Font: Playfair Display, or Cormorant Garamond, or similar elegant serif
- Weight: 400-500 (elegant, not heavy)
- Style: Italic (like the reference uses for "Synecdoche")
- Size: Massive — `clamp(4rem, 12vw, 10rem)`
- Color: White or very light cream (#F0EDE8)
- Letter-spacing: slightly tracked out (0.02em)
- Optional: The "9" could be in coral-red, "Ruby" in white
- Drop shadow: very subtle text-shadow for readability against the background

**Email Input:**
- Rounded-full (pill shape)
- Glass-morphism: `background: rgba(255,255,255,0.08)`, `backdrop-filter: blur(20px)`
- Border: `1px solid rgba(255,255,255,0.15)`
- Placeholder: "Enter your email" in white/40
- Submit button: Arrow icon (→) in a circle, right-aligned inside the input
- Width: max-w-md (about 400-450px)
- Height: 52-56px
- On focus: border brightens to white/30, subtle glow

**Description Text:**
- Font: Clean sans-serif (Inter, Satoshi, or system default)
- Size: text-sm or text-base
- Color: white at 60% opacity
- Max-width: 400px
- Centered
- Line-height: 1.6

**"Explore" Button:**
- Ghost style: transparent background, white/20 border
- Rounded-full
- Padding: px-8 h-10
- Font: sans-serif, small, tracked slightly
- On hover: background fills to white/10, border to white/30

**Social Icons:**
- Positioned at absolute bottom (bottom-8)
- 3 icons: Twitter/X, GitHub, LinkedIn
- Small (16-18px), white at 30% opacity
- On hover: white at 70%
- Gap: 16px between icons

---

## Typography System

### Display (Headline)
- **Font:** Playfair Display Italic OR Cormorant Garamond Italic
- **Fallback:** Georgia, "Times New Roman", serif
- **Weight:** 400
- **This is the star** — it must look beautiful, editorial, hand-picked. NOT a default font.

### Body (Description, Input)
- **Font:** Inter OR the system sans-serif
- **Weight:** 350-400
- **This stays clean and quiet** — it doesn't compete with the headline

### Mono (Optional badges/labels)
- **Font:** JetBrains Mono or Geist Mono
- **Usage:** If you add any technical labels or badges

---

## Color Palette

### Primary (from the background scene)
- `--bg-deep`: `#0A1A15` (deep forest green-black)
- `--text-primary`: `#F0EDE8` (warm cream white)
- `--text-secondary`: `rgba(255, 255, 255, 0.6)`
- `--text-muted`: `rgba(255, 255, 255, 0.3)`

### Accents
- `--coral`: `#E85D4A` (from the dragon)
- `--teal`: `#4ABFCF` (from the water/glow)
- `--gold`: `#D4A55A` (from the light)
- `--green`: `#7BCCAA` (bioluminescent)

### Glass
- `--glass-bg`: `rgba(255, 255, 255, 0.08)`
- `--glass-border`: `rgba(255, 255, 255, 0.15)`
- `--glass-hover`: `rgba(255, 255, 255, 0.12)`

---

## Animations

### Background Particles (floating fireflies)
- 15-20 small circles scattered across the viewport
- Colors: coral, teal, gold at 8-15% opacity
- Sizes: 4px to 16px
- Animation: gentle floating up/down, 8-14s duration each
- Each has different delay and duration
- CSS-only, using @keyframes

### Hero Text Entry
- Staggered fade-up when page loads
- Order: headline (0ms) → input (200ms) → description (400ms) → button (600ms)
- Each: translateY(20px) → 0, opacity 0 → 1
- Duration: 800ms, ease-out

### Email Input Focus
- Border transitions from white/15 to white/30
- Subtle outer glow appears: `box-shadow: 0 0 30px rgba(74, 191, 207, 0.1)`
- Transition: 300ms

### Subtle Background Movement (optional, high-impact)
- Very slow parallax on the background image (if using an image)
- On mouse move, background shifts 1-2% in the opposite direction
- Creates depth and immersion
- Duration: 200ms transition, smooth

---

## Responsive

### Desktop (1200px+)
- Full-size headline, centered
- Background fills viewport

### Tablet (768px)
- Headline scales down
- Input stays max-width 400px

### Mobile (< 768px)
- Headline scales to ~3rem
- Input full-width with padding
- Social icons stay at bottom
- Background still fills viewport (use object-fit: cover or background-size: cover)

---

## Tech Stack
- React + TypeScript
- Tailwind CSS
- Framer Motion (for entry animations)
- Next.js Google Fonts (Playfair Display + Inter)
- CSS @keyframes for particles

---

## What This is NOT

- NOT a full landing page with 8 sections, features grid, metrics, testimonials
- NOT a typical SaaS homepage
- It IS a single-screen, immersive, editorial hero — like the reference template
- It IS a newsletter/signup capture with brand atmosphere
- It IS art-first, content-second
- It IS meant to make someone stop scrolling and say "wow, this is beautiful"

---

## Images for Reference

The user provided these reference images (saved locally):
1. `C:\Users\mrvis\Downloads\615af47cb652f498249b17dd68837e4e.jpg` — Ethereal icy landscape with coral-pink organic structures, white fog, ice-blue arches
2. `C:\Users\mrvis\Downloads\eef98ae55505d9729df5f55750173c3a.jpg` — Mystical red/coral dragon in dark teal forest with bioluminescent elements and water reflections
3. `C:\Users\mrvis\Downloads\62214b57aef9c44b505abec98421ed9f.jpg` — Same dragon scene, close-up

These images define the EXACT art direction. The background scene should evoke this same feeling — bioluminescent forest, mystical creatures, coral and teal colors, floating particles, water reflections.

---

## Summary

Build a single-screen newsletter/landing hero for "9Ruby" that looks like the joyco v0 template (https://v0.app/templates/newsletter-template-xU39T0XywpR) but with a mystical bioluminescent forest/dragon scene instead of floating rocks. Elegant serif headline, glass email input, minimal centered content. It should look like a human designer with impeccable taste made it, not like an AI generated it. Think Studio Ghibli meets editorial design meets premium tech brand.
