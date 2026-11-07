# Component states

| Component | default | hover | focus-visible | disabled / other |
|---|---|---|---|---|
| Primary button | primary bg, white 16/700, 48h, pill, 0 24 | primary-dark bg | 3px ink outline, 2px offset (cream/white outline on photo or red bg) | Sending: primary-dark bg, label "Sending…", `disabled`, `aria-busy`, cursor progress |
| Secondary (Order this) | white bg, 2px primary border, primary text | primary bg, white text | 3px ink outline | border/bg `--color-border`, muted text |
| Outline white (hero) | transparent, 2px cream border, white text | cream bg, ink text | 3px cream outline | — |
| White-on-red (catering) | white bg, primary text | bg cream, primary-dark text | 3px white outline, 3px offset | — |
| Nav link (desktop) | ink 16/600 | primary + underline (8px offset) | 3px primary outline | current: 3px accent underline |
| Input / select / textarea | 1.5px input-border, white | — | primary border + 0 0 0 3px rgba(178,58,18,.25) ring | error: primary border, `--color-error-bg`, message 14/600 primary + alert icon, `aria-invalid`, `aria-live="polite"` |
| Dish card | see screens.md | — (button carries hover) | — | missing photo: striped/colour block with dish name |
| Header | sticky, solid cream, kente bottom edge | — | skip link above header on focus | height never changes |
| Mobile menu overlay | full screen cream, top bar = header (logo + ✕ 48×48 same position as Menu button), kente under top bar, links 24/700 rows 64h with 1px dividers + chevron, pinned bottom: full-width primary "Order on WhatsApp" (52h) + hours line 15 muted | — | native dialog focus trap | current page: accent underline + aria-current |
| WhatsApp float | 56px green, shadow | scale 1.05 | 3px ink outline, 3px offset | hidden while overlay open |
| Form success panel | 56px green-tint circle + check, message Georgia 1.5rem 700, role="status" | | | |
| Form failure alert | alert-bg, alert-border, radius 10, alert icon + shared error text with WhatsApp link, role="alert"; form stays filled | | | |
