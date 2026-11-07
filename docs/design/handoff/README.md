# Handoff: Auntie Esi's Kitchen (2-page static site)

## Overview
High-fidelity design for a home-style Ghanaian chop bar in Osu, Accra. There are two pages: Home (`/`) and Contact (`/contact/`). The primary goal is WhatsApp orders; the secondary goal is catering enquiries through a Formspree form. Built for 360px Android phones first, with a 1280px desktop layout. Target: PageSpeed mobile 90+.

**Source of truth:** `docs/SPEC.md` (02-AUNTIE-ESIS-KITCHEN-SPEC) and `docs/SHARED-STANDARDS.md`. **SPEC.md wins on any conflict.** Every difference is listed below.

## About the design files
The HTML files in `../kitchen-prototype/` are **design references**: prototypes that show the intended look and behaviour. They are not production code; do not copy their code into the site. Rebuild them as the spec requires: hand-written HTML, one CSS file and vanilla JS (≤ 4 KB), no build step, no frameworks, no web fonts.

Ignore everything marked prototype-only:
- the mock WhatsApp chat overlay (the real buttons open `wa.me`)
- the "Opens Google Maps" / "Opens GitHub" toasts
- the 120ms fade between screens
- the Tweaks options (viewport, simulate failure, prefill form)

## Fidelity
**High fidelity.** Colours, type, spacing, radii, copy and states are final. Match layout, spacing and hierarchy from the PNG frames. Take exact values from `tokens.css` and `screens.md`.

## Files in this folder
| File | Contents |
|---|---|
| `tokens.css` | CSS custom properties. SPEC §2 names and values are exact; additions are marked ADDED |
| `screens.md` | Per-screen layout at 360 and 1280: grid, columns, spacing, type, image ratios |
| `components.md` | Component specs and states (default, hover, focus-visible, disabled, error) |
| `interactions.md` | Sticky header, smooth scroll, overlay, WhatsApp links, catering logic, form states |
| `icons/*.svg` | 14 line icons: 24px grid, 2px stroke, `currentColor` |
| `logo/logo-mark.svg`, `logo/favicon.svg` | Bowl logo mark and the simplified favicon |

Frames are in `../screens/*.png` (see `../README.md`). The clickable prototype is in `../kitchen-prototype/`.

## Screens (summary; full detail in screens.md)
1. **Home**: sticky header → hero (photo, overlay, H1, two buttons, three chips) → Today's menu (6 dish cards) → Ordering is easy (3 steps, white band) → About (2-column, photo) → Catering (red band) → Find us (address card + hours card) → footer.
2. **Contact**: sticky header → H1, intro and WhatsApp card → form card (with the catering fields appearing conditionally) and an info aside (phone, address, hours) → footer.
3. **Mobile menu overlay**: full-screen `<dialog>` with a top bar matching the header, 4 links in 24px rows, and a pinned "Order on WhatsApp" button above the hours line.

All copy is taken verbatim from SPEC.md, apart from the invented items listed under Differences.

## State (JS on the real site)
- `dialog#mobile-menu` open/closed, plus `aria-expanded` on the menu button.
- Contact form: `idle → error` (client validation), or `idle → sending → success | failed`.
- Enquiry type: `?type=catering` preselects Catering. `event_date` and `guests` are visible only when type = Catering; without JS they are always visible.

## Design tokens
See `tokens.css`. Key values:
- Colours: primary `#B23A12`, primary-dark `#8C2D0E`, accent `#E8A33D`, ink `#2A1A12`, muted `#6B5A50`, background `#FFF9F2`, surface `#FFFFFF`, border `#EADBC8`, kente green `#1F7A3A`, WhatsApp `#25D366`.
- Type: Georgia 700 for headings, system-ui for body. H1 2.125rem → 3.25rem, H2 1.625rem → 2.25rem, H3 1.25rem, body 1rem/1.6, small 0.875rem.
- Spacing: 8 / 16 / 24 / 32 / 48 / 64. Gutter 16px (mobile) and 32px (desktop). Container 70rem.
- Radius: 14px (cards), 10px (inputs), pill (buttons, badges, chips).
- `--header-h`: 60px on mobile, 72px from 768px up. Both include the 6px kente stripe.
- Shadows: WhatsApp float `0 4px 14px rgba(42,26,18,.28)`. Everything else is flat, with 1px borders.

