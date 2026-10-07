import { ArrowUpRight, Layers3, Cpu, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageIntro } from '@/components/Sections';
import { company, flagship, projects } from '@/config/site';
import './products.css';

const approach = [
  { title: 'Adapt', description: 'fine-tune open models for Indian-context tasks', icon: Layers3 },
  { title: 'Compress', description: 'quantize models to cut cost and memory', icon: Cpu },
  { title: 'Deploy', description: 'serve with vLLM and test accuracy across hardware', icon: Workflow },
];

function StatusBadge({ children }: { children: string }) {
  return <span className="status-pill"><span aria-hidden="true" />{children}</span>;
}

export default function ProductsPage() {
  return (
    <>
      <PageIntro label="OUR WORK" title={<>From model to<br /><span className="serif">meaningful application.</span></>}>
        <p>We build and adapt multimodal language models for Indian-context use cases, and make them efficient enough to deploy.</p>
      </PageIntro>

      <div className="container project-list">
        <section className="project-section" id="language-models" aria-labelledby="flagship-title">
          <div className="project-visual warm" aria-hidden="true">
            <div className="project-visual-top"><span>VISION + LANGUAGE</span><span>01</span></div>
            <div className="card-diagram diagram-01">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div>
            <Layers3 size={36} strokeWidth={1.2} />
            <span className="visual-caption">BharatGoAI / WORK IN PROGRESS</span>
          </div>
          <div className="project-copy">
            <p className="eyebrow">FLAGSHIP DIRECTION</p>
            <h2 id="flagship-title">{flagship.title}</h2>
            <StatusBadge>{flagship.status}</StatusBadge>
            <p className="body-large work-flagship-description">{flagship.description}</p>
            <ul className="feature-list">{flagship.areas.map(area => <li key={area}>{area}</li>)}</ul>
          </div>
        </section>
      </div>

      <section className="container section-space" aria-labelledby="projects-title">
        <div className="section-heading"><h2 id="projects-title">Projects</h2></div>
        <div className="work-project-grid">
          {projects.map(project => (
            <article className={`focus-card work-project-card ${project.color}`} id={project.id} key={project.id}>
              <div><StatusBadge>{project.status}</StatusBadge></div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.href && <a className="button button-outline" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on Hugging Face`}>View on Hugging Face <ArrowUpRight size={17} aria-hidden="true" /></a>}
            </article>
          ))}
        </div>
      </section>

      <section className="method-section section-space" aria-labelledby="approach-title">
        <div className="container">
          <div className="section-heading"><h2 id="approach-title">Our approach</h2></div>
          <div className="principles-grid">
            {approach.map(item => <article key={item.title}><item.icon size={28} strokeWidth={1.3} aria-hidden="true" /><h3>{item.title}</h3><p>{item.description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="container cta-section" aria-labelledby="work-cta-title">
        <div className="cta-panel">
          <div>
            <p className="eyebrow">THE NEXT CONVERSATION</p>
            <h2 id="work-cta-title">Interested in collaborating or <span className="serif">building with us?</span></h2>
            <div className="button-row work-cta-buttons">
              <a className="button button-outline" href={company.huggingface} target="_blank" rel="noopener noreferrer">Hugging Face <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a className="button button-outline" href="https://github.com/lokeshe09" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={18} aria-hidden="true" /></a>
              <Link to="/contact" className="button button-dark">Contact us <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="cta-art" aria-hidden="true"><div /><div /><div /><div /><div /><span>ब</span></div>
        </div>
      </section>
    </>
  );
}
