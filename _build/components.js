// =====================================================================
// Shared HTML components (server-side string templating)
// =====================================================================

const { SITE, CERTS, NAV } = require("./data");

const escape = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Lucide-inspired stroke icons (24×24 viewbox)
const ICON_PATHS = {
  flame: '<path d="M8.5 14.5C8.5 13 9 11.5 10 10.5c.5-.5 1-1.5 1-2.5 0-1 0-2 1-3 1 1 1.5 2 1.5 3.5 0 1.5 1 2 2 3.5s1.5 3 1.5 4.5a5 5 0 0 1-9 0Z"/>',
  factory: '<path d="M2 20V9l5 3V9l5 3V9l5 3V8l5-3v15z"/><path d="M9 17h2M14 17h2M19 17h1"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 1-5.6 5.6L4 17l3 3 5.1-5.1a4 4 0 0 1 5.6-5.6z"/>',
  pipe: '<path d="M3 7h6v4h6v6h6"/><circle cx="6" cy="7" r="2"/><circle cx="18" cy="17" r="2"/>',
  thermo: '<path d="M14 4a2 2 0 0 0-4 0v10a4 4 0 1 0 4 0Z"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/>',
  snow: '<path d="M12 2v20M4 5l16 14M20 5 4 19"/>',
  drop: '<path d="M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11Z"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 9-12h-7z"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.5 1.8L7.6 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.8-.5l3 .5a2 2 0 0 1 1.7 2Z"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-7"/>',
  map: '<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-3 5 3-2-7"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1A4 4 0 0 1 16 11"/>',
  arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  check: '<path d="M5 12l4 4L19 6"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>',
};

const icon = (name, size = 20) => {
  const d = ICON_PATHS[name] || ICON_PATHS.flame;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
};

// ---------- Site header ----------
function header(activeKey = "") {
  const phoneStripped = SITE.phone.replace(/\s/g, "");
  const links = NAV.map((l) => {
    const cls = `nav-link${activeKey === l.key ? " active" : ""}`;
    if (l.submenu) {
      const items = l.submenu
        .map(([n, h]) => `<a href="${h}">${escape(n)}</a>`)
        .join("");
      return `
        <span class="has-submenu">
          <a class="${cls}" href="${l.href}">${escape(l.label)}<span class="caret">▾</span></a>
          <span class="submenu" role="menu">${items}</span>
        </span>`;
    }
    return `<a class="${cls}" href="${l.href}">${escape(l.label)}</a>`;
  }).join("");

  return `
  <a class="skip-link" href="#main">Aller au contenu</a>
  <header class="site-header">
    <div class="container row-between" style="width:100%">
      <a href="/" class="logo">
        <span class="logo-mark">PS</span>
        <span class="logo-name">${SITE.brand}<small>${SITE.domain}</small></span>
      </a>
      <nav class="primary" style="display:flex;gap:28px;align-items:center" aria-label="Navigation principale">
        ${links}
      </nav>
      <div class="row" style="gap:12px">
        <a href="tel:${phoneStripped}" class="phone row" style="gap:6px">${icon("phone", 14)}${SITE.phone}</a>
        <a href="/devis-chauffage-industriel/" class="btn primary">Demander un devis</a>
        <button class="nav-toggle" aria-label="Menu" aria-expanded="false">${icon("flame", 20)}</button>
      </div>
    </div>
  </header>`;
}

// ---------- Trust strip ----------
function trustStrip() {
  return `
  <div class="trust-strip" aria-label="Certifications">
    ${CERTS.map((c) => `<span class="cert">${escape(c)}</span>`).join("")}
  </div>`;
}

// ---------- Breadcrumb ----------
function breadcrumb(items) {
  const last = items.length - 1;
  return `
  <nav class="breadcrumb" aria-label="Fil d'Ariane">
    ${items
      .map((it, i) => {
        const sep = i > 0 ? '<span class="sep">›</span>' : "";
        const node =
          i === last
            ? `<span class="current">${escape(it.label)}</span>`
            : `<a href="${it.href}">${escape(it.label)}</a>`;
        return `${sep}${node}`;
      })
      .join("")}
  </nav>`;
}

