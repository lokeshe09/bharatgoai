const {routes}=require('./scripts/seo-lib.cjs');
module.exports={ci:{
  collect:{startServerCommand:'node scripts/serve.cjs',startServerReadyPattern:'Static site:',url:routes.map(route=>'http://127.0.0.1:4173'+route),numberOfRuns:3,settings:{formFactor:'mobile',screenEmulation:{mobile:true,width:390,height:844,deviceScaleFactor:1,disabled:false},throttlingMethod:'simulate',throttling:{rttMs:150,throughputKbps:1638.4,cpuSlowdownMultiplier:4,requestLatencyMs:562.5,downloadThroughputKbps:1474.56,uploadThroughputKbps:675}}},
  assert:{assertions:{
    'categories:performance':['error',{minScore:0.95}],
    'categories:accessibility':['error',{minScore:0.95}],
    'categories:best-practices':['error',{minScore:0.95}],
    'categories:seo':['error',{minScore:0.95}],
    'largest-contentful-paint':['error',{maxNumericValue:1999,aggregationMethod:'median'}],
    'cumulative-layout-shift':['error',{maxNumericValue:0.049,aggregationMethod:'median'}],
    'total-blocking-time':['error',{maxNumericValue:149,aggregationMethod:'median'}],
  }},
  upload:{target:'filesystem',outputDir:'.lighthouseci/reports'},
}};
// Lighthouse's TBT is a lab proxy, not an INP measurement. Check real-user INP <150ms in PSI/CrUX.
