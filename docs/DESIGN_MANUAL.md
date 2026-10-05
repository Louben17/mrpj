# MRPJ — web vycházející z křivek loga

## Aktuální zadání 2.1 — klidný úvod a spodní navigace

Tato pravidla mají přednost před popisem verze 2.0 níže. Uživatel chce další vývoj po menších částech; nyní upravujeme úvod, navigaci, patičku a FAQ.

- Hero: čistá vysoká plocha v teplé barvě `color-hero`, velmi jemné světelné přechody. Bílé původní logo nad středově zarovnaným titulkem a jedním textovým CTA. Bez fotografie v úvodu a bez malého loga nahoře.
- Animace: linky loga se postupně vybarví, ne celé logo najednou. Každé písmeno v PDF je jedna souvislá linka převedená na obrys; build (`scripts/build-pages.mjs`) najde její vnější konec a široký tah ořezaný původní výplní pak „vede pero“ od vnitřního konce spirály ven. Písmena M, R, P, J navazují s odstupem `logo-stagger`, jedno trvá `logo-duration` (4,2 s, celkem asi 6 s). Na konci se položí přesná výplň z PDF. Bez šedého podkladu a bez viditelného obrysu. Reduced motion ukazuje hotové bílé logo okamžitě.
- Galerie tvorby: zaoblené dlaždice (`radius-card` 28 px) s popiskem uvnitř karty na matném světlém panelu (`radius-panel` 20 px), stejném jako spodní navigace, a kulatým tlačítkem +. Telefon a tablet mají vodorovný karusel se scroll-snap, kde vykukuje další karta. Desktop má mozaiku 1,25 : 1 : 1 s první fotkou jako hlavní dlaždicí. Výřez a jemné přiblížení fotky se nastavují v `home.mjs` (`position`, `scale`); obsah fotek se nemění.
- Karty Malého čtení: původní písmena P, M, J jsou zvětšená daleko přes okraj karty (opacity 0,14), takže z nich zůstávají jen linky jako rukopis. Každá karta má vlastní výřez (`inset` v `calm.css`). Při najetí se linky pomalu posunou. Stejný princip platí pro barevnou hlavičku článku: výřez písmene se nastavuje proměnnými `--t --r --b --l` (obrázek se podle `inset` sám neroztáhne, proto se rozměry dopočítávají).
- Zaoblení: fotky `radius-image` 24 px, karty a hlavičky článků 28 px, ovládací prvky a ikony do kapsle (`radius-pill`). Ostré rohy pravidel 2.0 už neplatí.
- Patička: tmavé logo se stejnou technikou dokreslí jednou, když se dostane do zorného pole (pouze s JavaScriptem a bez reduced motion). Obsah pod ohybem jemně vyjede (opacity + 24 px); nic nad ohybem se neskrývá.
- Navigace: plovoucí světlá kapsle dole uprostřed, pět ikon s viditelnými názvy (Úvod, Tvorba, Čtení, Otázky, Kontakt). Bez hamburgeru. Safe-area na telefonu, dost prostoru v patičce. Při scrollu zmizí, po 650 ms klidu se vrátí. Klávesnicový focus ji vždy udrží dostupnou.
- Patička: velký kontaktní nadpis, e-mail, dvě skupiny vlastních odkazů, původní tmavé logo, copyright a textový Instagram. Kontakt je nyní součástí patičky.
- FAQ: nativní `details/summary`, použitelné klávesnicí i bez JavaScriptu. Texty v `src/content/faq.mjs`; odpovědi odkazují na vlastní články, bez vymyšlených parametrů nebo dostupnosti.
- Nový vzhled je v `src/calm.css`; původní komponenty v `src/style.css` mají základní CSS vrstvu `base`. Nové styly mají přednost. Další změny úvodu dělat v aktuálních stylech.
- SEO: unikátní titulky a popisy, canonical, Open Graph, jazyk `cs`, JSON-LD Organization/WebSite/WebPage nebo Article. Sitemap obsahuje čtyři skutečné stránky, robots.txt na ni odkazuje. FAQ je čitelný obsah, neslibujeme rozšířený výsledek ve vyhledávání.

