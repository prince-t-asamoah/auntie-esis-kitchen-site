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

- Two pages (home + contact)
- Menu of six dishes, each with an "Order this" WhatsApp button that pre-fills the dish and price
- Sticky header with an always-visible Order button
- Full-screen mobile menu overlay
- Smooth scrolling to page sections
- Floating WhatsApp button
- Formspree contact form with catering-only fields that appear when "Catering" is chosen
- Link to Google Maps (no heavy map embed)
- Accessible (WCAG 2.2 AA target)

## Tech stack

Hand-written HTML, CSS and vanilla JavaScript; no build step; no runtime dependencies; no web fonts (system font stack); Formspree for the form; Netlify hosting.

Why no framework: Two pages don't need one, and it proves 90+ mobile performance is about discipline, not tooling.

## Getting started

Open index.html in a browser, or run any static server, e.g. `npx serve .`. There is nothing to install.

## Editing content

Page copy and the menu: index.html (menu section) and contact/index.html. Styles: css/styles.css. Behaviour: js/main.js.

## Changing the WhatsApp number and form

Replace 233000000000 in the WhatsApp links in both HTML files and in the CONFIG block at the top of js/main.js (international format, no "+"). Create a form at formspree.io and replace FORM_ID in contact/index.html and js/main.js.

## Deploying to Netlify

1. Connect the GitHub repo in Netlify.
2. Leave the build command empty.
3. Set the publish directory to ".".
4. Deploy.

## Performance techniques

- Responsive AVIF/WebP images with fixed dimensions
- Separate mobile and desktop hero crops
- Lazy-loaded menu images
- No web fonts
- Critical CSS inlined
- JavaScript under 4 KB loaded with defer
- No third-party requests until the form is submitted

## Handover checklist

Sample content to confirm or replace with the owner's real details before launch:

- [ ] Business name and story
- [ ] Dishes, descriptions and prices
- [ ] Dish photos
- [ ] Address
- [ ] Opening hours
- [ ] WhatsApp number
- [ ] Formspree form ID and notification email
- [ ] Delivery partners
- [ ] Open Graph image
- [ ] Custom domain

## Project documentation

- [docs/SPEC.md](docs/SPEC.md)
- [docs/SHARED-STANDARDS.md](docs/SHARED-STANDARDS.md)
- [docs/design/](docs/design/)

## Credits

Website by Prince Twumasi Asamoah — [GitHub](https://github.com/prince-t-asamoah) and [LinkedIn](https://linkedin.com/in/prince-t-asamoah). Photo credits: [to be added].

## Licence

MIT — see LICENSE.
