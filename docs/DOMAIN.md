# Přesměrování mrpj.cz na Vercel

Doména i DNS zůstávají u WEDOSu. Převod registrátora není potřeba. Projekt `mrpj` na Vercelu je propojený s repozitářem `Louben17/mrpj`; `mrpj.cz` a `www.mrpj.cz` jsou k němu už přidané.

## Záznamy pro WEDOS

Hodnoty níže pocházejí z ověření konkrétního projektu pomocí Vercel CLI dne 5. 10. 2026. Při pozdější změně infrastruktury je znovu ověř v nastavení projektu, nikoli podle obecných příkladů.

V administraci WEDOS otevři **DNS → mrpj.cz → DNS záznamy** a změň pouze tyto tři záznamy:

| Název ve WEDOSu | Typ | Původní hodnota | Nová hodnota | TTL |
| --- | --- | --- | --- | --- |
| prázdný | A | `185.184.254.10` | `216.198.79.1` | 300 |
| prázdný | A | `185.184.254.11` | `64.29.17.1` | 300 |
| `www` | CNAME | `www.myshoptet.com` | `dccf01c1402f4f32.vercel-dns-017.com` | 300 |

Prázdný název u A záznamů znamená hlavní doménu `mrpj.cz`. Některé nástroje ji zobrazují jako `@`; ve WEDOSu název nech prázdný. Oba původní A záznamy je potřeba nahradit, nesmí zůstat vedle nových.

Po uložení klikni na **aplikovat změny**. Propagace může trvat déle než samotná hodnota TTL; ověř především autoritativní servery a potom veřejné resolvery. Novou adresu kontroluj i přes mobilní data nebo soukromé okno kvůli místní cache.

**Zachovej stávající MX, TXT/SPF a `shoptet._domainkey`.** Tato změna řeší pouze web. Případnou úpravu poštovního nastavení udělej samostatně po ověření skutečné poštovní služby. Nameservery ani DNSSEC pro tento postup neměň.

## Ověření po změně

```powershell
Resolve-DnsName mrpj.cz -Type A
Resolve-DnsName www.mrpj.cz -Type CNAME
```

```sh
npx vercel domains verify mrpj.cz --scope jakub-kozels-projects
npx vercel domains verify www.mrpj.cz --scope jakub-kozels-projects
```

Zkontroluj načtení `https://mrpj.cz` a `https://www.mrpj.cz` i platnost HTTPS certifikátu. Vercel po správném propojení domény zajišťuje certifikát automaticky.

## Vrácení změny

Pokud je potřeba vrátit původní směřování, obnov oba původní A záznamy a původní `www` CNAME podle tabulky. Původní Shoptet obchod ale podle zadání už není aktivní; návrat DNS sám o sobě jeho provoz neobnoví.

Dokumentace: [Vercel — nastavení vlastní domény](https://vercel.com/docs/domains/set-up-custom-domain).
