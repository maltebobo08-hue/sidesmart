# Sidesmart – hjemmeside

Hjemmeside for webstudiet Sidesmart (sidesmart.dk). Ren HTML og CSS uden byggetrin.

## Indhold

- `index.html` – hele siden (ydelser, referencer, proces, om os, kontakt)
- `oes-*.jpg` – skærmbilleder af referencer
- `inter-*.woff2` – selvhostet Inter (SIL Open Font License, se `Inter-LICENSE.txt`)
- `favicon.svg` – ikon
- `404.html` – vises, når en adresse ikke findes
- `_headers` – cache-regler til Cloudflare Pages
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

Siden ligger på Cloudflare Pages, koblet til dette GitHub-repo (samme opsætning som øes.dk). Når der pushes til `main`, bygger Cloudflare siden og lægger den online på sidesmart.dk inden for et minut. Der er intet byggetrin: Cloudflare udgiver mappen, som den er.

- Domænet sidesmart.dk er købt hos Simply.com, men bruger Cloudflares navneservere, så DNS styres i Cloudflare.
- `404.html` bruges automatisk af Cloudflare Pages, når en adresse ikke findes.
- Https klarer Cloudflare automatisk.
