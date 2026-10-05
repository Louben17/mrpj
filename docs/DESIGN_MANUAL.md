# MRPJ — designový manuál webu

Verze 1.0 · 5. 10. 2026 · specifikace pro web a další tvorbu. Redesign z 5. 10. 2026 používá tento směr a společné tokeny v hlavním stylesheetu.

Podklady: [průzkum a audit](DESIGN_RESEARCH.md), [hodnoty designu](design/tokens.json), [vizuální ukázka](design/index.html). Číselným zdrojem pro ukázku je `tokens.json`; `tokens.css` se z něj generuje. Ukázka je knihovna komponent, nikoli další návrh celého webu nebo produkční route.

Vizuální ukázku otevřít přes `npm run design:preview` na http://127.0.0.1:4174/, aby se správně načetly vlastní fotografie a lokální fonty. Po změně číselných hodnot použít `npm run design:tokens`.

## 1. Směr: současné řemeslné studio

MRPJ představuje rodinnou tvorbu svíček a designových nádob. Charakter má být **teplý, osobní, současný a přesný**. Krémová a hnědá zůstávají základem; osobitost přinášejí geometrické logo, barevné výrobky a skutečná výroba.

Návštěvník má rychle zjistit, co tvoříme, poznat naše vlastní výrobky a najít Instagram nebo kontakt. Současný rozsah je prezentační web. Košík, ceny, sklad, newsletter, formuláře, filtry ani uživatelské účty nepřidávat bez konkrétního zadání.

Převzaté principy: obrazová disciplína FRAMA a StudioSmall, teplý rám a barvy produktů Earl of East, střídání materiálových detailů a redakčního obsahu ferm LIVING. Konkrétní návrh pro MRPJ je vlastní interpretace; reference jsou podrobně popsané a odkázané v průzkumu.

## 2. Logo a grafický podpis

- Používat původní dodané logo `public/images/logo-original.jpg`. Neměnit kresbu písmen ani poměr stran; nevytvářet alternativní textový logotyp.
- Logo umístit na světlou plochu. Pro tmavou plochu použít světlý samostatný podklad; schválenou inverzní variantu zatím nemáme.
- Cílová šířka viditelné kresby: desktop 128–152 px, mobil 104–120 px. Ochranný prostor nejméně 16 px, přednostně 24 px.
- Současný JPG má velké bílé okraje. CSS ořez musí vždy zachovat celou kresbu. Pro budoucí export dát přednost originálnímu SVG, pokud ho uživatel dodá.
- Jeden značkový detail tvoří **tři paralelní linky**, které připomínají kontury loga. Použít jako krátký oddělovač u názvu značky nebo redakčního bloku, nejvýše dvakrát na domovské stránce.
- Hvězdičky, kruhová razítka a samostatné dekorativní plameny z nové kompozice odstranit. Motiv loga nesmí překrývat výrobek ani fungovat jako falešná certifikace.

## 3. Barvy

| Token | Barva | Použití |
| --- | --- | --- |
| `color-paper` | `#F4F0E8` | Hlavní krémové pozadí. |
| `color-surface` | `#FCFAF6` | Světlejší panel, dialog a plocha pro logo. |
| `color-ink` | `#2B2521` | Nadpisy a hlavní text. |
| `color-espresso` | `#493A30` | Primární CTA, závěrečný kontakt a tmavý akcent. |
| `color-muted` | `#6A6057` | Vedlejší text a popisky. |
| `color-clay` | `#8D442F` | Textový odkaz, označení aktivní položky, focus na světlé ploše. |
| `color-sage` | `#D8DEC7` | Jedna jemná plocha vycházející ze zelených výrobků. |
| `color-blush` | `#EAD3CE` | Alternativní jemná plocha vycházející z růžových výrobků. |
| `color-line` | `#D8D0C4` | Dekorativní dělicí linky. |
| `color-control-border` | `#82756A` | Rozpoznatelné hranice ovládacích prvků. |

