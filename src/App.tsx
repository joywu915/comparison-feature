import { HashRouter, Routes, Route } from 'react-router-dom'
import { ProductListingPage } from './features/comparison/ProductListingPage'
import { ComparePage } from './features/comparison/ComparePage'
import { CompareProvider } from './features/comparison/CompareContext'

function App() {
  return (
    <CompareProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </HashRouter>
    </CompareProvider>
  )
}

export default App