## Logo (direction 1c, "The bowl")
- `logo/logo-mark.svg`: inline it in the header at 32px on mobile and 40px from 768px up. Use `aria-hidden` on the SVG and `aria-label="Auntie Esi's Kitchen, home"` on the link.
- The wordmark is live Georgia 700 text: "Auntie Esi's" in ink, "Kitchen" in `--color-primary`. It sits on two lines at 16px on mobile and one line at 22px on desktop. The footer uses the 40px mark with the two-line wordmark.
- `logo/favicon.svg` is for 16–32px. Also export a 180×180 `apple-touch-icon.png` on cream.

## Assets
| File | Use | Ratio | Alt |
|---|---|---|---|
| `images/hero-waakye.jpg` | Hero (16:9 desktop; mobile focal point 62% 50%) | 16:9 / 4:5 | A plate of waakye with shito, egg and fried plantain |
| `images/waakye-special.jpg` | Dish card | 4:3 | Waakye on a leaf with shito, gari, spaghetti, boiled egg and wele |
| `images/jollof-chicken.jpg` | Dish card | 4:3 | Jollof rice with a grilled chicken leg and fresh salad on a kente-print tablecloth |
| `images/banku-tilapia.jpg` | Dish card | 4:3 | Two balls of banku with a whole grilled tilapia, onions, chilli and pepper sauce |
| `images/fufu-light-soup.jpg` | Dish card | 4:3 | A ball of fufu in goat light soup with garden eggs in an earthenware bowl |
| `images/kelewele.jpg` | Dish card | 4:3 | Spiced fried plantain cubes in a paper wrap with roasted groundnuts |
| `images/red-red.jpg` | Dish card | 4:3 | Red red bean stew topped with gari, with fried plantain slices in an enamel bowl |
| `images/about-cook.jpg` | About | 1:1 | A cook stirring a large pot of soup |

All photos are **AI-generated** (Google Gemini image model). Credit them that way in the README, not to Unsplash or Pexels.

Before shipping, process every photo per shared standards §11: crop to the ratio, export AVIF (q50) and WebP (q70) at 480, 800 and 1200px wide, plus a JPEG fallback at 800px. Keep the hero under 100 KB and every other image under 60 KB. Make a dedicated 4:5 crop of the hero for `<picture media="(max-width: 767px)">`.

## Differences from SPEC.md / things to confirm
1. **Added tokens**: input border `#9A8678`, because `--color-border` is about 1.3:1 on white and fails the 3:1 control contrast rule. Also added: error, alert and success tints, `--radius-input`, `--radius-pill`.
2. **Invented UI copy** (not in the SPEC; confirm or replace):
   - Select placeholder: "Choose one".
   - Validation messages: "Please enter your name." · "Enter a Ghana number, e.g. 024 123 4567." · "Please choose an enquiry type." · "Please write a short message." · "Check the email address, e.g. name@example.com." · "Enter at least 1 guest."
   - Info label: "Phone / WhatsApp". Menu button label: "Menu".
3. **Hours conflict in the SPEC**: the hero chip says "Open Mon–Sat, 7am–8pm", but §6.6 has Sat 8am–8pm. Both are used verbatim; the owner should confirm.
4. **Footer** isn't specified in the SPEC. The design uses the logo, address, footer nav (`id="footer-nav"`, which doubles as the no-JS menu fallback) and the credit line.
5. **Phone / WhatsApp** (SAMPLE until the owner confirms): +233 53 345 6233 → `tel:+233533456233`, `CONFIG.whatsappNumber = "233533456233"`.
6. **TODO**: replace `icons/whatsapp-placeholder.svg` with the official WhatsApp glyph path.
7. **Logo**: the SPEC §5 asks for a text wordmark. The design adds the bowl mark and sets "Kitchen" in red.
8. The hero chips have decorative line icons (`aria-hidden`).
9. The catering-only fields sit in a tinted panel with a dashed border so their appearance is noticeable.
10. **Photo**: the Jollof & Chicken image shows branded soda bottles. Recrop or regenerate it before launch.
