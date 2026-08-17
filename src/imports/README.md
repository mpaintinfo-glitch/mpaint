# MPAINT website

Car painting and bodywork workshop, Tallinn.

## How to open it

Double-click `index.html`. That's it, it runs in any browser with no server needed.

To edit with live reload, open the folder in VS Code, install the "Live Server"
extension, right-click `index.html` and choose "Open with Live Server".

## Folder structure

```
mpaint-website/
├── index.html              the page markup
├── assets/
│   ├── css/styles.css      all styling
│   ├── js/main.js          routing, languages, drops, form
│   └── img/
│       ├── hero-drip.png   the big drip banner
│       ├── logo.png        Mpaint logo (transparent)
│       ├── paint-booth.jpg workshop photo
│       ├── bodywork.jpg    workshop photo
│       └── drop-1/2/3.png  falling paint drops
└── README.md
```

## What needs real data before launch

Search the files for square brackets, every one is a placeholder:

| Placeholder | Where | What to put |
|---|---|---|
| `[Exact address]` | index.html, contact section | Street address |
| `[EXACT STREET ADDRESS]`, `[POSTCODE]`, `[LAT]`, `[LNG]` | index.html, JSON-LD schema | Address + map coordinates |
| `[12]` | hero, "years" | Years in business |
| `[2400]` | hero, "cars painted" | Cars painted |
| `[2 y]` | hero, "warranty" | Warranty length |
| `[4,9]` and `[127]` | Google rating | Real rating and review count |
| `[2012]` | home SEO text | Founding year |
| `[Job name]` | Our work page | Real job titles |
| `[XXX]` (×6) | Services page, "Typical pricing" list | Real indicative prices per service (5 are "from €[XXX]"; Insurance cases has no "from €", just `[XXX]`) |

The address and coordinates matter most. Google will not rank the workshop in
local results without them.

## Photos to add

The Our work page has four empty circles waiting for real before/after photos.
Replace the placeholder blocks in the work grid. Before/after shots are the
strongest sales argument this site has.

## Pages

Home, Services, Our work, Get a quote, Contact. They switch without reloading,
using the hash in the URL (`#services`, `#contact` and so on).

**Important for SEO:** because this is one file with JavaScript routing, Google
sees a single URL. When a developer puts this live, ask for each page to become
its own real URL with its own title and meta description. The titles and
descriptions are already written per page in `main.js` (see `TITLES` and
`DESCS`), so it's a straightforward job.

## Languages

English, Estonian, Russian. All text lives in `main.js`. English is written
directly in the HTML, the other two are in the `I18N` object. To change a
wording, update the HTML for English and the matching key in `I18N` for the
other two.

## Contact points

Phone and WhatsApp both use `+372 58 100 810`, email `info@mpaint.ee`.
They appear in the header, the contact page, the floating button and the
schema, so search all files if the number ever changes.
