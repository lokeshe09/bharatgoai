import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
export default function NotFound() {
  return <section className="container not-found"><p className="eyebrow">A SMALL DETOUR</p><span className="error-number">404<span>·</span></span><h1>This page is <span className="serif">off the map.</span></h1><p>The link may be outdated, or the page may have moved.<br />There’s still plenty to explore.</p><div className="button-row"><Link className="button button-dark" to="/"><ArrowLeft size={17} />Back to home</Link><Link className="button button-outline" to="/products">Explore our work <ArrowUpRight size={17} /></Link></div></section>;
}
