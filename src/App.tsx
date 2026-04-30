import { useState } from 'react'
import { ProductListingPage } from './features/comparison/ProductListingPage'
import { ComparePage } from './features/comparison/ComparePage'

const EMPTY_COMPARE: { id: string; name: string; image?: string; specs: Record<string, string> }[] = []

function App() {
  const [page, setPage] = useState<'listing' | 'compare'>('listing')
  const [compareList, setCompareList] = useState(EMPTY_COMPARE)

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
      />
    )
}

export default App