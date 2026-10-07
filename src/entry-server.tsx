import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import RouteTree from './RouteTree';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ResearchPage from './pages/ResearchPage';
import ContactPage from './pages/ContactPage';
import { PrivacyPage, TermsPage } from './pages/LegalPages';
import NotFound from './pages/NotFound';

const views = { home: HomePage, about: AboutPage, products: ProductsPage, research: ResearchPage, contact: ContactPage, privacy: PrivacyPage, terms: TermsPage, notFound: NotFound };
export function renderPage(path: string) {
  return renderToString(<StaticRouter location={path}><RouteTree views={views} /></StaticRouter>);
}

