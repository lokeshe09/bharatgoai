const {test}=require('node:test');
const assert=require('node:assert/strict');
const {normalizePath,structuredData,serializeJsonLd,site,isProvided,pageMeta}=require('./seo-lib.cjs');
const {validateJson,inspect}=require('./validate-seo.cjs');
test('canonical normalization discards query strings, hashes and trailing slashes',()=>{
  assert.equal(normalizePath('/products/?utm_source=test#quantization'),'/products');
  assert.equal(normalizePath('/'),'/');
});
test('JSON-LD validation rejects missing facts instead of publishing placeholders',()=>{
  for(const value of [null,{},[],{name:''},{legalName:'[PLACEHOLDER: legal name]'}])assert.throws(()=>validateJson(value));
  validateJson(structuredData('/products'));
});
test('only supplied identity fields and publication dates are published',()=>{
  const graph=structuredData('/about')['@graph'];
  assert.equal(graph.find(node=>node['@type']==='Organization').legalName,isProvided(site.legalName)?site.legalName:undefined);
  assert.equal(graph.find(node=>node['@type']==='Person').image,isProvided(site.founder.image)?site.founder.image:undefined);
  const published=pageMeta['/about'].datePublished;
  assert.equal(graph.find(node=>node['@type']==='AboutPage').datePublished,published&&isProvided(published)?published:undefined);
});
test('JSON-LD cannot terminate its script container',()=>{
  const serialized=serializeJsonLd({name:'</script><script>alert(1)</script>'});
  assert.ok(!serialized.includes('<'));
  assert.equal(JSON.parse(serialized).name,'</script><script>alert(1)</script>');
});
test('HTML gate rejects a thin placeholder instead of accepting its metadata',()=>{
  assert.throws(()=>inspect('<html><head><title>placeholder</title></head><body><h1>Hi</h1></body></html>','/'));
});
