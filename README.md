# MRPJ

Prezentační web rodinné značky MRPJ: svíčky ze sójového vosku a ručně vyráběné designové nádoby. Teplý minimalistický design, vlastní logo, vlastní fotografie, Instagram a základní péče o svíčky.

## Vývoj

Použij Node.js 22 LTS nebo novější podporovanou verzi a npm.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

Web je statický, postavený na Vite. Produkční výstup je v `dist/`. Nepotřebuje databázi, Instagram token ani další tajné údaje.

## Obsah a fotografie

- `index.html`: texty, sekce, kontakty a odkazy na Instagram.
- `src/style.css` a `src/fonts.css`: vzhled, responzivní rozvržení a lokálně hostované fonty.
- `src/main.js`: přístupné mobilní menu a rok v patičce.
- `public/images/logo-original.jpg`: původní logo dodané uživatelem. Na webu se pouze ořezává pomocí CSS.
- `public/images/mrpj-*.webp`: skutečné fotografie nebo náhledy videí z profilu [@mrpjcz](https://www.instagram.com/mrpjcz/).
- `public/images/sources.json`: původ fotografií a odkazy na konkrétní příspěvky.
- `scripts/prepare-photos.mjs`: volitelný jednorázový převod importovaných fotografií do WebP. Očekává lokální, nezveřejňované vstupy v `artifacts/instagram/`; běžný vývoj ani build ho nepotřebují.

Galerie je ručně vybraný výběr příspěvků, nikoliv automaticky aktualizovaný feed. Kliknutí na fotografii otevře odpovídající příspěvek na Instagramu. Fotografie jsou uložené přímo v projektu, takže jejich zobrazení nezávisí na platnosti dočasných CDN adres Instagramu.

Svíčky a výrobky zobrazuj pouze pomocí vlastních fotografií MRPJ. Žádné generativní produktové fotografie. Pro vyšší ostrost lze instagramové náhledy později nahradit původními fotografiemi.

Fonty Manrope a Cormorant Garamond jsou hostované lokálně; licence jsou v `public/fonts/LICENSE-*.txt`. Web nepoužívá analytiku, externí fontové požadavky ani Instagram embed.

## Nasazení

Repozitář: https://github.com/Louben17/mrpj

Vercel projekt: `mrpj` v týmu `jakub-kozels-projects`, propojený s GitHub repozitářem. Push do `main` spustí produkční deployment. Nastavení je v `vercel.json`.

Hlavní doména: https://mrpj.cz/

Postup přesměrování domény je v [docs/DOMAIN.md](docs/DOMAIN.md). Registrace domény i DNS zůstávají u WEDOSu. Webový obsah hostuje Vercel.

## Zdroje článků

- [Cargill: NatureWax FAQ](https://www.cargill.com/bioindustrial/naturewax/soy-wax-faq)
- [National Candle Association: správné používání svíček](https://candles.org/your-foolproof-guide-to-burning-a-candle-correctly/)

Vždy se řiď konkrétním knotem a pokyny výrobce svíčky; obecný tip pro bavlněný knot nemusí platit pro dřevěný.
