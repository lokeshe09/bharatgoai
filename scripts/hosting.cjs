const {site,routes,write}=require('./seo-lib.cjs');
const {securityHeaders}=require('./security.cjs');
function generateHosting() {
  write('vercel.json',JSON.stringify({
    $schema:'https://openapi.vercel.sh/vercel.json',
    framework:'vite', buildCommand:'npm run build',outputDirectory:'dist',
    redirects:[
      {source:'/:path*',has:[{type:'host',value:'www.bharatgoai.com'}],destination:site.origin+'/:path*',statusCode:301},
      {source:'/:path*',has:[{type:'header',key:'x-forwarded-proto',value:'http'}],destination:site.origin+'/:path*',statusCode:301},
      {source:'/:path+/',destination:'/:path+',statusCode:301},
      {source:'/index.html',destination:'/',statusCode:301},
      ...routes.filter(route=>route!=='/').flatMap(route=>[
        {source:route+'/index.html',destination:route,statusCode:301},
        {source:route+'.html',destination:route,statusCode:301},
      ]),
    ],
    rewrites:routes.filter(route=>route!=='/').map(route=>({source:route,destination:route+'.html'})),
    headers:[
      {source:'/(.*)',headers:[...Object.entries(securityHeaders).map(([key,value])=>({key,value})),{key:'Cache-Control',value:'public, max-age=0, must-revalidate'}]},
      {source:'/assets/(.*)',headers:[{key:'Cache-Control',value:'public, max-age=31536000, immutable'}]},
      {source:'/404.html',headers:[{key:'X-Robots-Tag',value:'noindex, follow'}]},
    ],
  },null,2)+'\n');
  // Alternative static hosts. No SPA catch-all: unknown pages retain status 404.
  write('public/_redirects',
    'https://www.bharatgoai.com/* https://bharatgoai.com/:splat 301!\nhttp://bharatgoai.com/* https://bharatgoai.com/:splat 301!\n' +
    routes.filter(route=>route!=='/').map(route=>route+'/ '+route+' 301!\n'+route+' '+route+'.html 200').join('\n')+'\n/* /404.html 404\n');
  write('public/_headers','/*\n'+Object.entries(securityHeaders).map(([key,value])=>'  '+key+': '+value).join('\n')+'\n  Cache-Control: public, max-age=0, must-revalidate\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/404.html\n  X-Robots-Tag: noindex, follow\n');
}
module.exports={generateHosting};
if(require.main===module)generateHosting();

