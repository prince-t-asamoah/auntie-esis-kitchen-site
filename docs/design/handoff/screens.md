# Screen specs

All values at 360px (mobile) and 1280px (desktop). Container `max-width: var(--container)` (1120px) centred; side gutter 16 / 32px.

## Header (both pages, sticky)
| | 360 | 1280 |
|---|---|---|
| Row height | 54px + 6px kente = 60 (`--header-h`) | 66 + 6 = 72 |
| Wordmark | Georgia 700, 17px | 22px |
| Right side | `Order` pill (48h, 0 18px, 15/700) + Menu button 48×48 (24px icon + 11px "Menu" label) | Links Menu / Catering / Contact (16/600, 48h, 0 14px) + `Order` pill (48h, 0 20px, WA icon 20px) |
| Current page | — | Contact: 3px `--color-accent` underline, 8px offset, `aria-current="page"` |
Background `--color-bg`, solid. Kente stripe is the bottom edge.

## Home
### Hero
| | 360 | 1280 |
|---|---|---|
| Image crop | 4:5 (`<picture>` media max-width:767px) | 16:9 |
| Min height | 450px (content grows it to ~560) | 720px, content vertically centred |
| Padding | 48 16 40 | 64 32 |
| Text column | full | max 40rem |
| H1 | 2.125rem/1.12, balance | 3.25rem |
| Lead | 1.0625rem/1.6, `--color-bg` | 1.1875rem |
| Buttons | stacked, full width, gap 12 | inline, gap 12 |
| Chips | wrap, gap 8; 14px, 6/12 pad, ink .6 fill, 1px cream .4 border, 16px icon | same |
Gap between H1 / lead / buttons: 16 (+8 above buttons and chips). Above the fold at 360×740: H1 + primary button end ≈ 420px.

### Today's menu (#menu)
Section padding 48/16 → 64/32. Heading block gap 8, then 32 / 48 to grid.
Grid: 1 col → 2 col ≥600 → 3 col ≥960; gap 24.
Card: surface, 1px border, radius 14, overflow hidden. Image 4:3 (lazy, width/height set). Body padding 16 20 20, gap 8. Title row: H3 (Georgia 1.25rem) left, price badge right (accent bg, ink 15/700, 7×11 pad, pill). Description muted 16/1.5, flex:1 so buttons align. "Order this": secondary pill, full width, 48h, margin-top 8.

### Ordering is easy
White band, 1px borders top/bottom. 3 steps: 1 col (gap 24) → 3 col (gap 32). Each: 48px circle (bg, border, primary icon 24) + H3 + muted text, gap 16.

### About
Grid 1 col → 2 col, gap 32/48, items centred. Desktop: image left; mobile: text first, image after. Image 1:1, radius 14. Paragraph max 34rem.

### Catering (#catering)
`--color-primary` bg, white text (6.3:1). Mobile: stacked, button full width. Desktop: row, text max 42rem, button right. Button: white bg, primary text.

### Find us (#find-us)
H2, then grid 1 → 2 col, gap 24. Card A: pin icon + address (Georgia 1.25rem 700) + "Open in Google Maps" primary (full width mobile) with external icon. Card B: clock icon + hours list (rows 12px pad, 1px dividers; Sun "Closed" muted). Card padding 20 / 32.

### Footer
Kente stripe top. Row 1 (pad 32 g 16): wordmark (Georgia 20) + address muted 15 | footer nav (id="footer-nav") Menu, Catering, Find us, Contact — 48h buttons. Mobile stacked, desktop row space-between. Row 2: 1px top border, credit 14px muted, padding-bottom 88px mobile (WA clearance) / 32px desktop.

## Contact
Intro section: pad 48 16 0 / 64 32 0; H1, lead (max 40rem), WhatsApp card (white, 1px border, radius 14, 72 min-h, 40px green circle icon, 17/700 text, hover border primary). Max 40rem.
Body grid: 1 col → `1.6fr 1fr`, gap 32/48. Form card: white, radius 14, padding 20 / 32. Fields gap 20; label 15/600, gap 6; phone hint 14 muted.
Inputs 48h, 1.5px `--color-input-border`, radius 10, 16px text. Textarea min 140h. Select uses custom chevron (20px, right 14).
Catering group (event date + guests): tinted `--color-bg` panel, 1px dashed accent, radius 12, 1 col → 2 col.
Submit: primary, full width mobile / auto desktop.
Info aside: phone (TODO), address, hours — icon + text rows, gap 24.

## Floating WhatsApp button
56px circle, `--color-whatsapp`, 26px white glyph, shadow 0 4 14 rgba(42,26,18,.28), 16 / 24px from edges, z 50.
