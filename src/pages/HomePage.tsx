import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Cpu, Layers3, MapPin, Pause, Play, Plus, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import IntelligenceArt from '@/components/IntelligenceArt';
import { ContactCTA, TextLink } from '@/components/Sections';
import './home.css';

const stages = [
  { title: 'Define', label: 'START WITH THE RIGHT QUESTION', headline: 'A useful model starts with a real need.', description: 'Who is it for? What should it help them do? Start with the context, the task and the constraints before choosing an approach.', chips: ['People', 'Problem', 'Context'], note: 'A clearly defined problem' },
  { title: 'Explore', label: 'MAKE SPACE FOR EXPERIMENTS', headline: 'Explore the possibilities. Examine the details.', description: 'Consider the models, data and techniques that fit the task. Build experiments around what needs to be learned.', chips: ['Models', 'Data', 'Experiments'], note: 'An approach worth investigating' },
  { title: 'Evaluate', label: 'LOOK BEYOND A SINGLE ANSWER', headline: 'Quality and efficiency belong in the same conversation.', description: 'Think about output quality alongside memory, compute and deployment constraints. Make the trade-offs visible.', chips: ['Quality', 'Resources', 'Trade-offs'], note: 'A better understanding of the trade-offs' },
  { title: 'Refine', label: 'LET THE LEARNING GUIDE THE WORK', headline: 'Every iteration should have a reason.', description: 'Use what an experiment reveals to refine the approach. Connect model behaviour with the requirements of a practical application.', chips: ['Feedback', 'Iteration', 'Application'], note: 'A more considered next step' },
];

const questions = [
  { question: 'What is BharatGoAI working on?', answer: 'We’re working on large language models, model quantization and applied AI/ML projects, with Indian users and businesses in mind. These areas are currently in development.' },
  { question: 'Where is BharatGoAI based?', answer: 'BharatGoAI is based in Malkajgiri, Hyderabad, Telangana, India. The company was founded in November 2025 by Lokesh E, Founder & AI/ML Engineer.' },
  { question: 'Can I discuss an AI/ML project with you?', answer: 'Yes. Email info@bharatgoai.com or use our contact page to prepare an email. Share the problem, the context and what you hope to achieve.' },
];

