// 依照 projects.js 的資料產生頁面內容，一般不需要修改這個檔案

const $ = (id) => document.getElementById(id);

const escapeHtml = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const linkBtn = (href, label, cls = "btn") =>
  href ? `<a class="${cls}" href="${escapeHtml(href)}" target="_blank" rel="noopener">${label}</a>` : "";

function renderProfile() {
  document.title = `${PROFILE.name} · 作品集`;
  $("nav-name").textContent = PROFILE.name;
  $("hero-role").textContent = PROFILE.role;
  $("hero-name").textContent = `你好，我是 ${PROFILE.name}`;
  $("hero-intro").textContent = PROFILE.intro;
  $("about-text").textContent = PROFILE.about;
  $("skills").innerHTML = PROFILE.skills.map((s) => `<li>${escapeHtml(s)}</li>`).join("");

  const mail = PROFILE.email ? `mailto:${PROFILE.email}` : "";
  $("hero-actions").innerHTML =
    `<a class="btn primary" href="#projects">查看作品</a>` +
    linkBtn(PROFILE.resume, "下載履歷") +
    (mail ? `<a class="btn" href="${escapeHtml(mail)}">聯絡我</a>` : "");

  $("contact-links").innerHTML =
    (mail ? `<a class="btn primary" href="${escapeHtml(mail)}">${escapeHtml(PROFILE.email)}</a>` : "") +
    linkBtn(PROFILE.github, "GitHub") +
    linkBtn(PROFILE.linkedin, "LinkedIn");

  $("copyright").textContent = `© ${new Date().getFullYear()} ${PROFILE.name}`;
}

function renderFilters() {
  const categories = ["全部", ...new Set(projects.map((p) => p.category).filter(Boolean))];
  $("filters").innerHTML = categories
    .map((c, i) => `<button class="filter${i === 0 ? " active" : ""}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`)
    .join("");

  $("filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    renderProjects(btn.dataset.cat);
  });
}

function renderProjects(category = "全部") {
  const list = category === "全部" ? projects : projects.filter((p) => p.category === category);

  if (!list.length) {
    $("project-grid").innerHTML = `<p class="empty">目前沒有作品。</p>`;
    return;
  }

  $("project-grid").innerHTML = list
    .map((p) => {
      const href = escapeHtml(p.link || p.code || "#");
      return `
      <article class="card">
        <a class="cover" href="${href}" target="_blank" rel="noopener" aria-label="開啟 ${escapeHtml(p.title)}">
          <img src="${escapeHtml(p.cover)}" alt="${escapeHtml(p.title)} 封面" loading="lazy" />
        </a>
        <div class="card-body">
          <span class="card-meta">${escapeHtml([p.category, p.year].filter(Boolean).join(" · "))}</span>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.description)}</p>
          <div class="tags">${(p.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
          <div class="card-links">
            ${linkBtn(p.link, "查看網站 →", "")}
            ${linkBtn(p.code, "原始碼", "secondary")}
          </div>
        </div>
      </article>`;
    })
    .join("");
}

renderProfile();
renderFilters();
renderProjects();
