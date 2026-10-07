import { absoluteUrl, faqs, indexRobots, isProvided, notFoundMeta, pageMeta, profileUrls, projects, researchArticles, site } from '@/config/site';

export const normalizePath = (path: string) => path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
const ref = (id: string) => ({ '@id': absoluteUrl('/#' + id) });
export function getSeo(path: string) {
  const route = normalizePath(path);
  const known = Boolean(pageMeta[route]);
  const meta = pageMeta[route] ?? notFoundMeta;
  const canonical = absoluteUrl(known ? route : '/404');
  return { ...meta, canonical, route, known, robots: known ? indexRobots : 'noindex, follow', imageUrl: absoluteUrl(meta.image), imageAlt: site.name + ' — ' + meta.heading };
}
export function structuredData(path: string) {
  const meta = getSeo(path);
  const graph: Record<string, unknown>[] = [
    { '@type': 'Organization', ...ref('organization'), name: site.name, ...(isProvided(site.legalName) ? { legalName: site.legalName } : {}), url: site.origin,
      logo: { '@type': 'ImageObject', ...ref('logo'), url: absoluteUrl(site.logo), width: 600, height: 160 },
      foundingDate: site.foundingDate, foundingLocation: { '@type': 'Place', name: site.location, address: { '@type': 'PostalAddress', ...site.address } },
      description: site.description, email: site.email, address: { '@type': 'PostalAddress', ...site.address }, areaServed: 'IN',
      knowsAbout: site.knowsAbout, founder: ref('founder'), sameAs: profileUrls },
    { '@type': 'WebSite', ...ref('website'), name: site.name, url: site.origin, inLanguage: site.language, publisher: ref('organization') },
    { '@type': 'Person', ...ref('founder'), name: site.founder.name, jobTitle: site.founder.jobTitle, worksFor: ref('organization'), knowsAbout: site.knowsAbout, sameAs: profileUrls,
      ...(isProvided(site.founder.image) ? { image: site.founder.image } : {}) },
    { '@type': 'ImageObject', '@id': meta.canonical + '#primaryimage', url: meta.imageUrl, width: 1200, height: 630, caption: meta.imageAlt },
    { '@type': meta.type, '@id': meta.canonical + '#webpage', url: meta.canonical, name: meta.title, description: meta.description,
      inLanguage: site.language, isPartOf: ref('website'), about: ref('organization'), publisher: ref('organization'),
      primaryImageOfPage: { '@id': meta.canonical + '#primaryimage' }, dateModified: meta.dateModified,
      ...(meta.datePublished && isProvided(meta.datePublished) ? { datePublished: meta.datePublished } : {}),
      ...(meta.known && meta.route !== '/' ? { breadcrumb: { '@id': meta.canonical + '#breadcrumb' } } : {}),
      ...(meta.route === '/products' ? { mainEntity: { '@id': meta.canonical + '#projects' } } : {}),
    },
  ];
  if (meta.known && meta.route !== '/') graph.push({ '@type': 'BreadcrumbList', '@id': meta.canonical + '#breadcrumb', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
    { '@type': 'ListItem', position: 2, name: meta.label, item: meta.canonical },
  ] });
  if (meta.route === '/about') graph.push({ '@type': 'FAQPage', '@id': meta.canonical + '#faq', isPartOf: { '@id': meta.canonical + '#webpage' }, mainEntity: faqs.map(item => ({
    '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })) });
  if (meta.route === '/products') graph.push({ '@type': 'ItemList', '@id': meta.canonical + '#projects', numberOfItems: projects.length, itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem', position: index + 1, item: { '@type': project.schemaType, '@id': meta.canonical + '#' + project.id, name: project.title,
      description: project.description, url: project.href ?? meta.canonical + '#' + project.id, creator: ref('founder'),
      ...(project.schemaType === 'SoftwareApplication' ? { applicationCategory: 'DeveloperApplication', operatingSystem: 'Any' } : {}),
    },
  })) });
  if (meta.route === '/research') for (const article of researchArticles) graph.push({
    '@type': 'TechArticle', '@id': absoluteUrl('/research/' + article.slug + '#article'),
    headline: article.headline, description: article.summary, author: ref('founder'), publisher: ref('organization'),
    datePublished: article.datePublished, dateModified: article.dateModified, about: site.knowsAbout,
    url: absoluteUrl('/research/' + article.slug), citation: article.artifact,
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}
export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
export function headFields(path: string) {
  const meta = getSeo(path);
  return [
    { name: 'description', content: meta.description }, { name: 'robots', content: meta.robots }, { name: 'author', content: site.founder.name },
    { property: 'og:type', content: 'website' }, { property: 'og:site_name', content: site.name },
    { property: 'og:title', content: meta.title }, { property: 'og:description', content: meta.description },
    { property: 'og:url', content: meta.canonical }, { property: 'og:locale', content: site.locale },
    { property: 'og:image', content: meta.imageUrl }, { property: 'og:image:width', content: '1200' }, { property: 'og:image:height', content: '630' },
    { property: 'og:image:type', content: 'image/png' }, { property: 'og:image:alt', content: meta.imageAlt },
    { name: 'twitter:card', content: 'summary_large_image' }, { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description }, { name: 'twitter:image', content: meta.imageUrl }, { name: 'twitter:image:alt', content: meta.imageAlt },
  ];
}
export function updateDocumentSeo(path: string) {
  const meta = getSeo(path);
  document.title = meta.title;
  for (const field of headFields(path)) {
    const key = 'property' in field ? 'property' : 'name';
    const value = field[key];
    let tag = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute(key, value!); document.head.append(tag); }
    tag.content = field.content;
  }
  for (const [rel, language] of [['canonical', ''], ['alternate', 'en-IN'], ['alternate', 'x-default']]) {
    const selector = `link[rel="${rel}"]` + (language ? `[hreflang="${language}"]` : '');
    let link = document.head.querySelector<HTMLLinkElement>(selector);
    if (!link) { link = document.createElement('link'); link.rel = rel; if (language) link.hreflang = language; document.head.append(link); }
    link.href = meta.canonical;
  }
  let script = document.getElementById('site-jsonld');
  if (!script) { script = document.createElement('script'); script.id = 'site-jsonld'; script.setAttribute('type', 'application/ld+json'); document.head.append(script); }
  script.textContent = serializeJsonLd(structuredData(path));
}

