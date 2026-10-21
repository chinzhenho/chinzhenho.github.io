/*
 * Builds the page from the data in projects.js.
 * You normally only edit projects.js. This file is organised top to bottom as:
 *   1. Helpers   – safe HTML templates, URL checks, small DOM utilities
 *   2. Templates – reusable pieces (buttons, cards, icons)
 *   3. Sections  – one render function per page section
 *   4. Behaviour – contact menu, copy buttons, scroll effects
 *   5. Start-up  – runs everything, one section at a time
 */
(() => {
  "use strict";

  /* ============================== 1. Helpers ============================== */

  const $ = (id) => document.getElementById(id);

  const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

  /** Marks a string as already-safe HTML so `html` will not escape it again. */
  class SafeHtml {
    constructor(value) {
      this.value = value;
    }
    toString() {
      return this.value;
    }
  }

  /**
   * Tagged template that escapes every ${value} by default, so data from projects.js
   * can never inject HTML. Arrays are joined; null / undefined / false render nothing.
   * Only SafeHtml (output of another `html` call) is inserted as-is.
   */
  function html(strings, ...values) {
    const render = (v) => {
      if (v instanceof SafeHtml) return v.value;
      if (Array.isArray(v)) return v.map(render).join("");
      if (v === null || v === undefined || v === false) return "";
      return escapeHtml(v);
    };
    return new SafeHtml(strings.reduce((out, str, i) => out + str + (i < values.length ? render(values[i]) : ""), ""));
  }

  /** Puts a template into an element, if the element exists. */
  function mount(id, content) {
    const el = $(id);
    if (el) el.innerHTML = content instanceof SafeHtml ? content.value : escapeHtml(content);
  }

  function setText(id, text) {
    const el = $(id);
    if (el) el.textContent = text ?? "";
  }

  /**
   * Allows only link types this site needs. Anything else (e.g. "javascript:")
   * returns "" so the link is simply not shown.
   */
  function safeUrl(url) {
    if (typeof url !== "string" || !url.trim()) return "";
    const value = url.trim();
    if (value.startsWith("#")) return value;
    try {
      const parsed = new URL(value, document.baseURI);
      const allowed = ["https:", "http:", "mailto:", "tel:"];
      return allowed.includes(parsed.protocol) ? value : "";
    } catch {
      return "";
    }
  }

  /** A link that opens in a new tab without giving that page access to this one. */
  const isExternal = (url) => /^https?:/i.test(url);
  const externalAttrs = (url) => (isExternal(url) ? html` target="_blank" rel="noopener noreferrer"` : "");

  const list = (items) => (Array.isArray(items) ? items : []);

  /* ============================= 2. Templates ============================= */

  function linkButton(url, label, className = "btn") {
    const href = safeUrl(url);
    if (!href) return "";
    return html`<a class="${className}" href="${href}"${externalAttrs(href)}>${label}</a>`;
  }

  const tags = (items) => html`<div class="tags">${list(items).map((t) => html`<span class="tag">${t}</span>`)}</div>`;
  const bullets = (items) => html`<ul class="points">${list(items).map((t) => html`<li>${t}</li>`)}</ul>`;

  function meta(project) {
    const text = [project.category, project.year].filter(Boolean).join(" · ");
    return html`<span class="card-meta">${text}${project.badge ? html`<span class="badge">${project.badge}</span>` : ""}</span>`;
  }

  /** Project screenshot; clickable when the project has a live site or source code. */
  function cover(project, className) {
    const img = html`<img src="${safeUrl(project.cover)}" alt="${project.title} screenshot" loading="lazy" decoding="async" />`;
    const href = safeUrl(project.link) || safeUrl(project.code);
    return href
      ? html`<a class="${className}" href="${href}"${externalAttrs(href)} aria-label="Open ${project.title}">${img}</a>`
      : html`<div class="${className}">${img}</div>`;
  }

  /** One big number plus up to two smaller ones underneath. */
  function metrics(items) {
    const [main, ...rest] = list(items);
    if (!main) return "";
    return html`
      <div class="metrics">
        <div class="metric-main"><strong>${main.value}</strong><span>${main.label}</span></div>
        ${rest.length ? html`<ul class="metric-more">${rest.map((m) => html`<li><strong>${m.value}</strong> ${m.label}</li>`)}</ul>` : ""}
      </div>`;
  }

  const ICONS = {
    mail: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
    whatsapp: html`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>`,
    copy: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>`,
    arrow: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  };

  /** Contact card: the whole card is one button/link, with a small copy icon in the corner. */
  function contactCard({ id, icon, label, value, action, href, copy, menu = "" }) {
    const body = html`
      <span class="contact-icon ${icon}">${ICONS[icon]}</span>
      <span class="contact-text">
        <span class="contact-label">${label}</span>
        <strong class="contact-value">${value}</strong>
        <span class="contact-action">${action} ${ICONS.arrow}</span>
      </span>`;
    const main = href
      ? html`<a class="contact-main" href="${href}"${externalAttrs(href)}>${body}</a>`
      : html`<button class="contact-main" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="${id}-menu">${body}</button>`;
    return html`
      <div class="contact-card" id="${id}">
        ${main}
        <button class="copy-icon" type="button" title="Copy" aria-label="Copy ${label}" data-copy="${copy}" data-label="${label}">${ICONS.copy}</button>
        ${menu}
      </div>`;
  }

  /* ============================== 3. Sections ============================== */

  function renderHero(profile) {
    if (profile.name) document.title = `${profile.name} · Software Engineer Portfolio`;
    setText("nav-name", profile.name);
    setText("hero-status-text", profile.availability);
    setText("hero-name", `${profile.name} — ${profile.role}`);
    setText("hero-headline", profile.headline);
    setText("hero-intro", profile.intro);

    mount(
      "hero-actions",
      html`<a class="btn primary" href="#contact">Contact me</a>
        ${linkButton(profile.resume, "Download resume")}
        <a class="btn" href="#work">See my work ↓</a>`
    );
    mount("hero-proof", html`${list(profile.heroProof).map((p) => html`<li><strong>${p.value}</strong> ${p.label}</li>`)}`);
  }

  function renderFeaturedProjects(items) {
    mount(
      "featured-list",
      html`${items.map(
        (p, i) => html`
          <article class="feature${i % 2 ? " flip" : ""}">
            ${cover(p, "feature-cover")}
            <div class="feature-body">
              ${meta(p)}
              <h3>${p.title}</h3>
              <p class="feature-desc">${p.description}</p>
              ${metrics(p.metrics)}
              ${list(p.highlights).length ? bullets(p.highlights) : ""}
              ${tags(p.tags)}
              <div class="feature-links">
                ${linkButton(p.link, "Visit live site →", "btn primary small")}
                ${linkButton(p.code, "Source code", "btn small")}
              </div>
            </div>
          </article>`
      )}`
    );
  }

  function renderMoreProjects(items) {
    mount(
      "project-grid",
      html`${items.map(
        (p) => html`
          <article class="card">
            ${cover(p, "cover")}
            <div class="card-body">
              ${meta(p)}
              <h3>${p.title}</h3>
              <p>${p.description}</p>
              ${tags(p.tags)}
              <div class="card-links">
                ${linkButton(p.link, "Visit site →", "")}
                ${linkButton(p.code, "Source code →", "")}
              </div>
            </div>
          </article>`
      )}`
    );
  }

  function renderExperience(items) {
    mount(
      "experience-list",
      html`${items.map(
        (job) => html`
          <article class="job">
            <div class="job-head">
              <div>
                <h3>${job.role}</h3>
                ${job.company ? html`<p class="job-company">${job.company}</p>` : ""}
              </div>
              <span class="job-period">${job.period}</span>
            </div>
            ${bullets(job.points)}
            ${list(job.tech).length ? tags(job.tech) : ""}
          </article>`
      )}`
    );
  }

  function renderAbout(profile, education) {
    // Show the photo block only when a photo is set
    const avatar = $("avatar");
    const photo = safeUrl(profile.photo);
    if (photo && avatar) {
      mount("avatar", html`<img src="${photo}" alt="${profile.name}" />`);
    } else if (avatar) {
      avatar.remove();
      document.querySelector(".about-top")?.classList.add("no-photo");
    }

    setText("about-heading", `Hi, I'm ${profile.shortName || profile.name}.`);
    setText("about-text", profile.about);

    mount(
      "principles",
      html`${list(profile.principles).map(
        (p, i) => html`<div class="principle"><span class="num">${String(i + 1).padStart(2, "0")}</span><h3>${p.title}</h3><p>${p.text}</p></div>`
      )}`
    );

    mount(
      "education-list",
      html`${education.map(
        (e) => html`
          <div class="edu-item">
            <strong>${e.degree}</strong>
            <p>${e.school} · ${e.period}</p>
            ${e.detail ? html`<p>${e.detail}</p>` : ""}
            ${list(e.coursework).length
              ? html`<p class="course-title">Relevant coursework</p>
                  <ul class="courses">${e.coursework.map((c) => html`<li>${c.name}<span class="grade">${c.grade}</span></li>`)}</ul>`
              : ""}
          </div>`
      )}`
    );

    mount(
      "skills",
      html`${list(profile.skills).map(
        (group) => html`
          <div class="skill-group">
            <span class="skill-label">${group.label}</span>
            <ul class="skills">${list(group.items).map((s) => html`<li>${s}</li>`)}</ul>
          </div>`
      )}`
    );
    mount("languages", html`${list(profile.languages).map((l) => html`<li>${l}</li>`)}`);
  }

  function renderContact(profile) {
    setText("cta-text", [profile.contactText, profile.replyTime].filter(Boolean).join(" "));

    const subject = encodeURIComponent(`Opportunity for ${profile.name}`);
    const to = encodeURIComponent(profile.email || "");
    const greeting = encodeURIComponent(
      `Hi ${profile.shortName || profile.name}, I saw your portfolio and would like to talk about an opportunity.`
    );
    const phoneDigits = (profile.phone || "").replace(/\D/g, "");
    const emailOptions = [
      ["Gmail", `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}`],
      ["Outlook", `https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${subject}`],
      ["Default email app", `mailto:${profile.email}?subject=${subject}`],
    ];

    const emailCard = profile.email
      ? contactCard({
          id: "email-card",
          icon: "mail",
          label: "Email",
          value: profile.email,
          action: "Send an email",
          copy: profile.email,
          menu: html`
            <div class="contact-menu" id="email-card-menu" hidden>
              <span>Open with</span>
              ${emailOptions.map(([label, url]) => html`<a href="${safeUrl(url)}"${externalAttrs(url)}>${label}</a>`)}
            </div>`,
        })
      : "";

    const phoneCard = phoneDigits
      ? contactCard({
          id: "phone-card",
          icon: "whatsapp",
          label: "WhatsApp",
          value: profile.phoneDisplay || profile.phone,
          action: "Chat on WhatsApp",
          href: `https://wa.me/${phoneDigits}?text=${greeting}`,
          copy: profile.phoneDisplay || profile.phone,
        })
      : "";

    mount("contact-cards", html`${emailCard}${phoneCard}`);
    mount(
      "cta-actions",
      html`${linkButton(profile.resume, "Download resume", "btn ghost")}
        ${linkButton(profile.linkedin, "LinkedIn", "btn ghost")}
        ${linkButton(profile.github, "GitHub", "btn ghost")}`
    );
    setText("cta-note", profile.location ? `Based in ${profile.location}` : "");
    setText("copyright", `© ${new Date().getFullYear()} ${profile.name}`);
  }

  /* ============================= 4. Behaviour ============================= */

  function showToast(message) {
    const toast = $("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2000);
  }

  /** Email card opens a small "Open with" menu; clicking elsewhere or Escape closes it. */
  function setupEmailMenu() {
    const card = $("email-card");
    const menu = $("email-card-menu");
    const trigger = card?.querySelector(".contact-main");
    if (!card || !menu || !trigger) return;

    const setOpen = (open) => {
      menu.hidden = !open;
      trigger.setAttribute("aria-expanded", String(open));
      card.classList.toggle("open", open);
    };
    trigger.addEventListener("click", () => setOpen(menu.hidden));
    menu.addEventListener("click", () => setOpen(false));
    document.addEventListener("click", (e) => {
      if (!card.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) {
        setOpen(false);
        trigger.focus();
      }
    });
  }

  /** Copy icons on the contact cards. Falls back to showing the text if copying is blocked. */
  function setupCopyButtons() {
    $("contact-cards")?.addEventListener("click", async (e) => {
      const button = e.target.closest("[data-copy]");
      if (!button) return;
      try {
        await navigator.clipboard.writeText(button.dataset.copy);
        showToast(`${button.dataset.label} copied ✓`);
      } catch {
        showToast(button.dataset.copy);
      }
    });
  }

  /**
   * One scroll listener for both scroll effects:
   *  - darkens the navbar link for the section on screen
   *  - shows the floating "Contact me" button (phones) between the hero and the contact section
   */
  function setupScrollEffects() {
    // section id -> navbar link it belongs to (contact has its own "Hire me" button)
    const NAV_FOR_SECTION = { work: "#work", experience: "#experience", "more-projects": "#more-projects", about: "#about", contact: null };
    const sections = Object.keys(NAV_FOR_SECTION).map($).filter(Boolean);
    const links = [...document.querySelectorAll(".nav-links a:not(.nav-cta)")];
    const nav = document.querySelector(".nav");
    const floatButton = $("float-cta");
    const contact = $("contact");

    const update = () => {
      // A section counts as "current" once its top passes a line 30% down the screen
      const line = (nav?.offsetHeight || 0) + window.innerHeight * 0.3;
      let current = null;
      for (const section of sections) if (section.getBoundingClientRect().top <= line) current = section.id;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = "contact";

      const activeHref = current ? NAV_FOR_SECTION[current] : null;
      for (const link of links) {
        const on = link.getAttribute("href") === activeHref;
        link.classList.toggle("active", on);
        if (on) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }

      if (floatButton && contact) {
        const pastHero = window.scrollY > 500;
        const atContact = contact.getBoundingClientRect().top < window.innerHeight;
        floatButton.classList.toggle("show", pastHero && !atContact);
      }
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /** If a cover image is missing or fails to load, show a clean placeholder instead of a broken icon. */
  function setupImageFallbacks() {
    const markMissing = (img) => {
      img.parentElement?.classList.add("img-missing");
      console.warn(`Image could not be loaded: ${img.getAttribute("src") || "(no path)"}`);
    };
    for (const img of document.querySelectorAll("main img")) {
      if (!img.getAttribute("src")) markMissing(img);
      else if (img.complete && img.naturalWidth === 0) markMissing(img);
      else img.addEventListener("error", () => markMissing(img), { once: true });
    }
  }

  /** Address without any "#section" part, e.g. "https://chinzhenho.github.io/". */
  const cleanAddress = () => location.pathname + location.search;

  /** Scrolls to a section and moves keyboard focus there, without adding "#..." to the address. */
  function goToSection(target, smooth) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: smooth && !reduceMotion ? "smooth" : "instant", block: "start" });
    // Let keyboard and screen-reader users continue from the section they jumped to
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }

  /** In-page links (navbar, buttons, "Back to top") scroll smoothly and keep the address clean. */
  function setupInPageLinks() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      // Let the browser handle Ctrl/Cmd/Shift-clicks (open in new tab, etc.)
      if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = document.getElementById(link.getAttribute("href").slice(1));
      if (!target) return;
      e.preventDefault();
      goToSection(target, true);
    });
  }

  /**
   * Opening an older shared link like ".../#work": jump there once the page content
   * has been built, then tidy the address back to plain "chinzhenho.github.io".
   */
  function scrollToHash() {
    if (!location.hash) return;
    let target = null;
    try {
      target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    } catch {
      // malformed hash: just clean the address
    }
    history.replaceState(null, "", cleanAddress());
    if (target) goToSection(target, false); // content is already built at this point
  }

  /* ============================== 5. Start-up ============================== */

  /** Warns in the browser console about data mistakes in projects.js, without breaking the page. */
  function checkData(profile, projectList) {
    const warn = (msg) => console.warn(`projects.js: ${msg}`);

    for (const key of ["name", "headline", "email"]) {
      if (!profile[key]) warn(`PROFILE.${key} is empty`);
    }
    for (const key of ["github", "linkedin", "resume"]) {
      if (profile[key] && !safeUrl(profile[key])) warn(`PROFILE.${key} is not a valid link and is hidden: ${profile[key]}`);
    }

    projectList.forEach((p, i) => {
      const name = p.title || `projects[${i}]`;
      // required fields
      for (const key of ["title", "category", "description", "cover"]) {
        if (!p[key]) warn(`${name} is missing "${key}"`);
      }
      // fields that must be lists, e.g. tags: ["Java", "React"]
      for (const key of ["tags", "highlights", "metrics"]) {
        if (p[key] !== undefined && !Array.isArray(p[key])) warn(`${name}.${key} should be a list [ ... ]`);
      }
      list(p.metrics).forEach((m, j) => {
        if (!m || m.value === undefined || !m.label) warn(`${name}.metrics[${j}] needs both "value" and "label"`);
      });
      // optional links: fine to leave empty, but must be valid if filled in
      for (const key of ["link", "code"]) {
        if (p[key] && !safeUrl(p[key])) warn(`${name}.${key} is not a valid link and is hidden: ${p[key]}`);
      }
      if (!p.link && !p.code) warn(`${name} has no live site or source code link`);
    });
  }

  /**
   * Runs each step on its own, so a mistake in one section never blanks the whole page.
   * If a section fails, its container shows a short message instead of staying empty.
   */
  function run(name, step, fallbackId) {
    try {
      step();
    } catch (error) {
      console.error(`Could not build "${name}":`, error);
      if (fallbackId) {
        mount(
          fallbackId,
          html`<p class="section-error">This section could not be loaded. You can still see my work on
            <a href="https://github.com/chinzhenho" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>`
        );
      }
    }
  }

  /** Keeps only real { ... } entries, so one broken entry cannot take down a whole section. */
  function entries(value, name) {
    return list(value).filter((item, i) => {
      const ok = item !== null && typeof item === "object";
      if (!ok) console.warn(`projects.js: ${name}[${i}] is not a { ... } entry and was skipped`);
      return ok;
    });
  }

  const profile = typeof PROFILE === "object" && PROFILE ? PROFILE : {};
  const projectList = entries(typeof projects !== "undefined" ? projects : [], "projects");
  const experienceList = entries(typeof experience !== "undefined" ? experience : [], "experience");
  const educationList = entries(typeof education !== "undefined" ? education : [], "education");

  run("data check", () => checkData(profile, projectList));
  run("hero", () => renderHero(profile));
  run("main projects", () => renderFeaturedProjects(projectList.filter((p) => p.featured)), "featured-list");
  run("more projects", () => renderMoreProjects(projectList.filter((p) => !p.featured)), "project-grid");
  run("experience", () => renderExperience(experienceList), "experience-list");
  run("about", () => renderAbout(profile, educationList));
  run("contact", () => renderContact(profile), "contact-cards");
  run("image fallbacks", setupImageFallbacks);
  run("email menu", setupEmailMenu);
  run("copy buttons", setupCopyButtons);
  run("scroll effects", setupScrollEffects);
  run("in-page links", setupInPageLinks);
  run("scroll to #section", scrollToHash);
})();
