// =====================================================================
// Static site generator — chauffagiste-industriel.fr
// Run: node _build/build.js
// =====================================================================

const fs = require("fs");
const path = require("path");

const {
  SERVICES_INDUSTRIEL,
  LOCAL_INDUS,
  SERVICES_CHAUFFAGISTE,
  DEVIS_PAGES,
  BLOG_HUBS,
  BLOG_ARTICLES,
  SITE,
} = require("./data");

const T = require("./templates");
const { staticPage } = T;

const ROOT = path.resolve(__dirname, "..");
const writeAt = (urlPath, html) => {
  const out = path.join(ROOT, urlPath === "/" ? "index.html" : `${urlPath.replace(/^\//, "").replace(/\/$/, "")}/index.html`);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, "utf8");
  console.log("✓", urlPath);
};

// ----- Static legal/info pages content -----
const MENTIONS = staticPage({
  slug: "mentions-legales",
  title: "Mentions légales",
  metaDesc: "Mentions légales du site chauffagiste-industriel.fr exploité par Plomberie Services 91.",
  h1: "Mentions légales.",
  intro: "Les présentes mentions légales s'appliquent au site chauffagiste-industriel.fr et précisent l'identité de l'éditeur, l'hébergeur et les conditions d'utilisation.",
  content: `
    <h2>Éditeur du site</h2>
    <p><strong>Plomberie Services 91</strong> — SARL au capital de 10 000 €<br />
    Siège social : 26 Grande Rue, 45170 Oison<br />
    SIRET : à compléter · RCS : Orléans · TVA intracommunautaire : à compléter<br />
    Téléphone : <a href="tel:0633823023">06 33 82 30 23</a> · Email : <a href="mailto:contact@plomberieservices91.com">contact@plomberieservices91.com</a><br />
    Directeur de la publication : Plomberie Services 91</p>

    <h2>Hébergement</h2>
    <p>Hébergeur : à compléter — Adresse, téléphone, site web de l'hébergeur.</p>

    <h2>Propriété intellectuelle</h2>
    <p>L'ensemble des contenus du site (textes, photographies, illustrations, logos, marques) est la propriété exclusive de Plomberie Services 91 ou utilisé avec l'accord de leurs ayants droit. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable écrite est strictement interdite.</p>

    <h2>Responsabilité</h2>
    <p>Plomberie Services 91 met tout en œuvre pour fournir des informations exactes et à jour. Les informations techniques, tarifaires et réglementaires fournies à titre indicatif n'engagent l'entreprise qu'après formalisation d'un devis ou contrat. Plomberie Services 91 décline toute responsabilité pour les usages qui pourraient être faits des contenus du site sans son accord préalable.</p>

    <h2>Liens hypertextes</h2>
    <p>Le site peut contenir des liens vers des sites tiers. Plomberie Services 91 n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leurs contenus.</p>

    <h2>Données personnelles</h2>
    <p>Les conditions de traitement de vos données personnelles sont décrites dans notre <a href="/politique-confidentialite/">Politique de confidentialité</a>.</p>

    <h2>Droit applicable</h2>
    <p>Les présentes mentions légales sont soumises au droit français. Tout litige relèvera de la compétence des tribunaux français.</p>
  `,
});

const RGPD = staticPage({
  slug: "politique-confidentialite",
  title: "Politique de confidentialité",
  metaDesc: "Politique de confidentialité et de traitement des données personnelles — chauffagiste-industriel.fr.",
  h1: "Politique de confidentialité.",
  intro: "Plomberie Services 91 s'engage à protéger les données personnelles que vous nous confiez. Cette politique précise la nature des données collectées, leur usage, et vos droits.",
  content: `
    <h2>Données collectées</h2>
    <p>Nous collectons uniquement les données nécessaires à la fourniture de nos services :</p>
    <ul>
      <li>Données de contact : nom, prénom, email, téléphone, adresse postale</li>
      <li>Données professionnelles : entreprise, fonction</li>
      <li>Données projet : description du besoin, surface, code postal, photos éventuelles</li>
      <li>Données techniques : adresse IP, navigateur, pages visitées (cookies)</li>
    </ul>

    <h2>Finalités du traitement</h2>
    <ul>
      <li>Répondre à vos demandes de devis ou d'information</li>
      <li>Établir des devis, contrats et factures</li>
      <li>Assurer le suivi commercial et technique</li>
      <li>Envoyer des informations professionnelles (avec votre accord)</li>
      <li>Améliorer notre site et nos services</li>
      <li>Respecter nos obligations légales</li>
    </ul>

    <h2>Bases légales</h2>
    <p>Nos traitements reposent sur : votre consentement (formulaires, newsletter), l'exécution du contrat (devis et travaux), notre intérêt légitime (suivi commercial), et nos obligations légales (comptabilité, archivage).</p>

    <h2>Durée de conservation</h2>
    <ul>
      <li>Prospects : 3 ans après le dernier contact</li>
      <li>Clients : 10 ans après la fin de la relation contractuelle</li>
      <li>Cookies : 13 mois maximum</li>
    </ul>

    <h2>Destinataires</h2>
    <p>Vos données sont strictement réservées aux services internes de Plomberie Services 91 et à ses prestataires techniques (hébergeur, outils CRM) avec lesquels nous avons signé des accords de confidentialité.</p>

    <h2>Vos droits</h2>
    <p>Conformément au RGPD, vous disposez des droits suivants : accès, rectification, suppression, limitation, portabilité, opposition. Pour les exercer, contactez-nous par email à <a href="mailto:contact@plomberieservices91.com">contact@plomberieservices91.com</a>.</p>

    <p>Vous avez également le droit d'introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr">www.cnil.fr</a>).</p>

    <h2>Cookies</h2>
    <p>Nous utilisons des cookies techniques (nécessaires au fonctionnement) et de mesure d'audience anonymisée. Aucun cookie publicitaire ou de profilage n'est déposé sans votre consentement explicite.</p>
  `,
});

