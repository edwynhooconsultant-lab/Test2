// =====================================================================
// Page templates
// =====================================================================

const {
  escape,
  icon,
  trustStrip,
  breadcrumb,
  htmlPage,
  decreeBanner,
  ctaInline,
  faqList,
  ldBreadcrumb,
  ldFAQ,
  ldLocalBusiness,
} = require("./components");

const {
  SITE,
  CERTS,
  SERVICES_INDUSTRIEL,
  SISTERS,
  LOCAL_INDUS,
  SERVICES_CHAUFFAGISTE,
  DEVIS_PAGES,
  BLOG_HUBS,
  BLOG_ARTICLES,
  REALIZATIONS,
  ALL_CITIES,
} = require("./data");

const phoneStripped = SITE.phone.replace(/\s/g, "");

// ---------- HOMEPAGE (V2 from wireframe) ----------
function homepage() {
  const dashboard = SERVICES_INDUSTRIEL.slice(0, 6).map((s, i) => `
    <a href="${s.path}">
      <div class="row-between" style="align-items:flex-start">
        <div style="width:36px;height:36px;border:1.5px solid var(--fg);border-radius:2px;display:grid;place-items:center">${icon(s.icon)}</div>
        <span class="mono">0${i + 1}</span>
      </div>
      <h4 class="h4">${escape(s.nav)}</h4>
      <p class="body" style="font-size:13px">${escape(s.lead.split(".")[0])}.</p>
      <span class="arrow">EN SAVOIR PLUS →</span>
    </a>`).join("");

  const otherServices = [
    ["Chauffagiste local", "/chauffagiste/", "factory"],
    ["Chaudière biomasse", "/blog/chauffage-industriel/", "flame"],
    ["Plomberie indus.", "/chauffagiste/", "pipe"],
    ["Pompe à chaleur", "/blog/chauffage-industriel/", "thermo"],
    ["Maintenance", "/chauffage-industriel/maintenance-chaufferie/", "wrench"],
    ["Devis express", "/devis-chauffage-industriel/", "chart"],
  ].map(([n, h, ic]) => `
    <a href="${h}" class="row" style="gap:10px;padding:12px 14px;background:#fff;border:1px solid var(--line);border-radius:2px">
      ${icon(ic, 16)}<span style="font-size:12px;font-weight:600">${escape(n)}</span>
    </a>`).join("");

  const stats = [
    ["10", "ANS", "d'expertise chauffage industriel"],
    ["120+", "/AN", "chantiers livrés"],
    ["6", "CERTIFS", "professionnelles"],
    ["24/24", "ASTREINTE", "clients sous contrat"],
  ].map(([n, u, l]) => `
    <div class="stat">
      <div style="display:flex;align-items:baseline;gap:6px">
        <span class="num">${escape(n)}</span>
        <span class="unit">${escape(u)}</span>
      </div>
      <p class="label">${escape(l)}</p>
    </div>`).join("");

  const realisationsCards = REALIZATIONS.map(([type, title, meta]) => `
    <div class="photo-card">
      <div class="media photo" style="aspect-ratio:4/5">PHOTO CHANTIER</div>
      <span class="tag ember" style="align-self:flex-start">${escape(type)}</span>
      <h4 class="h4">${escape(title)}</h4>
      <p class="small">${escape(meta)}</p>
    </div>`).join("");

  const cityRegionLink = (region) => {
    if (region.startsWith("Essonne")) return "/chauffagiste-essonne/";
    if (region.startsWith("Loiret")) return "/chauffagiste-loiret/";
    return "/devis-chauffagiste-ile-de-france/";
  };
  const cityRegions = Object.entries(ALL_CITIES).map(([region, cities]) => `
    <div class="stack-3">
      <div class="mono">${escape(region)}</div>
      <div class="city-chips">
        ${cities.map(c => `<a href="${cityRegionLink(region)}" class="tag">${escape(c)}</a>`).join("")}
      </div>
    </div>`).join("");

  const social = [
    ["in", "#0A66C2", "Refonte chaufferie 1.2 MW à Évry"],
    ["◉", "#DD2A7B", "Pose tubes radiants — atelier 3 200 m²"],
    ["◉", "#DD2A7B", "Équipe technique en intervention"],
    ["in", "#0A66C2", "Décret tertiaire — webinaire"],
    ["◉", "#DD2A7B", "Coulisses station SEET"],
    ["in", "#0A66C2", "Nouvelle certification QualiBois"],
    ["◉", "#DD2A7B", "Chantier Orléans en cours"],
    ["in", "#0A66C2", "Témoignage client Cristaline"],
  ].map(([badge, color, txt], i) => `
    <div style="background:#fff;border:1px solid var(--line);border-radius:4px;overflow:hidden">
      <div class="media photo" style="aspect-ratio:1.4/1;border-radius:0;border:none"></div>
      <div style="padding:14px" class="stack-2">
        <div class="row-between">
          <span style="width:24px;height:24px;background:${color};border-radius:4px;display:grid;place-items:center;color:#fff;font-weight:700;font-size:11px">${badge}</span>
          <span class="small">il y a ${i + 1}j</span>
        </div>
        <p style="font-size:13px;font-weight:500;color:var(--fg);line-height:1.4">${escape(txt)}</p>
      </div>
    </div>`).join("");

  const faqsHome = [
    ["Quel chauffage est le plus adapté pour mon hangar ?", "Le choix entre aérotherme, radiant gaz et panneau infrarouge dépend du volume, de l'isolation et du mode d'occupation. Une étude thermique sur site précise la meilleure solution."],
    ["Quelle est la différence entre aérotherme et tube radiant ?", "L'aérotherme souffle de l'air chaud, le radiant émet un rayonnement infrarouge qui chauffe directement les corps et surfaces. Le radiant est préférable en grande hauteur."],
    ["À quelle fréquence faut-il entretenir une chaufferie ?", "Une visite annuelle est obligatoire. Pour les chaufferies industrielles, des visites trimestrielles ou semestrielles sont recommandées en complément."],
    ["Proposez-vous des contrats de maintenance ?", "Oui — contrats P2 (conduite et entretien) et P3 (garantie totale matériel) sur tous types d'installation. Devis sur mesure."],
    ["Intervenez-vous en urgence pour une panne ?", "Oui pour nos clients sous contrat (astreinte 24/7) et au cas par cas pour les autres selon disponibilité."],
    ["Comment réduire ma facture énergétique ?", "Trois leviers : réglage et entretien (5 à 15% d'économies), changement de générateur (20 à 40%), changement d'énergie (40 à 70% en cas de bascule PAC)."],
    ["Quelles sont les normes pour une chaufferie ?", "ICPE 2910 dès 70 kW, ATEX selon zones, sécurités gaz, ventilation, désenfumage. Le décret tertiaire impose en plus une trajectoire de baisse des consommations."],
    ["Combien coûte l'installation d'une chaufferie ?", "250 à 500 €/kW HT pour le gaz, 1 200 à 2 500 €/kW HT pour la biomasse — hors raccordements et génie civil. Étude au cas par cas."],
  ];

  const realisationsList = REALIZATIONS;

  const body = `
  <section class="hero-split">
    <div class="container">
      <div class="grid-hero">
        <div class="stack-4">
          <div class="eyebrow">CHAUFFAGISTE INDUSTRIEL · 91 · 45 · IDF</div>
          <h1 class="h1 lg">Chauffagiste industriel pour vos sites en Essonne, Loiret et Île-de-France.</h1>
          <p class="lead">Installation, maintenance et dépannage de chaufferies, aérothermes et tubes radiants. 10 ans d'expertise au service des industriels, collectivités et copropriétés.</p>
          <div class="row" style="gap:12px;margin-top:8px;flex-wrap:wrap">
            <a href="/devis-chauffage-industriel/" class="btn primary">Demander un devis gratuit →</a>
            <a href="tel:${phoneStripped}" class="btn">${icon("phone", 14)} ${SITE.phone}</a>
          </div>
          <div class="badges-row">
            <span class="item">${icon("check", 14)}Réponse sous 24h</span>
            <span class="item">${icon("check", 14)}Devis gratuit</span>
            <span class="item">${icon("check", 14)}Sans engagement</span>
          </div>
        </div>
        <div style="position:relative">
          <div class="media video" style="aspect-ratio:4/5">▶ VIDÉO BOUCLE — CHANTIER CHAUFFAGE INDUSTRIEL</div>
          <div class="spec-card">
            <div class="mono" style="margin-bottom:8px">01 — DERNIER CHANTIER</div>
            <div style="font-family:var(--font-display);font-weight:700;font-size:18px;margin-bottom:8px">Chaufferie Évry</div>
            <div class="stack-2">
              <div class="row-between"><span class="small">Puissance</span><span class="mono" style="color:var(--fg)">1.2 MW</span></div>
              <div class="row-between"><span class="small">Surface</span><span class="mono" style="color:var(--fg)">2 400 m²</span></div>
              <div class="row-between"><span class="small">Statut</span><span class="tag leaf" style="padding:2px 6px;font-size:10px">Livré</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:80px">${trustStrip()}</div>
  </section>

  <section class="compact">
    <div class="container">
      <div class="stats-band">${stats}</div>
    </div>
  </section>

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin:0 auto 40px;text-align:center;max-width:720px">
        <div class="eyebrow">NOTRE EXPERTISE</div>
        <h2 class="h2" style="margin-top:12px">Une expertise complète en chauffage industriel.</h2>
        <p class="lead" style="margin-top:12px">Du diagnostic à la maintenance, nous prenons en charge l'ensemble de vos besoins thermiques.</p>
      </div>
      <div class="dashboard">
        <div class="head">
          <div class="row-between">
            <div class="stack-3">
              <span class="tag ember" style="align-self:flex-start">★ EXPERTISE PRINCIPALE</span>
              <h3 class="h2" style="font-size:32px">Chauffage industriel</h3>
              <p class="body" style="max-width:520px;font-size:15px">Solutions thermiques dimensionnées pour vos sites industriels : étude, installation, mise en service et contrats P1/P2/P3.</p>
            </div>
            <a href="/chauffagiste-industriel/" class="btn dark">Voir le hub chauffage industriel →</a>
          </div>
        </div>
        <div class="grid">${dashboard}</div>
      </div>
      <div>
        <div class="row-between" style="margin-bottom:16px">
          <span class="mono">NOS AUTRES EXPERTISES</span>
          <a href="/plan-du-site/" class="btn link" style="font-size:12px">Tous nos services →</a>
        </div>
        <div class="grid-6">${otherServices}</div>
      </div>
    </div>
  </section>

  ${decreeBanner()}

  <section>
    <div class="container">
      <div class="row-between" style="margin-bottom:40px;align-items:flex-end;flex-wrap:wrap;gap:16px">
        <div class="stack-3" style="max-width:640px">
          <div class="eyebrow">MÉTHODE</div>
          <h2 class="h2">Comment nous intervenons sur vos sites.</h2>
        </div>
        <span class="mono">5 ÉTAPES — DE L'ÉCOUTE AU CONTRAT</span>
      </div>
      <div class="grid-5">
        ${[
          ["Premier contact & écoute", "Téléphone, email ou formulaire."],
          ["Visite technique sur site", "Sous 5 jours ouvrés."],
          ["Diagnostic & dimensionnement", "Étude de charge, simulation."],
          ["Proposition technique & financière", "Devis détaillé sous 24h."],
          ["Installation & maintenance", "Mise en service + contrat P1/P2/P3."],
        ].map(([t, d], i) => `
          <div style="background:#fff;border:1px solid var(--line);border-radius:4px;padding:20px" class="stack-3">
            <div class="row-between">
              <span style="font-family:var(--font-display);font-weight:800;font-size:36px;color:var(--ember);line-height:1">0${i + 1}</span>
              <span class="mono">ÉTAPE</span>
            </div>
            <h4 class="h4">${escape(t)}</h4>
            <p class="body" style="font-size:12px">${escape(d)}</p>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div class="row-between" style="margin-bottom:32px;align-items:flex-end;flex-wrap:wrap;gap:16px">
        <div class="stack-3">
          <div class="eyebrow">ZONES</div>
          <h2 class="h2">Une présence forte sur l'Essonne, le Loiret et toute l'Île-de-France.</h2>
        </div>
        <a href="/chauffagiste-industriel/" class="btn">Voir toutes les villes →</a>
      </div>
      <div class="intervention-grid">
        <div class="media photo map">CARTE STYLISÉE IDF + LOIRET</div>
        <div class="stack-6">${cityRegions}</div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="row-between" style="margin-bottom:32px;align-items:flex-end;flex-wrap:wrap;gap:16px">
        <div class="stack-3">
          <div class="eyebrow">RÉFÉRENCES</div>
          <h2 class="h2">Nos chantiers récents.</h2>
        </div>
        <div class="row" style="gap:8px">
          <button class="btn" style="width:40px;height:40px;padding:0;justify-content:center" aria-label="Précédent">←</button>
          <button class="btn" style="width:40px;height:40px;padding:0;justify-content:center" aria-label="Suivant">→</button>
        </div>
      </div>
      <div class="grid-4">${realisationsCards}</div>
    </div>
  </section>

  <section class="compact" style="background:var(--bg-alt)">
    <div class="container stack-4">
      <h2 class="h4" style="text-align:center;color:var(--fg-muted);text-transform:uppercase;letter-spacing:0.08em;font-size:12px">Ils nous font confiance</h2>
      <div class="brands-grid grid-8">
        ${["Engie", "Dalkia", "Idex", "Veolia", "EDF", "Cristaline", "Fraikin", "Kiloutou"].map(b => `<div class="brand">${escape(b)}</div>`).join("")}
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="row-between" style="margin-bottom:32px;align-items:flex-end;flex-wrap:wrap;gap:16px">
        <div class="stack-3">
          <div class="eyebrow">ACTUALITÉS</div>
          <h2 class="h2">Suivez notre actualité.</h2>
          <p class="lead">Feed unifié de nos publications LinkedIn et Instagram.</p>
        </div>
      </div>
      <div class="grid-4">${social}</div>
      <div class="row" style="justify-content:center;gap:16px;margin-top:32px;flex-wrap:wrap">
        <a href="#" class="btn">LinkedIn ${SITE.socials.linkedin} →</a>
        <a href="#" class="btn">Instagram ${SITE.socials.instagram} →</a>
      </div>
    </div>
  </section>

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:64px" class="cta-final">
        <div class="stack-4">
          <div class="eyebrow">FAQ</div>
          <h2 class="h2">Questions fréquentes.</h2>
          <p class="body">Vous ne trouvez pas votre réponse ? Notre équipe technique est joignable directement.</p>
          <a href="/contact/" class="btn link" style="align-self:flex-start;font-size:13px">Nous contacter →</a>
        </div>
        ${faqList(faqsHome)}
      </div>
    </div>
  </section>

  <section class="dark">
    <div class="container">
      <div class="cta-final">
        <div class="stack-4">
          <div class="eyebrow on-dark">DEVIS GRATUIT</div>
          <h2 class="h2 on-dark">Un projet de chauffage industriel ? Parlons-en.</h2>
          <p class="lead on-dark">Réponse sous 24h ouvrées · Devis gratuit · Sans engagement</p>
          <div class="stack-3" style="margin-top:16px">
            <span class="row on-dark" style="gap:10px;font-size:14px">${icon("phone", 14)} ${SITE.phone} / ${SITE.phoneAlt}</span>
            <span class="row on-dark" style="gap:10px;font-size:14px">${icon("mail", 14)} ${SITE.email}</span>
            <span class="row on-dark" style="gap:10px;font-size:14px">${icon("map", 14)} ${SITE.address}</span>
          </div>
        </div>
        <form class="express-form" action="#" method="post">
          <div class="mono on-dark" style="margin-bottom:16px">FORMULAIRE EXPRESS</div>
          <div class="grid-form">
            ${["Nom", "Entreprise", "Téléphone", "Email"].map(f => `
              <div class="stack-2">
                <label class="field-label" for="f-${f}">${escape(f)}</label>
                <input id="f-${f}" name="${f.toLowerCase()}" type="${f === "Email" ? "email" : f === "Téléphone" ? "tel" : "text"}" required />
              </div>`).join("")}
            <div class="stack-2 full">
              <label class="field-label">Type de besoin</label>
              <div class="checkboxes">
                ${["Installation", "Maintenance", "Dépannage", "Audit"].map(t => `
                  <label><input type="checkbox" name="besoin" value="${t}"/><span>${escape(t)}</span></label>`).join("")}
              </div>
            </div>
            <div class="stack-2 full">
              <label class="field-label" for="f-msg">Message</label>
              <textarea id="f-msg" name="message"></textarea>
            </div>
          </div>
          <button type="submit" class="btn primary" style="width:100%;justify-content:center;margin-top:16px">Recevoir mon devis sous 24h →</button>
          <p class="small on-dark" style="margin-top:10px;font-size:11px;opacity:0.6">En soumettant, vous acceptez notre <a href="/politique-confidentialite/" style="color:inherit;text-decoration:underline">politique RGPD</a>.</p>
        </form>
      </div>
    </div>
  </section>`;

  return htmlPage({
    title: "Chauffagiste Industriel Essonne & Loiret — Plomberie Services 91",
    metaDesc: "Chauffagiste industriel certifié en Essonne (91), Loiret (45) et Île-de-France. Installation, maintenance et dépannage de chaufferies, aérothermes et tubes radiants.",
    canonical: "/",
    activeKey: "indus",
    body,
    jsonLd: [ldLocalBusiness(), ldFAQ(faqsHome)],
  });
}

// ---------- HUB CHAUFFAGISTE INDUSTRIEL ----------
function hubIndustriel() {
  const sectionId = (s) => `s-${s}`;
  const tocItems = [
    ["Présentation", "presentation"],
    ["Nos solutions", "solutions"],
    ["Pourquoi nous choisir", "pourquoi"],
    ["Décret tertiaire 2027", "decret"],
    ["Zones d'intervention", "zones"],
    ["Réalisations", "realisations"],
    ["FAQ", "faq"],
  ];

  const childCards = SERVICES_INDUSTRIEL.map((s, i) => `
    <a href="${s.path}" class="card">
      <div class="row-between" style="align-items:flex-start">
        <div class="icon-box">${icon(s.icon)}</div>
        <span class="ref">0${i + 1}</span>
      </div>
      <h4 class="h4">${escape(s.nav)}</h4>
      <p class="body" style="font-size:13px">${escape(s.lead.split(".")[0])}.</p>
      <div class="row" style="gap:6px;flex-wrap:wrap">
        <span class="tag" style="font-size:10px">Industriel</span>
        <span class="tag" style="font-size:10px">50 kW – 5 MW</span>
      </div>
      <span class="arrow">EN SAVOIR PLUS →</span>
    </a>`).join("");

  const pillars = [
    ["award", "Certifications", "QualiGaz, RGE, QualiPAC, QualiBois — interlocuteur certifié sur tous les combustibles."],
    ["users", "Réactivité PME + force grands comptes", "Joignable directement, sans centrale d'appel. Partenariats Engie, Dalkia, Idex, Veolia."],
    ["wrench", "Station technique SEET", "Expertise constructeur sur brûleurs et chaudières — diagnostics fiables."],
    ["shield", "Contrats sur mesure", "P1, P2, P3 dimensionnés à votre installation et à votre criticité."],
  ].map(([ic, t, d]) => `
    <div class="card">
      <div class="icon-box" style="width:44px;height:44px">${icon(ic, 24)}</div>
      <h4 class="h4">${escape(t)}</h4>
      <p class="body" style="font-size:13px">${escape(d)}</p>
    </div>`).join("");

  const zones = [
    ["Chauffage industriel Essonne", "91 — Étampes, Évry, Les Ulis", "/chauffage-industriel-essonne/"],
    ["Chauffage industriel Loiret", "45 — Orléans, Pithiviers, Montargis", "/chauffage-industriel-loiret/"],
    ["Chauffagiste Île-de-France", "75 · 77 · 78 · 91 · 92 · 93 · 94 · 95", "/devis-chauffagiste-ile-de-france/"],
  ].map(([n, sub, h]) => `
    <a href="${h}" class="card">
      <div class="icon-box">${icon("map")}</div>
      <h4 class="h4">${escape(n)}</h4>
      <p class="small">${escape(sub)}</p>
      <span class="arrow">VOIR LA PAGE LOCALE →</span>
    </a>`).join("");

  const realisations = REALIZATIONS.slice(0, 4).map(([t, , m]) => `
    <div class="photo-card">
      <div class="media photo" style="aspect-ratio:4/5"></div>
      <span class="tag ember" style="align-self:flex-start">${escape(t)}</span>
      <span class="small">${escape(m)}</span>
    </div>`).join("");

  const sisters = [
    ["Chauffagiste local", "Essonne · Loiret · IDF", "factory", "/chauffagiste/"],
    ["Devis chauffage industriel", "Réponse sous 24h", "chart", "/devis-chauffage-industriel/"],
    ["Maintenance chaufferie", "Contrats P1/P2/P3", "wrench", "/chauffage-industriel/maintenance-chaufferie/"],
    ["Plomberie industrielle", "Tuyauterie, réseaux", "pipe", "/devis-plombier-chauffagiste/"],
  ].map(([n, d, ic, h]) => `
    <a href="${h}" class="card">
      <div class="icon-box">${icon(ic)}</div>
      <h4 class="h4">${escape(n)}</h4>
      <p class="small">${escape(d)}</p>
      <span class="arrow">DÉCOUVRIR →</span>
    </a>`).join("");

  const faqsHub = [
    ["Quelles puissances installez-vous ?", "De 70 kW à plusieurs MW : aérothermes individuels, chaudières gaz cascade, chaufferies biomasse jusqu'à 5 MW."],
    ["Quelles certifications possédez-vous ?", "QualiGaz pour le gaz, RGE pour les aides, QualiPAC pour les PAC, QualiBois pour la biomasse, station SEET pour les diagnostics constructeur."],
    ["Comment se déroule un projet de chaufferie industrielle ?", "Quatre temps : audit existant et étude ICPE, conception et plans, travaux et mise en service, contrat de maintenance. Comptez 3 à 6 mois en moyenne."],
    ["Travaillez-vous avec les grands comptes énergie ?", "Oui — partenariats actifs avec Engie, Dalkia, Idex, Veolia. Nous savons travailler dans des cadres contractuels exigeants."],
    ["Pouvez-vous reprendre un contrat existant ?", "Oui après audit gratuit. Préavis classique 3 mois, reprise du parc et des engagements en cours."],
    ["Quelles sont les normes ICPE applicables ?", "Rubrique 2910 (combustion) dès 70 kW, 2921 (refroidissement) selon, ATEX selon zones. Nous identifions et traitons toutes les obligations."],
  ];

  const body = `
  <section style="padding:32px 0 64px;background:var(--bg)">
    <div class="container">
      ${breadcrumb([{ label: "Accueil", href: "/" }, { label: "Chauffage industriel" }])}
      <div class="grid-hero" style="margin-top:32px">
        <div class="stack-4">
          <div class="eyebrow">EXPERTISE PROFESSIONNELLE · HUB SILO</div>
          <h1 class="h1">Chauffagiste industriel — expert chauffage professionnel.</h1>
          <p class="lead">Étude, installation, maintenance et mise en conformité de chaufferies, aérothermes et tubes radiants. Un interlocuteur unique pour vos sites industriels en Île-de-France et région Centre.</p>
          <div class="row" style="gap:12px;flex-wrap:wrap">
            <a href="/devis-chauffage-industriel/" class="btn primary">Demander un devis</a>
            <a href="tel:${phoneStripped}" class="btn">${icon("phone", 14)} ${SITE.phone}</a>
          </div>
        </div>
        <div class="media photo" style="aspect-ratio:4/3">PHOTO CHAUFFERIE INDUSTRIELLE</div>
      </div>
    </div>
  </section>
  ${trustStrip()}

  <section id="${sectionId("presentation")}">
    <div class="container">
      <div class="page-toc">
        <div class="stack-4">
          <div class="eyebrow muted">PRÉSENTATION</div>
          <h2 class="h2">Le chauffage industriel : une expertise stratégique pour votre site.</h2>
          <p class="lead">Une chaufferie industrielle, ce n'est pas une chaudière de maison vingt fois plus grosse. C'est un système complexe — production, distribution, sécurités, régulation, GTB — soumis à un cadre réglementaire dense (ICPE, ATEX, code du travail, décret tertiaire).</p>
          <p class="body">Plomberie Services 91 conçoit, installe et exploite des installations de chauffage industriel pour des industriels, des collectivités et des copropriétés en Essonne, Loiret et Île-de-France. De l'étude amont au contrat P3, nous sommes un interlocuteur unique pour la totalité du cycle de vie de l'installation.</p>
          <p class="body">Nos certifications (QualiGaz, RGE, QualiPAC, QualiBois) couvrent tous les combustibles. Notre station technique SEET nous permet d'intervenir comme expert constructeur sur les brûleurs et chaudières des principales marques. Et notre dimensionnement reste conservateur : nous préférons une installation tenue dans la durée à une promesse non tenue.</p>
        </div>
        <aside class="toc">
          <div class="mono" style="margin-bottom:12px">SUR CETTE PAGE</div>
          <ul class="stack-3">
            ${tocItems.map(([l, id]) => `<li><a href="#${sectionId(id)}">${escape(l)}</a></li>`).join("")}
          </ul>
        </aside>
      </div>
    </div>
  </section>

  <section id="${sectionId("solutions")}" style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">NOS SOLUTIONS</div>
        <h2 class="h2" style="margin-top:12px">Nos solutions de chauffage industriel.</h2>
        <p class="lead" style="margin-top:12px">Cliquez sur une prestation pour découvrir le détail technique et nos références.</p>
      </div>
      <div class="grid-4">${childCards}</div>
    </div>
  </section>

  <section id="${sectionId("pourquoi")}">
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">DIFFÉRENCIATEURS</div>
        <h2 class="h2" style="margin-top:12px">Pourquoi confier votre chauffage industriel à ${SITE.brand} ?</h2>
      </div>
      <div class="grid-4">${pillars}</div>
    </div>
  </section>

  <section id="${sectionId("decret")}">
    ${decreeBanner({ compact: true })}
  </section>

  <section id="${sectionId("zones")}" style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">ZONES D'INTERVENTION</div>
        <h2 class="h2" style="margin-top:12px">Notre expertise, près de votre site.</h2>
      </div>
      <div class="grid-3">${zones}</div>
    </div>
  </section>

  <section id="${sectionId("realisations")}">
    <div class="container">
      <div class="row-between" style="margin-bottom:32px;align-items:flex-end;flex-wrap:wrap;gap:16px">
        <h2 class="h2">Nos réalisations en chauffage industriel.</h2>
        <a href="/blog/chauffage-industriel/" class="btn link">Toutes les réalisations →</a>
      </div>
      <div class="grid-4">${realisations}</div>
    </div>
  </section>

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin-bottom:32px;max-width:720px">
        <div class="eyebrow">DÉCOUVRIR</div>
        <h2 class="h2" style="margin-top:12px">Nos autres expertises.</h2>
      </div>
      <div class="grid-4">${sisters}</div>
    </div>
  </section>

  <section id="${sectionId("faq")}">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:64px" class="cta-final">
        <div class="stack-3">
          <div class="eyebrow">FAQ</div>
          <h2 class="h2">Questions sur le chauffage industriel.</h2>
        </div>
        ${faqList(faqsHub)}
      </div>
    </div>
  </section>

  ${ctaInline("Un projet de chauffage industriel ? Parlons-en.")}`;

  return htmlPage({
    title: "Chauffagiste Industriel — Expert Chauffage Professionnel | Plomberie Services 91",
    metaDesc: "Chauffagiste industriel certifié pour vos chaufferies, aérothermes et tubes radiants en Essonne, Loiret et IDF. Étude, installation, maintenance P1/P2/P3.",
    canonical: "/chauffagiste-industriel/",
    activeKey: "indus",
    body,
    jsonLd: [
      ldBreadcrumb([{ label: "Accueil", href: "/" }, { label: "Chauffage industriel", href: "/chauffagiste-industriel/" }]),
      ldFAQ(faqsHub),
    ],
  });
}

// ---------- SERVICE PAGE (chauffage industriel children) ----------
function servicePage(s) {
  const tocSections = [
    ["Définition", "definition"],
    ["Bénéfices", "benefits"],
    ["Bâtiments", "buildings"],
    ["Processus", "process"],
    ["Marques", "brands"],
    ["Cas client", "case"],
    ["Tarifs", "pricing"],
    ["FAQ", "faq"],
  ];

  const benefits = s.benefits.map(([ic, t, d]) => `
    <div class="card">
      <div class="icon-box" style="width:40px;height:40px">${icon(ic, 22)}</div>
      <h4 class="h4">${escape(t)}</h4>
      <p class="body" style="font-size:13px">${escape(d)}</p>
    </div>`).join("");

  const buildings = s.buildings.map(b => `
    <div class="row" style="gap:12px;padding:16px;background:#fff;border:1px solid var(--line);border-radius:4px">
      ${icon("factory", 18)}<span style="font-size:14px;font-weight:500">${escape(b)}</span>
    </div>`).join("");

  const processSteps = s.process.map((step, i) => `
    <div class="step">
      <div class="num">0${i + 1}</div>
      <h4 class="h4" style="margin-top:4px">${escape(step)}</h4>
    </div>`).join("");

  const brands = s.brands.map(b => `<div class="brand">${escape(b)}</div>`).join("");
  const metrics = s.case_metrics.map(([k, v]) => `
    <div class="stack-2">
      <span class="mono">${escape(k)}</span>
      <span style="font-family:var(--font-display);font-weight:700;font-size:22px;color:var(--fg)">${escape(v)}</span>
    </div>`).join("");

  const pricingFactors = s.pricing_factors.map(([t, d], i) => `
    <div class="card" style="background:#fff">
      <span class="mono">FACTEUR 0${i + 1}</span>
      <h4 class="h4">${escape(t)}</h4>
      <p class="body" style="font-size:13px">${escape(d)}</p>
    </div>`).join("");

  const sisters = SISTERS.filter(([, p]) => p !== s.path).map(([n, p, ic]) => `
    <a href="${p}">
      <div class="icon-box">${icon(ic, 16)}</div>
      <span class="name">${escape(n)}</span>
      <span class="more">EN SAVOIR PLUS →</span>
    </a>`).join("");

  const features = s.def_features.map(p => `
    <div class="row" style="gap:10px;font-size:14px">
      <span style="color:var(--leaf)">${icon("check", 16)}</span>${escape(p)}
    </div>`).join("");

  const body = `
  <section style="padding:32px 0 56px">
    <div class="container">
      ${breadcrumb([
        { label: "Accueil", href: "/" },
        { label: "Chauffage industriel", href: "/chauffagiste-industriel/" },
        { label: s.breadcrumb },
      ])}
      <div class="grid-hero" style="margin-top:32px">
        <div class="stack-4">
          <a href="/chauffagiste-industriel/" class="eyebrow muted" style="color:var(--fg-muted)">← CHAUFFAGE INDUSTRIEL</a>
          <h1 class="h1">${escape(s.h1)}</h1>
          <p class="lead">${escape(s.lead)}</p>
          <div class="row" style="gap:12px;flex-wrap:wrap">
            <a href="/devis-chauffage-industriel/" class="btn primary">Demander un devis</a>
            <a href="tel:${phoneStripped}" class="btn">${icon("phone", 14)} ${SITE.phone}</a>
          </div>
        </div>
        <div class="media photo" style="aspect-ratio:4/3">${escape(s.heroPhoto)}</div>
      </div>
    </div>
  </section>
  ${trustStrip()}

  <section>
    <div class="container">
      <div class="page-toc">
        <div class="stack-4">
          <div class="eyebrow muted">PRÉSENTATION</div>
          <h2 class="h2">${escape(s.intro_h2)}</h2>
          <p class="body">${escape(s.lead)}</p>
          <p class="body">Notre approche : un dimensionnement basé sur l'usage réel de votre site, un choix de matériel transparent (vous savez pourquoi tel constructeur est privilégié), et un suivi continu post-mise en service. Toujours.</p>
        </div>
        <aside class="toc">
          <div class="mono" style="margin-bottom:10px">SOMMAIRE</div>
          <ul class="stack-3">
            ${tocSections.map(([l, id]) => `<li><a href="#${id}">${escape(l)}</a></li>`).join("")}
          </ul>
        </aside>
      </div>
    </div>
  </section>

  <section id="definition" style="background:var(--bg-alt)">
    <div class="container">
      <div class="grid-hero">
        <div class="stack-4">
          <div class="eyebrow">FONCTIONNEMENT</div>
          <h2 class="h2">${escape(s.def_h2)}</h2>
          <p class="body">${escape(s.def_body)}</p>
          <div class="stack-3" style="margin-top:8px">${features}</div>
        </div>
        <div class="media photo" style="aspect-ratio:4/3">${escape(s.schema_label)}</div>
      </div>
    </div>
  </section>

  <section id="benefits">
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">BÉNÉFICES</div>
        <h2 class="h2" style="margin-top:12px">${escape(s.benefits_h2)}</h2>
      </div>
      <div class="grid-3">${benefits}</div>
    </div>
  </section>

  <section id="buildings" style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin-bottom:32px;max-width:720px">
        <div class="eyebrow">USAGES</div>
        <h2 class="h2" style="margin-top:12px">Pour quels bâtiments ?</h2>
      </div>
      <div class="grid-3">${buildings}</div>
    </div>
  </section>

  <section id="process">
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">MÉTHODE</div>
        <h2 class="h2" style="margin-top:12px">${escape(s.process_h2)}</h2>
      </div>
      <div class="timeline">${processSteps}</div>
    </div>
  </section>

  <section id="brands" class="compact" style="background:var(--bg-alt)">
    <div class="container stack-4">
      <h3 class="h4" style="text-align:center;color:var(--fg-muted);text-transform:uppercase;letter-spacing:0.08em;font-size:12px">Nous installons</h3>
      <div class="brands-grid">${brands}</div>
    </div>
  </section>

  <section id="case">
    <div class="container">
      <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:0;border:1px solid var(--line);border-radius:4px;overflow:hidden;background:#fff" class="grid-hero">
        <div class="media photo" style="height:420px;border-radius:0;border:none">PHOTO CHANTIER (avant / après)</div>
        <div style="padding:32px" class="stack-4">
          <span class="tag ember" style="align-self:flex-start">★ CAS CLIENT</span>
          <h3 class="h3">${escape(s.case_h3)}</h3>
          <p class="body">${escape(s.case_body)}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:8px">${metrics}</div>
        </div>
      </div>
    </div>
  </section>

  <section id="pricing" style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin-bottom:32px;max-width:720px">
        <div class="eyebrow">TRANSPARENCE</div>
        <h2 class="h2" style="margin-top:12px">${escape(s.pricing_h2)}</h2>
        <p class="lead" style="margin-top:12px">Chaque installation est dimensionnée à votre site. Voici les facteurs qui entrent dans le devis.</p>
      </div>
      <div class="grid-4">${pricingFactors}</div>
    </div>
  </section>

  <section id="faq">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:64px" class="cta-final">
        <div class="stack-3">
          <div class="eyebrow">FAQ</div>
          <h2 class="h2">${escape(s.faq_h2)}</h2>
        </div>
        ${faqList(s.faqs)}
      </div>
    </div>
  </section>

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div class="row-between" style="margin-bottom:24px;align-items:flex-end;flex-wrap:wrap;gap:16px">
        <div class="stack-3">
          <div class="eyebrow">DÉCOUVRIR</div>
          <h2 class="h3">Nos autres solutions de chauffage industriel.</h2>
        </div>
        <a href="/chauffagiste-industriel/" class="btn">← Retour au hub Chauffage industriel</a>
      </div>
      <div class="sister-grid">${sisters}</div>
    </div>
  </section>

  ${ctaInline(s.cta_h2)}`;

  return htmlPage({
    title: s.title,
    metaDesc: s.metaDesc,
    canonical: s.path,
    activeKey: "indus",
    body,
    jsonLd: [
      ldBreadcrumb([
        { label: "Accueil", href: "/" },
        { label: "Chauffage industriel", href: "/chauffagiste-industriel/" },
        { label: s.breadcrumb, href: s.path },
      ]),
      ldFAQ(s.faqs),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: s.h1,
        provider: { "@type": "HVACBusiness", name: SITE.brand, telephone: SITE.phone },
        areaServed: ["Essonne", "Loiret", "Île-de-France"],
        description: s.metaDesc,
      },
    ],
  });
}

// ---------- LOCAL PAGE (chauffage industriel essonne / loiret) ----------
function localIndusPage(p) {
  const cities = p.cities.map(c => `<a href="/devis-chauffagiste-${p.region.toLowerCase()}/" class="tag">${escape(c)}</a>`).join("");
  const zones = p.zones.map(z => `<span class="tag">${escape(z)}</span>`).join("");

  const sisterSilo = SERVICES_INDUSTRIEL.slice(0, 6).map((s, i) => `
    <a href="${s.path}" class="card">
      <div class="row-between" style="align-items:flex-start">
        <div class="icon-box">${icon(s.icon)}</div>
        <span class="ref">0${i + 1}</span>
      </div>
      <h4 class="h4">${escape(s.nav)}</h4>
      <p class="body" style="font-size:13px">${escape(s.lead.split(".")[0])}.</p>
      <span class="arrow">EN SAVOIR PLUS →</span>
    </a>`).join("");

  const otherDept = LOCAL_INDUS.find(o => o.path !== p.path);

  const faqs = [
    [`Intervenez-vous partout en ${p.region} ?`, `Oui, sur l'ensemble du département ${p.department}. Nos équipes sont basées sur l'axe ${p.cities.slice(0, 3).join(", ")} et rayonnent sur tout le territoire.`],
    [`Quel délai d'intervention en ${p.region} ?`, "Visite technique sous 5 jours ouvrés. Pour les contrats avec astreinte, intervention sous 4 à 24h selon criticité."],
    ["Êtes-vous certifiés sur tous les combustibles ?", "Oui — QualiGaz, RGE, QualiPAC, QualiBois. Couverture complète pour les aides énergétiques."],
    ["Travaillez-vous pour les collectivités ?", `Oui — mairies, écoles, hôpitaux du ${p.region} (${p.department}). Nous savons travailler dans les marchés publics.`],
    [`Comment obtenir un devis chauffage industriel en ${p.region} ?`, "Demande en ligne ou par téléphone : visite technique gratuite, étude personnalisée, devis sous 24h après la visite."],
  ];

  const body = `
  <section style="padding:32px 0 56px">
    <div class="container">
      ${breadcrumb([
        { label: "Accueil", href: "/" },
        { label: "Chauffage industriel", href: "/chauffagiste-industriel/" },
        { label: p.breadcrumb },
      ])}
      <div class="grid-hero" style="margin-top:32px">
        <div class="stack-4">
          <div class="eyebrow">PAGE LOCALE · ${p.region.toUpperCase()} (${p.department})</div>
          <h1 class="h1">${escape(p.h1)}</h1>
          <p class="lead">${escape(p.intro)}</p>
          <div class="row" style="gap:12px;flex-wrap:wrap">
            <a href="/devis-chauffage-industriel/" class="btn primary">Devis chauffage industriel ${p.region} →</a>
            <a href="tel:${phoneStripped}" class="btn">${icon("phone", 14)} ${SITE.phone}</a>
          </div>
        </div>
        <div class="media photo" style="aspect-ratio:4/3">CARTE ${p.region.toUpperCase()} — ZONES INDUSTRIELLES</div>
      </div>
    </div>
  </section>
  ${trustStrip()}

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div class="grid-hero">
        <div class="stack-4">
          <div class="eyebrow">PRÉSENCE LOCALE</div>
          <h2 class="h2">Notre présence en ${escape(p.region)}.</h2>
          <p class="body">Plomberie Services 91 intervient quotidiennement sur le ${escape(p.region)} (${p.department}) pour les projets de chauffage industriel, collectif et tertiaire. Nous connaissons les zones d'activité, les conditions d'accès, les particularités des bâtiments locaux.</p>
          <p class="body">Notre proximité géographique nous permet d'assurer une réactivité forte — visite technique sous 5 jours, dépannage sous 4 à 24h pour les contrats avec astreinte, équipes dimensionnées pour absorber les périodes de forte demande.</p>
        </div>
        <div class="stack-4">
          <h3 class="h3">Villes principales d'intervention</h3>
          <div class="city-chips">${cities}</div>
          <h3 class="h3" style="margin-top:16px">Zones industrielles</h3>
          <div class="city-chips">${zones}</div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">SOLUTIONS LOCALES</div>
        <h2 class="h2" style="margin-top:12px">Nos solutions de chauffage industriel en ${escape(p.region)}.</h2>
      </div>
      <div class="grid-3">${sisterSilo}</div>
    </div>
  </section>

  ${decreeBanner({ compact: true })}

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">RÉFÉRENCES LOCALES</div>
        <h2 class="h2" style="margin-top:12px">Quelques chantiers récents en ${escape(p.region)}.</h2>
      </div>
      <div class="grid-4">
        ${REALIZATIONS.map(([t, title, m]) => `
          <div class="photo-card">
            <div class="media photo" style="aspect-ratio:4/5"></div>
            <span class="tag ember" style="align-self:flex-start">${escape(t)}</span>
            <h4 class="h4">${escape(title)}</h4>
            <p class="small">${escape(m)}</p>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:64px" class="cta-final">
        <div class="stack-3">
          <div class="eyebrow">FAQ LOCALE</div>
          <h2 class="h2">Questions sur le chauffage industriel en ${escape(p.region)}.</h2>
        </div>
        ${faqList(faqs)}
      </div>
    </div>
  </section>

  ${otherDept ? `
  <section style="background:var(--bg-alt)">
    <div class="container">
      <div class="cta-inline">
        <h2 class="h3">Vous êtes plutôt dans le ${otherDept.region} (${otherDept.department}) ?</h2>
        <a href="${otherDept.path}" class="btn">${otherDept.h1.replace(".", "")} →</a>
      </div>
    </div>
  </section>` : ""}

  ${ctaInline(`Un projet de chauffage industriel en ${p.region} ?`)}`;

  return htmlPage({
    title: p.title,
    metaDesc: p.metaDesc,
    canonical: p.path,
    activeKey: "indus",
    body,
    jsonLd: [
      ldBreadcrumb([
        { label: "Accueil", href: "/" },
        { label: "Chauffage industriel", href: "/chauffagiste-industriel/" },
        { label: p.breadcrumb, href: p.path },
      ]),
      ldFAQ(faqs),
    ],
  });
}

// ---------- HUB CHAUFFAGISTE ----------
function hubChauffagiste() {
  const services = [
    ["Chauffage industriel", "Chaufferies, aérothermes, radiants — sites industriels et tertiaires.", "factory", "/chauffagiste-industriel/"],
    ["Chauffage collectif", "Copropriétés, mairies, écoles — production centralisée.", "users", "/chauffage-industriel/chauffage-collectif/"],
    ["Maintenance chaufferie", "Contrats P1/P2/P3, astreinte 24/7.", "wrench", "/chauffage-industriel/maintenance-chaufferie/"],
    ["Pompe à chaleur", "Conversion vers PAC air/eau, hybride, eau/eau.", "thermo", "/chauffage-industriel/chauffage-electrique-collectif/"],
    ["Chauffage gaz", "Chaudières gaz, brûleurs, mise en conformité ICPE.", "flame", "/chauffage-industriel/chauffage-gaz/"],
    ["Plomberie industrielle", "Tuyauterie, réseaux d'eau, installations sanitaires.", "pipe", "/devis-plombier-chauffagiste/"],
  ].map(([n, d, ic, h]) => `
    <a href="${h}" class="card">
      <div class="icon-box">${icon(ic)}</div>
      <h4 class="h4">${escape(n)}</h4>
      <p class="body" style="font-size:13px">${escape(d)}</p>
      <span class="arrow">EN SAVOIR PLUS →</span>
    </a>`).join("");

  const localPages = SERVICES_CHAUFFAGISTE.map(c => `
    <a href="${c.path}" class="card">
      <div class="icon-box">${icon("map")}</div>
      <h4 class="h4">${escape(c.h1.replace(".", ""))}</h4>
      <p class="small">${escape(c.cities.slice(0, 5).join(" · "))}</p>
      <span class="arrow">VOIR LA PAGE LOCALE →</span>
    </a>`).join("");

  const faqs = [
    ["Qu'est-ce qu'un chauffagiste ?", "Un chauffagiste conçoit, installe, entretient et dépanne les systèmes de chauffage : chaudières, pompes à chaleur, brûleurs, réseaux et émetteurs. Il maîtrise plusieurs énergies (gaz, fioul, électricité, biomasse)."],
    ["Quelle différence avec un plombier ?", "Le plombier traite les réseaux d'eau et le sanitaire. Le chauffagiste est spécialisé sur la production de chaleur. La plupart des entreprises font les deux — c'est notre cas."],
    ["Quelles certifications avez-vous ?", "QualiGaz, RGE, QualiPAC, QualiBois — couverture complète pour les aides énergétiques. Station SEET pour les diagnostics constructeur."],
    ["Intervenez-vous chez les particuliers ?", "Oui pour les chaufferies des copropriétés et certains projets résidentiels haut-de-gamme. Notre cœur de métier reste le tertiaire et l'industriel."],
    ["Faites-vous du dépannage en urgence ?", "Oui pour nos clients sous contrat (astreinte 24/7) et au cas par cas pour les autres selon disponibilité."],
  ];

  const body = `
  <section style="padding:32px 0 64px;background:var(--bg)">
    <div class="container">
      ${breadcrumb([{ label: "Accueil", href: "/" }, { label: "Chauffagiste" }])}
      <div class="grid-hero" style="margin-top:32px">
        <div class="stack-4">
          <div class="eyebrow">CHAUFFAGISTE PROFESSIONNEL · 91 · 45 · IDF</div>
          <h1 class="h1">Chauffagiste professionnel — Essonne, Loiret et Île-de-France.</h1>
          <p class="lead">Plomberie, chauffage, sanitaire, dépannage. Particuliers, copropriétés, collectivités, industriels. Un interlocuteur unique pour tout votre projet thermique.</p>
          <div class="row" style="gap:12px;flex-wrap:wrap">
            <a href="/devis-chauffagiste/" class="btn primary">Demander un devis</a>
            <a href="tel:${phoneStripped}" class="btn">${icon("phone", 14)} ${SITE.phone}</a>
          </div>
        </div>
        <div class="media photo" style="aspect-ratio:4/3">PHOTO CHAUFFAGISTE EN INTERVENTION</div>
      </div>
    </div>
  </section>
  ${trustStrip()}

  <section>
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">NOS PRESTATIONS</div>
        <h2 class="h2" style="margin-top:12px">Tout ce qu'un chauffagiste peut faire pour vous.</h2>
        <p class="lead" style="margin-top:12px">${SITE.brand} couvre l'ensemble du métier : conception, installation, maintenance, dépannage. Six pôles de compétence pour répondre à tous les besoins.</p>
      </div>
      <div class="grid-3">${services}</div>
    </div>
  </section>

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">PROXIMITÉ</div>
        <h2 class="h2" style="margin-top:12px">Chauffagiste de proximité.</h2>
      </div>
      <div class="grid-3">${localPages}</div>
    </div>
  </section>

  ${decreeBanner({ compact: true })}

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:64px" class="cta-final">
        <div class="stack-3">
          <div class="eyebrow">FAQ</div>
          <h2 class="h2">Questions sur notre métier.</h2>
        </div>
        ${faqList(faqs)}
      </div>
    </div>
  </section>

  ${ctaInline("Un projet ? Parlons-en.")}`;

  return htmlPage({
    title: "Chauffagiste Professionnel — Essonne, Loiret et Île-de-France",
    metaDesc: "Chauffagiste certifié pour particuliers, copropriétés, industriels en Essonne (91), Loiret (45) et Île-de-France. Installation, maintenance, dépannage.",
    canonical: "/chauffagiste/",
    activeKey: "chauffagiste",
    body,
    jsonLd: [
      ldBreadcrumb([{ label: "Accueil", href: "/" }, { label: "Chauffagiste", href: "/chauffagiste/" }]),
      ldFAQ(faqs),
    ],
  });
}

// ---------- PAGE LOCALE CHAUFFAGISTE ----------
function localChauffagistePage(p) {
  const cities = p.cities.map(c => `<a href="/devis-chauffagiste-${p.region.toLowerCase()}/" class="tag">${escape(c)}</a>`).join("");
  const otherDept = SERVICES_CHAUFFAGISTE.find(o => o.path !== p.path);

  const services = [
    ["Installation chaudière", "Gaz, granulés, PAC — étude et pose.", "flame", "/devis-installation-chauffage/"],
    ["Maintenance chauffage", "Visite annuelle, contrats P2/P3.", "wrench", "/devis-maintenance-chauffage/"],
    ["Dépannage chauffage", "Intervention rapide, diagnostic clair.", "shield", "/devis-depannage-chauffage/"],
    ["Chauffage industriel", "Chaufferies, aérothermes, radiants.", "factory", "/chauffagiste-industriel/"],
  ].map(([n, d, ic, h]) => `
    <a href="${h}" class="card">
      <div class="icon-box">${icon(ic)}</div>
      <h4 class="h4">${escape(n)}</h4>
      <p class="small">${escape(d)}</p>
      <span class="arrow">EN SAVOIR PLUS →</span>
    </a>`).join("");

  const faqs = [
    [`Intervenez-vous dans toute la ${p.region} ?`, `Oui — sur l'ensemble du département ${p.department}. Notre équipe rayonne depuis ${p.cities.slice(0, 2).join(" et ")}.`],
    ["Combien coûte une intervention ?", "Le devis est gratuit. Le tarif d'intervention est annoncé en amont — pas de surprise."],
    ["Faites-vous le dépannage chaudière ?", "Oui — sous 24h sur le département pour la plupart des situations, sous 4h pour les sites sous contrat avec astreinte."],
    [`Comment vous joindre depuis la ${p.region} ?`, `Téléphone, email ou formulaire en ligne. Devis chauffagiste ${p.region} sous 24h.`],
  ];

  const body = `
  <section style="padding:32px 0 56px">
    <div class="container">
      ${breadcrumb([
        { label: "Accueil", href: "/" },
        { label: "Chauffagiste", href: "/chauffagiste/" },
        { label: p.breadcrumb },
      ])}
      <div class="grid-hero" style="margin-top:32px">
        <div class="stack-4">
          <div class="eyebrow">CHAUFFAGISTE · ${p.region.toUpperCase()} (${p.department})</div>
          <h1 class="h1">${escape(p.h1)}</h1>
          <p class="lead">${escape(p.intro)}</p>
          <div class="row" style="gap:12px;flex-wrap:wrap">
            <a href="/devis-chauffagiste-${p.region.toLowerCase()}/" class="btn primary">Devis chauffagiste ${p.region} →</a>
            <a href="tel:${phoneStripped}" class="btn">${icon("phone", 14)} ${SITE.phone}</a>
          </div>
        </div>
        <div class="media photo" style="aspect-ratio:4/3">PHOTO ÉQUIPE / VÉHICULE LOCAL</div>
      </div>
    </div>
  </section>
  ${trustStrip()}

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div class="grid-hero">
        <div class="stack-4">
          <div class="eyebrow">PRÉSENCE LOCALE</div>
          <h2 class="h2">Votre chauffagiste de proximité dans le ${escape(p.region)}.</h2>
          <p class="body">Particuliers, copropriétés, professionnels du ${escape(p.region)} : ${SITE.brand} est votre partenaire chauffage. Installation, maintenance et dépannage sur tous types d'équipements.</p>
          <p class="body">Plus de 10 ans d'expérience locale, des certifications à jour, une équipe joignable directement — sans centrale d'appel.</p>
        </div>
        <div class="stack-4">
          <h3 class="h3">Villes d'intervention principales</h3>
          <div class="city-chips">${cities}</div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">NOS SERVICES LOCAUX</div>
        <h2 class="h2" style="margin-top:12px">Quatre interventions principales en ${escape(p.region)}.</h2>
      </div>
      <div class="grid-4">${services}</div>
    </div>
  </section>

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:64px" class="cta-final">
        <div class="stack-3">
          <div class="eyebrow">FAQ LOCALE</div>
          <h2 class="h2">Questions fréquentes — ${escape(p.region)}.</h2>
        </div>
        ${faqList(faqs)}
      </div>
    </div>
  </section>

  ${otherDept ? `
  <section>
    <div class="container">
      <div class="cta-inline">
        <h2 class="h3">Plutôt dans le ${otherDept.region} ?</h2>
        <a href="${otherDept.path}" class="btn">${escape(otherDept.h1.replace(".", ""))} →</a>
      </div>
    </div>
  </section>` : ""}

  ${ctaInline(`Un projet chauffage en ${p.region} ?`)}`;

  return htmlPage({
    title: p.title,
    metaDesc: p.metaDesc,
    canonical: p.path,
    activeKey: "chauffagiste",
    body,
    jsonLd: [
      ldBreadcrumb([
        { label: "Accueil", href: "/" },
        { label: "Chauffagiste", href: "/chauffagiste/" },
        { label: p.breadcrumb, href: p.path },
      ]),
      ldFAQ(faqs),
    ],
  });
}

