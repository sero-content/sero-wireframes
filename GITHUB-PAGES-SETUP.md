# GitHub Pages setup (eenmalig)

Doel: de Sero content folder publiek beschikbaar maken via een vaste URL, zodat Jonathan elke wireframe in Chrome kan openen via een Slack-link.

## Vereisten

- GitHub account (https://github.com — gratis is genoeg).
- `git` op je Mac (waarschijnlijk al geïnstalleerd; check met `git --version` in Terminal).

## Stap 1: Maak een nieuwe repository

1. Ga naar https://github.com/new
2. Repository name: `sero-wireframes`
3. Visibility: **Private** (Pages werkt ook met private repos op gratis accounts sinds 2023, mits je in de Pages settings de site zelf public maakt).
   - Wil je het echt simpel? Kies **Public**. De wireframes zijn dan publiek vindbaar via URL, maar niet gelinkt vanuit Google (geen sitemap).
4. Initialize: **niets aanvinken** (geen README, .gitignore of license).
5. Klik **Create repository**.

## Stap 2: Push de Sero content folder

Open Terminal en plak deze blokken één voor één:

```bash
cd "/Users/rikvandenwijngaard/Documents/Claude/Projects/Sero content"
git init
git add .
git commit -m "Initial wireframe baseline (v1.0)"
git branch -M main
```

Daarna de remote koppelen (vervang `<JOUW-USERNAME>` met je eigen GitHub username):

```bash
git remote add origin https://github.com/<JOUW-USERNAME>/sero-wireframes.git
git push -u origin main
```

GitHub vraagt eenmalig om in te loggen. Als 2FA aanstaat: gebruik een Personal Access Token in plaats van wachtwoord (https://github.com/settings/tokens, scope `repo`).

## Stap 3: Zet GitHub Pages aan

1. Ga naar je repo op GitHub.
2. **Settings → Pages** (linker menu).
3. Source: **Deploy from a branch**.
4. Branch: **main**, folder: **/ (root)**.
5. Klik **Save**.
6. Wacht 1-2 minuten. GitHub toont bovenaan: `Your site is live at https://<jouw-username>.github.io/sero-wireframes/`.

## Stap 4: Test in browser

Open in Chrome:
```
https://<jouw-username>.github.io/sero-wireframes/index.html
```
Je moet de homepage wireframe zien, inclusief de gele changelog-banner bovenin (v1.0).

Voor andere pagina's vervang je `index.html` met de filename, bijvoorbeeld:
```
https://<jouw-username>.github.io/sero-wireframes/cdp.html
https://<jouw-username>.github.io/sero-wireframes/theme-data-intelligence.html
```

## Stap 5: Geef de URL aan mij door

Stuur me de base URL (bijvoorbeeld `https://rikvandenwijngaard.github.io/sero-wireframes/`) zodat ik die vast kan zetten in de Slack drafts naar Jonathan.

## Workflow voor toekomstige updates

Na een wireframe-update (door mij gedaan in dit project):

```bash
cd "/Users/rikvandenwijngaard/Documents/Claude/Projects/Sero content"
git add .
git commit -m "v1.1 — [korte beschrijving]"
git push
```

Binnen 1-2 minuten staat de update live. URL verandert niet. Versiehistorie zit in `git log` en in `changelog.js`.

## Als je liever géén git gebruikt

Alternatief: **Cloudflare Pages via dashboard upload**.
1. https://pages.cloudflare.com → Sign up.
2. Create project → Upload assets.
3. Sleep de hele Sero content folder in het upload-vlak.
4. Project name: `sero-wireframes`. Klik Deploy.
5. Krijg een URL als `sero-wireframes.pages.dev`.

Nadeel: bij elke update opnieuw uploaden. Geen versiehistorie. Voor jouw workflow (regelmatige releases) is git-based hosting beter.
