import { Suspense, type ComponentType } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

export type Views = Record<'home' | 'about' | 'products' | 'research' | 'contact' | 'privacy' | 'terms' | 'notFound', ComponentType>;
export default function RouteTree({ views }: { views: Views }) {
  return <Routes><Route element={<Layout />}>
    <Route index element={<Suspense fallback={null}><views.home /></Suspense>} />
    {(['about', 'products', 'research', 'contact', 'privacy', 'terms'] as const).map(path =>
      <Route key={path} path={path} element={<Suspense fallback={null}>{(() => { const Page = views[path]; return <Page />; })()}</Suspense>} />)}
    <Route path="*" element={<Suspense fallback={null}><views.notFound /></Suspense>} />
  </Route></Routes>;
}