// ---------- DEVIS PAGE ----------
function devisPage(p) {
  const pillars = p.pillars.map(([t, d], i) => `
    <div class="card">
      <span class="mono">FACTEUR 0${i + 1}</span>
      <h4 class="h4">${escape(t)}</h4>
      <p class="body" style="font-size:13px">${escape(d)}</p>
    </div>`).join("");

  const sisters = DEVIS_PAGES.filter(o => o.path !== p.path).slice(0, 6).map(d => `
    <a href="${d.path}" class="card">
      <div class="icon-box">${icon("chart")}</div>
      <h4 class="h4">${escape(d.breadcrumb)}</h4>
      <p class="small">Devis sous 24h, sans engagement.</p>
      <span class="arrow">DÉCOUVRIR →</span>
    </a>`).join("");

  const faqs = [
    ["Le devis est-il vraiment gratuit ?", "Oui — la visite technique sur site et le devis sont 100% gratuits, sans engagement de votre part."],
    ["Sous quel délai recevrai-je le devis ?", "Sous 24h ouvrées après la visite technique. Pour les projets simples, c'est même souvent plus rapide."],
    ["Le devis intègre-t-il les aides ?", "Oui — nous indiquons les CEE, aides ADEME, MaPrimeRénov' applicables. Vous voyez le reste à charge net."],
    ["Que se passe-t-il après le devis ?", "Vous comparez, vous décidez. Pas de relance commerciale agressive. Si vous validez, nous planifions ensemble les travaux."],
    ["Puis-je négocier ?", "Le devis reflète notre dimensionnement technique. Sur les composants optionnels (GTB, options de confort), oui — discutons-en."],
  ];

  const body = `
  <section style="padding:32px 0 64px;background:var(--bg)">
    <div class="container">
      ${breadcrumb([{ label: "Accueil", href: "/" }, { label: p.breadcrumb }])}
      <div class="grid-hero" style="margin-top:32px">
        <div class="stack-4">
          <div class="eyebrow">DEVIS GRATUIT · RÉPONSE SOUS 24H</div>
          <h1 class="h1">${escape(p.h1)}</h1>
          <p class="lead">${escape(p.intro)}</p>
          <div class="row" style="gap:12px;flex-wrap:wrap">
            <a href="#form" class="btn primary">Remplir le formulaire ↓</a>
            <a href="tel:${phoneStripped}" class="btn">${icon("phone", 14)} ${SITE.phone}</a>
          </div>
          <div class="badges-row">
            <span class="item">${icon("check", 14)}Réponse sous 24h</span>
            <span class="item">${icon("check", 14)}Sans engagement</span>
            <span class="item">${icon("check", 14)}Aides intégrées</span>
          </div>
        </div>
        <div class="media photo" style="aspect-ratio:4/3">PHOTO TECHNICIEN EN VISITE TECHNIQUE</div>
      </div>
    </div>
  </section>
  ${trustStrip()}

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">POURQUOI NOUS</div>
        <h2 class="h2" style="margin-top:12px">Quatre engagements pour votre devis.</h2>
      </div>
      <div class="grid-4">${pillars}</div>
    </div>
  </section>

  <section id="form">
    <div class="container">
      <div class="cta-final">
        <div class="stack-4">
          <div class="eyebrow">FORMULAIRE</div>
          <h2 class="h2">Recevez votre devis sous 24h.</h2>
          <p class="body">Renseignez votre besoin en 2 minutes. Notre équipe technique vous rappelle pour qualifier, programme la visite et vous fournit un devis précis.</p>
          <ul style="display:flex;flex-direction:column;gap:10px">
            <li class="row" style="gap:10px;font-size:14px">${icon("check", 16)} Étude technique gratuite</li>
            <li class="row" style="gap:10px;font-size:14px">${icon("check", 16)} Visite sur site sous 5 jours</li>
            <li class="row" style="gap:10px;font-size:14px">${icon("check", 16)} Devis détaillé sous 24h</li>
            <li class="row" style="gap:10px;font-size:14px">${icon("check", 16)} Aides énergétiques intégrées</li>
          </ul>
          <div class="stack-3" style="margin-top:8px;padding:16px;background:var(--bg-alt);border:1px solid var(--line);border-radius:4px">
            <span class="mono">BESOIN URGENT ?</span>
            <a href="tel:${phoneStripped}" style="font-size:18px;font-family:var(--font-mono);font-weight:600">${icon("phone", 16)} ${SITE.phone}</a>
            <a href="tel:${SITE.phoneAlt.replace(/\s/g, "")}" style="font-size:14px;color:var(--fg-soft)">${SITE.phoneAlt}</a>
          </div>
        </div>
        <form action="#" method="post" style="background:var(--bg-alt);border:1px solid var(--line);padding:28px;border-radius:4px">
          <div class="grid-form" style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            ${["Nom", "Entreprise", "Téléphone", "Email"].map(f => `
              <div class="stack-2">
                <label class="label" for="d-${f}">${escape(f)}</label>
                <input id="d-${f}" name="${f.toLowerCase()}" type="${f === "Email" ? "email" : f === "Téléphone" ? "tel" : "text"}" class="input" required />
              </div>`).join("")}
            <div class="stack-2" style="grid-column:span 2">
              <label class="label" for="d-cp">Code postal du site</label>
              <input id="d-cp" name="cp" type="text" class="input" pattern="[0-9]{5}" required />
            </div>
            <div class="stack-2" style="grid-column:span 2">
              <label class="label">Type de besoin</label>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                ${["Installation", "Maintenance", "Dépannage", "Audit énergétique"].map(t => `
                  <label style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:#fff;border:1px solid var(--line);border-radius:2px;font-size:12px;font-weight:600;cursor:pointer">
                    <input type="checkbox" name="besoin" value="${t}" style="margin:0"/>${escape(t)}
                  </label>`).join("")}
              </div>
            </div>
            <div class="stack-2" style="grid-column:span 2">
              <label class="label" for="d-msg">Décrivez votre projet</label>
              <textarea id="d-msg" name="message" class="textarea" rows="5" placeholder="Surface, puissance estimée, calendrier..."></textarea>
            </div>
          </div>
          <button type="submit" class="btn primary" style="width:100%;justify-content:center;margin-top:16px">Recevoir mon devis sous 24h →</button>
          <p class="small" style="margin-top:10px;font-size:11px">En soumettant, vous acceptez notre <a href="/politique-confidentialite/" style="text-decoration:underline">politique RGPD</a>.</p>
        </form>
      </div>
    </div>
  </section>

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin-bottom:40px;max-width:720px">
        <div class="eyebrow">AUTRES DEVIS</div>
        <h2 class="h2" style="margin-top:12px">Découvrir nos autres devis.</h2>
      </div>
      <div class="grid-3">${sisters}</div>
    </div>
  </section>

  <section>
    <div class="container">
      <div style="display:grid;grid-template-columns:1fr 2fr;gap:64px" class="cta-final">
        <div class="stack-3">
          <div class="eyebrow">FAQ</div>
          <h2 class="h2">Questions sur le devis.</h2>
        </div>
        ${faqList(faqs)}
      </div>
    </div>
  </section>

  ${ctaInline("Un projet ? Recevez votre devis sous 24h.")}`;

  return htmlPage({
    title: p.title,
    metaDesc: p.metaDesc,
    canonical: p.path,
    activeKey: "devis",
    body,
    jsonLd: [
      ldBreadcrumb([{ label: "Accueil", href: "/" }, { label: p.breadcrumb, href: p.path }]),
      ldFAQ(faqs),
    ],
  });
}

