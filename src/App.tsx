import { useState } from 'react'
import { ProductListingPage } from './features/comparison/ProductListingPage'
import { ComparePage } from './features/comparison/ComparePage'
import type { Product } from './features/comparison/mockData'

function App() {
  const [page, setPage] = useState<'listing' | 'compare'>('listing')
  const [compareList, setCompareList] = useState<Product[]>([])

  return page === 'listing'
    ? (
      <ProductListingPage
        compareList={compareList}
        onCompareListChange={setCompareList}
        onNavigateToCompare={() => setPage('compare')}
      />
    )
    : (
      <ComparePage
        products={compareList}
        onBack={() => setPage('listing')}
        onProductsChange={setCompareList}
      />
    )
}

export default App
