import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import Brand from './Brand';
import { company, pageMeta } from '@/lib/site';

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
    const meta = pageMeta[normalizedPath];
    document.title = meta?.title ?? 'Page not found | BharatGoAI';
    const description = meta?.description ?? 'This page is not available. Explore BharatGoAI’s work or contact us.';
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector)?.setAttribute('content', description);
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute('content', document.title);
    const url = `https://bharatgoai.com${normalizedPath}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
    document.querySelector('meta[name="robots"]')?.setAttribute('content', meta ? 'index, follow' : 'noindex, follow');
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
    if (routeChanged) main.current?.focus({ preventScroll: true });
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
    <main id="main-content" tabIndex={-1} ref={main}><Outlet /></main>
    <footer className="site-footer"><div className="container footer-top"><div className="footer-brand"><Link to="/"><Brand /></Link><p>Indian roots.<br />Thoughtful intelligence.</p><span className="location-dot">Hyderabad, India</span></div><div><h2>Explore</h2><Link to="/about">About us</Link><Link to="/products">Our work</Link><Link to="/research">Research</Link></div><div><h2>Connect</h2><Link to="/contact">Contact</Link><a href={company.huggingface} target="_blank" rel="noopener noreferrer">Hugging Face <ArrowUpRight size={13} /></a></div><div className="footer-address"><h2>Find us</h2><address>Malkajgiri, Hyderabad<br />Telangana, India — 500047</address><a href={`mailto:${company.email}`}>{company.email}</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} BharatGoAI</span><span>Founded in November 2025</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div></footer>
  </>;
}