// ---------- BLOG HUB (général ou thématique) ----------
function blogIndex() {
  const articles = BLOG_ARTICLES.map(a => {
    const hub = BLOG_HUBS.find(h => h.slug === a.hub);
    return `
    <a href="${a.path}" class="card photo-card landscape">
      <div class="media photo"></div>
      <span class="tag" style="align-self:flex-start">${escape(hub.h1.replace("Blog ", "").replace(".", "").replace(" — guides pro", "").replace(" — conseils et expertise", ""))}</span>
      <h3 class="h3" style="font-size:18px">${escape(a.h1)}</h3>
      <p class="body" style="font-size:13px">${escape(a.excerpt)}</p>
      <span class="arrow">LIRE →</span>
    </a>`;
  }).join("");

  const hubs = BLOG_HUBS.map(h => `
    <a href="${h.path}" class="card">
      <div class="icon-box">${icon("chart")}</div>
      <h4 class="h4">${escape(h.h1.replace(".", ""))}</h4>
      <p class="small">${escape(h.metaDesc.split(".")[0])}.</p>
      <span class="arrow">VOIR LE HUB →</span>
    </a>`).join("");

  const body = `
  <section style="padding:32px 0 56px">
    <div class="container">
      ${breadcrumb([{ label: "Accueil", href: "/" }, { label: "Blog" }])}
      <div style="margin-top:32px;max-width:780px">
        <div class="eyebrow">BLOG</div>
        <h1 class="h1" style="margin-top:12px">Blog — chauffage industriel, plomberie et énergie.</h1>
        <p class="lead" style="margin-top:16px">Guides pratiques, comparatifs techniques, retours de chantier. Pour vous aider à décider en connaissance de cause.</p>
      </div>
    </div>
  </section>
  ${trustStrip()}

  <section>
    <div class="container">
      <div style="margin-bottom:32px;max-width:720px">
        <div class="eyebrow">THÉMATIQUES</div>
        <h2 class="h2" style="margin-top:12px">Hubs thématiques.</h2>
      </div>
      <div class="grid-2">${hubs}</div>
    </div>
  </section>

  <section style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin-bottom:32px;max-width:720px">
        <div class="eyebrow">DERNIERS ARTICLES</div>
        <h2 class="h2" style="margin-top:12px">Tous les articles.</h2>
      </div>
      <div class="grid-3">${articles}</div>
    </div>
  </section>

  ${ctaInline("Une question technique ? Notre équipe vous répond.")}`;

  return htmlPage({
    title: "Blog — Chauffage Industriel, Plomberie et Énergie | Plomberie Services 91",
    metaDesc: "Guides, comparatifs et retours de chantier sur le chauffage industriel, la plomberie et la transition énergétique. Articles rédigés par des pros.",
    canonical: "/blog/",
    activeKey: "blog",
    body,
  });
}

