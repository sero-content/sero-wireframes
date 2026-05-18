# Sero wireframe update workflow

Dit document beschrijft hoe nieuwe Sero release notes verwerkt worden in de wireframes en doorgegeven worden aan Jonathan (Media Designer).

## Eenmalig opzetten

1. Volg `GITHUB-PAGES-SETUP.md` om de wireframes live te zetten.
2. Noteer de publieke base URL, bijvoorbeeld `https://rikvandenwijngaard.github.io/sero-wireframes/`.
3. Sla die URL op in dit project (geef hem aan mij door als hij klaar is, dan zet ik 'm vast in deze workflow).

## Per release

Als jij release notes of een update binnenkrijgt, plak die in dit project en zeg "verwerk release X". Ik doe dan:

1. **Bepaal versie en datum.** Bump de versie (1.0 → 1.1 voor inhoudelijke wijzigingen, 2.0 voor grote restructure). Datum = vandaag.

2. **Voeg nieuwe versie toe aan `changelog.js`** bovenaan het `SERO_CHANGELOG` array. Per wijziging: `type` (`new` / `updated` / `removed`), `text` (1 zin), `pages` (`'ALL'` of array van filenames).

3. **Pas de HTML aan**. Voor elke wijziging in een pagina:
   - **Nieuwe sectie**: voeg toe met `class="wf-section is-new"` en zet `<span class="wf-update-badge new">NIEUW</span>` naast de section label.
   - **Aangepaste sectie**: zet `class="wf-section is-updated"` en `<span class="wf-update-badge updated">AANGEPAST</span>` naast de section label.
   - **Verwijderd**: weghalen. Vermelden in changelog met type `removed`.

4. **Oude badges schoonmaken** van vorige release. De `is-new` en `is-updated` van vorige release worden verwijderd zodat alleen de nieuwste wijzigingen visueel oplichten. De volledige geschiedenis blijft in `changelog.js`.

5. **Commit en push naar GitHub**. Dat triggert automatisch de Pages deploy (1-2 minuten).

6. **Slack DM naar Jonathan** met:
   - Versienummer en datum
   - Korte samenvatting (2-3 regels)
   - Lijst met wat er nieuw / aangepast is
   - Per-pagina links naar de live wireframes
   - Vraag voor zijn opvolging en planning

   Ik maak een DRAFT in zijn DM (channel ID: `U048825N02H`). Jij reviewt en stuurt zelf.

## Hoe jij release notes aanlevert

Het werkt het beste als je gewoon plakt wat je krijgt. Ik destilleer er pagina-impact uit. Als info onduidelijk is, vraag ik gericht door. Voorbeelden:

- Email van product team met bullets: gewoon plakken.
- Korte mondelinge update: typ in eigen woorden, ik vraag door waar nodig.
- Link naar Notion/Linear ticket: plak inhoud (ik kan niet altijd bij hun systeem).

## Zinvolle conventies

- **Versienummering**: 1.0 baseline. Inhoudelijke wijzigingen bumpen minor (1.1, 1.2). Structurele restructure bumpt major (2.0).
- **Pagina-naamgeving** in changelog.js: precieze filename inclusief `.html`. `'ALL'` voor wijzigingen die elke pagina raken (zoals navigatie of footer).
- **Badge-schoonmaak**: badges zijn voor de laatste release. De volledige historie staat in changelog.js, altijd opvraagbaar via de banner.
