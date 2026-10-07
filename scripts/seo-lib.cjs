require('./register.cjs');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const config = require('../src/config/site.ts');
const seo = require('../src/lib/seo.ts');
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const filename = route => route === '/' ? 'index.html' : route.slice(1) + '.html';
const write = (file, content) => { fs.mkdirSync(path.dirname(file), { recursive:true }); fs.writeFileSync(file, content); };
function renderHead(route) {
  const meta = seo.getSeo(route);
  return [
    '<title>' + escapeHtml(meta.title) + '</title>',
    ...seo.headFields(route).map(field => '<meta ' + ('property' in field ? 'property="' + field.property : 'name="' + field.name) + '" content="' + escapeHtml(field.content) + '" />'),
    '<link rel="canonical" href="' + meta.canonical + '" />',
    ...['en-IN','x-default'].map(language => '<link rel="alternate" hreflang="' + language + '" href="' + meta.canonical + '" />'),
    '<meta name="theme-color" content="' + config.site.colors.light + '" media="(prefers-color-scheme: light)" />',
    '<meta name="theme-color" content="' + config.site.colors.light + '" media="(prefers-color-scheme: dark)" />',
    '<meta name="color-scheme" content="light" /><meta name="format-detection" content="telephone=no" />',
    '<link rel="icon" href="/favicon.ico" sizes="any" /><link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" /><link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" /><link rel="mask-icon" href="/safari-pinned-tab.svg" color="' + config.site.colors.dark + '" />',
    '<link rel="manifest" href="/site.webmanifest" /><link rel="alternate" type="application/atom+xml" title="BharatGoAI research updates" href="/feed.xml" />',
    config.isProvided(config.site.verification.google) ? '<meta name="google-site-verification" content="' + escapeHtml(config.site.verification.google) + '" />' : '<!-- Google Search Console: [PLACEHOLDER: verification code in src/config/site.ts] -->',
    config.isProvided(config.site.verification.bing) ? '<meta name="msvalidate.01" content="' + escapeHtml(config.site.verification.bing) + '" />' : '<!-- Bing Webmaster Tools: [PLACEHOLDER: verification code in src/config/site.ts] -->',
    '<script id="site-jsonld" type="application/ld+json">' + seo.serializeJsonLd(seo.structuredData(route)) + '</script>',
  ].join('\n');
}
module.exports = { ...config, ...seo, escapeHtml, filename, write, hash, renderHead };

