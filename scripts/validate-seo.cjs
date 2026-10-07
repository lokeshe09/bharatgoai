const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {parse}=require('parse5');
const {routes,pageMeta,site,faqs,filename,absoluteUrl,indexRobots}=require('./seo-lib.cjs');
const attr=(node,name)=>node.attrs?.find(a=>a.name===name)?.value;
function all(node,predicate,out=[]){if(predicate(node))out.push(node);for(const child of node.childNodes||[])all(child,predicate,out);return out;}
const text=node=>node.nodeName==='#text'?node.value:(node.childNodes||[]).map(text).join('');
const clean=value=>value.replace(/\s+/g,' ').trim();
function validateJson(value,location='JSON-LD'){
  assert.ok(value!==null&&value!==undefined,location+' is empty');
  if(typeof value==='string')assert.ok(value.trim()&&!value.includes('[PLACEHOLDER'),location+' is empty or a placeholder');
  if(Array.isArray(value)){assert.ok(value.length,location+' is empty');value.forEach((child,i)=>validateJson(child,location+'.'+i));}
  else if(typeof value==='object'){assert.ok(Object.keys(value).length,location+' is empty');for(const [key,child] of Object.entries(value))validateJson(child,location+'.'+key);}
}
function inspect(html,route){
  const document=parse(html);const elements=all(document,node=>Boolean(node.tagName));
  const select=(tag,key,value)=>elements.filter(node=>node.tagName===tag&&(!key||attr(node,key)===value));
  const one=(tag,key,value)=>{const found=select(tag,key,value);assert.equal(found.length,1,route+': expected one '+tag+' '+(value||''));return found[0];};
  const title=text(one('title'));const description=attr(one('meta','name','description'),'content');
  const canonical=attr(one('link','rel','canonical'),'href');
  const known=routes.includes(route);
  assert.equal(select('h1').length,1,route+': exactly one H1');
  assert.equal(select('main').length,1,route+': exactly one main landmark');
  assert.equal(select('meta','name','keywords').length,0,'No meta keywords');
  assert.equal(attr(one('html'),'lang'),'en-IN');
  if(known){
    assert.ok(title.length>=50&&title.length<=60,route+': title length '+title.length);
    assert.ok(description.length>=140&&description.length<=160,route+': description length '+description.length);
    assert.equal(title,pageMeta[route].title);assert.equal(description,pageMeta[route].description);
    assert.equal(canonical,absoluteUrl(route));
    assert.equal(attr(one('meta','name','robots'),'content'),indexRobots);
    const main=one('main');assert.ok(clean(text(main)).length>400,route+': incomplete prerender');
  }else assert.match(attr(one('meta','name','robots'),'content'),/noindex/);
  for(const lang of ['en-IN','x-default'])assert.equal(attr(one('link','hreflang',lang),'href'),canonical);
  for(const [key,name,wanted] of [['property','og:title',title],['name','twitter:title',title],['property','og:description',description],['name','twitter:description',description],['property','og:url',canonical],['property','og:image:width','1200'],['property','og:image:height','630'],['property','og:image:type','image/png'],['property','og:locale','en_IN'],['name','twitter:card','summary_large_image']])assert.equal(attr(one('meta',key,name),'content'),wanted,route+': '+name);
  const scripts=select('script','type','application/ld+json');assert.equal(scripts.length,1);
  const schema=JSON.parse(text(scripts[0]));validateJson(schema);
  assert.equal(schema['@context'],'https://schema.org');assert.ok(Array.isArray(schema['@graph']));
  for(const id of ['organization','website','founder'])assert.ok(schema['@graph'].some(node=>node['@id']===site.origin+'/#'+id),'Stable entity '+id);
  const ids=new Set();const references=[];
  function collect(value){if(!value||typeof value!=='object')return;if(value['@id']){if(Object.keys(value).length>1)ids.add(value['@id']);else references.push(value['@id']);}Object.values(value).forEach(child=>Array.isArray(child)?child.forEach(collect):collect(child));}
  collect(schema);for(const id of references)assert.ok(ids.has(id),'Unresolved entity reference '+id);
  if(known&&route!=='/')assert.ok(schema['@graph'].some(node=>node['@type']==='BreadcrumbList'));
  if(route==='/about'){
    const faq=schema['@graph'].find(node=>node['@type']==='FAQPage');assert.equal(faq.mainEntity.length,faqs.length);
    for(const item of faq.mainEntity){assert.ok(select('summary').some(node=>clean(text(node))===item.name),'FAQ question must be visible');assert.ok(select('p').some(node=>clean(text(node))===item.acceptedAnswer.text),'FAQ answer must match visible copy');}
  }
  for(const image of select('img')){assert.notEqual(attr(image,'alt'),undefined,'Missing image alt');assert.ok(Number(attr(image,'width'))>0&&Number(attr(image,'height'))>0,'Image dimensions required');}
  for(const link of select('a')){if(attr(link,'target')==='_blank')assert.match(attr(link,'rel')||'',/noopener/,'External links need noopener');}
  return {title,description,canonical,document,elements,links:select('a').map(node=>attr(node,'href')).filter(Boolean)};
}
async function validate(options={}){
  const results=new Map();const titles=new Set(),descriptions=new Set(),canonicals=new Set();
  for(const route of [...routes,'/404']){
    const html=fs.readFileSync('dist/'+filename(route),'utf8');
    assert.ok(!html.includes('<!-- APP_HTML -->')&&!html.includes('<!-- SEO_HEAD -->'),'Unreplaced template marker');
    const result=inspect(html,route);results.set(route,result);
    if(routes.includes(route)){for(const [set,value] of [[titles,result.title],[descriptions,result.description],[canonicals,result.canonical]]){assert.ok(!set.has(value),'Duplicate metadata '+value);set.add(value);}}
  }
  for(const [route,result] of results){
    for(const href of result.links){
      const url=new URL(href,absoluteUrl(route));if(url.origin!==site.origin)continue;
      if(results.has(url.pathname)){
        if(url.hash){const id=decodeURIComponent(url.hash.slice(1));assert.ok(results.get(url.pathname).elements.some(node=>attr(node,'id')===id),'Broken fragment '+href+' on '+route);}
      }else assert.ok(fs.existsSync(path.join('dist',url.pathname)),route+': broken internal link '+href);
    }
    for(const node of result.elements){
      const resource=attr(node,'src')||(node.tagName==='link'&&['stylesheet','modulepreload','icon','apple-touch-icon','manifest','mask-icon'].includes(attr(node,'rel'))?attr(node,'href'):null);
      if(resource?.startsWith('/'))assert.ok(fs.existsSync(path.join('dist',resource)),route+': missing resource '+resource);
    }
  }
  // Each route must be within two link traversals from home.
  let reachable=new Set(['/']);for(let step=0;step<2;step++){for(const route of [...reachable])for(const href of results.get(route).links){const url=new URL(href,absoluteUrl(route));if(url.origin===site.origin&&routes.includes(url.pathname))reachable.add(url.pathname);}}
  for(const route of routes)assert.ok(reachable.has(route),'Orphan route '+route);
  const sitemap=fs.readFileSync('dist/sitemap-pages.xml','utf8');
  const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
  assert.deepEqual(urls,routes.map(absoluteUrl),'Sitemap routes');
  assert.ok(!urls.some(url=>url.includes('?')||url.includes('www.')));
  for(const route of routes){
    const image=fs.readFileSync(path.join('dist',pageMeta[route].image));
    assert.equal(image.subarray(1,4).toString(),'PNG');assert.equal(image.readUInt32BE(16),1200);assert.equal(image.readUInt32BE(20),630);
    assert.ok(sitemap.includes(absoluteUrl(pageMeta[route].image)),'Missing sitemap image');
  }
  for(const file of ['robots.txt','sitemap.xml','llms.txt','llms-full.txt','feed.xml','site.webmanifest','.well-known/security.txt','humans.txt'])assert.ok(fs.statSync('dist/'+file).size>20,file);
  const robots=fs.readFileSync('dist/robots.txt','utf8');for(const bot of ['GPTBot','ClaudeBot','anthropic-ai','PerplexityBot','Google-Extended','CCBot','Applebot-Extended'])assert.ok(robots.includes('User-agent: '+bot+'\nAllow: /'),bot);
  if(options.http!==false){
    const {createServer}=require('./serve.cjs');const server=createServer();
    await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
    const base='http://127.0.0.1:'+server.address().port;
    try{
      for(const url of urls){const response=await fetch(base+new URL(url).pathname);assert.equal(response.status,200,'Sitemap URL not 200: '+url);assert.match(response.headers.get('content-type'),/text\/html/);}
      const missing=await fetch(base+'/definitely-not-a-page');assert.equal(missing.status,404);assert.match(await missing.text(),/noindex, follow/);
      const slash=await fetch(base+'/products/',{redirect:'manual'});assert.equal(slash.status,301);assert.equal(slash.headers.get('location'),'/products');
      const www=await new Promise((resolve,reject)=>{require('node:http').get(base+'/about',{headers:{Host:'www.bharatgoai.com'}},response=>{response.resume();resolve(response);}).on('error',reject);});assert.equal(www.statusCode,301);assert.equal(www.headers.location,site.origin+'/about');
      const insecure=await fetch(base+'/about',{headers:{'x-forwarded-proto':'http'},redirect:'manual'});assert.equal(insecure.status,301);
      const query=await fetch(base+'/products?utm_source=check');assert.equal(query.status,200);inspect(await query.text(),'/products');
    }finally{await new Promise(resolve=>server.close(resolve));}
  }
  console.log('SEO gates passed: seven complete pages, metadata, JSON-LD, visible FAQ, links, images, sitemaps and HTTP routes.');
}
module.exports={validate,inspect,validateJson};
if(require.main===module)validate().catch(error=>{console.error(error);process.exitCode=1;});