const CGV = staticPage({
  slug: "cgv",
  title: "Conditions Générales de Vente",
  metaDesc: "Conditions Générales de Vente — Plomberie Services 91 / chauffagiste-industriel.fr.",
  h1: "Conditions Générales de Vente.",
  intro: "Les présentes CGV régissent toutes les prestations de Plomberie Services 91, sauf accord contractuel particulier précisé dans le devis ou contrat signé.",
  content: `
    <h2>Article 1 — Objet</h2>
    <p>Les présentes CGV s'appliquent à toutes les prestations de chauffage, plomberie, sanitaire et maintenance fournies par Plomberie Services 91. Elles sont systématiquement annexées aux devis.</p>

    <h2>Article 2 — Devis</h2>
    <p>Tout devis est établi gratuitement, valable 30 jours à compter de son émission, sans engagement. La signature du devis vaut acceptation pleine et entière des présentes CGV.</p>

    <h2>Article 3 — Prix et facturation</h2>
    <p>Les prix sont indiqués HT et TTC. La TVA applicable est celle en vigueur à la date de facturation. Les prestations chez les particuliers bénéficient le cas échéant des taux réduits prévus par la loi.</p>

    <h2>Article 4 — Conditions de paiement</h2>
    <p>Sauf disposition contraire au contrat : 30% à la commande, 40% à mi-chantier, 30% à réception. Délai de règlement : 30 jours fin de mois pour les marchés professionnels, comptant pour les particuliers.</p>

    <h2>Article 5 — Délais d'exécution</h2>
    <p>Les délais sont donnés à titre indicatif et tiennent compte des conditions normales d'approvisionnement et d'accès au site. Tout retard imputable à un cas de force majeure ne peut donner lieu à dommages et intérêts.</p>

    <h2>Article 6 — Garanties</h2>
    <p>Garantie biennale (2 ans) sur les équipements installés. Garantie décennale sur les ouvrages relevant de cette garantie légale. Les garanties constructeur s'ajoutent aux garanties légales.</p>

    <h2>Article 7 — Réserves et réception</h2>
    <p>La réception des travaux fait l'objet d'un procès-verbal contradictoire. Toute réserve doit être consignée par écrit. Sans réserve, les travaux sont réputés acceptés.</p>

    <h2>Article 8 — Litiges</h2>
    <p>Tout litige relèvera, à défaut d'accord amiable, de la compétence du Tribunal de Commerce d'Orléans pour les marchés professionnels et des juridictions compétentes pour les particuliers.</p>

    <h2>Article 9 — Données personnelles</h2>
    <p>Le traitement des données personnelles est régi par notre <a href="/politique-confidentialite/">Politique de confidentialité</a>.</p>
  `,
});

// ----- Build all pages -----
console.log("Generating site...\n");

writeAt("/", T.homepage());
writeAt("/chauffagiste-industriel/", T.hubIndustriel());

SERVICES_INDUSTRIEL.forEach(s => writeAt(s.path, T.servicePage(s)));
LOCAL_INDUS.forEach(p => writeAt(p.path, T.localIndusPage(p)));

writeAt("/chauffagiste/", T.hubChauffagiste());
SERVICES_CHAUFFAGISTE.forEach(p => writeAt(p.path, T.localChauffagistePage(p)));

DEVIS_PAGES.forEach(p => writeAt(p.path, T.devisPage(p)));

writeAt("/blog/", T.blogIndex());
BLOG_HUBS.forEach(h => writeAt(h.path, T.blogHub(h)));
BLOG_ARTICLES.forEach(a => writeAt(a.path, T.blogArticle(a)));

writeAt("/contact/", T.contactPage());
writeAt("/mentions-legales/", MENTIONS);
writeAt("/politique-confidentialite/", RGPD);
writeAt("/cgv/", CGV);
writeAt("/plan-du-site/", T.planDuSite());

// ----- Sitemap.xml -----
const allUrls = [
  "/",
  "/chauffagiste-industriel/",
  ...SERVICES_INDUSTRIEL.map(s => s.path),
  ...LOCAL_INDUS.map(p => p.path),
  "/chauffagiste/",
  ...SERVICES_CHAUFFAGISTE.map(p => p.path),
  ...DEVIS_PAGES.map(p => p.path),
  "/blog/",
  ...BLOG_HUBS.map(h => h.path),
  ...BLOG_ARTICLES.map(a => a.path),
  "/contact/",
  "/mentions-legales/",
  "/politique-confidentialite/",
  "/cgv/",
  "/plan-du-site/",
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url><loc>https://${SITE.domain}${u}</loc><changefreq>weekly</changefreq></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap, "utf8");
console.log("✓ /sitemap.xml");

// ----- robots.txt -----
const robots = `User-agent: *
Allow: /

Sitemap: https://${SITE.domain}/sitemap.xml
`;
fs.writeFileSync(path.join(ROOT, "robots.txt"), robots, "utf8");
console.log("✓ /robots.txt");

console.log(`\nDone — ${allUrls.length} pages.`);
