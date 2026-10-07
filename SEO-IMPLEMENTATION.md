# Technical SEO and AI-search implementation

The code preserves the existing fonts, palette, illustrations and page components. It adds a visible company FAQ, contextual links, content-update dates and optional consent controls using those components. No awards, certifications, reviews, customers, user counts, benchmark results or publication claims were added.

## Rendering and metadata

- Full React HTML is generated for all seven routes and a custom 404 page. Hydration enables the existing interactive controls.
- Each public route has its own title, description, canonical, Open Graph/Twitter metadata, social image and linked JSON-LD graph.
- Titles are 50–60 characters; descriptions are 140–160 characters.
- Canonicals use the HTTPS non-www origin and omit query strings. Functional contact query parameters can still select an enquiry topic; they do not create separate canonical URLs.
- The prerendered page already contains the sole H1 and complete content without JavaScript. The noscript notice repeats key copy without adding a second H1.
- Unknown original publication dates are not replaced with founding dates or build dates. Known content modification dates are separate from build-time sitemap timestamps.
- Organization, founder and website IDs remain stable across pages. Page, image, breadcrumb, project and FAQ entities refer to those IDs.
- The FAQ's visible text and JSON-LD are generated from the same array and checked for equality.
- The research page is a pillar overview. No sub-article, scientific publication or article date has been fabricated. The Atom feed currently has zero entries.

## Performance and accessibility

- Route-level JavaScript splitting, route CSS links at first paint, small critical CSS, hashed-asset caching, Brotli and gzip output.
- Tailwind scans the active website instead of the unused UI scaffold. Nine unused application dependencies were removed.
- Existing system fonts remain in use. They do not need downloading, subsetting, preloading or font-display rules; copying proprietary system fonts into the repository would be unnecessary.
- Current page artwork is SVG/CSS and text, including the founder monogram. There are no content raster images requiring srcset, lazy loading or LCP image priority. PNG/WebP social images are metadata assets, not page-rendering resources.
- The logo ImageObject points to the generated BharatGoAI wordmark. It is not a founder photograph.
- Existing landmarks, skip navigation, focus styles and reduced-motion behavior are retained. Navigation and control target sizes were increased, and small supporting text uses the existing darker muted color.
- Theme metadata keeps the current light design for both operating-system color preferences.
- Lighthouse CI is a target gate, not proof of achieved scores. Real-user INP cannot be replaced with Lighthouse TBT.
- CDN Brotli/gzip negotiation and HTTP/2 or HTTP/3 must be verified on the deployed host. The local preview server supports generated compressed variants.
- Browser-based contrast, mobile layout and hydration audits remain to be run in an environment that can launch a browser.

## Hosting and operational behavior

Vercel configuration removes the SPA catch-all and rewrites only known routes to their generated HTML. Unknown URLs should use the generated custom 404 with HTTP 404. Meta robots marks that page noindex.

The configuration requests 301 redirects for www, HTTP, trailing slashes and legacy HTML paths. A hosting provider may apply its own HTTPS redirect before project routing; confirm the final status and redirect chain on the actual deployment. The local validation server verifies the intended behavior, not the live CDN.

Security headers include HSTS, nosniff, referrer policy, permissions policy, CSP and frame protection. Scripts are restricted to the same origin; configuring analytics adds only its configured origin. Inline styles remain permitted for the existing SVG/React styling. Hashed assets receive immutable caching; HTML revalidates.

Every build refreshes robots, sitemaps, manifests, the feed, security.txt and text summaries. No /api/ or /admin/ directories currently exist, so neither is disallowed. All requested AI crawler user agents are explicitly allowed.

IndexNow uses the generated persistent key in `build/indexnow-key.txt` and the corresponding public text file. The submit command checks that the key and content hashes are actually deployed. It only submits changed or removed URLs and persists state after a successful response. No IndexNow request has been sent during this implementation.

## Remaining [PLACEHOLDER] values

Fill these in `src/config/site.ts` only when verified:

| Value | Configuration | Handling until supplied |
| --- | --- | --- |
| [PLACEHOLDER: registered legal name] | `site.legalName` | Omitted from Organization |
| [PLACEHOLDER: LinkedIn profile URL] | `site.profiles.linkedin` | Omitted from sameAs and links |
| [PLACEHOLDER: approved founder photograph URL] | `site.founder.image` | Omitted from Person; visible monogram retained |
| [PLACEHOLDER: Google Search Console verification code] | `site.verification.google` | Commented instruction only |
| [PLACEHOLDER: Bing Webmaster verification code] | `site.verification.bing` | Commented instruction only |
| [PLACEHOLDER: HTTPS Umami script URL] | `site.analytics.script` | Analytics disabled |
| [PLACEHOLDER: Umami website ID] | `site.analytics.websiteId` | Analytics disabled |
| [PLACEHOLDER: verified original publication date for each page] | Optional `pageMeta[route].datePublished` for all seven routes | Omitted from JSON-LD |
| [PLACEHOLDER: authored research write-ups, dates and matching artifacts] | `researchArticles` | No invented article pages, article schema or feed entries |

After supplying analytics settings, explicitly set `site.analytics.enabled` to true and rebuild so CSP matches. The script still waits for visitor consent. Keep `site.contentUpdated` accurate when editing content.

The IndexNow key is already generated: `112d718718e109eece998d2d729d178f6a5c9947c56c398c`. It is not a remaining placeholder. Preserve the key file across builds; deploy it before submission.

