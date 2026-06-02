import { createContext, useContext, useState } from 'react'
import type { Product } from './mockData'

interface CompareContextType {
  compareList: Product[]
  setCompareList: (list: Product[]) => void
}

const CompareContext = createContext<CompareContextType>({
  compareList: [],
  setCompareList: () => {},
})

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Product[]>([])
  return (
    <CompareContext.Provider value={{ compareList, setCompareList }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  return useContext(CompareContext)
}
