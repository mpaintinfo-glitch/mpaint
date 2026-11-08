# Mpaint.ee — Final Production Readiness Audit

Audit date: 2026-11-08 · Branch: `redesign/modern-white` · Scope: whole site, ET / RU / EN
All work is local. Nothing was pushed, deployed or merged. The live site was only read (public GET requests and page loads), never modified.

**Restoration points (local branches):**

| Branch | Commit | What it is |
|---|---|---|
| `backup/pre-release-audit` | `f84650a` | The complete site exactly as it was when this audit started |
| `backup/mpaint-before-modern-white` | `3274480` | The original dark design, before the redesign |
| `origin/main` | `52b3578` | What GitHub holds (the deployed version tracks this; see §10) |

---

## 1. Executive summary

**Decision: READY WITH DOCUMENTED NON-CRITICAL ISSUES.**

The audit found **1 critical (P0)** and **8 high (P1)** problems. All nine are fixed and verified on a production build. No P0 or P1 remains open. What is left is P2/P3 polish, a few owner decisions, and post-deploy checks that cannot be done locally.

The two findings that matter most:

1. **The framework the site runs on has critical published vulnerabilities** (Next.js 16.3.1, including unauthenticated remote-code-execution paths in the image optimizer and in `use cache`). The site that is live today runs this version. The release candidate upgrades to 16.4.5 (a minor release, not a major one) and `npm audit` now reports **0 production vulnerabilities** (it reported 1 critical and 3 high).
2. **The hreflang HTTP `Link` headers on production are wrong today** for every page whose URL differs by language (all services, and the new blog and portfolio pages). They list addresses that return 404, and they contradict the correct tags in the HTML. This is fixed in the release candidate.

Also worth knowing before you read on:

- **Mobile speed in the lab is mixed, not clean.** On real throttling the release candidate is on par with or better than the live site, and its measured (unthrottled) LCP is slightly better (0.64 s vs 0.73 s). On Lighthouse's *modeled* slow-phone profile it scores worse than the live site on the home page (79 vs 94), because the new home page carries much more content. Details and what I did and did not fix are in §5. The 2.5 s LCP target is **not met** in either lab profile for the home page, live or candidate.
- **INP was not measured** (no field data, no real-user interactions). Field Core Web Vitals were not available.
- **Real email delivery was not tested** (it would send real mail and needs the Gmail app password).

---

## 2. SEO findings

Method: a crawler fetched all **78** sitemap URLs from a production build and checked each one; a second pass compared against the live site.

**Verified correct (78/78 pages):** HTTP 200 · unique titles · useful descriptions · exactly one H1 · canonical present, single and equal to the page's own URL · hreflang for `et`, `ru`, `en` and `x-default`, **reciprocal in every direction** (each alternate points back) · correct `<html lang>` · no `noindex` anywhere · every `<img>` has an `alt` · all internal links (78 unique targets) resolve to real pages · no orphan pages · `target="_blank"` links all carry `noopener` · Russian pages correctly reuse the Estonian slugs.

**Robots and sitemap:** `robots.txt` allows everything and points to the sitemap; the sitemap lists all 78 URLs with per-URL language alternates. `llms.txt` and the Google Search Console verification file (`googlee5dfb9f52a273eb2.html`) are served.

**Trailing slashes / host:** `/teenused/` → 308 to `/teenused`; `http://` → 308 to `https://`. 404s return a real 404 status with `noindex`.

