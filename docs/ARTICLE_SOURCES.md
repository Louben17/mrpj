# Redakční podklady MRPJ

Ověřeno 5. 10. 2026, doplněno 6. 10. a 12. 10. 2026. Články jsou vlastní české zpracování; veřejné stránky neposílají návštěvníka na jiné weby. Tento soubor slouží pro redakční kontrolu, není součástí návštěvnického webu.

| Článek MRPJ | Primární podklad | Použití |
| --- | --- | --- |
| Sójový vosk | [CandleScience — What exactly is soy wax?](https://www.candlescience.com/learning/what-is-soy-wax/) | Původ a zpracování vosku. |
| Sójový vosk | [CandleScience — Soy wax troubleshooting](https://www.candlescience.com/wax/soy-wax-trouble-shooting-guide/) | Frosting. |
| Dřevěný knot | [Makesy — Wooden and cotton wicks](https://makesy.com/blogs/news/is-there-a-difference-in-burning-a-wooden-wick-vs-a-cotton-wick) | Orientační délka a popel. |
| Bezpečné hoření, péče | [National Candle Association — Candle safety tips](https://candles.org/candle-safety-tips/) | Bezpečnost. |
| Bezpečné hoření, péče | [National Candle Association — Burning a candle correctly](https://candles.org/your-foolproof-guide-to-burning-a-candle-correctly/) | První hoření a pokyny výrobce. |
| Sójový vosk | [National Candle Association — Expert tips](https://candles.org/expert-tips/) | Skladování. |
| První zapálení | [National Candle Association — Burning a candle correctly](https://candles.org/your-foolproof-guide-to-burning-a-candle-correctly/) | Paměťový kruh, tunelování, orientačně 1 hodina na 1 palec (2,5 cm) průměru při prvním hoření. |
| Proč svíčka čadí | [National Candle Association — Burning a candle correctly](https://candles.org/your-foolproof-guide-to-burning-a-candle-correctly/) | Dlouhé hoření a „hlavička“ na knotu, průvan a černé stopy na nádobě. |
| Proč svíčka čadí | [National Candle Association — Candle safety tips](https://candles.org/candle-safety-tips/) | Úprava knotu proti vysokému plameni a sazím, nehasit vodou. |
| Druhý život nádoby | [National Candle Association — Candle safety tips](https://candles.org/candle-safety-tips/) | Nevypalovat do dna, nechat zhruba ½ palce (cca 1 cm) vosku. |
| Svíčky a zdraví | [Ökometric Wax and Emissions Study (souhrn NCA a dalších, 2008)](https://candles.org/wp-content/uploads/2025/09/Summary-of-07-Okometric-study-on-candle-wax-emissions.pdf) | Laboratorní test 5 vosků, všechny hluboko pod limity pro vnitřní ovzduší; čadící svíčky 146–273 µg/g částic proti 6–10 µg/g u referenčních (zhruba 15–40×). Studii financovali výrobci svíček a vosků, v článku to uvádíme. |
| Svíčky a zdraví | [Measurement and evaluation of gaseous and particulate emissions from burning scented and unscented candles (Environment International, 2021)](https://www.sciencedirect.com/science/article/pii/S0160412021002154) a [Emission Characterization of Synthetic and Natural Candles (Atmosphere, 2026)](https://doi.org/10.3390/atmos17050515) | Nezávislá měření; u parafínu vyšší PM2.5 než u sóji. Plné texty nebyly dostupné, proto článek neuvádí konkrétní čísla. |
| Vosk z látky | [Bob Vila — How to remove candle wax](https://www.bobvila.com/articles/how-to-remove-candle-wax/) a [The Maids — Remove candle wax from any surface](https://www.maids.com/blog/how-to-remove-candle-wax-from-any-surface/) | Mrazák nebo led, seškrábnutí, papírová utěrka a žehlička na nízkou teplotu bez páry, koberec, hladké povrchy. |
| Praskající knot | [Natura Soy — Why your wood wick candle won't stay lit](https://naturasoy.ca/blogs/natura-soy-blog/wood-wick-care) a [Lumos Candle Co. — Lighting wood wick candles](https://www.lumoscandleco.com/blogs/wax-wick-facts/best-practices-for-lighting-wood-wick-candles) | Zapalování šikmo podél hrany 10–20 s, zhasínání kvůli délce knotu a zuhelnatění; praskání vysvětlováno únikem vlhkosti ze dřeva. |
| Druhý život nádoby | [HGTV — How to get wax out of a candle jar](https://www.hgtv.com/lifestyle/clean-and-organize/how-to-get-wax-out-of-candle-jar) | Metody mrazáku a horké vody pro sklo. Pro nádoby MRPJ je záměrně nedoporučujeme bez konzultace (materiál nádob není v zadání). |

Výběr témat 12. 10. 2026 vychází z českého našeptávače Google (nejčastější dotazy „jsou svíčky škodlivé“, „jak odstranit vosk z oblečení / ubrusu / koberce“, „dřevěný knot praskající / nehoří“).

Konkrétní testované parametry svíček MRPJ (přesný typ knotu, doba hoření a zbytková hladina vosku) zatím nejsou součástí zadání. Texty uvádějí obecnou péči a dávají přednost návodu přiloženému ke konkrétní svíčce. Nevkládat univerzální dobu hoření nebo údaj o složení celé kolekce bez podkladů výrobce.

Upravovat `src/content/articles.mjs`, poté spustit `npm run pages`. Ilustraci článku popisuje pole `image.prompt`; `npm run illustrations` vygeneruje chybějící obrázky přes OpenAI (klíč `OPENAI_API_KEY` v `.env.local`), převede je a přegeneruje stránky. Generátor ke každému zadání přidává jednotný styl série a zákaz svíček, nádob na svíčky, plamene, textu a lidí. Každý článek má samostatný HTML vstup, canonical a záznam v sitemapě. Obsah zůstává čitelný bez JavaScriptu.
