# chauffagiste-industriel.fr — Plomberie Services 91

Site statique généré pour Plomberie Services 91, spécialiste du chauffage industriel en Essonne (91), Loiret (45) et Île-de-France.

## Structure

- **41 pages HTML** générées à partir de l'arborescence SEO (silos chauffage industriel, chauffagiste, devis, blog + transverses)
- Design system : tokens CSS, Manrope / Inter Tight / JetBrains Mono
- SEO : meta uniques, JSON-LD (HVACBusiness, BreadcrumbList, FAQPage, Service, Article), sitemap.xml, robots.txt

## Régénérer le site

```bash
# Build local (chemins absolus à la racine)
node _build/build.js

# Build GitHub Pages (chemins préfixés /Test2)
MSYS_NO_PATHCONV=1 BASE_PATH=/Test2 node _build/build.js

# Build domaine custom (par défaut, racine)
node _build/build.js
```

Toutes les données sont centralisées dans `_build/data.js`. Modifier les contenus là, puis relancer la commande.

## Hébergement GitHub Pages

Le site est servi depuis la branche `main` à la racine. À activer dans **Settings → Pages → Branch: main / (root)**.

URL : **https://edwynhooconsultant-lab.github.io/Test2/**

## Stack

- Pas de framework côté client — HTML/CSS statique + 1 fichier JS pour le menu mobile et l'accordéon FAQ
- Générateur Node.js (sans dépendances)
