# MRPJ — průzkum a audit designu

Datum: 5. 10. 2026. Podklad pro [designový manuál](DESIGN_MANUAL.md).

Audit zachycuje původní podobu MRPJ před redesignem z 5. 10. 2026. Zjištěné nedostatky sloužily jako podklad pro nové provedení; aktuální stav implementace je zaznamenaný na konci manuálu.

## Jak vznikl průzkum

Prošel jsem živý web MRPJ, jeho HTML/CSS, logo a čtyři referenční weby. V prohlížeči jsem kontroloval první obrazovku a navazující obsah při šířce 1440 px; MRPJ také při 390 px. Pozorování vzhledu a měřené hodnoty jsou oddělené od doporučení, která jsou vlastním návrhem pro MRPJ. Průzkum neobsahuje uživatelské testování, analytiku ani měření obchodních výsledků referencí.

Referenční fotografie, loga a komerční fonty nepřebíráme do MRPJ. Lokální snímky a technická pozorování jsou pouze pracovní podklady v ignorované složce `artifacts/design-research/`.

## Co dnes funguje na MRPJ

- Vlastní logo a skutečné fotografie výrobků vytvářejí důvěryhodný základ.
- Krémové pozadí, tmavý text a hnědá odpovídají zvolenému teplému směru.
- Galerie, výroba, péče a Instagram tvoří smysluplnou obsahovou kostru.
- Mobilní menu, odkazy, lokální fotografie a fonty fungují bez Instagram tokenu.

## Co dnes oslabuje výsledek

| Zjištění | Důkaz | Dopad | Doporučení |
| --- | --- | --- | --- |
| Logo a hlavní typografie mají odlišný charakter. | Geometrické liniové logo versus Cormorant 400 a kurzíva v každém hlavním titulku. | Značka působí méně uceleně. | Manrope pro hlavní titulky, navigaci i text; serif pouze pro jednotlivý redakční moment. |
| Důležité texty jsou příliš malé. | Desktop: navigace 12 px, hlavní popis 13 px, CTA 11 px, štítky 8–9 px. Mobil: některé štítky 6–8 px, texty 10–12 px. | Návštěvník musí číst drobné písmo; vizuální hierarchie stojí skoro jen na titulku. | Text 16 px, CTA a navigace 14 px, nezbytné popisky nejméně 12 px. |
| Hlavní fotografie překračuje dostupnou ostrost. | Zdroj 360 × 640 px; při desktopu 1440 px obraz přibližně 612 × 650 CSS px. | Rozostření je vidět ještě před galerií. | S náhledy používat menší obrazový blok; velký hero až s vlastními originály. |
| Obraz se nevybírá podle sdělení. | Titulek mluví o zapalování, fotografie ukazuje uzavřené pastelové nádoby. | Není hned jasné, co přesně značka představuje. | V úvodu pojmenovat svíčky i nádoby; pro motiv zapalování vybrat skutečnou fotografii svíčky. |
| Opakují se zaměnitelné dekorace a slogany. | Hvězdy, kruhové razítko, motiv plamene, několikerá kombinace velkého serifového nadpisu a kurzívy. | Slabá vazba na vlastní logo a barevné výrobky. | Použít jednu značkovou signaturu: tři paralelní linie vycházející z loga. |
| Na mobilu přichází galerie pozdě. | Úvodní text, CTA, dekorativní řádek, fotografie a hodnotový pruh před galerií. | Dlouho trvá získat přehled o tvorbě. | Zkrátit úvod, odstranit duplicitní sloganové bloky a dát galerii bezprostředně za něj. |
| Pozornost je převážně atmosférická. | Hlavní CTA „Najdi svou chvíli klidu“, karty s obecnými poetickými názvy. | Není zřejmé, co kliknutí udělá a čím se výrobky liší. | „Prohlédnout svíčky“, popisky „Mramorování“, „Pastelové nádoby“, „Barvy“. |

Tyto závěry jsou designovým hodnocením a kontrolou provedení, nikoli tvrzením o chování zákazníků z analytiky.

## Referenční weby

### 1. FRAMA — hierarchie a materiál

