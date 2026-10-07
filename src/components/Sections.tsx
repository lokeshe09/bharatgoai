import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export function PageIntro({ label, title, children }: { label: string; title: ReactNode; children: ReactNode }) {
  return <section className="page-intro container"><p className="eyebrow"><span />{label}</p><h1>{title}</h1><div className="intro-description">{children}</div></section>;
}
export function ContactCTA() {
  return <section className="container cta-section"><div className="cta-panel"><div><p className="eyebrow">THE NEXT CONVERSATION</p><h2>Big questions.<br /><span className="serif">Shared possibilities.</span></h2><p>Have a research idea or an AI/ML project in mind?<br className="desktop-break" /> We’d love to hear what you’re thinking.</p><Link to="/contact" className="button button-dark">Start a conversation <ArrowUpRight size={18} /></Link></div><div className="cta-art" aria-hidden="true"><div /><div /><div /><div /><div /><span>ब</span></div></div></section>;
}
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="text-link" to={to}>{children}<ArrowRight size={17} /></Link>;
}