V CSS mají tokeny prefix `--mrpj-`, např. `--mrpj-color-paper`. Názvy jsou podle role, nikoli podle konkrétní sekce.

Přibližné rozdělení ploch rozhraní: 75 % světlé neutrální plochy, 20 % tmavý text a hnědé bloky, nejvýše 5 % samostatné barevné akcenty. Fotografie se do poměru nepočítají. Šalvějovou a růžovou nepoužívat na sousedních velkých plochách; pro jeden redakční blok vybrat jednu.

Žádné přebarvování výrobků, barevné filtry na fotkách, zlaté přechody, textury napodobující papír ani samoúčelné skleněné panely. Barevnost skutečných nádob musí zůstat pravdivá.

### Ověřené dvojice pro text

Hodnoty jsou vypočítané z uvedených HEX, zaokrouhlené pouze pro prezentaci.

| Text / pozadí | Kontrast |
| --- | --- |
| Ink / paper | 13,30 : 1 |
| Muted / paper | 5,40 : 1 |
| Clay / paper | 6,16 : 1 |
| Surface / espresso | 10,43 : 1 |
| Ink / sage | 10,94 : 1 |
| Ink / blush | 10,59 : 1 |

Pro běžný text platí nejméně 4,5 : 1, pro velký text 3 : 1 podle [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). V tomto projektu používat pro text přednostně dvojice nad 4,5 : 1. Světlé akcenty slouží jako pozadí s tmavým textem.

