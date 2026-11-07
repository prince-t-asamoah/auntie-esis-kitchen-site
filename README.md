# Auntie Esi's Kitchen

Home-style Ghanaian food, cooked fresh every morning — a fast, mobile-first restaurant website with WhatsApp ordering.

Status: in development

Live site: [LIVE_URL] · Design prototype: [PROTOTYPE_LINK]

## PageSpeed Insights (mobile)

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Home | [score] | [score] | [score] | [score] |
| Contact | [score] | [score] | [score] | [score] |

Screenshots: docs/pagespeed/

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

Open index.html in a browser, or run any static server, e.g. `npx serve .`. There is nothing to install.

## Editing content

Page copy and the menu: index.html (menu section) and contact/index.html. Styles: css/styles.css. Behaviour: js/main.js.

## Changing the WhatsApp number and form

Replace 233000000000 in the WhatsApp links in both HTML files and in the CONFIG block at the top of js/main.js (international format, no "+"). Create a form at formspree.io and replace FORM_ID in contact/index.html and js/main.js.

## Deploying to Netlify

Connect the GitHub repo in Netlify → leave the build command empty → publish directory "." → deploy.

## Performance techniques

- responsive AVIF/WebP images with fixed dimensions
- separate mobile and desktop hero crops
- lazy-loaded menu images
- no web fonts
- critical CSS inlined
- JavaScript under 4 KB loaded with defer
- no third-party requests until the form is submitted

## Handover checklist

Sample content to confirm or replace with the owner's real details before launch:

- [ ] business name and story
- [ ] dishes, descriptions and prices
- [ ] dish photos
- [ ] address
- [ ] opening hours
- [ ] WhatsApp number
- [ ] Formspree form ID and notification email
- [ ] delivery partners
- [ ] Open Graph image
- [ ] custom domain

## Project documentation

See [docs/SPEC.md](docs/SPEC.md), [docs/SHARED-STANDARDS.md](docs/SHARED-STANDARDS.md) and [docs/design/](docs/design/).

## Credits

Website by Prince Twumasi Asamoah — [GitHub](https://github.com/prince-t-asamoah) and [LinkedIn](https://linkedin.com/in/prince-t-asamoah). Photo credits: [to be added].

## Licence

MIT — see LICENSE.
