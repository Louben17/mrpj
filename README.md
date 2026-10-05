# MRPJ

Prezentační web rodinné značky svíček a designových nádob. Vzhled vychází z původních vektorových křivek MRPJ: animované logo v úvodu, zvětšené motivy písmen, vlastní fotografie a tři články přímo na webu.

## Vývoj

Node.js 22 LTS nebo novější podporovaná verze a npm.

```sh
npm ci
npm run dev
```

```sh
npm run pages
npm run build
npm run preview
```

Web používá Vite a statické HTML. Build generuje tokeny, všechny stránky a výstup `dist/`. Po úpravě šablony nebo článku během vývoje spusť `npm run pages`; poté Vite načte nové HTML. Žádná databáze, Instagram embed nebo externí fonty.

## Kde upravovat

- `src/templates/home.mjs`: kompozice a obsah domovské stránky.
- `src/templates/site.mjs`: společná hlavička, patička a článková šablona.
- `src/content/articles.mjs`: články o sójovém vosku, dřevěném knotu a bezpečném hoření.
- `src/style.css`, `src/fonts.css`: rozvržení, animace, komponenty a lokální fonty.
- `src/main.js`: menu, aktuální sekce, detail fotografie a rok.
- `docs/design/tokens.json`: barvy, typografické hodnoty a parametry kreslení loga.
- `scripts/build-pages.mjs`: generování HTML, loga a sitemap.xml.

Generované `index.html`, `cteni/*/index.html`, `public/brand/*.svg` a `docs/design/tokens.css` neupravuj ručně. Vite má čtyři HTML vstupy v `vite.config.js`, takže články fungují i při přímém otevření a bez JavaScriptu.

## Logo a fotografie

Uživatelův `logo.pdf` byl převeden přímo do `src/brand/logo-source.svg`. Čtyři původní křivky zůstávají zachované. Export lze zopakovat pomocí `pdftocairo -svg logo.pdf src/brand/logo-source.svg`; běžný build Poppler ani původní PDF nepotřebuje.

Animace odhaluje původní výplně maskou vedenou po jejich skutečných obrysech. Proběhne jednou a neblokuje stránku; při reduced motion je logo rovnou celé. Z původních písmen vznikají i dekorativní motivy a favicon.

Fotografie `public/images/mrpj-*.webp` jsou skutečné MRPJ, převzaté z uživatelova profilu @mrpjcz. Původ je v `public/images/sources.json`. Žádné generativní produktové fotografie ani přebarvování. Pro větší obrazové plochy je potřeba dodat vlastní originály s vyšším rozlišením.

Galerie ukazuje celý obraz v nativním dialogu s Escape a návratem focusu. Bez JS odkazuje na vlastní soubor fotografie. Veřejné stránky odkazují na vlastní články a e-mail, Instagram je uvedený jako textový profil. Redakční zdroje jsou v [docs/ARTICLE_SOURCES.md](docs/ARTICLE_SOURCES.md).

## Design a nasazení

[Designový manuál 2.0](docs/DESIGN_MANUAL.md) určuje práci s křivkami, animací, barvami, typografií a obsahem. [Původní průzkum](docs/DESIGN_RESEARCH.md) zachycuje podklady předchozího návrhu. Základní komponenty lze otevřít příkazem `npm run design:preview` na http://127.0.0.1:4174/.

Repozitář: https://github.com/Louben17/mrpj. Vercel projekt `mrpj` v týmu `jakub-kozels-projects`. Push do `main` spouští produkční build. Veřejný web: https://mrpj.cz/. Doména a DNS zůstávají u WEDOSu; původní postup je v [docs/DOMAIN.md](docs/DOMAIN.md).

Nezveřejňovat `.env*`, `.cache/`, `artifacts/`, lokální PDF ani snímky administrace. Fonty mají licence OFL uložené v `public/fonts/`.