export default function HomePage() {
  const [direction, setDirection] = useState(0);
  const [stage, setStage] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const currentStage = stages[stage];

  return (
    <div className="home-next" data-motion={motionPaused ? 'paused' : 'playing'}>
      <section className="next-hero-shell">
        <div className="next-ambient next-ambient-warm" aria-hidden="true" />
        <div className="next-ambient next-ambient-sage" aria-hidden="true" />
        <div className="container next-hero">
          <div className="next-hero-copy">
            <div className="next-announcement"><span />An Indian perspective on AI<ArrowUpRight size={13} aria-hidden="true" /></div>
            <h1>Intelligence,<br />rooted in<br /><span className="next-india">India<span className="next-period">.</span></span></h1>
            <p className="next-hero-lead">Language. Efficiency. Possibility.<br />A thoughtful approach to what AI can become.</p>
            <p className="next-hero-detail">We’re BharatGoAI — an India-based company working on large language models, quantization and applied AI/ML projects.</p>
            <div className="button-row"><Link className="button button-dark next-primary" to="/products">Explore our work <ArrowUpRight size={18} /></Link><Link className="next-secondary" to="/about">The people & the purpose <ArrowRight size={16} /></Link></div>
            <div className="next-origin"><MapPin size={14} /><span>Hyderabad, India</span><i /><span>Est. November 2025</span></div>
          </div>
          <IntelligenceArt selected={direction} onSelect={setDirection} />
        </div>
        <div className="container next-hero-bottom"><a href="#our-focus"><span className="next-scroll-icon"><ArrowDown size={15} /></span>Discover what we’re building</a><button type="button" className="motion-control" onClick={() => setMotionPaused(!motionPaused)} aria-pressed={motionPaused}>{motionPaused ? <Play size={13} /> : <Pause size={13} />}{motionPaused ? 'Resume motion' : 'Pause motion'}</button></div>
      </section>

      <div className="next-discipline-band" aria-label="Our areas of focus"><div className="container"><span>INDIAN ROOTS. OPEN POSSIBILITIES.</span><div>Large language models<i />Quantization<i />Applied AI & ML</div></div></div>

      <section className="container next-focus" id="our-focus">
        <div className="next-section-heading"><div><p className="eyebrow">01 / THE WORK</p><h2>Deep in the details.<br /><span className="serif">Big on possibility.</span></h2></div><div><p>Three connected directions.<br />One belief: useful AI starts with thoughtful engineering.</p><span className="next-stage-label"><span />Work in development</span></div></div>
        <div className="next-bento">
          <Link to="/products#language-models" className="next-work-card next-work-language">
            <div className="next-work-top"><span><Layers3 size={18} />LANGUAGE & CONTEXT</span><span className="next-round-arrow"><ArrowUpRight size={20} /></span></div>
            <div className="next-language-art" aria-hidden="true"><div className="next-language-grid" /><span className="next-script next-script-main">अ</span><span className="next-script next-script-telugu">అ</span><span className="next-script next-script-tamil">அ</span><span className="next-script-caption">MANY WAYS TO THINK. MANY WAYS TO EXPRESS.</span><div className="next-language-line" /></div>
            <div className="next-work-copy"><span className="next-work-number">01 / LARGE LANGUAGE MODELS</span><h3>Context changes<br /><span className="serif">everything.</span></h3><p>Exploring language models with Indian users, languages and real-world needs in mind.</p><span className="next-card-cta">Explore language models <ArrowRight size={16} /></span></div>
          </Link>
          <Link to="/products#quantization" className="next-work-card next-work-efficiency">
            <div className="next-work-top"><span><Cpu size={18} />EFFICIENCY & ACCESS</span><span className="next-round-arrow"><ArrowUpRight size={20} /></span></div>
            <div className="next-mini-art next-compression" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ height: `${100 - i * 9}%`, opacity: .2 + i * .08 }} />)}</div>
            <div className="next-work-copy"><span className="next-work-number">02 / QUANTIZATION</span><h3>Less footprint.<br /><span className="serif">More to explore.</span></h3><p>Investigating model efficiency, with quality and resource trade-offs in view.</p></div>
          </Link>
          <Link to="/products#applied-ai" className="next-work-card next-work-application">
            <div className="next-work-top"><span><Workflow size={18} />IDEAS & APPLICATION</span><span className="next-round-arrow"><ArrowUpRight size={20} /></span></div>
            <div className="next-mini-art next-application-art" aria-hidden="true"><i /><i /><i /><i /><span /></div>
            <div className="next-work-copy"><span className="next-work-number">03 / APPLIED AI & ML</span><h3>From what if,<br /><span className="serif">to what’s next.</span></h3><p>Connecting model experiments with practical projects and a clear reason to build.</p></div>
          </Link>
        </div>
      </section>

      <section className="next-perspective-shell">
        <div className="container next-perspective">
          <div className="next-india-art" aria-hidden="true"><div className="next-india-orbit" /><div className="next-india-orbit next-india-orbit-inner" /><span className="next-bharat">भारत</span><span className="next-art-note">A PLACE. A PERSPECTIVE. A POSSIBILITY.</span><span className="next-language-chip chip-one">भाषा</span><span className="next-language-chip chip-two">భాష</span><span className="next-language-chip chip-three">மொழி</span><div className="next-location-chip"><span />Hyderabad, India<ArrowUpRight size={13} /></div></div>
          <div className="next-perspective-copy"><p className="eyebrow">02 / THE PERSPECTIVE</p><h2>India isn’t one story.<br /><span className="serif">Its AI shouldn’t<br />be either.</span></h2><p className="body-large">Different languages. Different ambitions.<br />Different ways of seeing the world.</p><p>We believe AI should be shaped by the people and contexts it serves. That perspective guides our interest in language, efficient computation and useful applications.</p><TextLink to="/about">Meet the thinking behind BharatGoAI</TextLink></div>
        </div>
      </section>

      <section className="container next-process">
        <div className="next-section-heading"><div><p className="eyebrow">03 / THE APPROACH</p><h2>Curiosity, with<br /><span className="serif">a sense of direction.</span></h2></div><p>Explore how we think about an AI/ML project,<br className="desktop-break" /> from the first question to the next iteration.</p></div>
        <div className="next-process-panel">
          <div className="next-process-steps" role="group" aria-label="Explore our approach">{stages.map((item, index) => <button key={item.title} type="button" aria-pressed={stage === index} aria-controls="approach-detail" onClick={() => setStage(index)}><span>0{index + 1}</span>{item.title}<ArrowUpRight size={17} /></button>)}</div>
          <div id="approach-detail" className="next-process-detail" aria-live="polite" aria-atomic="true"><div><p className="eyebrow">{currentStage.label}</p><h3>{currentStage.headline}</h3><p>{currentStage.description}</p><Link to="/research" className="text-link">Explore our research <ArrowRight size={16} /></Link></div><div className="next-process-visual"><span className="next-step-number">0{stage + 1}<span>/ 04</span></span><div className="next-process-chips">{currentStage.chips.map((chip, index) => <div key={chip}><span>0{index + 1}</span>{chip}<Plus size={13} /></div>)}</div><p>{currentStage.note}</p></div></div>
        </div>
      </section>

      <section className="container next-questions"><div><p className="eyebrow">A LITTLE MORE CONTEXT</p><h2>A few good<br /><span className="serif">questions.</span></h2><Link to="/contact" className="text-link">Ask us something <ArrowUpRight size={16} /></Link></div><div>{questions.map((item, index) => <details key={item.question}><summary><span className="next-question-number">0{index + 1}</span><span>{item.question}</span><Plus size={18} /></summary><p>{item.answer}</p></details>)}</div></section>
      <ContactCTA />
    </div>
  );
}
