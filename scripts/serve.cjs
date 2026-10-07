const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const {routes,filename,site}=require('./seo-lib.cjs');
const {securityHeaders}=require('./security.cjs');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ico':'image/x-icon'};
function createServer() {
  const root=path.resolve('dist');
  return http.createServer((req,res)=>{
    for(const [key,value] of Object.entries(securityHeaders))res.setHeader(key,value);
    let url;try{url=new URL(req.url,'http://localhost');decodeURIComponent(url.pathname);}catch{res.writeHead(400);res.end();return;}
    const route=url.pathname; const host=(req.headers.host||'').split(':')[0];
    let canonical=route.replace(/\/+$/,'')||'/';
    if(canonical==='/index.html')canonical='/';
    else if(canonical.endsWith('/index.html'))canonical=canonical.slice(0,-11);
    else if(canonical.endsWith('.html')&&routes.includes(canonical.slice(0,-5)))canonical=canonical.slice(0,-5);
    if(host==='www.bharatgoai.com'||req.headers['x-forwarded-proto']==='http'||canonical!==route) {
      res.writeHead(301,{Location:(host==='www.bharatgoai.com'||req.headers['x-forwarded-proto']==='http'?site.origin:'')+canonical+url.search});res.end();return;
    }
    let file=routes.includes(route)?path.resolve(root,filename(route)):path.resolve(root,'.'+decodeURIComponent(route));
    if(!file.startsWith(root+path.sep)){res.writeHead(400);res.end();return;}
    let status=200;
    if(!fs.existsSync(file)||!fs.statSync(file).isFile()){file=path.join(root,'404.html');status=404;res.setHeader('X-Robots-Tag','noindex, follow');}
    const ext=path.extname(file);res.setHeader('Content-Type',types[ext]||'application/octet-stream');
    res.setHeader('Cache-Control',route.startsWith('/assets/')?'public, max-age=31536000, immutable':'public, max-age=0, must-revalidate');
    const accept=req.headers['accept-encoding']||'';
    if(accept.includes('br')&&fs.existsSync(file+'.br')){file+='.br';res.setHeader('Content-Encoding','br');}
    else if(accept.includes('gzip')&&fs.existsSync(file+'.gz')){file+='.gz';res.setHeader('Content-Encoding','gzip');}
    res.setHeader('Vary','Accept-Encoding');res.writeHead(status);
    if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);
  });
}
module.exports={createServer};
if(require.main===module)createServer().listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Static site: http://127.0.0.1:'+(process.env.PORT||4173)));

