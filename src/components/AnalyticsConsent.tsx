import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isProvided, site } from '@/config/site';

const consentKey = 'bharatgoai-analytics-consent';
const configured = site.analytics.enabled && isProvided(site.analytics.script) && isProvided(site.analytics.websiteId);
function ConsentControls() {
  const [consent, setConsent] = useState<string | null>(null);
  useEffect(() => { try { setConsent(localStorage.getItem(consentKey)); } catch { /* No storage: ask again. */ } }, []);
  useEffect(() => {
    if (consent !== 'granted') return;
    const url = new URL(site.analytics.script);
    if (url.protocol !== 'https:') return;
    const script = document.createElement('script');
    script.src = url.href; script.defer = true;
    script.dataset.websiteId = site.analytics.websiteId; script.dataset.doNotTrack = 'true';
    document.head.append(script);
    return () => { script.remove(); };
  }, [consent]);
  function choose(value: string) {
    try { localStorage.setItem(consentKey, value); } catch { /* Consent still applies for this visit. */ }
    setConsent(value);
    // Reload on withdrawal to stop an already loaded analytics runtime.
    if (consent === 'granted' && value !== 'granted') window.location.reload();
  }
  return <div className="container analytics-consent">
    {consent === null ? <><p>Allow optional, privacy-friendly website analytics? Nothing is tracked before you agree. <Link to="/privacy">Read our privacy notes</Link>.</p><div className="button-row"><button className="button button-outline" onClick={() => choose('denied')}>Decline</button><button className="button button-dark" onClick={() => choose('granted')}>Allow analytics</button></div></> :
    <button className="text-link" onClick={() => choose(consent === 'granted' ? 'denied' : 'granted')}>{consent === 'granted' ? 'Withdraw analytics consent' : 'Allow optional analytics'}</button>}
  </div>;
}
export default function AnalyticsConsent() { return configured ? <ConsentControls /> : null; }

