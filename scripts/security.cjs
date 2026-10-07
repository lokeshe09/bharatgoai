const {site,isProvided}=require('./seo-lib.cjs');
const analyticsOrigin=site.analytics.enabled && isProvided(site.analytics.script) ? new URL(site.analytics.script).origin : '';
const csp=[
  "default-src 'self'", "base-uri 'self'", "object-src 'none'", "frame-ancestors 'none'",
  "script-src 'self'"+(analyticsOrigin?' '+analyticsOrigin:''),
  "style-src 'self' 'unsafe-inline'", "img-src 'self' data:", "font-src 'self'",
  "connect-src 'self'"+(analyticsOrigin?' '+analyticsOrigin:''),
  "form-action 'self' mailto:", 'upgrade-insecure-requests',
].join('; ');
const securityHeaders={
  'Strict-Transport-Security':'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options':'nosniff',
  'X-Frame-Options':'DENY',
  'Referrer-Policy':'strict-origin-when-cross-origin',
  'Permissions-Policy':'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':csp,
};
module.exports={securityHeaders};