Adding a real research article also requires its actual route/content component, central metadata, an approved social image and inclusion in the route manifest. Do not add a feed entry or TechArticle node until the corresponding public article is ready.

## Checks and limitations

Before the user's instruction to stop running commands, the production build, static SEO gates, HTTP route checks, TypeScript check and five unit checks passed. The HTTP checks covered seven 200 responses, unknown-path 404, trailing-slash redirects, host/protocol redirects and query-free canonicals. Existing UI scaffold Fast Refresh warnings were reported by lint.

Lighthouse could not run because the required package was unavailable under the environment's network restrictions. Browser scores and field Core Web Vitals were not measured. Subsequent code-only cleanup and documentation edits have not been rerun, in accordance with the user's instruction. No deployment, DNS change, search-console submission or IndexNow submission was performed.

CI is configured to fail on type errors, lint errors, SEO unit-check failures, build/HTML validation failures or Lighthouse thresholds. The production build itself fails when the static/HTTP SEO gates fail.

## Manual deployment checklist

- [ ] Fill verified identity/profile/verification values above and set accurate content dates.
- [ ] Build and deploy the generated dist directory when ready.
- [ ] Verify HTTPS, non-www and trailing-slash redirects; verify unknown URLs return HTTP 404 and noindex.
- [ ] Check security headers, HTML caching, compressed responses and HTTP/2 or HTTP/3 on the live host.
- [ ] Submit `https://bharatgoai.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters).
- [ ] Run [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/) on each applicable page.
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on mobile; review LCP, CLS and available field INP. Run Lighthouse CI for all seven routes.
- [ ] Check navigation, contact drafts, route changes, consent behavior and responsive layouts with a browser, including JavaScript disabled.
- [ ] Check all seven social previews with a social debugger, such as [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/).
- [ ] Request indexing for `/`, `/about`, `/products`, `/research`, `/contact`, `/privacy`, and `/terms`.
- [ ] After the current build and key are live, review the IndexNow dry run and submit the changed URLs.
- [ ] Add BharatGoAI to Google Business Profile only if there is a qualifying physical office.

AI-search work follows [Google's guidance for AI features](https://developers.google.com/search/docs/appearance/ai-features): accessible, useful content and accurate structured data. Neither llms.txt nor valid markup guarantees inclusion or citations. [FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes) are generally limited to authoritative government and health websites; the company FAQ is not presented as a rich-result guarantee.

Hosting rules follow [Vercel's configuration documentation](https://vercel.com/docs/project-configuration/vercel-json), and IndexNow submission follows [the IndexNow protocol](https://www.indexnow.org/documentation).

## Complete source/public file inventory

This list includes the carried-forward, uncommitted /products changes. Build output under dist and temporary generated manifests are ignored artifacts, not source changes.

Changed:

- `.gitignore`
- `README.md`
- `eslint.config.js`
- `index.html`
- `package.json`
- `package-lock.json`
- `public/_redirects`
- `public/manifest.json`
- `public/robots.txt`
- `public/sitemap.xml`
- `src/App.tsx`
- `src/components/Brand.tsx`
- `src/components/Layout.tsx`
- `src/components/ui/command.tsx`
- `src/components/ui/textarea.tsx`
- `src/lib/site.ts`
- `src/main.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/ContactPage.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/LegalPages.tsx`
- `src/pages/ProductsPage.tsx`
- `src/pages/ResearchPage.tsx`
- `tailwind.config.ts`
- `vercel.json`
- `vite.config.ts`

Created:

- `.github/workflows/quality.yml`
- `SEO-IMPLEMENTATION.md`
- `build/critical.css`
- `build/indexnow-key.txt`
- `lighthouserc.cjs`
- `requirements-seo.txt`
- `scripts/build.mjs`
- `scripts/generate-images.py`
- `scripts/generate-public.cjs`
- `scripts/hosting.cjs`
- `scripts/indexnow.cjs`
- `scripts/prerender.cjs`
- `scripts/register.cjs`
- `scripts/security.cjs`
- `scripts/seo-lib.cjs`
- `scripts/seo.test.cjs`
- `scripts/serve.cjs`
- `scripts/validate-seo.cjs`
- `src/RouteTree.tsx`
- `src/components/AnalyticsConsent.tsx`
- `src/components/CompanyFAQ.tsx`
- `src/config/site.ts`
- `src/entry-server.tsx`
- `src/lib/seo.ts`
- `src/pages/products.css`
- `src/seo.css`
- `public/.well-known/security.txt`
- `public/112d718718e109eece998d2d729d178f6a5c9947c56c398c.txt`
- `public/_headers`
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`
- `public/apple-touch-icon.png`
- `public/brand/wordmark.png`
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/favicon.ico`
- `public/feed.xml`
- `public/humans.txt`
- `public/llms-full.txt`
- `public/llms.txt`
- `public/maskable-512x512.png`
- `public/og/home.png`
- `public/og/home.webp`
- `public/og/about.png`
- `public/og/about.webp`
- `public/og/products.png`
- `public/og/products.webp`
- `public/og/research.png`
- `public/og/research.webp`
- `public/og/contact.png`
- `public/og/contact.webp`
- `public/og/privacy.png`
- `public/og/privacy.webp`
- `public/og/terms.png`
- `public/og/terms.webp`
- `public/safari-pinned-tab.svg`
- `public/site.webmanifest`
- `public/sitemap-pages.xml`

Removed:

- `build/static-pages.ts` — the thin HTML fallback generator was replaced by full prerendering.
