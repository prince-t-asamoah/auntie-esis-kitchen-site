# docs/design — Auntie Esi's Kitchen

Visual reference only. **SPEC.md wins on any conflict.**

## Frames
Mobile frames are exported at 2x (720px wide = 360 CSS px); desktop and sheet frames at 1x.

- `screens/kitchen-home-mobile.png`: Home at 360px, full length
- `screens/kitchen-home-desktop.png`: Home at 1280px, full length
- `screens/kitchen-contact-mobile.png`: Contact at 360px
- `screens/kitchen-contact-desktop.png`: Contact at 1280px
- `screens/kitchen-contact-catering-state.png`: form with Catering selected, showing the event date and guest fields
- `screens/kitchen-form-states.png`: empty, field errors, sending, success and failed
- `screens/kitchen-nav-mobile.png`: full-screen menu overlay, 360×740
- `screens/kitchen-components.png`: tokens, type scale, buttons, inputs, card, badges, WhatsApp button, icons

## Prototype
`kitchen-prototype/KitchenPrototype.dc.html`: open it in a browser, served from that folder. It starts on Home in the mobile flow. In the design tool, the Tweaks panel switches between mobile and desktop and can simulate a form failure.

## Next step in the repo
Add this line to the top of `docs/SPEC.md`:

> Visual reference: see `docs/design/screens/*.png`. Exact spacing, sizes and tokens are in `docs/design/handoff/` — use them as reference only and do not copy prototype code into `src/`.

## Handoff
`handoff/`: developer README, tokens, screen, component and interaction specs, icons and logo.