// ---------- Footer ----------
function footer() {
  const phoneStripped = SITE.phone.replace(/\s/g, "");
  const phoneAltStripped = SITE.phoneAlt.replace(/\s/g, "");
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="grid">
        <div class="stack-4">
          <div class="row" style="gap:10px">
            <span style="width:32px;height:32px;background:#fff;color:#0E1B2C;border-radius:2px;display:grid;place-items:center;font-weight:800;font-size:13px;font-family:var(--font-display)">PS</span>
            <span style="color:#fff;font-weight:700;font-family:var(--font-display)">${SITE.brand}</span>
          </div>
          <p class="body on-dark" style="font-size:13px">Chauffagiste industriel certifié QualiGaz, RGE, QualiPAC, QualiBois.</p>
          <ul>
            <li>${SITE.address}</li>
            <li><a href="tel:${phoneStripped}">${icon("phone", 12)} ${SITE.phone}</a> / <a href="tel:${phoneAltStripped}">${SITE.phoneAlt}</a></li>
            <li><a href="mailto:${SITE.email}">${icon("mail", 12)} ${SITE.email}</a></li>
          </ul>
          <div class="row" style="gap:8px">
            ${["LinkedIn", "Instagram", "Facebook"]
              .map((s) => `<span style="width:28px;height:28px;border:1px solid rgba(255,255,255,0.2);border-radius:2px;display:grid;place-items:center;font-size:10px;color:#fff;text-transform:uppercase;font-weight:700">${s.slice(0, 2)}</span>`)
              .join("")}
          </div>
        </div>
        <div>
          <h4>Chauffage industriel</h4>
          <ul>
            <li class="dom"><a href="/chauffagiste-industriel/">Chauffagiste industriel</a></li>
            <li><a href="/chauffage-industriel/chauffage-gaz/">Chauffage gaz industriel</a></li>
            <li><a href="/chauffage-industriel/aerotherme/">Aérotherme</a></li>
            <li><a href="/chauffage-industriel/chauffage-radiant/">Chauffage radiant</a></li>
            <li><a href="/chauffage-industriel/chaufferie-industrielle/">Chaufferie industrielle</a></li>
            <li><a href="/chauffage-industriel/maintenance-chaufferie/">Maintenance chaufferie</a></li>
            <li><a href="/chauffage-industriel/chauffage-collectif/">Chauffage collectif</a></li>
            <li><a href="/chauffage-industriel-essonne/">Chauffage indus. Essonne</a></li>
            <li><a href="/chauffage-industriel-loiret/">Chauffage indus. Loiret</a></li>
          </ul>
        </div>
        <div>
          <h4>Autres services</h4>
          <ul>
            <li><a href="/chauffagiste/">Chauffagiste Essonne / Loiret</a></li>
            <li><a href="/chauffagiste-essonne/">Chauffagiste Essonne</a></li>
            <li><a href="/chauffagiste-loiret/">Chauffagiste Loiret</a></li>
            <li><a href="/devis-chauffage-industriel/">Devis chauffage industriel</a></li>
            <li><a href="/devis-chauffagiste/">Devis chauffagiste</a></li>
            <li><a href="/devis-maintenance-chauffage/">Devis maintenance</a></li>
          </ul>
        </div>
        <div>
          <h4>Entreprise</h4>
          <ul>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/plan-du-site/">Plan du site</a></li>
            <li><a href="/devis-chauffage-industriel/">Demander un devis</a></li>
          </ul>
          <h4 style="margin-top:28px">Certifications</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            ${CERTS.map(
              (c) =>
                `<div style="border:1px solid rgba(255,255,255,0.2);padding:8px 10px;font-size:10px;font-family:var(--font-mono);letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,0.7);border-radius:2px;text-align:center">${escape(c)}</div>`
            ).join("")}
          </div>
        </div>
      </div>
      <div class="legal">
        <span>© 2026 ${SITE.brand} · <a href="/mentions-legales/">Mentions légales</a> · <a href="/politique-confidentialite/">Politique de confidentialité</a> · <a href="/cgv/">CGV</a> · <a href="/plan-du-site/">Plan du site</a></span>
        <span>${SITE.domain}</span>
      </div>
    </div>
  </footer>`;
}

// ---------- HTML page wrapper ----------
function htmlPage({ title, metaDesc, canonical, body, activeKey, jsonLd = [] }) {
  const ldBlocks = jsonLd
    .map((d) => `<script type="application/ld+json">${JSON.stringify(d)}</script>`)
    .join("");
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<title>${escape(title)}</title>
<meta name="description" content="${escape(metaDesc)}" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
${canonical ? `<link rel="canonical" href="https://${SITE.domain}${canonical}" />` : ""}
<meta property="og:type" content="website" />
<meta property="og:title" content="${escape(title)}" />
<meta property="og:description" content="${escape(metaDesc)}" />
<meta property="og:site_name" content="${escape(SITE.brand)}" />
<meta property="og:url" content="https://${SITE.domain}${canonical || ""}" />
<link rel="stylesheet" href="/assets/css/styles.css" />
${ldBlocks}
</head>
<body>
${header(activeKey)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

// ---------- Decree 2027 banner (used in many pages) ----------
function decreeBanner({ compact = false } = {}) {
  const padding = compact ? "compact" : "";
  const heading = compact ? "h3" : "h2";
  const headingClass = compact ? "h3" : "h2";
  return `
  <section class="dark ${padding}" style="padding:${compact ? "48px 0" : "72px 0"}">
    <div class="container">
      <div class="decree">
        <div class="icon">${icon("chart", 40)}</div>
        <div class="stack-3">
          <div class="eyebrow on-dark">RÉGLEMENTATION · CEE</div>
          <${heading} class="${headingClass} on-dark">Décret tertiaire 2027 : -30% de consommation. Êtes-vous prêts ?</${heading}>
          <p class="body on-dark">Audit énergétique, destratificateurs, aérothermes à condensation, accompagnement CEE.</p>
        </div>
        <a href="/devis-chauffage-industriel/" class="btn primary">Lancer un audit gratuit →</a>
      </div>
    </div>
  </section>`;
}

// ---------- Final inline CTA ----------
function ctaInline(heading = "Un projet de chauffage industriel ? Parlons-en.") {
  const phoneStripped = SITE.phone.replace(/\s/g, "");
  return `
  <section class="dark">
    <div class="container">
      <div class="cta-inline">
        <h2 class="h2 on-dark">${escape(heading)}</h2>
        <div class="row" style="gap:12px;flex-wrap:wrap">
          <a href="/devis-chauffage-industriel/" class="btn primary">Devis gratuit →</a>
          <a href="tel:${phoneStripped}" class="btn ghost-light">${icon("phone", 14)} ${SITE.phone}</a>
        </div>
      </div>
    </div>
  </section>`;
}

// ---------- FAQ list ----------
function faqList(faqs) {
  // faqs: array of [question, answer] OR strings (questions only)
  return `<div class="faq-list">${faqs
    .map((f, i) => {
      const [q, a] = Array.isArray(f) ? f : [f, ""];
      const open = i === 0 ? " open" : "";
      return `<details${open}><summary>${escape(q)}</summary>${a ? `<p>${escape(a)}</p>` : ""}</details>`;
    })
    .join("")}</div>`;
}

// JSON-LD helpers
function ldBreadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: it.href ? `https://${SITE.domain}${it.href}` : undefined,
    })),
  };
}

function ldFAQ(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs
      .filter((f) => Array.isArray(f) && f[1])
      .map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
  };
}

function ldLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: SITE.brand,
    url: `https://${SITE.domain}/`,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "26 Grande Rue",
      addressLocality: "Oison",
      postalCode: "45170",
      addressCountry: "FR",
    },
    areaServed: ["Essonne", "Loiret", "Île-de-France"],
  };
}

module.exports = {
  escape,
  icon,
  ICON_PATHS,
  header,
  footer,
  trustStrip,
  breadcrumb,
  htmlPage,
  decreeBanner,
  ctaInline,
  faqList,
  ldBreadcrumb,
  ldFAQ,
  ldLocalBusiness,
};
