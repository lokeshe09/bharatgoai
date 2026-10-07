import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react';
import { PageIntro } from '@/components/Sections';
import { company } from '@/lib/site';

const topics = ['General enquiry', 'Language models', 'Quantization', 'AI/ML projects', 'Research collaboration'];
export default function ContactPage() {
  const [params] = useSearchParams();
  const initialTopic = params.get('topic') ?? '';
  const [topic, setTopic] = useState(topics.includes(initialTopic) ? initialTopic : topics[0]);
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get('name') ?? '').trim();
    const message = String(fields.get('message') ?? '').trim();
    if (!name || !message) { setStatus('Please enter your name and a message before preparing your email.'); return; }
    const body = `Name: ${name}\nReply email: ${fields.get('email')}\nOrganisation: ${String(fields.get('organisation') ?? '').trim() || 'Not specified'}\nTopic: ${topic}\n\n${message}`;
    setDraft(body);
    setCopied(false);
    setStatus('Your draft is ready below. Open it in your email app, review it, and send it there.');
  }
  async function copyDraft() {
    try { await navigator.clipboard.writeText(draft); setCopied(true); setStatus('Draft copied. Paste it into an email to info@bharatgoai.com.'); }
    catch { setStatus('Copy is unavailable in this browser. You can select and copy the draft below.'); }
  }
  return <><PageIntro label="LET’S CONNECT" title={<>Let’s build something<br /><span className="serif">meaningful.</span></>}><p>A research question, an AI/ML idea or a conversation about our work. Tell us what’s on your mind.</p></PageIntro><section className="container contact-grid"><aside className="contact-details"><div><Mail size={24} strokeWidth={1.5} /><h2>Start with an email.</h2><a className="contact-email" href={`mailto:${company.email}`}>{company.email}<ArrowUpRight size={19} /></a><p>For project enquiries, research conversations and general questions.</p></div><div><MapPin size={24} strokeWidth={1.5} /><h2>Rooted in Hyderabad.</h2><address>Malkajgiri, Hyderabad<br />Telangana, India<br />500047</address></div><div className="contact-small-card"><p className="eyebrow">A GOOD PLACE TO START</p><p>Share the problem you’re exploring, the context and what you hope to achieve. Please leave out passwords and confidential data.</p></div></aside><div className="contact-form-card"><h2>Tell us about your idea.</h2><p>This form prepares an email draft on your device. You review and send it through your email app.</p><form onSubmit={prepareEmail} onChange={() => { setDraft(''); setStatus(''); setCopied(false); }}><div className="form-row"><label>Your name <span>*</span><input name="name" autoComplete="name" required maxLength={100} /></label><label>Email address <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={200} /></label></div><label>Organisation <span className="optional">(optional)</span><input name="organisation" autoComplete="organization" maxLength={150} /></label><label>I’d like to discuss<select name="topic" value={topic} onChange={event => setTopic(event.target.value)}>{topics.map(option => <option key={option}>{option}</option>)}</select></label><label>Your message <span>*</span><textarea name="message" rows={5} required minLength={10} maxLength={1500} aria-describedby="message-hint" /></label><p id="message-hint" className="form-note">10–1,500 characters. Fields marked * are required.</p><p className="form-note">Read our <Link to="/privacy">privacy notes</Link> for information about email enquiries.</p><button className="button button-dark" type="submit">Prepare email draft <ArrowUpRight size={18} /></button></form><p role="status" className="form-status">{status}</p>{draft && <div className="email-draft"><h3>Your email draft</h3><textarea aria-label="Prepared email draft" value={draft} readOnly rows={8} /><div className="button-row"><a className="button button-dark" href={`mailto:${company.email}?subject=${encodeURIComponent(`BharatGoAI enquiry: ${topic}`)}&body=${encodeURIComponent(draft)}`}>Open email app <ArrowUpRight size={16} /></a><button className="button button-outline" type="button" onClick={copyDraft}>{copied ? <Check size={16} /> : <Copy size={16} />}Copy draft</button></div><p className="form-note">If an email app doesn’t open, copy this draft into your email provider and send it to {company.email}.</p></div>}</div></section></>;
}
