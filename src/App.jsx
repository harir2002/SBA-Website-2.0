import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeV2 from './pages/HomeV2'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeV2 />} />
        <Route path="/home-v2" element={<HomeV2 />} />
        {/* Catch-all: keeps the page visible for any unmatched path */}
        <Route path="*" element={<HomeV2 />} />
      </Routes>
    </BrowserRouter>
  )
}
