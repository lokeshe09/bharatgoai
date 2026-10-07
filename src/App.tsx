import { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteTree from './RouteTree';

const views = {
  home: lazy(() => import('./pages/HomePage')),
  about: lazy(() => import('./pages/AboutPage')),
  products: lazy(() => import('./pages/ProductsPage')),
  research: lazy(() => import('./pages/ResearchPage')),
  contact: lazy(() => import('./pages/ContactPage')),
  privacy: lazy(() => import('./pages/LegalPages').then(module => ({ default: module.PrivacyPage }))),
  terms: lazy(() => import('./pages/LegalPages').then(module => ({ default: module.TermsPage }))),
  notFound: lazy(() => import('./pages/NotFound')),
};
export default function App() {
  return <BrowserRouter><RouteTree views={views} /></BrowserRouter>;
}
