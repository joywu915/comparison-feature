import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ProductListingPage } from './features/comparison/ProductListingPage'
import { ComparePage } from './features/comparison/ComparePage'
import { CompareProvider } from './features/comparison/CompareContext'

function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, search, hash])

  return null
}

function App() {
  return (
    <CompareProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </HashRouter>
    </CompareProvider>
  )
}

export default App
