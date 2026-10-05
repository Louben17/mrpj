# MRPJ

- Pracuj jen v této projektové složce. Používej existující repozitář `Louben17/mrpj` a Vercel projekt `mrpj`.
- Vzhled: teplý minimalismus, krémová a hnědá, výrazná typografie. Zachovej logo dodané uživatelem.
- Aktuální směr 2.1: klidné hero s pomalým bílým odhalením loga, bez horního loga; spodní plovoucí navigace, která se při scrollu schová a po zastavení vrátí. Kontakt a originální logo jsou v patičce. FAQ je nativní rozbalovací obsah. Pravidla 2.1 na začátku manuálu mají přednost před verzí 2.0.
- Aktuální základ identity jsou původní vektorové křivky z `logo.pdf`, uložené v `src/brand/logo-source.svg`. Logo ani písmena znovu nekresli. Hero používá jednorázové vykreslení jeho linií; reduced motion zobrazí rovnou celé logo.
- Veřejné stránky mají odkazovat na vlastní obsah. Články jsou na `/cteni/`; externí zdroje patří do `docs/ARTICLE_SOURCES.md`. Instagram je uvedený jako textový profil, kontakt vede na e-mail.
- Domovská stránka a články se generují ze `src/templates/` a `src/content/articles.mjs` přes `npm run pages`. Neupravuj generované HTML ručně. Build generování spouští automaticky.
- Před další úpravou vzhledu přečti `docs/DESIGN_MANUAL.md` a relevantní závěry `docs/DESIGN_RESEARCH.md`. Nový směr: současné řemeslné studio; Manrope jako hlavní rodina, Cormorant jen střídmý redakční akcent.
- Barvy, rozměry a pohyb mají zdroj v `docs/design/tokens.json`. Po změně tokenů spusť `npm run design:tokens`; generovaný `tokens.css` neupravuj ručně. Komponenty lze ověřit přes `npm run design:preview`.
- Fotografie svíček a výrobků musí být výhradně vlastní MRPJ: od uživatele nebo z jeho profilu https://www.instagram.com/mrpjcz/.
- Nikdy negeneruj fotografie svíček ani je nenahrazuj cizími produkty. Generativní obrázky jsou přípustné pouze pro články a doplňky webu.
- Zdroj aktuálních fotografií je zaznamenán v `public/images/sources.json`. Neměň obsah fotografií; optimalizace velikosti a formátu je v pořádku.
- Web je prezentační. Nevymýšlej ceny, dostupnost, vůně, certifikace ani parametry produktů.
- Doménu spravuje WEDOS. Při přesměrování webu zachovej e-mailové MX a TXT záznamy i ostatní nesouvisející nastavení.
- Nepublikuj `.env*`, přístupové údaje, snímky administrace ani obsah `.cache/` a `artifacts/`.