| # | Finding | Level | Status |
|---|---|---|---|
| S1 | HTTP `Link` hreflang headers pointed at non-existent URLs on all translated-slug pages (also live today) and contradicted the HTML tags | **P1** | **Fixed** (`routing.alternateLinks:false`; HTML tags are the single source) |
| S2 | Six core service pages were titled with the bare service name ("Autovärvimine") and described by a one-line tagline (49–67 chars) — no Tallinn, no concrete facts | **P1** | **Fixed** — new localized titles ("… Tallinnas / в Таллинне / in Tallinn") and descriptions built only from facts already on those pages (250€ / 50€ prices, filtered booth, colour-code matching, estimate from photos) |
| S3 | Legacy URLs: on 18–19 Aug the ET/RU sites briefly served English-style paths (`/services/painting`, `/contact`, …). next-intl sent them to `/teenused/painting` (404) with a temporary 307 | **P1** | **Fixed** — permanent 308 redirects to the exact counterparts; unknown slugs still 404 (never redirected to the home page); `/et/...` prefix → unprefixed |
| S4 | Unmatched URLs showed Next's generic English 404 in every language | P2 | **Fixed** — localized 404 via a `[locale]` catch-all |
| S5 | Over-long descriptions (bumper, minor damage, accident; up to 214 chars) | P2 | **Fixed** (≤160) |
| S6 | `og:url` is missing on all pages (title/description/image are present) | P2 | Open — social networks fall back to the canonical; add per-page `openGraph.url` |
| S7 | BMW E90 case study descriptions are 178–182 chars; one RU case-study title is 72 chars | P3 | Open — copy was supplied by the owner |
| S8 | Sitemap has no `<lastmod>` | P3 | Open — only add if it can be kept truthful |
| S9 | Same `og:image` for every page | P3 | Open — case studies could use their own photo |

---

## 3. Structured data findings

Every page's JSON-LD was parsed (no syntax errors) and compared against the visible page.

- **AutoBodyShop** is emitted once per page, with a stable `@id` (`https://mpaint.ee/#business`), and is **identical across all languages** and pages (name, phone, email, address, geo, hours Mon–Fri 09:00–19:00, registry code, area served). The phone, address, e-mail and registry code all match the visible footer/contact page and the Google Maps listing.
- **BreadcrumbList** on all inner pages; **FAQPage** only on the services index, and all 10 FAQ items are visibly on the page in each language (checked item by item); **BlogPosting** on the 18 article pages (organisation as author and publisher, real dates); **CollectionPage + ItemList** on the portfolio; **WebPage + 2 × ImageObject** per case study, connected by `@id`.
- **Nothing forbidden is present:** no `AggregateRating`, `Review`, `Product` or `HowTo` anywhere (scanned on every page).
- All scripts now escape `<` (`<`) so a `</script>` in any future content cannot break out of the tag. (Defense in depth; current content is developer-controlled.)

Open (all P3): service detail pages carry only AutoBodyShop + BreadcrumbList (no per-service `Service` node — deliberately not added "just for the count"); `sameAs`/`hasMap` could point to the Google Maps listing; BlogPosting has no `image`.

**NOT TESTED:** Google's Rich Results Test (needs the public production URL; run it after deploy on the home page, one service page, one blog post, one case study).

---

## 4. E-E-A-T and local trust

**Strengths (all verifiable):** real company identity (Mpaint OÜ, registry code) and street address on every page footer; phone, WhatsApp and e-mail; opening hours; four real before/after projects whose copy states what the photos show and what is *not* documented (repair method, dates, prices are never invented); honest "indicative, not a guarantee" wording on timeframes; a Google reviews link; no fabricated names, awards or certificates.

**Verified live on Google Maps (read-only, 2026-11-08):** "Mpaint OÜ", **4.9 stars, 27 reviews**, category "Auto painting", website `mpaint.ee`, phone `5810 0810`, address "Magasini tn 31, 10138 Tallinn". The site's "4.9 out of 5" is accurate; the site deliberately shows no review count, so the rise from 26 to 27 does not matter. The listing pin is about 40 m from the coordinates in the schema (same building area; immaterial). **Opening hours were not checked** against the listing.

| # | Finding | Level | Status |
|---|---|---|---|
| E1 | The EN and RU contact pages gave only "Tallinn, Estonia" as the address while ET (and the schema and footer) showed the full street address | P1 | **Fixed** — street address in all three languages |
| E2 | Service pages never linked to the real completed work | P2 | **Fixed** — link to the gallery on pages that have real case studies (painting, bodywork, minor damage) |
| E3 | The Mercedes front-end and BMW E90 case studies are thin (~175–220 words); contact page ~170–200 words; blog posts ~330–430 words; service pages ~200–340 words | P2 | Open — more depth needs owner-supplied facts (what was done, how long, what affects price); I did not pad them |
| E4 | Business statements to re-confirm with the owner: "up to 1 year warranty on most work" (with exclusions; already live in ET/EN), "free quote", "3–4 working days per panel / over a month for a full respray", "about 1 working day for minor damage" | P2 | Owner confirmation (not blockers; already on the live site or marked indicative) |

