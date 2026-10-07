# BharatGoAI

BharatGoAI's informational website, built with React, TypeScript and Vite. The existing visual design uses local SVG/CSS illustrations and system fonts.

## Site configuration

Verified facts, profiles, project statuses, page metadata and FAQs live in `src/config/site.ts`. Unknown facts are explicitly marked `[PLACEHOLDER]` there. Unknown legal names, profile links, photographs and original publication dates are omitted from public structured data.

Routes: `/`, `/about`, `/products`, `/research`, `/contact`, `/privacy`, `/terms`.

## Development and production

Use Node.js 22 or newer and the committed npm lockfile.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The production build prerenders the complete React layout and content of every route, emits route-specific metadata and JSON-LD, regenerates crawl files, validates the result, and creates Brotli/gzip variants. Client JavaScript hydrates that HTML and loads pages separately.

The production build uses SWC in process, avoiding the esbuild subprocess restriction encountered in the local Windows environment. Vite remains the bundler.

`npm run preview` uses the supplied static server, including real 404 responses and redirect checks. The ordinary Vite SPA fallback is not used for production validation.

## Quality commands

These commands are provided for later use; they are not automatically started by editing the code.

```sh
npm run typecheck
npm run lint
npm run test:seo
npm run build
npm run validate:seo
npm run test:lighthouse
```

CI runs the same gates. Lighthouse configuration targets mobile scores of at least 95, LCP below 2 seconds and CLS below 0.05. TBT below 150 ms is a lab gate; actual INP below 150 ms needs field measurement. No Lighthouse or Core Web Vitals score is claimed without measurement.

## Generated assets and indexing

`npm run build` refreshes sitemap, crawler guidance, the feed, web manifests, security contact and static pages. Content modification dates come from the central configuration; sitemap generation timestamps come from the build.

The seven social cards and icon set are committed. To regenerate their artwork after changing page headings:

```sh
python -m pip install -r requirements-seo.txt
npm run seo:images
```

The image generator uses a local system font and makes no network requests. PNG social cards maximize preview compatibility; matching WebP variants are also included. No raster image or downloaded font is needed to render the current page content.

```sh
npm run indexnow:dry-run
npm run indexnow:submit
```

IndexNow submission is explicit and belongs after deployment. It verifies the live key, build manifest and changed URLs before submitting. It is not run automatically by the build.

## Hosting and analytics

`vercel.json` contains redirects, security headers, caching and the seven exact route rewrites. There is no SPA catch-all. A custom `404.html` is generated. `public/_headers` and `public/_redirects` provide alternative static-host settings.

Optional Umami analytics stays disabled until its real configuration is supplied. The script loads only after consent. Visitors can withdraw consent in the footer when analytics is enabled.

The contact form prepares an email draft locally. Visitors send it through their own email application.

See [SEO-IMPLEMENTATION.md](SEO-IMPLEMENTATION.md) for the complete file inventory, remaining facts to supply, verification limits and deployment checklist.