Zdroj: [framacph.com](https://framacph.com/).

Pozorování: první obrazovka staví vedle sebe dva velké fotografické bloky. Navigace, titulky a produktové informace používají sans serif. Měřená navigace/titulky používají rodinu Univers; hlavní titulky v obrazu byly 47 px. Navazují pravidelné produktové bloky a redakční obsah.

Pro MRPJ: jasná mřížka, čitelné pojmenování kolekcí, materiál a fotografie jako hlavní obsah. Zachovat dostatek místa kolem objektu.

Nepřebírat: komerční font Univers ani velký katalog. Při návštěvě úvod překrýval výběr země a cookie vrstva; MRPJ nemá důvod vytvářet podobnou vstupní překážku.

### 2. Earl of East — teplá značka a barvy

Zdroj: [earlofeast.com](https://www.earlofeast.com/).

Pozorování: krémový rám stránky, tmavý hnědočervený pruh, sans serif GT Walsheim a teplá produktová fotografie. Pod úvodem je řada objektů s pravidelnými popisky a prostor pro témata a kolekce. Barvy produktů mají větší výraz než dekorace rozhraní.

Pro MRPJ: teplá neutrální základna, barvy skutečných nádob a srozumitelné kolekce. CTA je jasně rozeznatelné od popisků.

Nepřebírat: komerční font, ceny, slevy, press loga, nákupní košík ani navigaci rozsáhlého e-shopu. Drobné texty reference nejsou vzorem pro naše minimální velikosti.

### 3. StudioSmall — obrazová disciplína

Zdroje: [úvod](https://studiosmall.com/), [projekty](https://studiosmall.com/projects/).

Pozorování: úvod používá celoplošný obraz a minimum navigace. Přehled projektů pracuje s pravidelnými sloupci, samostatnými obrazy a stručnými názvy pod nimi. Měřený font názvů byl Matter-Regular, 14 px. Některé projektové náhledy se při návštěvě ještě nenačetly; hodnotíme proto hlavně rozvržení, ne všechny fotografie.

Pro MRPJ: galerie jako přehled objektů, malé množství kvalitních fotografií a jednoznačné názvy. Konzistentní zarovnání propojí různě barevné výrobky.

Nepřebírat: celoplošný úvod s minimem informace, fotografické podklady ani komerční font Matter. MRPJ musí hned vysvětlit, že jde o svíčky a nádoby.

### 4. ferm LIVING — střídání měřítek

Zdroj: [fermliving.com](https://fermliving.com/).

Pozorování: výrazný obrazový úvod, řada kategorií a navazující dvojice velkého titulku s materiálovou fotografií. Titulky a navigace kombinují Canela a Teka. Rozhraní střídá přehled objektů a redakční bloky, přičemž fotografie zůstávají hlavním nositelem nálady.

Pro MRPJ: střídat galerii, detail výroby a krátký obsah o vosku; zachovat jednu výraznější redakční typografickou polohu.

Nepřebírat: obchodní kampaně, globální lokalizaci, širokou navigaci ani licencované fonty. Není důvod kopírovat vzhled konkrétní stránky.

### Omezení průzkumu

Přímé otevření Aesop v prohlížeči skončilo bezpečnostní kontrolou HTTP 403. Jeho současnou vizuální podobu proto nepoužíváme jako ověřený návrhový podklad. Údaje z textového indexu samy o sobě nestačí k analýze vzhledu nebo interakcí.

## Výsledný návrh pro MRPJ

**Současné řemeslné studio:** geometrický základ, teplý papír, tmavá hnědá, pravdivé fotografie a přirozené barvy výrobků. Vzhled má stát na logu MRPJ a vlastní tvorbě.

| Oblast | Rozhodnutí pro MRPJ |
| --- | --- |
| Identita | Zachovat logo a využít jeho paralelní linie jako střídmý grafický detail. |
| Typografie | Manrope jako hlavní rodina; Cormorant 400 pouze pro krátkou citaci nebo redakční úvod. |
| Barva | Krémová a espresso; terakota pro odkazy a focus; šalvějová/růžová jen na omezených plochách. |
| Kompozice | Přehledné zarovnání; asymetrie jen v jednom výrazném bloku, ne v každé sekci. |
| Fotografie | Výhradně vlastní. Konkrétní výrobek a skutečná výroba před náladovou dekorací. |
| Pohyb | Krátká odezva na akci, žádné řízení scrollu ani automatické vizuální divadlo. |
| Cesta návštěvníka | Pochopit značku → prohlédnout tvorbu → zjistit více → Instagram nebo kontakt. |

Číselná specifikace, stavy komponent a pořadí implementace jsou v [DESIGN_MANUAL.md](DESIGN_MANUAL.md).
