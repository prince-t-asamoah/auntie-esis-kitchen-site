# Interaction notes

**Sticky header** — `position: sticky; top: 0; z-index: 40`. No scroll JS. Height = `--header-h` (60 / 72), constant.

**Smooth scroll** — CSS only: `scroll-behavior: smooth` inside `prefers-reduced-motion: no-preference`; `section[id] { scroll-margin-top: calc(var(--header-h) + 16px) }`. Prototype uses 500ms ease-in-out to approximate. Targets: #menu, #catering, #find-us. From Contact, section links go to `/#id`.

**Mobile menu** — `<dialog id="mobile-menu">` + `showModal()`. 150ms opacity fade (reduced-motion: instant). Locks page scroll. Closes on ✕, Esc, any link tap (close first, then navigate/scroll), resize ≥768. Focus → first link; returns to Menu button. Floating WA button hidden while open. Not rendered ≥768px.

**WhatsApp links** — real site: `https://wa.me/233533456233?text=…` written in HTML. General message: `Hello Auntie Esi, I'd like to order:`. Per dish: `Hello Auntie Esi, I'd like to order: <Dish> (GHS <price>)`. The prototype's mock chat overlay is prototype-only — do not build it.

**Order buttons** — header Order, hero, overlay, float, contact WA card, failure-alert link → general message. Each "Order this" → dish message.

**Catering quote** — "Request a catering quote" → `/contact/?type=catering`; JS preselects Catering. `event_date` + `guests` show only when type = Catering (visible by default without JS).

**Form** — inline validation on blur (only once a field has a value or an error) and on submit. Submit → button disabled "Sending…" → fetch Formspree (Accept: application/json) → success panel replaces the form, or failure alert above the button. Errors clear as soon as the field becomes valid.

**Google Maps** — plain link, `target="_blank" rel="noopener"`. (Prototype shows a toast instead.)

**Screen transitions** — none on the real site (page loads). Prototype uses a 120ms fade.

**Hover** — colour changes only; WA float scale 1.05 (reduced-motion: none).
