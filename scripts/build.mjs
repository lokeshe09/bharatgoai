import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { build } from 'vite';
const require=createRequire(import.meta.url);
const swc=require('@swc/core');
const {generatePublic}=require('./generate-public.cjs');
const {generateHosting}=require('./hosting.cjs');
const {prerender}=require('./prerender.cjs');
const {validate}=require('./validate-seo.cjs');

// SWC runs in-process: no esbuild subprocess is needed on restricted Windows hosts.
generatePublic();generateHosting();
await build({
  configFile:false,
  resolve:{alias:{'@':path.resolve('src')},preserveSymlinks:true},
  esbuild:false,
  plugins:[{
    name:'in-process-typescript',
    enforce:'pre',
    transform(code,id){
      if(/\.[cm]?jsx?$/.test(id)&&code.includes('process.env.NODE_ENV'))return swc.transformSync(code,{filename:id,jsc:{target:'es2020',transform:{optimizer:{globals:{vars:{'process.env.NODE_ENV':JSON.stringify('production')}}}}},sourceMaps:false});
      if(!/\.[cm]?tsx?$/.test(id)||id.includes('node_modules'))return null;
      return swc.transformSync(code,{filename:id,jsc:{parser:{syntax:'typescript',tsx:id.endsWith('tsx')},target:'es2020',transform:{react:{runtime:'automatic'}}},module:{type:'es6'},sourceMaps:false});
    },
    renderChunk(code){return swc.minifySync(code,{module:true,compress:true,mangle:true});},
  }],
  build:{manifest:true,target:'esnext',minify:false,cssMinify:false,cssCodeSplit:true},
});
prerender();
await validate();
function compress(directory){
  for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
    const file=path.join(directory,entry.name);
    if(entry.isDirectory())compress(file);
    else if(/\.(html|js|css|svg|json|xml|txt|webmanifest)$/.test(file)){
      const content=fs.readFileSync(file);fs.writeFileSync(file+'.br',brotliCompressSync(content));fs.writeFileSync(file+'.gz',gzipSync(content));
    }
  }
}
compress('dist');
console.log('Build complete: full HTML, validated SEO and compressed assets.');
