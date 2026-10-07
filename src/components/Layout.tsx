import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import Brand from './Brand';
import { company, pageMeta, site } from '@/config/site';
import { updateDocumentSeo } from '@/lib/seo';
import AnalyticsConsent from './AnalyticsConsent';

const navigation = [{ to: '/about', label: 'About us' }, { to: '/products', label: 'Our work' }, { to: '/research', label: 'Research' }];

export default function Layout() {
  const { pathname, hash } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const main = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);
  useEffect(() => {
    const routeChanged = previousPath.current !== pathname;
    previousPath.current = pathname;
    setMenuOpen(false);
    const normalizedPath = pathname.replace(/\/+$/, '') || '/';
    updateDocumentSeo(normalizedPath);
    if (routeChanged) main.current?.focus({ preventScroll: true });
    if (!hash) { window.scrollTo({ top: 0, behavior: 'instant' }); return; }
    // Lazy pages render after this effect, so wait (up to ~2s) for the target section to exist.
    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let attempts = 0;
    const scrollToHash = () => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView();
      else if (attempts++ < 120) frame = requestAnimationFrame(scrollToHash);
    };
    scrollToHash();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><div className="container header-inner"><Link to="/" aria-label="BharatGoAI home"><Brand /></Link><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(link => <NavLink key={link.to} to={link.to}>{link.label}</NavLink>)}</nav><Link className="button button-dark header-contact" to="/contact">Let’s talk <ArrowUpRight size={16} /></Link><button ref={menuButton} className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div><nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>{[{ to: '/', label: 'Home' }, ...navigation, { to: '/contact', label: 'Contact' }].map(link => <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>{link.label}<ArrowUpRight size={16} /></NavLink>)}</nav></header>
    <main id="main-content" tabIndex={-1} ref={main}><Outlet />{pageMeta[pathname.replace(/\/+$/, '') || '/'] && <p className="container content-updated">Last updated: <time dateTime={site.contentUpdated}>{site.contentUpdated}</time></p>}</main>
    <footer className="site-footer"><div className="container footer-top"><div className="footer-brand"><Link to="/"><Brand /></Link><p>Indian roots.<br />Thoughtful intelligence.</p><span className="location-dot">{site.location}</span></div><div><h2>Explore</h2><Link to="/about">About us</Link><Link to="/products">Our work</Link><Link to="/research">Research</Link></div><div><h2>Connect</h2><Link to="/contact">Contact</Link><a href={company.huggingface} target="_blank" rel="noopener noreferrer">Hugging Face <ArrowUpRight size={13} /></a></div><div className="footer-address"><h2>Find us</h2><address>{site.address.streetAddress}, {site.address.addressLocality}<br />{site.address.addressRegion}, India — {site.address.postalCode}</address><a href={`mailto:${company.email}`}>{company.email}</a></div></div><div className="container footer-bottom"><span>© {site.contentUpdated.slice(0, 4)} {site.name}</span><span>Founded in {site.founded}</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div></footer><AnalyticsConsent />
  </>;
}
