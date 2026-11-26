# Sidesmart – hjemmeside

Hjemmeside for webstudiet Sidesmart (sidesmart.dk). Ren HTML og CSS uden byggetrin.

## Indhold

- `index.html` – hele siden (ydelser, referencer, proces, om os, kontakt)
- `oes-*.jpg` – skærmbilleder af referencer
- `inter-*.woff2` – selvhostet Inter (SIL Open Font License, se `Inter-LICENSE.txt`)
- `favicon.svg` – ikon
- `404.html` – vises, når en adresse ikke findes
- `CNAME` – fortæller GitHub Pages, at siden ligger på sidesmart.dk
- `.nojekyll` – GitHub Pages udgiver filerne, som de er
- `robots.txt`, `sitemap.xml` – til Google

## Ret før siden går live

Søg efter `RET:` i `index.html`:

- Mail og telefonnummer i kontaktboksen
- Tekst om jer selv under "Om os"
- CVR-nummer i bunden

## Ny reference

Kopiér `<article class="case">…</article>` i `index.html`, læg skærmbilleder ved siden af `index.html`, og ret teksten.

## Vis lokalt

```bash
python3 -m http.server
```

## Udgiv

Siden ligger på GitHub Pages fra dette repo (gren `main`, mappe `/`). Når der pushes til `main`, er ændringen online på sidesmart.dk efter et minut eller to. Der er intet byggetrin.

- Domænet sidesmart.dk er købt hos Simply.com, og DNS styres der:
  - `sidesmart.dk` A-records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
  - `www.sidesmart.dk` CNAME: maltebobo08-hue.github.io
- Https slås til under repoets Settings → Pages → Enforce HTTPS.
- `404.html` bruges automatisk, når en adresse ikke findes.
