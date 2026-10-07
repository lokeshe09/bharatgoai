import type { Plugin } from 'vite';
import { pageMeta } from '../src/lib/site';

const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => entities[character]);

// Emit route-specific HTML for crawlers and direct visits during the user's build.
// React takes over the same root when JavaScript is available.
export default function staticPages(): Plugin {
  return {
    name: 'bharatgoai-static-pages',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const entry = bundle['index.html'];
      if (!entry || entry.type !== 'asset') return;
      const template = String(entry.source);
      for (const [path, meta] of Object.entries(pageMeta)) {
        if (path === '/') continue;
        const title = escapeHtml(meta.title);
        const description = escapeHtml(meta.description);
        const url = `https://bharatgoai.com${path}`;
        let html = template.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
        for (const name of ['name="description"', 'property="og:description"', 'name="twitter:description"']) {
          html = html.replace(new RegExp(`<meta ${name} content="[^"]*"\\s*/>`), `<meta ${name} content="${description}" />`);
        }
        for (const name of ['property="og:title"', 'name="twitter:title"']) {
          html = html.replace(new RegExp(`<meta ${name} content="[^"]*"\\s*/>`), `<meta ${name} content="${title}" />`);
        }
        html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`);
        html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`);
        html = html.replace(/<!-- STATIC_CONTENT_START -->[\s\S]*?<!-- STATIC_CONTENT_END -->/, `
          <header style="padding:24px 6%"><a href="/">BharatGoAI</a></header>
          <main style="padding:48px 6%;max-width:1000px;font-family:Arial,sans-serif;color:#24352c">
            <h1>${escapeHtml(meta.heading)}</h1><p>${description}</p>
            <nav aria-label="Explore BharatGoAI">${Object.entries(pageMeta).map(([href, page]) => `<p><a href="${href}">${escapeHtml(page.title)}</a></p>`).join('')}</nav>
            <p>BharatGoAI · Founded November 2025</p><p>Malkajgiri, Hyderabad, Telangana, India — 500047</p>
            <p><a href="mailto:info@bharatgoai.com">info@bharatgoai.com</a></p>
          </main>`);
        this.emitFile({ type: 'asset', fileName: `${path.slice(1)}/index.html`, source: html });
      }
    },
  };
}
