# BharatGoAI

Light-theme informational website for BharatGoAI, an India-based company working on LLMs, quantization and AI/ML projects.

## Pages

- `/` — company introduction and focus areas
- `/about` — company, founder and public profiles
- `/products` — work in development
- `/research` — research interests and engineering approach
- `/contact` — business details and an email draft composer
- `/privacy` — general website privacy notes
- `/terms` — general website terms

## Local setup

React 18, TypeScript, Vite and Tailwind CSS. Use npm and the included package-lock.json.

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

No model API key or backend is required. The contact form prepares an email on the visitor's device; visitors must send it through their own email app. It does not submit messages to a server or pretend to have sent them.

## Content and design

Shared company details and page metadata: `src/lib/site.ts`.
Shared navigation and footer: `src/components/Layout.tsx`.
Design and responsive styles: `src/index.css`.
Homepage layout and interactions: `src/pages/HomePage.tsx`, with scoped styles in `src/pages/home.css`. The hero offers three selectable research directions, and the approach section has four selectable stages. Decorative motion can be paused and respects reduced-motion preferences.
The light theme uses frosted glass surfaces, translucent warm tints and soft shadows, with solid surfaces for higher contrast preferences. Illustrations are local SVG/CSS; fonts use the system sans-serif and Georgia. The company name is plain text, with no logo or branded favicon. No external font or analytics requests are added.

`build/static-pages.ts` emits separate HTML entry files for the seven public routes during a production build, with unique titles, descriptions, canonical URLs and basic readable fallback content. React renders the full layouts when JavaScript loads. This is not full React server-side rendering.

The npm lockfile remains the dependency source. The obsolete binary Bun lockfile and old compiled output have been removed; regenerate the build locally.

## Content boundaries

Only supplied company facts are included: BharatGoAI, founded November 2025, Malkajgiri, Hyderabad, Telangana, India — 500047, info@bharatgoai.com, and founder Lokesh E. No registration number, certifications, paid plans, performance metrics, testimonials or unconfirmed product capabilities are published. Public profile URLs come from the supplied update brief; they have not been checked online.

The founder illustration is a typographic monogram, not a photograph. General policy notes cover this informational website and email enquiries. Hosting and email operations were not audited.

## Validation status

This update was reviewed through source inspection only. Dependencies were not installed, and the app, build, lint and tests were not run, as requested. Hosting, domain configuration, email delivery and off-site profiles were not changed.
