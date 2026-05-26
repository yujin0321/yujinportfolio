/* ======================================================
   main.js — config.js 데이터를 읽어 DOM에 렌더링
   일반적으로 이 파일은 수정할 필요 없습니다.
   ====================================================== */

/* localStorage 저장값이 있으면 CONFIG를 덮어씀 (admin.html 연동) */
(function applyLocalStorage() {
  try {
    const saved = localStorage.getItem("portfolio_config");
    if (saved) Object.assign(CONFIG, JSON.parse(saved));
  } catch (e) {}
})();

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  renderHero();
  renderAbout();
  renderHistory();
  renderPortfolio();
  renderFooter();

  initNavScroll();
  initHamburger();
  initFadeIn();
  initModal();
  initFilter();
});

/* ══════════════════════════════════════
   네비게이션
   ══════════════════════════════════════ */
function renderNav() {
  document.getElementById("nav-logo").textContent = CONFIG.nameEn || CONFIG.name;
  document.title = `${CONFIG.name} | Portfolio`;
}

/* ══════════════════════════════════════
   HOME
   ══════════════════════════════════════ */
function renderHero() {
  document.getElementById("hero-name").textContent = CONFIG.name + "입니다.";
  document.getElementById("hero-tagline").textContent = CONFIG.tagline || "";

  const btns = document.getElementById("hero-btns");
  if (CONFIG.social.email)
    btns.appendChild(makeLink("✉ Email", `mailto:${CONFIG.social.email}`, "btn btn-primary"));
  if (CONFIG.social.github)
    btns.appendChild(makeLink("GitHub", CONFIG.social.github, "btn btn-ghost"));
  if (CONFIG.social.linkedin)
    btns.appendChild(makeLink("LinkedIn", CONFIG.social.linkedin, "btn btn-ghost"));
  if (CONFIG.social.blog)
    btns.appendChild(makeLink("Blog", CONFIG.social.blog, "btn btn-ghost"));
}

/* ══════════════════════════════════════
   ABOUT
   ══════════════════════════════════════ */
function renderAbout() {
  document.getElementById("about-intro").textContent = CONFIG.intro || CONFIG.about || "";

  /* 프로필 사진 경로 반영 */
  const aboutImg = document.getElementById("about-img");
  if (aboutImg && CONFIG.profileImage) aboutImg.src = CONFIG.profileImage;

  /* 연락처 */
  const contacts = document.getElementById("about-contacts");
  if (CONFIG.social.github)   contacts.appendChild(contactRow("Github",  CONFIG.social.github, true));
  if (CONFIG.social.email)    contacts.appendChild(contactRow("E-mail",  CONFIG.social.email,  false, `mailto:${CONFIG.social.email}`));
  if (CONFIG.social.phone)    contacts.appendChild(contactRow("Phone",   CONFIG.social.phone,  false, `tel:${CONFIG.social.phone}`));
  if (CONFIG.social.linkedin) contacts.appendChild(contactRow("LinkedIn",CONFIG.social.linkedin, true));
  if (CONFIG.social.blog)     contacts.appendChild(contactRow("Blog",    CONFIG.social.blog,   true));

  /* 기술 스택 */
  const cats = document.getElementById("skills-cats");
  (CONFIG.skills || []).forEach(cat => {
    const card = document.createElement("div");
    card.className = "skill-cat-card";
    const items = cat.items.map(i => `<li>${i}</li>`).join("");
    card.innerHTML = `<p class="skill-cat-name">${cat.category}</p><ul class="skill-cat-items">${items}</ul>`;
    cats.appendChild(card);
  });
}

function contactRow(label, value, isLink, href) {
  const div = document.createElement("div");
  div.className = "contact-row";
  const content = isLink
    ? `<a href="${href || value}" target="_blank" rel="noopener">${value}</a>`
    : `<a href="${href}">${value}</a>`;
  div.innerHTML = `<span class="label">${label}</span>${content}`;
  return div;
}

/* ══════════════════════════════════════
   HISTORY
   ══════════════════════════════════════ */
function renderHistory() {
  const eduEl    = document.getElementById("edu-timeline");
  const careerEl = document.getElementById("career-timeline");

  (CONFIG.education || []).forEach(e => eduEl.appendChild(tlItem(e.period, e.school, e.dept, e.note)));
  (CONFIG.career    || []).forEach(c => careerEl.appendChild(tlItem(c.period, c.org, c.role, c.desc)));
}

function tlItem(period, main, sub, note) {
  const div = document.createElement("div");
  div.className = "tl-item";
  div.innerHTML = `
    <p class="tl-period">${period}</p>
    <p class="tl-main">${main}</p>
    <p class="tl-sub">${sub}</p>
    ${note ? `<span class="tl-note">${note}</span>` : ""}
  `;
  return div;
}

/* ══════════════════════════════════════
   PORTFOLIO
   ══════════════════════════════════════ */
const GRAD_ICONS = ["🛡️", "💳", "🍿", "⚙️", "👵"];
let activeCat = "All";
let searchQuery = "";

