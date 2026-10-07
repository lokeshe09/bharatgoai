import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import ResearchPage from './pages/ResearchPage';
import ContactPage from './pages/ContactPage';
import { PrivacyPage, TermsPage } from './pages/LegalPages';
import NotFound from './pages/NotFound';

export default function App() {
  return <BrowserRouter><Routes><Route element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="products" element={<ProductsPage />} />
    <Route path="research" element={<ResearchPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="privacy" element={<PrivacyPage />} />
    <Route path="terms" element={<TermsPage />} />
    <Route path="*" element={<NotFound />} />
  </Route></Routes></BrowserRouter>;
}
