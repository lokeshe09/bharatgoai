const fs=require('node:fs');
const {site,write}=require('./seo-lib.cjs');
async function main(){
  const current=JSON.parse(fs.readFileSync('dist/seo-build.json','utf8'));
  const state=process.env.INDEXNOW_PREVIOUS_MANIFEST||'.cache/indexnow-last-submitted.json';
  const previous=fs.existsSync(state)?JSON.parse(fs.readFileSync(state,'utf8')):{pages:{}};
  const changed=[...new Set([...Object.keys(current.pages),...Object.keys(previous.pages)])].filter(route=>current.pages[route]?.hash!==previous.pages[route]?.hash);
  const urls=changed.map(route=>site.origin+route);
  if(!process.argv.includes('--submit')){console.log(JSON.stringify({mode:'dry-run',changedUrls:urls},null,2));return;}
  if(!urls.length){console.log('No changed URLs.');return;}
  const key=fs.readFileSync('build/indexnow-key.txt','utf8').trim();
  const keyLocation=site.origin+'/'+key+'.txt';
  const response=await fetch(keyLocation,{signal:AbortSignal.timeout(15000)});
  if(!response.ok||(await response.text()).trim()!==key)throw new Error('Deploy the current IndexNow key before submitting.');
  const liveManifestResponse=await fetch(site.origin+'/seo-build.json',{signal:AbortSignal.timeout(15000),cache:'no-store'});
  if(!liveManifestResponse.ok)throw new Error('Deploy the generated SEO manifest before submitting.');
  const liveManifest=await liveManifestResponse.json();
  for(const route of changed)if(liveManifest.pages?.[route]?.hash!==current.pages[route]?.hash)throw new Error('Live content does not match this build: '+route);
  for(const route of changed){
    const page=await fetch(site.origin+route,{redirect:'manual',signal:AbortSignal.timeout(15000)});
    if(current.pages[route]&&page.status!==200)throw new Error('Live page not ready: '+route);
    if(!current.pages[route]&&![404,410].includes(page.status))throw new Error('Removed page is still live: '+route);
  }
  const result=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({host:new URL(site.origin).hostname,key,keyLocation,urlList:urls}),signal:AbortSignal.timeout(20000)});
  if(![200,202].includes(result.status))throw new Error('IndexNow returned '+result.status+': '+await result.text());
  write(state,JSON.stringify(current,null,2));console.log('IndexNow accepted '+urls.length+' URLs (HTTP '+result.status+').');
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