function blogHub(hub) {
  const articles = BLOG_ARTICLES.filter(a => a.hub === hub.slug).map(a => `
    <a href="${a.path}" class="card photo-card landscape">
      <div class="media photo"></div>
      <h3 class="h3" style="font-size:18px">${escape(a.h1)}</h3>
      <p class="body" style="font-size:13px">${escape(a.excerpt)}</p>
      <span class="arrow">LIRE →</span>
    </a>`).join("");

  const otherHub = BLOG_HUBS.find(h => h.slug !== hub.slug);

  const body = `
  <section style="padding:32px 0 56px">
    <div class="container">
      ${breadcrumb([
        { label: "Accueil", href: "/" },
        { label: "Blog", href: "/blog/" },
        { label: hub.h1.replace(".", "") },
      ])}
      <div style="margin-top:32px;max-width:780px">
        <div class="eyebrow">HUB BLOG</div>
        <h1 class="h1" style="margin-top:12px">${escape(hub.h1)}</h1>
        <p class="lead" style="margin-top:16px">${escape(hub.metaDesc)}</p>
        <div class="row" style="gap:12px;margin-top:24px">
          <a href="${hub.parentService}" class="btn">→ Voir le service associé</a>
          <a href="/devis-chauffage-industriel/" class="btn primary">Demander un devis</a>
        </div>
      </div>
    </div>
  </section>
  ${trustStrip()}

  <section>
    <div class="container">
      <div style="margin-bottom:32px;max-width:720px">
        <div class="eyebrow">ARTICLES</div>
        <h2 class="h2" style="margin-top:12px">Tous nos articles dans cette thématique.</h2>
      </div>
      <div class="grid-3">${articles}</div>
    </div>
  </section>

  ${otherHub ? `
  <section style="background:var(--bg-alt)">
    <div class="container">
      <div class="cta-inline">
        <h2 class="h3">Découvrir un autre hub.</h2>
        <a href="${otherHub.path}" class="btn">${escape(otherHub.h1.replace(".", ""))} →</a>
      </div>
    </div>
  </section>` : ""}

  ${ctaInline("Une question ? Notre équipe technique répond.")}`;

  return htmlPage({
    title: `${hub.title} | ${SITE.brand}`,
    metaDesc: hub.metaDesc,
    canonical: hub.path,
    activeKey: "blog",
    body,
  });
}