Dekorativní `line` není hranice formulářového pole ani jediný indikátor stavu. `control-border` má proti paper přibližně 3,93 : 1 a proti surface 4,28 : 1; významové části ovládání potřebují nejméně 3 : 1 podle [WCAG 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

## 4. Typografie

**Manrope** je hlavní rodina pro titulky, navigaci, tlačítka i tělo. Geometrický charakter navazuje na logo. Používat váhy 400, 500 a 600; 700 jen výjimečně pro krátkou důležitou informaci. Fonty už jsou v projektu, mají licenci OFL a podporují češtinu.

**Cormorant Garamond 400** zůstává doplňkovou redakční rodinou. Použít pro jednu krátkou citaci, úvod příběhu nebo podpis; nejvýše jeden výrazný serifový moment v pohledu. Nepoužívat kurzívu ve všech H1/H2, pro navigaci ani drobné popisky. Serif nesmí nést nezbytnou informaci v malé velikosti.

| Role | Mobil | Desktop | Váha | Řádkování | Tracking |
| --- | --- | --- | --- | --- | --- |
| H1 / úvod | 40 px | 72 px | 500 | 1,05 | −0,035 em |
| H2 / sekce | 32 px | 48 px | 500 | 1,12 | −0,025 em |
| H3 / karta | 22 px | 24 px | 500 | 1,25 | −0,015 em |
| Perex | 18 px | 20 px | 400 | 1,6 | 0 |
| Text | 16 px | 16 px | 400 | 1,65 | 0 |
| Navigace a CTA | 14 px | 14 px | 600 | 1,4 | 0 |
| Popisek | 12 px | 12 px | 500 | 1,5 | 0 |
| Krátký štítek | 12 px | 12 px | 600 | 1,5 | 0,08 em |
| Redakční citace | 32 px | 44 px | 400 | 1,2 | −0,02 em |

Nadpisy mezi krajními hodnotami škálovat přes `clamp()` z tokenů. H1 má nejvýše tři krátké řádky. Běžný text omezit na přibližně 55–65 znaků v řádku a šířku 65 ch. Celá velká písmena jen pro krátký štítek, nikoli odstavce nebo dlouhé názvy výrobků.

12 px je projektové minimum pro nezbytný popisek, nikoli deklarovaný požadavek WCAG. Hlavní čtení musí být 16 px i na mobilu. Při zvětšení textu na 200 % se nesmí ztratit obsah nebo ovládání.

## 5. Rozvržení a rytmus

| Oblast | Pravidlo |
| --- | --- |
| Obsahový rám | Maximálně 1280 px; zarovnat navigaci, nadpisy, karty i footer. |
| Boční okraje | Pod 768 px: 20 px; 768–1023 px: 32 px; od 1024 px: 64 px. |
| Mřížka | Koncepčně 4 sloupce mobil, 8 tablet, 12 desktop; galerie prakticky 1 / 2 / 3 karty. |
| Mezery | Základ 4 px; používat 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px. |
| Mezery mezi kartami | 16 px mobil, 24 px tablet/desktop. |
| Odsazení sekce | 64 px mobil, 96 px desktop. Výjimka musí mít obsahový důvod. |
| Hlavička | Cíl 72 px mobil, 88 px desktop. Sticky až pokud pomůže delší stránce; bez zakrývání obsahu. |
| Rohy | Výrobkové fotografie a karty 0 px; tlačítka a formulářová pole 2 px; dialog nejvýše 4 px. |
| Stíny | Karty bez stínů. Dialog může mít jeden jemný oddělující stín. |

Breakpointy používat jednotně: 768 a 1024 px. Přidat lokální breakpoint pouze tehdy, když obsah při skutečné velikosti nevyhoví. Pořadí DOM musí odpovídat čtení na mobilu; vizuální asymetrie nesmí měnit pořadí klávesnice.

Každá sekce má jeden primární úkol. Asymetrie je dovolená v úvodní kompozici nebo příběhu; galerie má mít stabilní přehlednou mřížku. V nové galerii odstranit náhodné svislé odsazení prostřední karty.

## 6. Fotografie

Produktové fotografie jsou **výhradně vlastní MRPJ**, od uživatele nebo z [@mrpjcz](https://www.instagram.com/mrpjcz/). Žádné generované svíčky, cizí produkty, generativní doplňování obrazu nebo změny barvy výrobku. Generativní podklady případných článků musí být oddělené od produktové prezentace a nesmějí předstírat skutečnou dílnu.

- U každého souboru zachovat původ v `public/images/sources.json` a odkaz na konkrétní příspěvek.
- V galerii používat převážně poměr 4 : 5. Výrobek, okraj nádoby a důležité detaily nesmějí být odříznuté. Při nevhodném ořezu zvolit jiný poměr nebo `contain`; poměr je podřízený skutečnému obsahu.
- Vybrat soubory s podobným světlem a měřítkem. Nemíchat koláž se dvěma obrazy a jednotlivý produkt jen proto, že mají stejné rozměry souboru.
- Fotografie bez textových nálepek přes samotný výrobek. Název a doplňující informace dát pod obraz.
- Hlavní obrázek: `width`, `height`, přednostní načtení. Další obrázky: `loading="lazy"`. Při dostupnosti originálů připravit varianty a `srcset`.
- Cílové exporty z vlastních originálů: karta 640/960 px, hero 1280/1600 px. WebP nebo AVIF podle skutečného přínosu a kontroly vzhledu.

**Současné omezení:** tři fotografie mají šířku 360–361 px, jedna 513 px. Zvětšení nebo převod do jiného formátu nezvýší skutečný detail. Pro nynější návrh používat menší obrazové bloky přibližně do 360 CSS px při DPR 1; pro ostré DPR 2 by bylo potřeba alespoň dvojnásobné rozlišení. Velký celoplošný fotografický hero je až další krok s vlastními originály. Přehled více menších fotografií je proveditelný už teď.

## 7. Tlačítka a odkazy

| Varianta | Vzhled | Použití |
| --- | --- | --- |
| Primární | Espresso, text surface; hover ink. | Jeden hlavní krok v sekci: „Prohlédnout svíčky“. |
| Sekundární | Průhledné pozadí, ink text, control-border; hover surface. | Vedlejší krok: „Jak vznikají“. |
| Textový odkaz | Clay, podtržení, šipka podle směru. | Odkaz v textu, článek, přechod na Instagram. |
| Inverzní | Surface, ink text; hover paper. | Hlavní akce na tmavém kontaktním bloku. |
| Ikonové | Minimálně 44 × 44 px, jasný přístupný název. | Menu, zavření dialogu, předchozí/další obrázek. |

Výška CTA 48 px mobil a 52 px desktop; boční padding 24 px, mezera k ikoně 16 px. Tlačítko se při změně stavu nesmí šířkou ani výškou rozskákat. Na mobilu plná šířka pouze tam, kde pomůže hierarchii.

Semantika: `<a>` pro navigaci nebo externí cíl; `<button>` pro změnu stavu, otevření galerie a formulář. Interní posun značí `→`, externí odkaz `↗`, rozbalení `+`/`−`. Dekorativní ikoně dát `aria-hidden="true"`; ikonové tlačítko má textový přístupný název. Externí odkazy do nového okna mají `rel="noopener noreferrer"`.

### Povinné stavy

- **Default:** plně čitelný název akce.
- **Hover:** změna barvy a případně šipky o nejvýše 2 px; nezměnit geometrii tlačítka.
- **Focus-visible:** obrys 2 px, odsazení 3 px; clay na světlé ploše, surface na tmavé. Obrys nesmí být uříznutý nebo zakrytý.
- **Active:** bez posunu celé sekce; může lehce změnit odstín.
- **Disabled:** skutečný `disabled` u tlačítka, textově srozumitelný důvod. Nepoužívat jako obecnou dekoraci ani na navigační odkazy.
- **Loading:** pouze pro skutečnou probíhající operaci; zachovat název a rozměr, použít `aria-busy`. Ukázka knihovny není důvodem k přidání serverové operace na web.

Klikací cíle MRPJ mají mít alespoň 44 × 44 px. Je to naše ergonomická volba; minimum [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) je 24 × 24 CSS px s vyjmenovanými výjimkami. Odkazy v odstavci se posuzují podle svého kontextu.

## 8. Interaktivní prvky

### Navigace

Desktop nejvýše čtyři položky a jeden kontakt. Aktivní položka má podtržení nebo linku, ne jen jinou barvu. Mobilní menu má ovládací tlačítko, správné `aria-expanded` a `aria-controls`, zavírání přes Escape a po výběru cíle. Zavřené menu se nesmí procházet klávesnicí. Pokud vznikne modální panel, musí mít stejnou správu focusu jako dialog.

### Galerie a detail fotografie

Při dalším redesignu je vhodný detail vlastní fotografie v dialogu: kliknutí/tap otevře větší obraz a jeho popisek; přístupné tlačítko zavře detail; odkaz na původní Instagram příspěvek je samostatná druhotná akce. Nezvětšovat zdroj nad dostupné rozlišení. U aktuálních souborů může být přínosem spíše celý neoříznutý obraz než větší velikost.

Dialog musí mít název, srozumitelné zavření, Escape, focus uvnitř a návrat focusu na spouštěč. Použít nativní `<dialog>` nebo existující přístupný primitive. Detaily odpovídají [WAI dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Kliknutí na pozadí může být doplňkové, nikdy jediné zavírání.

### Články a péče

Krátké tipy nechat viditelné. Pro delší odpovědi může být nativní `<details>/<summary>` s textovým názvem a indikátorem +/−. Celý řádek má být klikací a ovladatelný Enter/Space. Smysl odpovědi nezávisí na animaci.

### Formuláře — připravená specifikace, ne aktuální funkce

Pole má viditelný `<label>`, výšku minimálně 48 px, text 16 px, odpovídající `type` a `autocomplete`. Placeholder není náhrada labelu. Chybový stav má vysvětlení, `aria-invalid` a návaznost přes `aria-describedby`; stav nesmí rozlišovat jen barva. Úspěch zobrazit až po skutečném potvrzení serveru. V ukázce je pouze lokální demonstrace validace, nic se neodesílá.

Filtry či přepínače patří do reálného webu až při dostatku obsahu a konkrétní potřebě. Pro několik voleb použít nativní radio/select a vždy označit výběr textově nebo symbolem. Nepřidávat filtrování ke třem kartám jako dekoraci.

## 9. Pohyb

| Akce | Doba | Pravidlo |
| --- | --- | --- |
| Hover, focus, změna odstínu | 160 ms | Jednoduchý přechod barev; bez spring efektu. |
| Rozbalení panelu / menu | 240 ms | Jen pokud řešení zachová okamžitý přístup k obsahu. |
| Zvětšení fotografie na hover | 240 ms | Nejvýše scale 1,02; detail není závislý na hoveru. |
| Posun šipky | 160 ms | Nejvýše 2 px. |

Easing `cubic-bezier(0.2, 0, 0, 1)`. Žádný automatický carousel, parallax, vlastní kurzor, přebírání scrollu, úvodní čekací animace nebo pohyb blokující čtení. Obsah musí být viditelný i bez JavaScriptu. Pro `prefers-reduced-motion: reduce` vypnout nepodstatné animace, transformace a plynulý scroll; princip vychází z [WAI — Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).

## 10. Obsah a kostra příštího webu

1. **Hlavička:** logo, „Tvorba“, „Jak vzniká“, „O vosku“, „Kontakt“.
2. **Úvod:** jasné pojmenování svíček a ručně vyráběných nádob, krátký osobní text, „Prohlédnout svíčky“. Přiměřeně velký vlastní obraz a přirozený přechod do galerie.
3. **Galerie:** tři pravdivé ukázky — mramorování, pastelové nádoby, barevné varianty. Názvy pod fotografiemi, bez vymyšlených katalogových názvů, cen nebo dostupnosti.
4. **Rodinná tvorba:** skutečná výroba, 60–90 slov o MRPJ; jeden střídmý serifový moment, případně šalvějový podklad.
5. **O vosku a péči:** srozumitelné tipy, odkazy na zdroje, jasné rozlišení bavlněného a dřevěného knotu. Dlouhé články až s reálným obsahem a vlastními adresami.
6. **Instagram a kontakt:** jeden výrazný tmavý blok s hlavním CTA „Sledovat @mrpjcz“ a e-mailem `ahoj@mrpj.cz`.
7. **Patička:** logo, kontakt, základní odkazy, aktuální rok. Bez duplicitních velkých sloganů.

Copy používá krátké přirozené věty, jednotné tykání a „my“ pro rodinnou značku. Akce popisuje výsledek kliknutí. Používat ověřené vlastnosti; nepsat zdravotní, ekologické, certifikační nebo časové sliby bez podkladu. Podoba úvodního textu k dalšímu zpracování: „Svíčky a nádoby s vlastním rukopisem.“

## 11. Přístupnost, výkon a technické provedení

- Jedno H1, návazná hierarchie H2/H3, skip link a viditelný focus. Při sticky hlavičce zajistit, aby nezakrývala zaostřený prvek ([WCAG 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)).
- Žádné podstatné informace pouze na hover, v barevném odlišení nebo v dekorativním obrazu.
- Kontrolovat 320, 390, 768, 1024 a 1440 px; vodorovný scroll není povolen pro běžný obsah. Dlouhá URL a e-mail se nesmějí nevejít.
- Fonty hostovat lokálně, bez nových placených rodin. Neinstalovat animační knihovnu pro malé přechody.
- Při dostupném originálu preferovat správný výběr a kompresi fotografie před efekty; doba načítání a měřítko obrazu jsou součástí návrhu.
- Produkční projekt zůstává Vite + statický obsah na Vercelu. Manuál nevyžaduje přepis frameworku ani změnu hostingu.
- CSS psát po komponentách, se společnými tokeny a jednotnými breakpointy. Nenavazovat další redesign na hromadné jednořádkové výjimky starého stylesheetu.

## 12. Postup implementace

**První krok:** převzít tokeny do hlavního stylesheetu, upravit typografii, velikost textů, CTA a hlavičku. Sestavit nový úvod podle dostupné ostrosti fotografie a navazující galerii. Odstranit zaměnitelné dekorace.

**Druhý krok:** sjednotit fotografické poměry a popisky, dopracovat příběh, péči a kontakt; zavést přístupný detail galerie, pokud pomůže skutečnému obsahu.

**Třetí krok:** s vlastními originály zvětšit fotografické bloky a připravit responzivní exporty. Samostatné články přidat až s dokončeným obsahem.

### Kontrola hotové úpravy

- V první obrazovce je jasné, co MRPJ tvoří a kam vede hlavní CTA.
- Logo je celé, v původní podobě a s ochranným prostorem.
- Typografie, barvy, mezery a stavy vycházejí z tokenů; nezbytné popisky nejsou menší než 12 px.
- Každá produktová fotografie je skutečná MRPJ, má původ a vhodné měřítko.
- Všechny interakce fungují myší, dotykem i klávesnicí; Escape a návrat focusu fungují v dialogu.
- Reduced motion zachová plně použitelné rozhraní.
- Mobil nemá přeplněný úvod, oříznuté ovládání ani vodorovný scroll.
- Build projde; ručně ověřit obraz, čitelnost a odkazy na reálném nasazení.

Tyto body používat také při každé další úpravě webu. Kontrola jednotlivých funkcí nenahrazuje úplný audit přístupnosti.

## 13. Ověření ukázky verze 1.0

Kontrola 5. 10. 2026 v Chrome: šířky 320, 390, 768, 1024 a 1440 px bez vodorovného scrollu; na 390 px také text zvětšený na 200 %. Ověřeno přepínání podkladů, otevření/zavření fotografie, Tab uvnitř dialogu, Escape a návrat focusu, rozbalovací odpověď, chybový i platný stav lokálního pole a reduced motion. Fotografie v ukázce nepřekračují svou přirozenou šířku. Během těchto interakcí nevznikl externí síťový požadavek ani zápis do local/session storage.

Textové dvojice z tabulky překračují 4,5 : 1; kontrolní hranice vůči paper/surface překračuje 3 : 1. Produkční build prošel. Tato kontrola není kompletní audit WCAG ani uživatelské testování. Pracovní snímky a protokol jsou v ignorované složce `artifacts/`.

## 14. Zavedení do webu

Redesign 5. 10. 2026 přebírá tokeny přímo přes CSS import. Hlavička, úvod, galerie, příběh, vosk a péče, kontakt i patička používají společnou typografii a paletu. Galerie nabízí celý snímek v nativním dialogu, otázky nativní `details` a navigace označuje aktuální sekci. Bez JavaScriptu zůstává navigace viditelná a fotografie odkazují na Instagram.

Úvod má kratší nadpis „Svíčky a nádoby. Po našem.“ a menší obraz; na mobilu vynechává doplňkovou signaturu, aby galerie přišla dříve. Koláž barevných variant je vybraná jako konkrétní přehled barev, nikoli jako náhrada fotografie jediného produktu. Celý původní obraz zůstává dostupný v detailu.

Produkční build byl ověřen v Chrome při šířkách 320, 390, 768, 1024 a 1440 px. Kontrola zahrnula menu a Escape, přechod z menu na nadpis sekce, všechny tři fotografie a způsoby zavření, Tab v dialogu, návrat focusu, rozbalovací odpovědi přes Enter/Space, odkazy na Instagram/e-mail, focus na tmavém podkladu, reduced motion, mobil bez JavaScriptu a zvětšení textu na 200 % při 390 px. Bez chyb JavaScriptu, neúspěšných požadavků na vlastní soubory a vodorovného scrollu.

Větší fotografické bloky a exporty pro vyšší DPR čekají na vlastní originály s vyšším rozlišením. Další úpravy obsahu a rozšíření se dál řídí tímto manuálem.
