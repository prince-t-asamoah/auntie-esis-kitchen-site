# Project 2 — Auntie Esi's Kitchen (Plain HTML/CSS/JS)

**Repo:** `auntie-esis-kitchen-site` · **Stack:** hand-written HTML, CSS, vanilla JS. **No build step, no npm dependencies** (an optional `npm run optimise-images` script using `sharp` is allowed as a dev tool only) · **Form:** Formspree · **Deploy:** Netlify (`publish = "."`, no build command)

**This file has two parts:** Part A is the build spec for the coding agent. Part B is the Claude Design brief for the mockups and prototype.

> Read `SHARED-STANDARDS.md` first. Copy below is final — use it verbatim.

> **Sample content:** every business fact on this site (name, address, prices, figures, history, people's names, testimonials) is sample content kept in the content/config files. Replace it with the owner's real details before handover — see the README handover checklist.

---

# Part A — Build spec

## 1. Overview

A home-style chop bar in Osu, Accra, serving waakye, jollof, banku and tilapia, fufu and light soup. Customers order for pickup or delivery by WhatsApp. Purpose: prove an image-heavy small business site can still score 90+ on mobile with no framework, plus show a Formspree form and pre-filled WhatsApp ordering.

**Primary goal:** WhatsApp orders. Secondary: catering/event enquiries via the contact form.

---

## 2. Design tokens

```css
:root {
  --color-primary: #B23A12;     /* pepper red — buttons, links */
  --color-primary-dark: #8C2D0E;
  --color-accent: #E8A33D;      /* palm-oil orange — badges, prices */
  --color-ink: #2A1A12;         /* warm dark brown text */
  --color-muted: #6B5A50;
  --color-bg: #FFF9F2;          /* warm cream */
  --color-surface: #FFFFFF;     /* cards */
  --color-border: #EADBC8;
  --radius: 14px;
  --container: 70rem;
  --font-display: Georgia, "Times New Roman", serif;   /* headings */
  --font-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}
```
- **No web fonts** (system stack only) — this project demonstrates zero font weight.
- H1 2.125rem → 3.25rem ≥ 768px; H2 1.625rem → 2.25rem. Body 1rem/1.6.
- Decorative: a thin repeating kente-inspired stripe (pure CSS `repeating-linear-gradient`, 6px tall, red/orange/green `#1F7A3A`/brown) under the header and above the footer. No images for this.
- `theme-color`: `#B23A12`.

---

## 3. Config

All config lives at the top of `js/main.js`:
```js
const CONFIG = {
  whatsappNumber: "233000000000",           // TODO: real number
  formspreeId: "FORM_ID",                   // TODO: real Formspree ID (also in contact form action)
};
```
WhatsApp links are written directly in the HTML (so they work without JS); JS only builds the per-dish pre-filled messages.

---

## 4. File structure

```
index.html
contact/index.html
css/styles.css               ← single file, ≤ 15 KB; critical CSS inlined in <head> of each page
js/main.js                   ← ≤ 4 KB, loaded with `defer`
images/                      ← optimised AVIF/WebP/JPEG
favicon.svg  apple-touch-icon.png  og.jpg  robots.txt  sitemap.xml
netlify.toml  README.md  LICENSE
```
Header and footer markup is duplicated in both HTML files (acceptable for 2 pages — note in README).

---

## 5. Header (both pages)

- Left: wordmark `Auntie Esi's Kitchen` (Georgia, 700) → `/`.
- Right: `Menu` (`/#menu`), `Catering` (`/#catering`), `Contact` (`/contact/`), plus a small red button `Order` → WhatsApp.
- Mobile: hide text nav, keep the red `Order` button + a `Menu` button that opens the full-screen menu overlay (shared standards §2b). Overlay background `--color-bg` (cream) with the kente stripe under its top bar; links `Menu`, `Catering`, `Find us` (`/#find-us`), `Contact`; bottom button `Order on WhatsApp`; secondary line: opening hours.
- **Sticky:** header stays fixed at the top on mobile and desktop (see shared standards §2a). Cream background (`--color-bg`); the 6px kente-inspired stripe sticks with it as the header's bottom edge, and counts toward `--header-h`. The red `Order` button stays visible while scrolling.

---

## 6. Home page (`/`)

**Title:** `Auntie Esi's Kitchen — Home-style Ghanaian food in Osu`
**Description:** `Waakye, jollof, banku and tilapia, cooked fresh daily in Osu, Accra. Order for pickup or delivery on WhatsApp.`

### 6.1 Hero (full-width image with dark overlay, text on top)
- Overlay: `linear-gradient(rgba(42,26,18,.65), rgba(42,26,18,.35))` — ensure text contrast ≥ 4.5:1.
- H1: `Home-style Ghanaian food, cooked fresh every morning`
- Paragraph: `Waakye, jollof, banku and tilapia from our kitchen in Osu. Order on WhatsApp for pickup or delivery across Accra.`
- Primary button: `Order on WhatsApp` (pre-filled: `Hello Auntie Esi, I'd like to order:`)
- Secondary (outline, white): `See the menu` → `#menu`
- Info chips below buttons: `Open Mon–Sat, 7am–8pm` · `Osu, Accra` · `Delivery via Bolt Food & our riders`
- **Image:** close-up of a plate of waakye or jollof with fried plantain. Aspect 16:9 desktop; use `<picture>` with a 4:5 crop for mobile (`media="(max-width: 767px)"`). Search: "waakye", "jollof rice Ghana", "Ghanaian food". Alt: `A plate of waakye with shito, egg and fried plantain`.

### 6.2 Menu (`id="menu"`)
- H2: `Today's menu`
- Intro: `Prices include one bottle of water. Ask about extra protein.`
- Grid of 6 dish cards (1 col mobile, 2 col ≥ 600px, 3 col ≥ 960px). Each card: image (4:3, lazy), dish name (H3), one-line description, price (accent badge), and a button `Order this` linking to WhatsApp with message `Hello Auntie Esi, I'd like to order: <Dish name> (GHS <price>)`. Build hrefs in HTML (URL-encoded), not JS.

| Dish | Description | Price |
|---|---|---|
| Waakye Special | Rice and beans with shito, gari, spaghetti, egg and wele | GHS 45 |
| Jollof & Chicken | Smoky party jollof with grilled chicken and salad | GHS 60 |
| Banku & Tilapia | Two balls of banku, grilled tilapia, pepper and onions | GHS 85 |
| Fufu & Light Soup | Pounded fufu in goat light soup | GHS 70 |
| Kelewele | Spiced fried ripe plantain with roasted groundnuts | GHS 25 |
| Red Red | Bean stew in palm oil with fried plantain | GHS 40 |

- If a matching photo cannot be found for a dish, use a coloured placeholder block with the dish name (see shared standards §11).
- Dishes and prices are SAMPLE values — keep them in one data block so the owner can update the menu easily.

### 6.3 How ordering works (`--color-surface` band)
- H2: `Ordering is easy`
- Three steps in a row (stack on mobile), each with an inline SVG icon:
  1. **Message us** — `Tap "Order on WhatsApp" and tell us what you want.`
  2. **Pay with MoMo** — `We confirm your order and send our MoMo number.`
  3. **Pick up or get it delivered** — `Ready in about 30 minutes. Delivery fee depends on your area.`

### 6.4 About (two columns ≥ 768px)
- H2: `Cooking for Osu since 2009`
- Paragraph 1: `Auntie Esi started with a single table outside her house on Oxford Street. Today the kitchen feeds office workers, students and families across Accra.`
- Paragraph 2: `Everything is cooked fresh each morning with ingredients from Makola and Agbogbloshie markets.`
- **Image:** a cook stirring a large pot in an outdoor or local kitchen. Aspect 1:1. Search: "Ghana cooking pot", "West African kitchen". Alt: `A cook stirring a large pot of soup`. (No identifiable children.)

### 6.5 Catering (`id="catering"`, red background, white text)
- H2: `Catering for funerals, weddings and office events`
- Paragraph: `From 30 to 500 guests. Tell us the date and number of people and we'll send a quote within a day.`
- Button (white bg, red text): `Request a catering quote` → `/contact/?type=catering`

### 6.6 Location & hours (`id="find-us"`)
- H2: `Find us`
- Address: `14 Oxford Street, Osu, Accra` (SAMPLE — replace with the owner's address)
- Hours list: `Mon–Fri 7am–8pm` / `Sat 8am–8pm` / `Sun Closed`
- Link button: `Open in Google Maps` → `https://maps.google.com/?q=Oxford+Street+Osu+Accra` (`target="_blank" rel="noopener"`). **No map embed.**

---

## 7. Contact page (`/contact/`)

**Title:** `Contact & catering — Auntie Esi's Kitchen`
**Description:** `Ask about catering, bulk orders or anything else. Or order directly on WhatsApp.`

- H1: `Get in touch`
- Intro: `For catering and bulk orders, use the form below. For food today, WhatsApp is fastest.`
- WhatsApp card: `Ordering food now? Message us on WhatsApp →`
- **Form (Formspree)** — `action="https://formspree.io/f/FORM_ID"`:
  | Label | name | type | required |
  |---|---|---|---|
  | Your name | `name` | text | yes |
  | Phone number | `phone` | tel (Ghana pattern) | yes |
  | Email (optional) | `email` | email | no |
  | Enquiry type | `type` | select: Catering / Bulk office order / Feedback / Other | yes |
  | Event date (if catering) | `event_date` | date | no |
  | Number of guests | `guests` | number, min 1 | no |
  | Message | `message` | textarea | yes |
  - Hidden `_subject` = `New enquiry from Auntie Esi's Kitchen site`
  - Submit: `Send enquiry`
- **JS behaviour (`main.js`):**
  - If URL has `?type=catering`, preselect "Catering".
  - Show `event_date` and `guests` fields only when type is Catering (fields visible by default without JS).
  - Intercept submit → `fetch` to Formspree with `Accept: application/json` → replace form with success panel: `Thank you! We'll reply within one working day.` On error show the shared error message.
- Info block: phone/WhatsApp, address, hours (same as home).

---

## 8. Structured data
JSON-LD `Restaurant`: name, `servesCuisine: "Ghanaian"`, `priceRange: "GHS 25–85"`, address (Osu, Accra, GH), `openingHoursSpecification` matching §6.6, telephone, `hasMenu: "/#menu"`.

---

## 9. Project-specific acceptance criteria
- [ ] Zero runtime npm dependencies; site works by opening `index.html` directly
- [ ] No web fonts loaded
- [ ] Each "Order this" button opens WhatsApp with the correct dish and price pre-filled
- [ ] Menu grid images all lazy-loaded with width/height set (CLS < 0.05)
- [ ] Mobile hero uses the 4:5 crop
- [ ] Formspree submission tested (success + simulated failure)
- [ ] Total JS ≤ 4 KB, total CSS ≤ 15 KB

---

# Part B — Claude Design brief

**Purpose:** Paste-ready brief for producing high-fidelity mockups of Auntie Esi's Kitchen in Claude Design. Export the mockups into the repo under `docs/design/` so the coding agent builds against them.

## D1. How to use

1. Open a new Claude Design project named "Auntie Esi's Kitchen".
2. Attach **`00-SHARED-STANDARDS.md`** and **`02-AUNTIE-ESIS-KITCHEN-SPEC.md`**.
3. Paste the full prompt in §D2 as your first message.
4. Review the result against the checklist in §D4 and ask for fixes in follow-up messages.
5. Click through the prototype on a phone and a laptop. Export each frame as PNG, the prototype as HTML (or its share link), and the developer handoff package (into `docs/design/handoff/`) to `docs/design/` using the file names in §D3.
6. If the design changes copy, colours or spacing, update `02-AUNTIE-ESIS-KITCHEN-SPEC.md` too. **The spec wins if they conflict.**

## D2. Prompt (paste as one message)

```
You are designing high-fidelity mockups for a small, fast, 2-page static website.
The attached SPEC.md is the source of truth: use its copy verbatim, its colour tokens,
fonts and section order. Do not invent new sections, features or copy. If something
is missing, mark it "TODO" on the canvas.

Constraints the design must respect (the site must score 90+ on Google PageSpeed mobile):
- Mobile-first. Design the 360px-wide mobile screen first, then the 1280px desktop.
- STICKY HEADER: the page header stays fixed to the top of the screen while
  the user scrolls, on mobile AND desktop. Keep it to one compact row
  (about 60px tall on mobile, 72px on desktop) with a solid background and a
  thin bottom border or light shadow — no transparent or blurred header.
  Make sure the hero H1 and primary button still fit above the fold on a
  360x740 screen with the header in place.
- MOBILE MENU: on mobile, the menu button opens a FULL-SCREEN OVERLAY that
  covers the whole screen (header and WhatsApp button included), with a solid
  background. Top bar matches the header height: logo left, a close (X)
  button right in exactly the same spot as the menu button. Below it, the nav
  links stacked vertically in large text (24px, rows at least 56px tall, thin
  dividers, current page marked). A full-width WhatsApp button pinned to the
  bottom. No slide-in drawer, no half-screen dropdown.
- No carousels, sliders, video backgrounds, parallax or heavy animation.
- One web font family maximum, two weights (or system fonts where the spec says so).
- Icons are simple line icons that can be drawn as inline SVG (24px grid, 2px stroke).
- Images only where the spec places them, with the aspect ratios it gives. Use
  realistic placeholder photography matching the spec's photo direction
  (Ghanaian people and settings); label each image frame with its aspect ratio.
- Tap targets at least 48px tall. Body text 16px minimum on mobile.
- Colour contrast WCAG AA: 4.5:1 body text, 3:1 large text and controls.
- A floating WhatsApp button (56px green #25D366 circle, white glyph) sits
  bottom-right on every screen, 16px from the edges on mobile, 24px on desktop.
  Make sure it never covers a button or form field.
- Footer on every page includes the credit: "Website by Prince Twumasi
  Asamoah · GitHub"

Spacing: 8px base scale (8, 16, 24, 32, 48, 64). Container max width as in the spec.
Mobile side gutter 16px; desktop 32px.

Deliver, as separate frames:
1. Home — mobile (360 wide, full length)
2. Home — desktop (1280 wide, full length)
3. Contact — mobile (360 wide)
4. Contact — desktop (1280 wide)
5. Contact form states — mobile: empty, field error, submitting ("Sending…"),
   success, submission failed
6. Mobile menu overlay open (360 wide, full screen, covering the page)
7. Component sheet: colour tokens with hex values, type scale (H1, H2, H3, body,
   small) with sizes in rem, buttons (primary, secondary, hover, focus-visible,
   disabled), form inputs (default, focus, error), cards, the WhatsApp button,
   and the icon set used.

8. A DEVELOPER HANDOFF package for a coding agent, exported with the design:
   - design tokens as CSS custom properties (colours, spacing, radii, type
     scale, header height) using the exact names and values in SPEC.md;
   - per-screen specs: layout grid, column counts, spacing between sections
     and elements, font sizes and weights, image aspect ratios, at 360px and
     1280px;
   - component specs and states (default, hover, focus-visible, disabled,
     error) for buttons, inputs, cards, header, mobile menu overlay and the
     WhatsApp button;
   - the interaction notes: sticky header, smooth scroll, overlay open/close,
     form states and each project-specific interaction;
   - all icons as clean, optimised inline SVG files;
   - a short README listing every place the design differs from SPEC.md.
   Use the "handoff to Claude Code" / export-for-developers option if
   available; otherwise put this in a single Markdown document plus the SVGs.

Also build a clickable PROTOTYPE that links the frames together, so the site
can be walked through like the real thing:
- Two flows: a mobile flow (360 wide, the primary one) and a desktop flow
  (1280 wide). Both start on the Home screen.
- The header is pinned (fixed position on scroll) in both flows, so it stays
  visible at the top as the long Home and Contact screens scroll underneath
  it.
- Header nav links and in-page anchor links (e.g. "How it works", "Menu",
  "Benefits", "FAQ", "Meetings") SMOOTH-SCROLL to their section on the same
  page (about 400-600ms, ease-in-out) instead of jumping. The section heading
  must land fully visible below the sticky header, not hidden under it. When the link
  is tapped from the open mobile menu, close the menu first, then scroll.
  Links to a section on Home from the Contact screen open Home and then
  smooth-scroll to that section.
- Every "Contact" / "Join" / enquiry button opens the Contact screen; the logo
  returns to Home.
- The mobile menu button opens the full-screen overlay (short fade); the X
  closes it. Tapping a link closes the overlay, then goes to / smooth-scrolls
  to the target. The floating WhatsApp button is hidden while it is open.
- Every WhatsApp button (floating and inline) opens a simple overlay showing
  a mock WhatsApp chat with the pre-filled message from the spec, with a
  close control. Do not link to real WhatsApp.
- Contact form: tapping the submit button with the form empty shows the
  error state; a "filled" path goes submitting -> success. Add a small
  prototype-only toggle to show the failure state.
- Screen transitions: instant or a short fade only (no slide or bounce
  effects), to match the performance rules of the real site. Smooth scrolling
  within a page is the one exception.
- Hover and focus states on buttons work in the desktop flow.
Label prototype-only controls clearly so they are not mistaken for site features.

Annotate spacing and font sizes on the component sheet, not on the page frames.
Keep the design clean and credible: this is a portfolio piece for a client who
wants "fast and clean", so restraint beats decoration.

---

Project: Auntie Esi's Kitchen — a home-style Ghanaian chop bar in Osu,
Accra. Customers order on WhatsApp. Audience: office workers, students and
families in Accra on their phones at lunchtime.

Look and feel: warm, appetising, homely and local — food photography does the
work. Warm cream background (#FFF9F2), pepper red (#B23A12) for buttons,
palm-oil orange (#E8A33D) for price badges, dark brown text (#2A1A12).
Headings in Georgia (serif); body in the system sans-serif stack.
NO web fonts. A thin 6px kente-inspired stripe (repeating red / orange / green
#1F7A3A / brown bands — an original pattern, not a copy of any real kente design)
under the header and above the footer.

Key moments to get right:
- Hero: full-width food photo with a dark brown gradient overlay; text on top
  must stay readable (AA contrast). Show the mobile frame with a 4:5 crop and the
  desktop frame with a 16:9 crop. Info chips under the buttons.
- Menu grid: six dish cards (1 column mobile, 3 columns desktop). Each card:
  4:3 photo, dish name, one-line description, orange price badge
  ("GHS 45"), and an "Order this" button. Prices must be easy to scan.
- Header: on mobile keep a small red "Order" button visible next to the menu toggle.
- Catering band: full-width red section, white text, white button.
- "Find us": address, opening hours and an "Open in Google Maps" button — no map
  embed; do not draw a map.
- Contact page: show the catering-only fields ("Event date", "Number of guests")
  appearing when "Catering" is selected — add a frame for that state.

Prototype interactions specific to Auntie Esi's Kitchen:
- Each "Order this" button opens the WhatsApp overlay with that dish and
  price pre-filled (e.g. "I'd like to order: Jollof & Chicken (GHS 60)").
- The header "Order" button and hero button open the overlay with the
  general order message.
- "Request a catering quote" opens Contact with "Catering" preselected and
  the event date and guest fields showing; choosing another enquiry type
  hides them.
- "Open in Google Maps" shows a prototype-only note ("Opens Google Maps").

Export names: kitchen-home-mobile.png, kitchen-home-desktop.png,
kitchen-contact-mobile.png, kitchen-contact-desktop.png,
kitchen-contact-catering-state.png, kitchen-form-states.png,
kitchen-nav-mobile.png, kitchen-components.png
```

## D3. Expected exports

- [ ] `docs/design/kitchen-home-mobile.png`
- [ ] `docs/design/kitchen-home-desktop.png`
- [ ] `docs/design/kitchen-contact-mobile.png`
- [ ] `docs/design/kitchen-contact-desktop.png`
- [ ] `docs/design/kitchen-contact-catering-state.png`
- [ ] `docs/design/kitchen-form-states.png`
- [ ] `docs/design/kitchen-nav-mobile.png`
- [ ] `docs/design/kitchen-components.png`

- [ ] `docs/design/kitchen-prototype/` — exported clickable prototype (HTML), or `docs/design/kitchen-prototype-link.txt` with the share link
- [ ] `docs/design/handoff/` — developer handoff: tokens, screen and component specs, interaction notes, SVG icons, and a README of differences from SPEC.md

## D4. Review checklist (before exporting)

- [ ] Copy matches SPEC.md word for word; nothing invented
- [ ] Colour hex values on the component sheet match the spec tokens
- [ ] Only one font family (two weights) — or system fonts for the Kitchen site
- [ ] Mobile hero: H1 + primary button visible above the fold at 360×740
- [ ] All text meets AA contrast, including text over photos
- [ ] Every button and input is ≥ 48px tall
- [ ] WhatsApp button present on every frame and covering nothing
- [ ] Developer credit in every footer
- [ ] All form states designed (empty, error, sending, success, failure)
- [ ] No carousels, map embeds, video or decorative images the spec didn't ask for
- [ ] Image frames show their aspect ratios and match the spec's photo direction
- [ ] Mobile menu is a full-screen overlay with the close button where the menu button was; links close it and go to the right place
- [ ] Header stays pinned to the top while scrolling in both the mobile and desktop prototype flows
- [ ] Prototype: section links smooth-scroll and land with the heading visible below the header
- [ ] Handoff token names and values match SPEC.md exactly; any differences are listed in the handoff README
- [ ] Prototype: every link, button, menu, WhatsApp overlay and form state works in both mobile and desktop flows, with no dead ends
- [ ] Desktop layouts use the spec's column counts and container width

## D5. Hand-off to the coding agent

Add this line to the top of each repo's `docs/SPEC.md` once mockups are exported:

> Visual reference: see `docs/design/*.png`. Exact spacing, sizes and tokens are in `docs/design/handoff/` — use them as reference only and do not copy prototype code into `src/`. Match layout, spacing and hierarchy from the mockups, and the behaviour shown in the clickable prototype (ignore prototype-only controls and the mock WhatsApp overlay — the real button opens wa.me); take copy, tokens and behaviour from this spec. Where the mockup and this spec disagree, this spec wins — flag the difference in your report.