// ---------- BLOG ARTICLE ----------
function blogArticle(a) {
  const hub = BLOG_HUBS.find(h => h.slug === a.hub);
  const sections = a.sections.map(([t, body]) => `
    <h2 id="${t.toLowerCase().replace(/[^a-z0-9]+/g, "-")}">${escape(t)}</h2>
    <p>${escape(body)}</p>`).join("");

  const related = (a.relatedServices || []).map(slug => {
    const s = SERVICES_INDUSTRIEL.find(x => x.slug === slug);
    if (!s) return "";
    return `
    <a href="${s.path}" class="card">
      <div class="icon-box">${icon(s.icon)}</div>
      <h4 class="h4">${escape(s.nav)}</h4>
      <p class="small">${escape(s.lead.split(".")[0])}.</p>
      <span class="arrow">DÉCOUVRIR →</span>
    </a>`;
  }).join("");

  const otherArticles = BLOG_ARTICLES.filter(o => o.path !== a.path && o.hub === a.hub).slice(0, 3).map(o => `
    <a href="${o.path}" class="card photo-card landscape">
      <div class="media photo"></div>
      <h3 class="h3" style="font-size:16px">${escape(o.h1)}</h3>
      <p class="body" style="font-size:12px">${escape(o.excerpt)}</p>
      <span class="arrow">LIRE →</span>
    </a>`).join("");

  const body = `
  <section style="padding:32px 0 24px">
    <div class="container" style="max-width:920px">
      ${breadcrumb([
        { label: "Accueil", href: "/" },
        { label: "Blog", href: "/blog/" },
        { label: hub.h1.replace(".", ""), href: hub.path },
        { label: a.h1 },
      ])}
    </div>
  </section>

  <section style="padding:0 0 32px">
    <div class="container" style="max-width:920px">
      <div class="eyebrow">${escape(hub.h1.replace(".", "").toUpperCase())}</div>
      <h1 class="h1" style="margin-top:16px;font-size:48px">${escape(a.h1)}</h1>
      <p class="lead" style="margin-top:16px">${escape(a.excerpt)}</p>
      <div class="row" style="gap:24px;margin-top:24px">
        <span class="small">Publié le ${new Date(a.publishedDate).toLocaleDateString("fr-FR")}</span>
        <span class="small">Auteur · Équipe technique ${SITE.brand}</span>
      </div>
    </div>
  </section>

  <section style="padding:32px 0 64px">
    <div class="container">
      <div class="media photo" style="aspect-ratio:21/9;max-width:1024px;margin:0 auto">PHOTO ARTICLE — ${escape(a.h1)}</div>
    </div>
  </section>

  <section style="padding:0 0 64px">
    <div class="container">
      <article class="article-body">
        <p style="font-size:18px;color:var(--fg);font-weight:500">${escape(a.intro)}</p>
        ${sections}
        <blockquote>Vous voulez aller plus loin ? Notre équipe technique répond directement à vos questions — sans formulaire intermédiaire.</blockquote>
        <p>Un projet sur ce sujet ? <a href="/devis-chauffage-industriel/">Demandez un devis sous 24h</a> ou <a href="tel:${phoneStripped}">appelez-nous au ${SITE.phone}</a>.</p>
      </article>
    </div>
  </section>

  ${related ? `
  <section style="background:var(--bg-alt)">
    <div class="container">
      <div style="margin-bottom:32px;max-width:720px">
        <div class="eyebrow">SERVICES LIÉS</div>
        <h2 class="h2" style="margin-top:12px">Pour aller plus loin.</h2>
      </div>
      <div class="grid-3">${related}</div>
    </div>
  </section>` : ""}

  ${otherArticles ? `
  <section>
    <div class="container">
      <div style="margin-bottom:32px;max-width:720px">
        <div class="eyebrow">ARTICLES</div>
        <h2 class="h2" style="margin-top:12px">À lire aussi sur ${escape(hub.h1.replace("Blog ", "").replace(".", ""))}.</h2>
      </div>
      <div class="grid-3">${otherArticles}</div>
    </div>
  </section>` : ""}

  ${ctaInline("Un projet sur ce sujet ? Parlons-en.")}`;

  return htmlPage({
    title: a.title,
    metaDesc: a.metaDesc,
    canonical: a.path,
    activeKey: "blog",
    body,
    jsonLd: [
      ldBreadcrumb([
        { label: "Accueil", href: "/" },
        { label: "Blog", href: "/blog/" },
        { label: hub.h1.replace(".", ""), href: hub.path },
        { label: a.h1, href: a.path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: a.h1,
        description: a.metaDesc,
        author: { "@type": "Organization", name: SITE.brand },
        publisher: { "@type": "Organization", name: SITE.brand },
        datePublished: a.publishedDate,
      },
    ],
  });
}

// ---------- STATIC PAGES (contact, mentions...) ----------
function contactPage() {
  const body = `
  <section style="padding:32px 0 64px;background:var(--bg)">
    <div class="container">
      ${breadcrumb([{ label: "Accueil", href: "/" }, { label: "Contact" }])}
      <div style="margin-top:32px;max-width:780px">
        <div class="eyebrow">CONTACT</div>
        <h1 class="h1" style="margin-top:12px">Parlons de votre projet.</h1>
        <p class="lead" style="margin-top:16px">Téléphone, email, formulaire en ligne — choisissez le canal qui vous convient. Réponse rapide garantie.</p>
      </div>
    </div>
  </section>
  ${trustStrip()}

  <section>
    <div class="container">
      <div class="cta-final">
        <div class="stack-6">
          <div class="card">
            <div class="icon-box" style="width:44px;height:44px">${icon("phone", 24)}</div>
            <h3 class="h3">Par téléphone</h3>
            <p class="body">Joignable directement, sans centrale d'appel.</p>
            <a href="tel:${phoneStripped}" style="font-size:22px;font-family:var(--font-mono);font-weight:600">${icon("phone", 16)} ${SITE.phone}</a>
            <a href="tel:${SITE.phoneAlt.replace(/\s/g, "")}" style="font-size:18px;font-family:var(--font-mono);font-weight:600">${icon("phone", 16)} ${SITE.phoneAlt}</a>
          </div>
          <div class="card">
            <div class="icon-box" style="width:44px;height:44px">${icon("mail", 24)}</div>
            <h3 class="h3">Par email</h3>
            <p class="body">Réponse sous 24h ouvrées.</p>
            <a href="mailto:${SITE.email}" style="font-size:18px;font-family:var(--font-mono);font-weight:600">${SITE.email}</a>
          </div>
          <div class="card">
            <div class="icon-box" style="width:44px;height:44px">${icon("map", 24)}</div>
            <h3 class="h3">Notre adresse</h3>
            <p class="body">${SITE.address}</p>
            <p class="small">Bureau accessible sur rendez-vous.</p>
          </div>
        </div>
        <form action="#" method="post" class="card" style="background:var(--bg-alt)">
          <h3 class="h3">Formulaire de contact</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px">
            ${["Nom", "Entreprise", "Téléphone", "Email"].map(f => `
              <div class="stack-2">
                <label class="label" for="c-${f}">${escape(f)}</label>
                <input id="c-${f}" name="${f.toLowerCase()}" type="${f === "Email" ? "email" : f === "Téléphone" ? "tel" : "text"}" class="input" />
              </div>`).join("")}
            <div class="stack-2" style="grid-column:span 2">
              <label class="label" for="c-sujet">Sujet</label>
              <select id="c-sujet" name="sujet" class="select">
                <option>Demande de devis</option>
                <option>Question technique</option>
                <option>Maintenance / dépannage</option>
                <option>Partenariat</option>
                <option>Autre</option>
              </select>
            </div>
            <div class="stack-2" style="grid-column:span 2">
              <label class="label" for="c-msg">Message</label>
              <textarea id="c-msg" name="message" class="textarea" rows="6"></textarea>
            </div>
          </div>
          <button type="submit" class="btn primary" style="width:100%;justify-content:center;margin-top:16px">Envoyer →</button>
          <p class="small" style="margin-top:10px">En soumettant, vous acceptez notre <a href="/politique-confidentialite/" style="text-decoration:underline">politique RGPD</a>.</p>
        </form>
      </div>
    </div>
  </section>

  ${ctaInline("Un projet urgent ? Appelez-nous.")}`;

  return htmlPage({
    title: `Contact — ${SITE.brand}`,
    metaDesc: `Contactez ${SITE.brand} : téléphone, email, formulaire. Chauffagiste industriel certifié en Essonne (91), Loiret (45) et Île-de-France.`,
    canonical: "/contact/",
    activeKey: "contact",
    body,
    jsonLd: [ldLocalBusiness()],
  });
}

function staticPage({ slug, title, metaDesc, h1, intro, content }) {
  const body = `
  <section style="padding:32px 0 56px;background:var(--bg)">
    <div class="container">
      ${breadcrumb([{ label: "Accueil", href: "/" }, { label: h1 }])}
      <div style="margin-top:32px;max-width:780px">
        <h1 class="h1" style="margin-top:12px">${escape(h1)}</h1>
        ${intro ? `<p class="lead" style="margin-top:16px">${escape(intro)}</p>` : ""}
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <article class="article-body">${content}</article>
    </div>
  </section>

  ${ctaInline("Une question ? Contactez-nous.")}`;

  return htmlPage({
    title: `${title} | ${SITE.brand}`,
    metaDesc,
    canonical: `/${slug}/`,
    body,
  });
}

function planDuSite() {
  const allPaths = [
    { label: "Accueil", href: "/" },
    { label: "Chauffagiste industriel (hub)", href: "/chauffagiste-industriel/" },
    ...SERVICES_INDUSTRIEL.map(s => ({ label: s.nav, href: s.path })),
    ...LOCAL_INDUS.map(p => ({ label: p.breadcrumb, href: p.path })),
    { label: "Chauffagiste (hub)", href: "/chauffagiste/" },
    ...SERVICES_CHAUFFAGISTE.map(p => ({ label: p.breadcrumb, href: p.path })),
    ...DEVIS_PAGES.map(p => ({ label: p.breadcrumb, href: p.path })),
    { label: "Blog", href: "/blog/" },
    ...BLOG_HUBS.map(h => ({ label: h.h1.replace(".", ""), href: h.path })),
    ...BLOG_ARTICLES.map(a => ({ label: a.h1, href: a.path })),
    { label: "Contact", href: "/contact/" },
    { label: "Mentions légales", href: "/mentions-legales/" },
    { label: "Politique de confidentialité", href: "/politique-confidentialite/" },
    { label: "CGV", href: "/cgv/" },
  ];
  const list = allPaths.map(p => `<li><a href="${p.href}">${escape(p.label)}</a> <span class="small">— ${escape(p.href)}</span></li>`).join("");

  return staticPage({
    slug: "plan-du-site",
    title: "Plan du site",
    metaDesc: `Plan du site complet de ${SITE.brand} : toutes les pages classées par silo et thématique.`,
    h1: "Plan du site.",
    intro: "Toutes les pages du site organisées par silo et par thématique.",
    content: `
      <h2>Pages principales</h2>
      <ul>${list}</ul>
    `,
  });
}

module.exports = {
  homepage,
  hubIndustriel,
  servicePage,
  localIndusPage,
  hubChauffagiste,
  localChauffagistePage,
  devisPage,
  blogIndex,
  blogHub,
  blogArticle,
  contactPage,
  staticPage,
  planDuSite,
};