function renderPortfolio() {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;
  grid.innerHTML = "";

  (CONFIG.projects || []).forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "pf-card";
    card.dataset.cat = p.category;
    card.dataset.id  = p.id;
    card.dataset.stack = (p.details?.stack || []).join(" ");
    card.dataset.overview = p.details?.overview || "";

    const thumb = p.thumb
      ? `<img class="pf-thumb" src="${p.thumb}" alt="${p.title}" />`
      : `<div class="pf-thumb-placeholder grad-${i % 5}">${GRAD_ICONS[i % 5]}</div>`;

    const catLabel = { "Data-Analysis": "Data-Analysis", "AI-ML": "AI / ML" }[p.category] || p.category;

    const stackPreview = (p.details?.stack || [])
      .slice(0, 4)
      .map(s => `<span class="pf-stack-badge">${s}</span>`)
      .join("");

    card.innerHTML = `
      <div class="pf-thumb-wrap">
        ${thumb}
      </div>
      <div class="pf-body">
        <div class="pf-top-meta">
          <span class="pf-badge">${catLabel}</span>
        </div>
        <h3 class="pf-title">${p.title}</h3>
        
        <div class="pf-info-list">
          <div class="pf-info-item">
            <span class="info-icon">📅</span>
            <span class="info-text">${p.period || ""}</span>
          </div>
          <div class="pf-info-item">
            <span class="info-icon">👤</span>
            <span class="info-text">${p.member || ""}</span>
          </div>
        </div>

        <div class="pf-stack-preview">
          ${stackPreview}
        </div>
        
        <div class="pf-action">
          <button class="pf-detail-btn">상세보기</button>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openModal(p));
    grid.appendChild(card);
  });

  const countEl = document.getElementById("project-count");
  if (countEl) {
    countEl.textContent = (CONFIG.projects || []).length;
  }
}

/* ── 필터 및 검색 적용 ── */
function applyFilters() {
  const cards = document.querySelectorAll(".pf-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const title = card.querySelector(".pf-title").textContent.toLowerCase();
    const stack = card.dataset.stack.toLowerCase();
    const overview = card.dataset.overview.toLowerCase();
    const category = card.dataset.cat;

    const matchesCat = (activeCat === "All" || category === activeCat);
    const matchesSearch = (!searchQuery || 
                           title.includes(searchQuery) || 
                           stack.includes(searchQuery) ||
                           overview.includes(searchQuery));

    const isVisible = matchesCat && matchesSearch;
    card.classList.toggle("hidden", !isVisible);
    if (isVisible) {
      visibleCount++;
    }
  });

  const countEl = document.getElementById("project-count");
  if (countEl) {
    countEl.textContent = visibleCount;
  }
}

/* ── 필터 & 검색 초기화 ── */
function initFilter() {
  const searchInput = document.getElementById("project-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCat = btn.dataset.cat;
      applyFilters();
    });
  });
}

/* ══════════════════════════════════════
   모달
   ══════════════════════════════════════ */
function initModal() {
  const backdrop = document.getElementById("modal-backdrop");
  document.getElementById("modal-close").addEventListener("click", closeModal);
  backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}

function openModal(p) {
  const d = p.details || {};
  document.getElementById("modal-title").textContent = p.title;

  /* 태그 */
  const meta = document.getElementById("modal-meta");
  meta.innerHTML = (d.stack || []).map(t => `<span class="tag">${t}</span>`).join("");

  /* 본문 */
  const body = document.getElementById("modal-body");
  let html = "";
  if (d.overview)  html += `<h4>개요</h4><p>${d.overview}</p>`;
  if (d.features?.length) {
    html += `<h4>주요 기능</h4><ul>${d.features.map(f => `<li>${f}</li>`).join("")}</ul>`;
  }

  /* 링크 */
  const links = [
    p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-ghost" style="font-size:.85rem;padding:.4rem 1rem;">GitHub</a>` : "",
    p.demo   ? `<a href="${p.demo}"   target="_blank" rel="noopener" class="btn btn-primary" style="font-size:.85rem;padding:.4rem 1rem;">Demo</a>` : "",
  ].filter(Boolean).join("");
  if (links) html += `<div class="modal-links">${links}</div>`;

  body.innerHTML = html;

  const backdrop = document.getElementById("modal-backdrop");
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-backdrop").classList.remove("open");
  document.body.style.overflow = "";
}

/* ══════════════════════════════════════
   푸터
   ══════════════════════════════════════ */
function renderFooter() {
  document.getElementById("footer-text").textContent =
    `© ${new Date().getFullYear()} ${CONFIG.name}. All rights reserved.`;
}

/* ══════════════════════════════════════
   네비게이션 스크롤 & 활성 링크
   ══════════════════════════════════════ */
function initNavScroll() {
  const navbar  = document.getElementById("navbar");
  const links   = document.querySelectorAll(".nav-link");
  const sections = ["section-home","section-about","section-resume","section-portfolio"]
    .map(id => document.getElementById(id)).filter(Boolean);

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    const mid = window.scrollY + window.innerHeight / 2;
    let activeId = sections[0]?.id;
    sections.forEach(s => { if (s.offsetTop <= mid) activeId = s.id; });
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${activeId}`));
  }, { passive: true });
}

/* ══════════════════════════════════════
   햄버거 메뉴
   ══════════════════════════════════════ */
function initHamburger() {
  const btn  = document.getElementById("hamburger");
  const menu = document.getElementById("nav-links");
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.classList.toggle("open", open);
  });
  menu.querySelectorAll(".nav-link").forEach(a =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.classList.remove("open");
    })
  );
}

/* ══════════════════════════════════════
   스크롤 페이드인
   ══════════════════════════════════════ */
function initFadeIn() {
  const els = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      /* rootMargin을 넉넉히 줘서 화면에 들어오는 즉시 트리거 */
      { threshold: 0, rootMargin: "200px 0px 200px 0px" }
    );
    els.forEach(el => io.observe(el));
  }

  /* 즉시 폴백: 로컬 파일(file://) 환경에서도 확실히 표시 */
  setTimeout(() => els.forEach(el => el.classList.add("visible")), 100);
}

/* ══════════════════════════════════════
   헬퍼
   ══════════════════════════════════════ */
function makeLink(label, href, cls) {
  const a = document.createElement("a");
  a.href = href;
  a.className = cls;
  a.textContent = label;
  if (!href.startsWith("mailto")) { a.target = "_blank"; a.rel = "noopener"; }
  return a;
}
