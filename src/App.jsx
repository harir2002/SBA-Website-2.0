import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeV2 from './pages/HomeV2'
import IndustryPage from './pages/IndustryPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeV2 />} />
        <Route path="/home-v2" element={<HomeV2 />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        {/* Catch-all: keeps the page visible for any unmatched path */}
        <Route path="*" element={<HomeV2 />} />
      </Routes>
    </BrowserRouter>
  )
}
