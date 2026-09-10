import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const HomeV2 = lazy(() => import('./pages/HomeV2'))
const IndustryPage = lazy(() => import('./pages/IndustryPage'))
const IndustriesOverviewPage = lazy(() => import('./pages/IndustriesOverviewPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage'))
const SolutionsOverviewPage = lazy(() => import('./pages/SolutionsOverviewPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const JobDetailPage = lazy(() => import('./pages/JobDetailPage'))
const InsightsPage = lazy(() => import('./pages/InsightsPage'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))
const InsightDetailPage = lazy(() => import('./pages/InsightDetailPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white" role="status">
      <p className="font-heading text-sm font-bold tracking-wide text-white/70 uppercase">Loading</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomeV2 />} />
          <Route path="/home-v2" element={<HomeV2 />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:slug" element={<JobDetailPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/insights/:slug" element={<InsightDetailPage />} />
          <Route path="/industries" element={<IndustriesOverviewPage />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />
          <Route path="/solutions" element={<SolutionsOverviewPage />} />
          <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
