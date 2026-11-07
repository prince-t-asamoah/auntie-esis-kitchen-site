# Auntie Esi's Kitchen

Home-style Ghanaian food, cooked fresh every morning — a fast, mobile-first restaurant website with WhatsApp ordering.

Status: built, awaiting deployment and owner content

Live site: [LIVE_URL] · Design prototype: [docs/design/kitchen-prototype/](docs/design/kitchen-prototype/)

## PageSpeed Insights (mobile)

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Home | [score] | [score] | [score] | [score] |
| Contact | [score] | [score] | [score] | [score] |

Screenshots: docs/pagespeed/ (add after the first Netlify deploy).

Local Lighthouse (mobile, simulated throttling, before deploy): Home 97–99 / 100 / 100 / 100, Contact 100 / 100 / 100 / 100. LCP 2.0–2.3 s, CLS 0.006, page weight 323 KiB (Home) and 43 KiB (Contact).

Target: 90+ in every category on mobile, with an image-heavy menu and no framework.

## Features

- two pages (home + contact)
- menu of six dishes, each with an "Order this" WhatsApp button that pre-fills the dish and price
- sticky header with an always-visible Order button
- full-screen mobile menu overlay
- smooth scrolling to page sections
- floating WhatsApp button
- Formspree contact form with catering-only fields that appear when "Catering" is chosen
- link to Google Maps (no heavy map embed)
- accessible (WCAG 2.2 AA target)

## Tech stack

Hand-written HTML, CSS and vanilla JavaScript; no build step; no runtime dependencies; no web fonts (system font stack); Formspree for the form; Netlify hosting.

Why no framework: two pages don't need one, and it proves 90+ mobile performance is about discipline, not tooling.

## Getting started

Open index.html in a browser, or run any static server, e.g. `npx serve .`. There is nothing to install to view or deploy the site.

`npm install` is only needed for the two optional dev scripts below. Their output is committed, so the deployed site never depends on them.

| Script | When to run it | What it does |
| --- | --- | --- |
| `npm run optimise-images` | after replacing a photo | crops the originals in `docs/design/kitchen-prototype/images/` and writes AVIF/WebP/JPEG at 480/800(/1200)px into `images/`, within the size budgets (hero ≤ 100 KB, others ≤ 60 KB); also makes `og.jpg` and `apple-touch-icon.png` (takes a few minutes) |
| `npm run inline-css` | after editing `css/styles.css` | copies the above-the-fold sections of `css/styles.css` into the `<style>` block in each page's `<head>` |

## Editing content

- Page copy and the menu: `index.html` (the menu is one block marked `SAMPLE: menu data`) and `contact/index.html`. Every business fact is marked with a `SAMPLE:` comment.
- The header, mobile menu and footer are duplicated in both HTML files (fine for two pages). Change both.
- Styles: `css/styles.css`, then run `npm run inline-css`. Don't edit the generated `<style>` block between the `critical-css` markers.
- Behaviour: `js/main.js`.
- Each "Order this" link holds its message URL-encoded, e.g. `Hello Auntie Esi, I'd like to order: Waakye Special (GHS 45)`. If you change a dish name or price, update its link too (`&` becomes `%26`, spaces become `%20`).

## Changing the WhatsApp number and form

- **WhatsApp:** replace `233533456233` in every `wa.me` link in both HTML files, in the `tel:` link and phone text on the contact page, in the JSON-LD `telephone` on the home page, and in the `CONFIG` block at the top of `js/main.js`. Use international format with no "+".
- **Form:** the form posts to Formspree form `maeezjrb`. To use a different form, create one at formspree.io (turn reCAPTCHA off, since the site submits with JavaScript) and replace the ID in the form `action` in `contact/index.html` and in `js/main.js`.

## Deploying to Netlify

Connect the GitHub repo in Netlify → leave the build command empty → publish directory "." → deploy. `netlify.toml` already sets this, plus the security headers and long-term caching for `/images/*`. It also blocks `/docs/*` and `/scripts/*` on the live site.

After the first deploy, replace `auntie-esis-kitchen-site.netlify.app` with the live domain in both pages (canonical, `og:url`, `og:image`, JSON-LD), `sitemap.xml` and `robots.txt`.

## Performance techniques

- responsive AVIF/WebP images with JPEG fallback and fixed dimensions
- separate mobile (4:5) and desktop (16:9) hero crops, preloaded with `fetchpriority="high"`
- lazy-loaded menu and about images
- no web fonts
- critical CSS inlined; the full stylesheet loads without blocking render
- JavaScript under 4 KB loaded with `defer`
- icons as one inline SVG sprite
- no third-party requests until the form is submitted

Budgets: `js/main.js` 3.9 KB. `css/styles.css` is 17 KB as readable source, 14.3 KB minified and about 4.3 KB gzipped as Netlify serves it. Home HTML is 29 KB including the inlined critical CSS.

## Handover checklist

Sample content to confirm or replace with the owner's real details before launch:

- [ ] business name and story ("Cooking for Osu since 2009", Oxford Street table, Makola and Agbogbloshie markets)
- [ ] dishes, descriptions and prices (six dishes, GHS 25–85; also the JSON-LD `priceRange`)
- [ ] "Prices include one bottle of water"
- [ ] dish photos (AI-generated placeholders)
- [ ] address: 14 Oxford Street, Osu, Accra (Find us, footer, contact page, JSON-LD, Google Maps link)
- [ ] opening hours: Mon–Fri 7am–8pm, Sat 8am–8pm, Sun closed. The hero chip and menu overlay say "Open Mon–Sat, 7am–8pm", which conflicts with Saturday 8am; the owner should confirm
- [ ] WhatsApp / phone number: +233 53 345 6233
- [x] Formspree form ID (`maeezjrb`)
- [ ] Formspree notification email (point it at the owner)
- [ ] delivery partners ("Bolt Food & our riders"), ready time (~30 minutes) and MoMo payment
- [ ] catering range (30 to 500 guests) and the "quote within a day" promise
- [ ] Open Graph image (`og.jpg`, made from the hero photo)
- [ ] custom domain

## Differences from the spec

These come from the design handoff ([docs/design/handoff/README.md](docs/design/handoff/README.md)):

- Added an input border colour, `#9A8678`, because `--color-border` fails the 3:1 contrast rule for form controls. Error, alert and success tints were also added.
- Copy not in the spec: the select placeholder "Choose one", the validation messages, the "Phone / WhatsApp" label and the "Menu" button label.
- The header has a bowl logo mark, with "Kitchen" set in red.
- The footer (logo, address, footer nav, credit) isn't specified in the spec; the design adds it.
- The WhatsApp glyph is a standard single-path WhatsApp logo, because the handoff only had a placeholder icon.
- The jollof photo is cropped to remove branded soda-bottle labels.

## Project documentation

See [docs/SPEC.md](docs/SPEC.md), [docs/SHARED-STANDARDS.md](docs/SHARED-STANDARDS.md) and [docs/design/](docs/design/).

## Credits

Website by Prince Twumasi Asamoah — [GitHub](https://github.com/prince-t-asamoah) and [LinkedIn](https://linkedin.com/in/prince-t-asamoah).

Photos: all food and kitchen photos are AI-generated (Google Gemini image model) placeholders from the design handoff. Replace them with the owner's own photos before launch.

## Licence

MIT — see LICENSE.
