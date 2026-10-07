import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './seo.css';

const root = document.getElementById('root')!;
if (root.dataset.prerendered === 'true') hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
