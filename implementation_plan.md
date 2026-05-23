# United Aryan EPZ — Google Frontend Excellence Revamp

## Background

The current site is built on a legacy **Bootstrap 2 / jQuery** template ("Eterna" from BootstrapMade). It suffers from:
- Outdated grid system (`span2`, `span4` etc.)
- Heavy jQuery plugin dependencies (camera.js, bxslider, flexslider, prettyPhoto)
- No coherent design system — ad-hoc inline styles everywhere
- No responsive mobile design
- Bland typography and colors
- Broken/inconsistent navigation across pages (copy-pasted per page)

The business is **United Aryan (EPZ) Ltd** — a garment manufacturing company in Nairobi, Kenya with an AGOA export focus. The site has 6 meaningful pages: Home, About, Sustainability, Contact, plus Product/Infrastructure pages.

---

## Design Direction: Google Material Design 3 × Premium Industrial

Inspired by how Google presents enterprise-grade products (e.g., Google Cloud, Google Workspace marketing sites):

- **Palette**: Deep charcoal (`#1C1C1E`) + UAL brand teal (`#00897B`) + warm white + accent amber
- **Typography**: `Inter` (Google's preferred web font, ultra-readable)
- **Motion**: Intersection Observer scroll animations, CSS keyframes — no jQuery
- **Layout**: CSS Grid + Flexbox, fully responsive
- **Hero**: Full-bleed image carousel built in vanilla JS
- **Nav**: Sticky glassmorphism header with animated mobile hamburger

---

## Open Questions

> [!IMPORTANT]
> **Logo usage**: The existing `img/logo.png` will be reused. Should a new hero image be generated for sections that lack good photography, or should only the existing images be used?

> [!NOTE]
> **Pages in scope**: I'll revamp the 6 most visited/important pages: `index.html`, `about.html`, `sustainability.html`, `contact.html`, plus the shared navigation and footer. The many auxiliary pages (`blog-*.html`, `portfolio-*.html`, `typography.html`, etc.) appear to be unused template pages and will be left untouched.

---

## Proposed Changes

### Shared Design System

#### [NEW] `css/revamp.css`
The entire new design system in one organized CSS file:
- CSS custom properties (tokens: colors, spacing, radius, shadows, typography)
- Global resets and base styles
- Utility classes
- Navigation (sticky + glassmorphism + mobile hamburger)
- Footer
- Hero carousel
- Cards, grids, section layouts
- Scroll animations
- Responsive breakpoints

#### [NEW] `js/revamp.js`
Vanilla JS for:
- Mobile menu toggle
- Hero image carousel (auto-play + dots)
- Scroll-triggered animations via `IntersectionObserver`
- Smooth scroll to anchor
- Stats counter animation
- Active nav link highlighting

---

### Page Revamps

#### [MODIFY] [index.html](file:///d:/Playground/united-aryan-website-2/index.html)
- Replace camera.js slideshow with a clean full-bleed CSS/JS hero carousel using existing banner images
- Replace Bootstrap 2 grid with modern CSS Grid advantage cards
- Add animated statistics row (employees, years, export countries)
- Add "Why Kenya" features section with icon cards
- Redesign the "Progressive Impact" slider as a modern testimonial/vision block
- Apply new nav and footer

#### [MODIFY] [about.html](file:///d:/Playground/united-aryan-website-2/about.html)
- Full-bleed page hero with the existing "about us.jpg" banner
- Clean prose layout for company highlights
- Timeline for company growth (started with 17 lines → 38 lines)
- Future plans section with vertical integration roadmap cards
- Image gallery grid for the two existing entrance images

#### [MODIFY] [sustainability.html](file:///d:/Playground/united-aryan-website-2/sustainability.html)
- Full-bleed hero with existing sustainability banner
- 4 pillar cards: Go Green, Medical & Health, Support, Networking
- Clean icon-driven list layout instead of raw `<ol>` tags
- Subtle green color accent for sustainability branding

#### [MODIFY] [contact.html](file:///d:/Playground/united-aryan-website-2/contact.html)
- Leadership cards (Pankaj Bedi + Amit Bedi) in modern profile card layout
- Contact form redesigned with floating labels and Material-style inputs
- Contact info sidebar with icons
- Embedded Google Maps (existing iframe reused)
- Keep existing `contact.js` / `smtp.js` email logic

---

## Verification Plan

### Manual Verification
- Open each of the 4 revamped pages in browser and verify visual appearance
- Test mobile responsiveness at 375px, 768px, 1280px
- Test navigation dropdowns on desktop and mobile hamburger menu
- Verify hero carousel auto-plays and indicators work
- Verify contact form can be filled in (email submission logic unchanged)
- Verify all existing links to external sites and PDFs still work
