# Redakční podklady MRPJ

Ověřeno 5. 10. 2026, doplněno 6. 10. 2026. Články jsou vlastní české zpracování; veřejné stránky neposílají návštěvníka na jiné weby. Tento soubor slouží pro redakční kontrolu, není součástí návštěvnického webu.

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
| Druhý život nádoby | [HGTV — How to get wax out of a candle jar](https://www.hgtv.com/lifestyle/clean-and-organize/how-to-get-wax-out-of-candle-jar) | Metody mrazáku a horké vody pro sklo. Pro nádoby MRPJ je záměrně nedoporučujeme bez konzultace (materiál nádob není v zadání). |

Konkrétní testované parametry svíček MRPJ (přesný typ knotu, doba hoření a zbytková hladina vosku) zatím nejsou součástí zadání. Texty uvádějí obecnou péči a dávají přednost návodu přiloženému ke konkrétní svíčce. Nevkládat univerzální dobu hoření nebo údaj o složení celé kolekce bez podkladů výrobce.

Upravovat `src/content/articles.mjs`, poté spustit `npm run pages`. Ilustraci článku popisuje pole `image.prompt`; `npm run illustrations` vygeneruje chybějící obrázky přes OpenAI (klíč `OPENAI_API_KEY` v `.env.local`), převede je a přegeneruje stránky. Generátor ke každému zadání přidává jednotný styl série a zákaz svíček, nádob na svíčky, plamene, textu a lidí. Každý článek má samostatný HTML vstup, canonical a záznam v sitemapě. Obsah zůstává čitelný bez JavaScriptu.
