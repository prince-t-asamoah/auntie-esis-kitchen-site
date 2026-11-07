// Auntie Esi's Kitchen: mobile menu + contact form. No dependencies.
const CONFIG = {
  whatsappNumber: "233533456233", // SAMPLE: owner's WhatsApp number (also hard-coded in the HTML links)
  formspreeId: "maeezjrb", // Formspree form ID (also in the contact form action)
};

const $ = (s, r = document) => r.querySelector(s);
const root = document.documentElement;

// Mobile menu: full-screen <dialog> (shared standards §2b)
const menu = $("#mobile-menu");
const menuBtn = $(".menu-btn");
if (menu && menuBtn && menu.showModal) {
  // overflow:hidden on <html> locks scrolling without moving the page, so the
  // scroll position is unchanged when the menu closes.
  menuBtn.addEventListener("click", () => {
    menu.showModal();
    menuBtn.setAttribute("aria-expanded", "true");
    root.classList.add("menu-open");
    root.style.overflow = "hidden";
    $(".overlay-nav a", menu).focus();
  });
  menu.addEventListener("close", () => {
    menuBtn.setAttribute("aria-expanded", "false");
    root.classList.remove("menu-open");
    root.style.overflow = "";
  });
  menu.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (e.target.closest("[data-close]")) menu.close();
    else if (link && link.hash && link.pathname === location.pathname) {
      // Same-page section: close first, then smooth-scroll (CSS) to the target.
      e.preventDefault();
      menu.close();
      $(link.hash).scrollIntoView();
      history.pushState(null, "", link.hash);
    } else if (link && !link.target) menu.close();
  });
  matchMedia("(min-width: 768px)").addEventListener("change", (e) => e.matches && menu.open && menu.close());
}

// Contact form (SPEC §7)
const form = $("#contact-form");
if (form) {
  const type = form.elements.type;
  const extra = $("#catering-fields");
  const sync = () => (extra.hidden = type.value !== "Catering");
  if (new URLSearchParams(location.search).get("type") === "catering") type.value = "Catering";
  sync();
  type.addEventListener("change", sync);

  const MSG = {
    name: "Please enter your name.",
    phone: "Enter a Ghana number, e.g. 024 123 4567.",
    email: "Check the email address, e.g. name@example.com.",
    type: "Please choose an enquiry type.",
    guests: "Enter at least 1 guest.",
    message: "Please write a short message.",
  };
  const ICON = '<svg class="icon" aria-hidden="true"><use href="#i-alert"/></svg>';

  const check = (el) => {
    if (!MSG[el.name]) return true;
    if (el.name === "phone") el.value = el.value.trim();
    const ok = el.checkValidity();
    const out = $("#" + el.name + "-error");
    el.setAttribute("aria-invalid", !ok);
    out.innerHTML = ok ? "" : ICON + MSG[el.name];
    return ok;
  };

  form.noValidate = true;
  for (const el of form.elements) {
    if (!MSG[el.name]) continue;
    el.addEventListener("blur", () => (el.value || el.getAttribute("aria-invalid") === "true") && check(el));
    el.addEventListener("input", () => el.getAttribute("aria-invalid") === "true" && check(el));
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const bad = [...form.elements].filter((el) => !(el.closest("[hidden]") || check(el)));
    if (bad.length) return bad[0].focus();

    const btn = $("button[type=submit]", form);
    const label = btn.textContent;
    const alert = $("#form-alert");
    alert.hidden = true;
    btn.disabled = true;
    btn.setAttribute("aria-busy", "true");
    btn.textContent = "Sending…";
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.status);
      const done = $("#form-success");
      form.replaceWith(done);
      done.hidden = false;
      done.focus();
    } catch {
      alert.hidden = false;
      btn.disabled = false;
      btn.removeAttribute("aria-busy");
      btn.textContent = label;
    }
  });
}
