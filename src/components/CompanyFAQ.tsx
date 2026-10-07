import { Link } from 'react-router-dom';
import { faqs } from '@/config/site';
export default function CompanyFAQ() {
  return <section className="container section-space company-faq" aria-labelledby="company-faq-title">
    <div className="section-heading"><h2 id="company-faq-title">About BharatGoAI: <span className="serif">questions answered.</span></h2></div>
    {faqs.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
    <p className="faq-links"><Link className="text-link" to="/products">Explore multimodal AI projects</Link> · <Link className="text-link" to="/research">Read our research focus</Link> · <Link className="text-link" to="/contact">Discuss a collaboration</Link></p>
  </section>;
}

