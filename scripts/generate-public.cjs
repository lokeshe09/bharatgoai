const fs = require('node:fs');
const crypto = require('node:crypto');
const { site, routes, pageMeta, researchArticles, absoluteUrl, escapeHtml: xml, write } = require('./seo-lib.cjs');
function generatePublic() {
  const now = new Date(process.env.SOURCE_DATE_EPOCH ? Number(process.env.SOURCE_DATE_EPOCH) * 1000 : Date.now());
  const timestamp = now.toISOString();
  const expires = new Date(now); expires.setUTCFullYear(expires.getUTCFullYear() + 1);
  const bots = ['*','GPTBot','ClaudeBot','anthropic-ai','PerplexityBot','Google-Extended','CCBot','Applebot-Extended'];
  write('public/robots.txt', bots.map(bot => 'User-agent: ' + bot + '\nAllow: /\n').join('\n') + '\nSitemap: ' + absoluteUrl('/sitemap.xml') + '\n');
  write('public/sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>' + absoluteUrl('/sitemap-pages.xml') + '</loc><lastmod>' + timestamp + '</lastmod></sitemap></sitemapindex>\n');
  write('public/sitemap-pages.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' + routes.map(route => '<url><loc>' + absoluteUrl(route) + '</loc><lastmod>' + timestamp + '</lastmod><changefreq>' + (['/privacy','/terms'].includes(route) ? 'yearly' : 'monthly') + '</changefreq><priority>' + (route === '/' ? '1.0' : ['/products','/research'].includes(route) ? '0.9' : '0.6') + '</priority><image:image><image:loc>' + absoluteUrl(pageMeta[route].image) + '</image:loc></image:image></url>').join('\n') + '\n</urlset>\n');
  write('public/llms.txt', '# ' + site.name + '\n\n> ' + site.description + '\n\nFounded ' + site.founded + '. Based in ' + site.addressText + '. Founder: ' + site.founder.name + ', ' + site.founder.jobTitle + '.\n\n## Pages\n' + routes.map(route => '- [' + pageMeta[route].label + '](' + absoluteUrl(route) + '): ' + pageMeta[route].description).join('\n') + '\n\n## Profiles and contact\n- [Hugging Face](' + site.profiles.huggingface + '): models and datasets\n- [GitHub](' + site.profiles.github + '): code\n- Email: ' + site.email + '\n\n## Full text\n- [Expanded website content](' + absoluteUrl('/llms-full.txt') + ')\n');
  write('public/feed.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en-IN"><id>' + absoluteUrl('/research') + '</id><title>BharatGoAI research updates</title><subtitle>Authored research updates, when published.</subtitle><link href="' + absoluteUrl('/feed.xml') + '" rel="self" type="application/atom+xml"/><link href="' + absoluteUrl('/research') + '"/><updated>' + timestamp + '</updated><author><name>' + xml(site.founder.name) + '</name><uri>' + xml(site.profiles.huggingface) + '</uri></author>' + researchArticles.map(article => '<entry><id>' + absoluteUrl('/research/' + article.slug) + '</id><title>' + xml(article.headline) + '</title><link href="' + absoluteUrl('/research/' + article.slug) + '"/><published>' + article.datePublished + 'T00:00:00Z</published><updated>' + article.dateModified + 'T00:00:00Z</updated><summary>' + xml(article.summary) + '</summary></entry>').join('') + '</feed>\n');
  write('public/site.webmanifest', JSON.stringify({ name: site.name, short_name: site.name, id:'/', start_url:'/', scope:'/', display:'standalone', lang:site.language, theme_color:site.colors.light, background_color:site.colors.light, icons:[
    {src:'/android-chrome-192x192.png',sizes:'192x192',type:'image/png',purpose:'any'},
    {src:'/android-chrome-512x512.png',sizes:'512x512',type:'image/png',purpose:'any'},
    {src:'/maskable-512x512.png',sizes:'512x512',type:'image/png',purpose:'maskable'},
  ] },null,2)+'\n');
  write('public/manifest.json',fs.readFileSync('public/site.webmanifest'));
  write('public/.well-known/security.txt','Contact: mailto:' + site.email + '\nExpires: ' + expires.toISOString() + '\nPreferred-Languages: en\nCanonical: ' + absoluteUrl('/.well-known/security.txt') + '\n');
  write('public/humans.txt', site.name + '\nFounder: ' + site.founder.name + '\nRole: ' + site.founder.jobTitle + '\nLocation: ' + site.addressText + '\nContact: ' + site.email + '\nFounded: ' + site.founded + '\nBuilt with React, TypeScript and Vite.\n');
  const keyPath = 'build/indexnow-key.txt';
  if (!fs.existsSync(keyPath)) write(keyPath,crypto.randomBytes(24).toString('hex')+'\n');
  const key = fs.readFileSync(keyPath,'utf8').trim();
  if (!/^[a-f0-9]{48}$/.test(key)) throw new Error('Invalid persisted IndexNow key');
  write('public/'+key+'.txt',key+'\n');
  write('build/.generated/image-manifest.json',JSON.stringify({ site, pages:pageMeta },null,2));
  return timestamp;
}
module.exports={ generatePublic };
if(require.main===module) { generatePublic(); console.log('Generated crawl files, feed, manifest, security contact and IndexNow key.'); }