Podklady k SEO: [Google — sitemapy](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [Google — změny podpory FAQ](https://developers.google.com/search/updates). Ověřeno 5. 10. 2026.

## Předchozí specifikace 2.0

Verze 2.0 · 5. 10. 2026. Tato verze zapracovává nové zadání uživatele: skutečné vektorové logo jako hlavní motiv, postupné vykreslení v hero, zvětšené výřezy jeho linií a vlastní články bez odkazování návštěvníka na jiné weby. Nahrazuje pravidla původního návrhu 1.0 tam, kde se liší.

## 1. Vizuální směr

**Z jedné linky. Do tvého domova.** Základem je ručně tvořený výrobek a zapamatovatelná geometrie MRPJ. Velké logo přebírá hlavní vizuální roli v úvodu; doprovodný nadpis je menší. Stránka střídá přehled objektů, osobní příběh, redakční obsah a kontakt.

Teplý krémový základ, hnědý inkoust, přirozené barvy skutečných produktů. Místo samostatných dekorativních ikon využívat původní písmena, jejich oblouky a paralelní linie. Větší měřítko loga vytváří charakter i bez velkých fotografií, pro které zatím nejsou dostupné originály.

## 2. Autoritativní logo

- Uživatel dodal `logo.pdf`. Přímý vektorový export je v `src/brand/logo-source.svg`.
- Soubor obsahuje čtyři původní uzavřené křivky M, R, P a J. Data `d` zachovat přesně. Žádné přepisování loga fontem, obkreslování od oka ani generativní rekonstrukce.
- `scripts/build-pages.mjs` z jednoho zdroje vytváří `public/brand/logo.svg`, motivy jednotlivých písmen, favicon a inline logo úvodu.
- Poměr stran zachovat. Úprava `viewBox` odstraňuje vnější prázdné okraje, nemění kresbu.
- Header a footer: kresba široká 108 px na mobilu, 124 px na desktopu, s volným okolím. Hero: logo napříč obsahovým rámem.
- Základní barva ink `#2B2521`. V dekorativním motivu na tmavém pozadí je přípustná světlá monochromatická varianta. Vždy zachovat všechny původní kontury.
- Zvětšené P/J lze oříznout okrajem sekce. Jde o dekoraci s prázdným alt a `aria-hidden`; vlastní logo v hlavičce i hero musí zůstat celé.

Převod lze zopakovat příkazem `pdftocairo -svg logo.pdf src/brand/logo-source.svg`. Běžný build PDF ani Poppler nepotřebuje. Původní lokální PDF se automaticky nepublikuje.

## 3. Vykreslení v hero

PDF má linky převedené na výplňové obrysy. Animace proto postupně odhaluje původní výplně maskou vedenou podél těch samých křivek. Výsledný tvar je shodný se zdrojem, nikoli aproximace loga.

Po dokončení masku překryje plná původní kresba, aby byly přesné i konce tahů. Stejná plná kresba se bez čekání používá pro reduced motion.

- Jedno vykreslení po načtení; délka jedné křivky 3,2 s, odstup písmen 220 ms, dohromady přibližně 3,9 s.
- Velmi slabý podklad celého loga je přítomný od začátku. Logo nikdy nezakrývá obsah ani nevytváří čekací obrazovku.
- CTA, navigace a scroll jsou dostupné během animace.
- Žádná nekonečná smyčka, vynucený scroll ani opakování při každém najetí myši.
- `prefers-reduced-motion: reduce` okamžitě ukazuje celé logo. Bez JavaScriptu zůstává SVG i obsah použitelné.
- Hodnoty `logo-duration` a `logo-stagger` jsou v `docs/design/tokens.json`.

## 4. Barvy

| Role | HEX | Použití |
| --- | --- | --- |
| Paper | `#F4F0E8` | Hlavní pozadí. |
| Surface | `#FCFAF6` | Příběh, dialog. |
| Ink | `#2B2521` | Logo, titulky, hlavní text. |
| Espresso | `#493A30` | CTA a kontaktní sekce. |
| Muted | `#6A6057` | Druhotný text. |
| Clay | `#8D442F` | Textové odkazy, focus na světlé ploše. |
| Sage | `#D8DEC7` | Článek o vosku. |
| Blush | `#EAD3CE` | Článek o dřevěném knotu. |
| Sand | `#E7DECF` | Článek o bezpečnosti. |
| Line | `#D8D0C4` | Dělicí linky. |
| Control border | `#82756A` | Hranice ovládání. |

Pastely se mohou potkat vedle sebe v trojici článků; mají jasnou roli v obsahu. Výrobky nepřebarvovat. Bez gradientů, falešných papírových textur a skleněných panelů.

Ověřené kontrasty: ink/paper 13,30 : 1; muted/paper 5,40 : 1; clay/paper 6,16 : 1; surface/espresso 10,43 : 1; ink/sage 10,94 : 1; ink/blush 10,59 : 1. Textové dvojice mají cílit alespoň na 4,5 : 1; dekorativní světlá linka nesmí být jediným indikátorem ovládání.

## 5. Typografie a rozvržení

Manrope 400/500/600 tvoří hlavní rodinu. Cormorant 400 je jeden redakční moment v příběhu, nikoli opakovaná kurzíva každého nadpisu. Fonty jsou lokální a podporují češtinu.

| Prvek | Velikost | Role |
| --- | --- | --- |
| Doprovodný H1 hero | 32–48 px | Logo je dominantní, nadpis vysvětluje značku. |
| H1 článku | 36–64 px | Čitelný titulek nejvýše v několika krátkých řádcích. |
| H2 sekce | 32–48 px | Přehled obsahu. |
| H3 produktu | 22–24 px | Skutečné pojmenování výrobku. |
| H3 článkové karty | 28–32 px | Redakční hierarchie. |
| Běžný text | 16 px | Základ webu. |
| Text článku | 18 px, řádkování 1,8 | Soustředěné čtení, šířka do 68 ch. |
| CTA a navigace | 14 px | Váha 500–600. |
| Štítek / popisek | 12 px | Nejmenší běžná informace. |

Rám má maximálně 1280 px. Boční okraje: 20 px mobil, 32 px od 768 px, 64 px od 1024 px. Základní mezery vycházejí z násobků 4 px; hlavní sekce mají 64/96 px. Nadpisové řádky na desktopu oddělují číslo sekce, titulek a úvodní text do tří sloupců.

Galerie má 1/2/3 sloupce a fotografie do 360 CSS px. V desktopu je přehled lehce odsazený vůči číslu sekce. Na mobilu má fotografie dost prostoru a popisek nezaniká mezi sousedními výrobky.

## 6. Fotografie

Výhradně vlastní MRPJ. Současné soubory pocházejí z uživatelova profilu @mrpjcz; původ zůstává zaznamenaný v `public/images/sources.json`. Nesmějí vzniknout generované svíčky, falešné záběry dílny ani změny barvy výrobku.

Současné náhledy mají šířku 360–513 px. Nezvětšovat je do velkých plošných hero fotografií. Používat `width`/`height`, vhodný ořez a lazy loading navazujícího obsahu. Galerie převažuje v poměru 4 : 5; detail ukazuje celý původní obraz.

## 7. Ovládání a pohyb

- Primární CTA: espresso/surface, výška alespoň 48 px mobil a 52 px desktop, boční padding 24 px.
- Textové odkazy: clay, podtržení, jasný název cíle. Interní články se otevírají ve stejném okně.
- Navigační akce jsou `<a>`, změny stavu `<button>`. Klikací cíle alespoň 44 × 44 px.
- Focus: viditelný obrys 2 px s odstupem, clay na světlé a surface na tmavé ploše.
- Hover: změna barvy nebo malý posun šipky. Fotografie nejvýše scale 1,02. Reduced motion vypíná nepodstatný pohyb.
- Menu má `aria-expanded`, Escape a přístupné skryté/otevřené stavy. Po výběru lokální sekce může focus přejít na její nadpis.
- Detail fotografie používá nativní `<dialog>` s názvem, tlačítkem zavření, Escape a návratem focusu na spouštěč. Bez JS zůstane odkaz na vlastní soubor obrázku.
- Články mají vlastní adresu, obsah s kotvami a odkaz na další čtení. Obsah nezávisí na JavaScriptu.

## 8. Obsah a odkazy

Úvod → tvorba → příběh → malé čtení → kontakt. Texty mají přirozené tykání a „my“ pro rodinnou značku. Nevymýšlet názvy kolekcí, ceny, certifikace, dostupnost ani parametry hoření.

Veřejný web odkazuje na vlastní obsah. Články jsou `/cteni/sojovy-vosk/`, `/cteni/dreveny-knot/` a `/cteni/bezpecne-horeni/`. Instagram uvést jako textový profil @mrpjcz; kontakt vede na `mailto:ahoj@mrpj.cz`. Externí redakční podklady patří do [ARTICLE_SOURCES.md](ARTICLE_SOURCES.md), nikoli do návštěvnických CTA.

Články jasně odlišují obecnou péči od testovaných parametrů konkrétní svíčky. Pokyny dodané výrobcem mají přednost. Nezavádět paušální zdravotní, ekologické nebo výkonnostní sliby.

## 9. Další vývoj

- Upravit šablony `src/templates/`, obsah `src/content/articles.mjs` a styly `src/style.css`.
- Původní vektorové křivky neměnit. Nový motiv odvodit výřezem nebo měřítkem původního písmene.
- `npm run pages` aktualizuje HTML a vektorové soubory. `npm run build` aktualizuje tokeny, stránky a sestaví všechny čtyři vstupy Vite.
- Nepřepisovat ručně generované `index.html`, `cteni/*/index.html` ani `public/brand/*.svg`.
- Ověřovat 320, 390, 768, 1024 a 1440 px, 200% text, animaci i reduced motion, klávesnici, variantu bez JS, přímé načtení článků a návrat z nich.
- Kontrolovat shodu `d` křivek hero se zdrojem, žádné externí návštěvnické odkazy, správné canonical adresy a sitemapu.

Původní průzkum referencí a audit předchozího vzhledu zůstává v [DESIGN_RESEARCH.md](DESIGN_RESEARCH.md). Knihovna `docs/design/` slouží pro zkoušení základních komponent; aktuální kompozici ukazuje samotný web.
