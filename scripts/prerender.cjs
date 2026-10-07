const fs=require('node:fs');
const {parse}=require('parse5');
const {routes,pageMeta,site,renderHead,filename,write,hash,escapeHtml}=require('./seo-lib.cjs');
const {renderPage}=require('../src/entry-server.tsx');
function visibleText(node) {
  if(['script','style','noscript','svg','nav','footer','header','button','form'].includes(node.tagName)) return '';
  if(node.nodeName==='#text') return node.value;
  return (node.childNodes||[]).map(visibleText).join(' ').replace(/\s+/g,' ').trim();
}
function prerender() {
  const template=fs.readFileSync('dist/index.html','utf8');
  const manifest=JSON.parse(fs.readFileSync('dist/.vite/manifest.json','utf8'));
  const record={}; const fullText=['BharatGoAI — expanded website content',site.description];
  for(const route of [...routes,'/404']) {
    const app=renderPage(route);
    if(app.includes('<!--$!-->')) throw new Error('Suspended or failed static render: '+route);
    const meta=pageMeta[route];
    const source={'/':'HomePage','/about':'AboutPage','/products':'ProductsPage','/research':'ResearchPage','/contact':'ContactPage','/privacy':'LegalPages','/terms':'LegalPages','/404':'NotFound'}[route];
    const chunk=Object.values(manifest).find(item=>item.src==='src/pages/'+source+'.tsx');
    const routeCss=(chunk?.css||[]).filter(file=>!template.includes(file)).map(file=>'<link rel="stylesheet" href="/'+file+'" />').join('\n');
    const preload=chunk ? '<link rel="modulepreload" href="/'+chunk.file+'" />' : '';
    const critical='<style id="critical-css">'+fs.readFileSync('build/critical.css','utf8')+'</style>';
    // The complete rendered page already contains the sole H1. Do not duplicate it in noscript.
    const noScript='<noscript><p class="container">'+escapeHtml(meta?.description??'This page was not found. Explore BharatGoAI using the navigation above.')+' JavaScript enables interactive controls; page content and navigation remain available without it.</p></noscript>';
    const html=template.replace('<!-- SEO_HEAD -->',renderHead(route)+'\n'+critical+'\n'+routeCss+'\n'+preload)
      .replace('<div id="root">','<div id="root" data-prerendered="true">').replace('<!-- APP_HTML -->',app).replace('<!-- NOSCRIPT -->',noScript);
    write('dist/'+filename(route),html);
    if(meta) {
      const text=visibleText(parse(app));
      fullText.push('\n'+meta.heading+'\n'+site.origin+(route==='/'?'/':route)+'\nLast updated: '+meta.dateModified+'\n'+text);
      record[route]={ hash:hash(app+JSON.stringify(meta)), file:filename(route) };
    }
  }
  const text=fullText.join('\n\n')+'\n';
  write('public/llms-full.txt',text);write('dist/llms-full.txt',text);
  write('dist/seo-build.json',JSON.stringify({origin:site.origin,pages:record},null,2));
  return record;
}
module.exports={prerender};
if(require.main===module) {prerender();console.log('Prerendered seven complete routes and a 404 page.');}