No expertise, staff, certificate or testimonial claims were added.

---

## 5. Performance measurements

**Method and limits.** Lighthouse 12.6.1 in headless Chrome against the **production build on localhost** (no CDN, no real network). Three views: *modeled* mobile (Lighthouse's simulated slow-4G / 4× CPU "Moto G Power" profile), *real DevTools throttling* with the same network and CPU limits actually applied, and *desktop*. Single runs vary by ±20–30% under throttling, so small differences are noise. **CLS is 0.000 on every page in every profile.**

| Page | Modeled mobile: Perf / LCP / TBT | Real throttling: Perf / LCP / TBT | Desktop: Perf / LCP |
|---|---|---|---|
| Home (EN), **release candidate** | 79 / 5.38 s / 138 ms | 77 / 3.36 s / 389 ms | 99 / 1.04 s |
| Home (EN), **live today** | 94 / 3.05 s / 45 ms | 71 / 3.83 s / 474 ms | 100 / 0.67 s |
| Home (RU), candidate | 82 / 4.81 s / 117 ms | — | — |
| Service (painting), candidate | 91 / 3.41 s / 92 ms | 80 / 2.85 s / 439 ms | 100 / 0.81 s |
| Service (painting), live today | 98 / 2.15 s / 89 ms | — | — |
| Blog article, candidate | 92 / 3.26 s / 103 ms | — | — |
| Gallery, candidate | 82 / 4.91 s / 87 ms | — | — |
| Case study, candidate | 88 / 3.93 s / 49 ms | 81 / 3.00 s / 381 ms | — |

Unthrottled **observed** home LCP: 0.64 s (candidate) vs 0.73 s (live). Accessibility 100 and Best Practices 100 on every candidate page.

**What I changed (effect measured under real throttling, home page):** blocking time 773 → 389 ms, LCP 4.28 → 3.36 s; case study blocking time 687 → 381 ms. Changes: code-split the quote/email modals (and Radix Dialog) and warm them when the browser is idle; send the client only the 6 translation namespaces it uses (it was the whole catalog); drop the unused `latin-ext` font subset (about 35 kB); stop lazy-loading above-the-fold images; request the logo at its real size (it was fetching the 2048 px variant).

**Honest reading.**
- Targets: **LCP ≤ 2.5 s is not met** in either lab profile for the home page, on the live site or the candidate. CLS ≤ 0.1 is met everywhere. **INP: NOT MEASURED** (the lab proxy TBT is 49–139 ms modeled, 381–439 ms under real 4× CPU throttling; treat INP on slow phones as unproven).
- Why the modeled home score is lower than live: the new home page does more (47 requests / 775 kB / 408 DOM nodes versus 26 / 502 kB / 249 live: recent-work thumbnails, steps, timeframes). The remaining main-thread cost is mostly the shared React/Next framework chunk, which the live site pays as well.
- I tried marking the below-the-fold slider images low priority: no measurable change, reverted.
- The images themselves are efficient: `next/image` serves WebP (e.g. 54 kB at 640 px), caching is `immutable` for static assets, and abusive image-optimizer requests (remote URLs, oversized widths) are rejected (400/404).

**Recommended follow-ups (P2):** check real-user LCP/INP in Search Console (Core Web Vitals) after launch; if the home page is poor in the field, defer rendering of the below-the-fold sections (`content-visibility:auto` with accurate size estimates) and render the static gallery cards on the server instead of hydrating a client slider each; consider enabling AVIF in `images.formats` (WebP is served today).

---

## 6. Security findings

| # | Finding | Level | Status |
|---|---|---|---|
| X1 | **Next.js 16.3.1: critical advisories** — unauthenticated RCE in the image optimization API (AVIF and SVG paths), in `use cache` functions, and in `next/og`; SSRF in image optimization; DoS via Server Actions; SSG/ISR cache poisoning. The site uses `next/image`. | **P0** | **Fixed** — upgraded to **16.4.5** (and `eslint-config-next`). Build, crawl, image optimizer, forms and slider all re-verified. *The version running in production today is still affected until this ships; if Vercel's platform mitigates it, that was not verifiable here.* |
| X2 | **Nodemailer 9.x: high advisories** (address-parser DoS, recipient-domain validation bypasses, SMTP parsing DoS) | **P1** | **Fixed** — upgraded to **10.4.0** (a major version, so tested before keeping it: same API; built real messages with To/Cc/Reply-To, Estonian characters, attachments; a header-injection attempt was neutralised) |
| X3 | `/api/quote` and `/api/contact` were open to abuse: no spam or flood protection, no input limits, no email validation, no origin check, and any uploaded file (even an .exe) was forwarded to the workers' inbox if image processing failed | **P1** | **Fixed** — origin check (403), per-IP limit of 5 per 10 min per endpoint (429), length limits, strict email check, control characters stripped from single-line fields, photos limited to 5 images ≤ 12 MB (non-images dropped), filenames sanitised. All verified (400/403/429 as expected; real photo-filter unit test: .exe, PDF, 13 MB and empty files dropped, traversal filename sanitised). Client code unchanged. |
| X4 | No security headers (only HSTS from Vercel); `X-Powered-By: Next.js` leaked | P2 | **Fixed** — `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy` (camera, mic, geolocation, payment, usb off); framework header removed |
| X5 | The in-memory rate limiter is per server instance (serverless instances don't share memory) | P2 | Open — **owner decision**: add an edge limit (Vercel WAF rate limiting) or a CAPTCHA (e.g. Cloudflare Turnstile) for robust bot protection |
| X6 | No Content-Security-Policy | P2 | Open — deliberately not added blind (inline scripts, Google Maps iframe); introduce as `Content-Security-Policy-Report-Only` first |
| X7 | Next warns that the `middleware` file convention is deprecated in favour of `proxy` | P3 | Open — works in 16.4.5; migrate in a dedicated change |

Other checks, all clean: no secrets in tracked files or in the full git history (pattern scan); `.env*` files are git-ignored and only `.env.local.example` (variable names, no values) is tracked; no `NEXT_PUBLIC_*` variables; the only environment variables are `GMAIL_USER` and `GMAIL_APP_PASSWORD`; no unsafe HTML other than JSON-LD; external links carry `noopener`; 404 and error responses leak nothing. Dependencies: **production 0 vulnerabilities** (was 1 critical + 3 high); 8 moderate remain, all in dev-only linting tooling (`typescript-eslint`, `minimatch`) and not shipped.

---

## 7. Accessibility findings

Tools: Lighthouse accessibility (axe-based) on 13 pages in all three languages, real keyboard tests, real mouse tests. (A scripted axe-core injection from a CDN was blocked by the environment's permission classifier and not retried.)

| # | Finding | Level | Status |
|---|---|---|---|
| A1 | Every primary call to action ("Get an estimate" / "Saada päring", the header "Book now", the floating-menu quote and email items, the contact e-mail card) was an `<a>` with only an `onClick`: **not reachable with Tab, not announced as a button, not crawlable** | **P1** | **Fixed** — real `<button>`s, restyled to look identical. Verified: Tab reaches the CTA, Enter opens the dialog with focus inside, Escape closes it |
| A2 | Heading order skipped levels on 33 pages (h1 → h3/h4) | P2 | **Fixed** — Lighthouse heading-order passes everywhere |
| A3 | Text contrast | — | Verified: body 14.4:1, secondary 7.0–7.6:1, white-on-gradient buttons 4.7:1+ (all ≥ WCAG AA) |

Result: accessibility **100** on all pages after the fixes. The slider's native range input supports keyboard (Home/End/arrows verified: 0, 100, ±step), mouse drag (verified), and exposes the label "Before / After" in all languages.

**NOT TESTED:** a real screen reader; real touch input (the control is a native range input with `touch-action: pan-y`, but I had no touch device); Safari and Firefox (Chrome only).

---

## 8. Conversion and content findings

Each service page was reviewed against the six questions (problem · what can be requested · process · price and duration drivers · trust · next step).

- **What works:** every service page has an intro, a "what this covers" list, a process where the facts exist, a pricing note where prices are confirmed (painting from 250€, bonnet/roof from 450€, rust from 50€), a warning/limits note, FAQs, related services and articles, and a prominent estimate button. The home page now shows how it works, indicative timeframes taken from the existing copy, real recent projects and the Google reviews link.
- **Gaps (P2, need owner facts):** dent removal, polishing and parts replacement have no price or duration information; thin pages are listed in §4. I did not invent any.
- **Cannibalisation:** the home page, `/teenused/varvimine`, `/teenused/stange-varvimine` and `/teenused/kivitaked-ja-varvikahjustused` target distinct intents (general / panel / bumper / chips); I found no duplicated sections or duplicate titles. Blog posts on scratches and bumpers overlap their service pages by topic but link to them, which is the intended structure.
- Home headline hierarchy and design were left as agreed.

---

## 9. Multilingual findings

- Message catalogs are at **full key parity** across ET/RU/EN (the only difference is an extra Russian plural form); no string is copied untranslated between languages.
- Natural wording is consistent; the two new strings sets I added (titles and descriptions) were written natively in each language, not translated word-for-word.
- **Language switcher bug (P1, fixed):** on every blog article and every case study (10 pages × 3 languages) it navigated to the literal path `/blog/[slug]` or `/work/[slug]` and landed on "Page not found". It now follows each page's own hreflang alternates. Verified through the real UI: **42 of 42 switches** across 14 starting pages (blog, services, static pages, gallery, case studies) land on the correct localized URL with a 200 and the right H1.
- Responsive check (320, 375, 390, 768, 900, 1024, 1440 px, RU/ET/EN): see §13.

---

## 10. Production migration risks

**Production versus release candidate.** The live site serves 27 sitemap URLs and behaves like `origin/main` (identical home title, canonical and H1; the exact deployed commit cannot be read from outside).

| | Count | Detail |
|---|---|---|
| Live URLs preserved | **27 of 27** | each returns 200 locally with no redirect |
| New URLs | 51 | pricing (3), blog index + 6 posts (21), accident (3), about (3), bumper painting (3), minor damage (3), portfolio index + 4 case studies (15) |
| URLs removed or changed | **0** | no existing route, slug or canonical changed |
| Redirects added | 18 | legacy English-style ET/RU paths (permanent 308), `/et` prefix |

**Environment and configuration for the deploy**
- Required: `GMAIL_USER` and `GMAIL_APP_PASSWORD` in the Production environment. Without them the forms return 503 "Email service is not configured". Confirm they are set (I could not read the hosting environment).
- Next.js 16.4.5 needs Node 20.9+ (Vercel's default is fine); consider pinning `engines.node`.
- Domain: `mpaint.ee` is canonical; `http` → `https` works. **`www.mpaint.ee` does not resolve** today; add a DNS record and a redirect to the apex if www should work (owner decision). Canonical domain, hreflang and sitemap all use `https://mpaint.ee`; nothing in the release changes that.
- Analytics: **none exists in the code or on the live site.** Search Console ownership is proven by the verification file, which is present and served. After deploy, submit the new sitemap in Search Console. (Search Console and GA4 were not accessed.)
- Indexing: nothing blocks indexing (no noindex, robots allows all).

**Known risks:** (1) the Next.js minor upgrade and Nodemailer major upgrade are tested locally but not on Vercel itself; (2) 51 new URLs will be crawled at once, so watch Search Console coverage and the hreflang report; (3) the lab performance picture in §5; (4) per-instance rate limiting (§6); (5) real email delivery untested.

**Rollback**
1. Fastest: in the Vercel dashboard, redeploy or "Instant Rollback" to the previous production deployment (no code change needed).
2. From git: the deployable restoration points are `backup/mpaint-before-modern-white` (`3274480`, original dark design with the portfolio) and `backup/pre-release-audit` (`f84650a`, redesign before this audit). Redeploy one of those commits, or `git revert` the commits listed in §14 in reverse order.
3. After a rollback re-check `/sitemap.xml`, the hreflang tags and a test quote request.

---

## 11. All fixes implemented

| ID | Fix | Level |
|---|---|---|
| X1 | Next.js 16.3.1 → 16.4.5 (critical advisories) | P0 |
| X2 | Nodemailer 9 → 10.4.0 (high advisories) | P1 |
| X3 | Form endpoints: origin check, rate limit, validation, safe attachments | P1 |
| S1 | Removed wrong HTTP hreflang `Link` headers | P1 |
| S2 | Service pages: "Service in Tallinn" titles + fuller descriptions | P1 |
| S3 | Permanent redirects for legacy ET/RU URLs | P1 |
| A1 | CTAs and menu items are real buttons (keyboard + screen reader) | P1 |
| — | Language switcher on blog and portfolio pages | P1 |
| E1 | Street address on EN/RU contact pages | P1 |
| S4/S5 | Localized 404; trimmed long descriptions | P2 |
| X4 | Security headers; no `X-Powered-By` | P2 |
| A2 | Heading order fixed site-wide | P2 |
| E2 | Service → portfolio links where real case studies exist | P2 |
| — | Performance: lazy modals, trimmed client messages, no lazy LCP images, right-sized logo, unused font subset dropped | P2 |
| — | `llms.txt` lists the new key pages; JSON-LD `<` escaping; Footer unused import | P3 |

## 12. Remaining issues

**Owner decisions / actions:** robust bot protection (X5) · confirm the business statements in E4 and the opening hours on the Google listing · decide on `www` · supply facts to deepen thin pages (E3, §8) · confirm `GMAIL_USER` / `GMAIL_APP_PASSWORD` are set in Production.

**P2:** `og:url` (S6) · field Core Web Vitals review and the home-page weight options in §5 · CSP in report-only mode (X6) · deepen thin content.
**P3:** sitemap `lastmod` (S8) · per-case `og:image` (S9) · `Service` schema / `sameAs` / BlogPosting image · `middleware` → `proxy` rename (X7) · AVIF · BMW E90 description length (S7).

## 13. Test results with evidence

| Check | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | **Pass** |
| ESLint | **Pass**, 0 errors (1 pre-existing warning in `postcss.config.mjs`, not from this work) |
| Production build | **Pass**, 0 errors (55 route entries in the build output) |
| `npm audit --omit=dev` | **0 vulnerabilities** (was 1 critical, 3 high) |
| SEO crawl, 78 URLs | 78/78 OK; 0 P0/P1; only the P2/P3 items listed in §2 |
| Live-URL preservation | 27/27 return 200 with no redirect |
| Redirects / 404 / headers / robots / sitemap / llms.txt / GSC file | Pass (308s correct; 404 localized with noindex; headers present; all 200) |
| API: missing field, bad email, header injection, over-long input, cross-origin, garbage body, flood | 400 / 400 / 400 / 400 / 403 / 400 / 429 as intended |
| Photo filter (real compiled code) | .exe, PDF, 13 MB, empty dropped; max 5; traversal filename sanitised |
| Nodemailer 10 message build | To/Cc/Reply-To, UTF-8 subject, attachment OK; injected `Bcc` neutralised |
| Responsive sweep: 78 URLs at 390 px + 14 pages (RU/ET/EN) at 320, 375, 768, 900, 1024, 1440 px | **162/162** — no horizontal overflow or clipping, no broken images, 1 H1 and JSON-LD everywhere, all internal links resolve |
| Header at 900–1100 px (long RU/ET labels) | No clipping |
| Lighthouse (modeled, throttled, desktop) | See §5; accessibility 100, best practices 100, SEO 92 (see below) |
| Language switcher | 42/42 UI switches OK |
| Slider | Before/after order correct on all 4 case studies; mouse drag, Home/End/arrows verified; label "Before / After" |
| Keyboard | Tab reaches the CTA; Enter opens the dialog with focus inside; both modals open and close with no console errors |
| Console / hydration | No errors or hydration warnings on home, RU home, services, case study, gallery (dev server); the only messages were from the browser extension itself |
| Dialog unmount time | ~1.1 s in the automation browser; the live site measured 2.3 s in the same browser, so not a regression |
| Google listing | 4.9 / 27 reviews, phone, address, website match (read-only) |

Lighthouse SEO shows 92, not 100, only because of the `canonical` audit, which fails on `localhost` (the canonical correctly points to `mpaint.ee`; Lighthouse compares it with the local origin). For reference, the live site also scores 92, but for a different reason: it still has the href-less buttons that fail the "crawlable links" audit (fixed in the release candidate). With a matching domain the candidate should reach 100. **Re-run on the real domain after deploy.**

**NOT TESTED (and why):** real SMTP delivery (needs the app password and would send real e-mail) · real touch input on the slider · INP and field Core Web Vitals (no real-user data) · Google Rich Results Test (needs the public URL) · canonical/hreflang audits on the final domain · Search Console and GA4 (instruction) · screen readers, Safari, Firefox · Vercel-specific behaviour (edge cache, hosted image optimizer) · opening hours versus the Google listing.

## 14. Changed files and commits

Commits since the restoration point `f84650a`:

| Commit | Summary |
|---|---|
| `1c1f2a9` | Redirects, security headers, form hardening, metadata, localized 404, street address, JSON-LD escaping |
| `5005f13` | Next 16.4.5 + in-range dependency fixes |
| `798a192` | Nodemailer 10.4.0; strip control characters from form fields |
| `9361417` | Language switcher, keyboard buttons, performance, heading order, service→portfolio links, `llms.txt` |
| `e188b5b` | Disable the wrong HTTP hreflang `Link` headers |
| (this report) | `docs/FINAL_PRODUCTION_READINESS_AUDIT.md` |

Changed areas (47 files): `next.config.ts`, `package.json` and lockfile, `src/i18n/routing.ts`, `app/[locale]/layout.tsx`, `app/[locale]/not-found.tsx`, new `app/[locale]/[...rest]/page.tsx`, `app/api/quote|contact/route.ts`, new `src/lib/formGuard.ts` and `src/lib/jsonLd.ts`, `src/lib/mailer.ts`, `messages/{et,ru,en}.json`, page files (home, about, accident, blog, bumper, contact, minor-damage, pricing, services, work), components (`Header`, `Footer`, `Fab`, `LanguageSwitcher`, `ModalProvider`, `OpenQuoteButton`, `OpenEmailButton`, `BeforeAfterSlider`, `CaseStudyCard`, `WorkGalleryGrid`, the JSON-LD components), `src/styles/site.css` and `modern-white.css`, `app/llms.txt/route.ts`, `AGENTS.md` (auto-maintained by `next dev`).

Not changed: all service, blog, case-study and portfolio **content**, URLs and slugs, canonical rules, the sitemap generator, the design (apart from the button and heading element swaps, which render identically), the quote form's behaviour, BeforeAfterSlider logic and the SMTP configuration.

## 15. Rollback instructions

See §10. In short: Vercel "Instant Rollback" first; otherwise redeploy `backup/pre-release-audit` (`f84650a`) or `backup/mpaint-before-modern-white` (`3274480`).

## 16. Final deployment recommendation

**READY WITH DOCUMENTED NON-CRITICAL ISSUES.**

Deploying fixes a critical vulnerability and a live hreflang defect, so waiting carries its own risk. Before or immediately after deploying:

1. Confirm `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set in Production, then submit **one clearly marked test quote request** (with a photo) and confirm the e-mail arrives.
2. On the real domain: fetch `/sitemap.xml` and `/robots.txt`; confirm a service page and a case study have **no** `Link` response header and correct HTML hreflang; confirm the legacy redirects return 308; run Lighthouse (SEO should reach 100 with a matching canonical) and the Rich Results Test on one page of each type.
3. In Search Console: submit the sitemap, then watch Coverage, the hreflang report and Core Web Vitals over the following weeks.
4. Try the language switcher on a blog post and a case study, the slider by touch on a phone, and the Tab key on the home page.
5. Decide on bot protection (X5) and `www` (§10).
