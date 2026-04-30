import { useState, useMemo } from 'react'
import { Navigation } from '../../sections/Navigation'
import { Footer, viewsonicFooterColumns } from '../../sections/Footer'
import { ProductCard } from '../../sections/ProductCard'
import { CategoryTileRow } from '../../sections/CategoryTile'
import { FilterSidebar } from '../../sections/FilterAccordion'
import type { FilterGroup } from '../../sections/FilterAccordion'
import { CompareBar } from './CompareBar'
import { MOCK_PRODUCTS } from './mockData'
import type { Product } from './mockData'

const CATEGORIES = [
  { id: 'gaming', label: 'Gaming' },
  { id: 'colorpro', label: 'ColorPro' },
  { id: 'workpro', label: 'WorkPro' },
  { id: 'touch', label: 'Touch Series' },
  { id: 'portable', label: 'Portable Series' },
  { id: 'entertainment', label: 'Entertainment Series' },
]

const FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'category', title: 'Category', defaultOpen: true,
    options: [
      { id: 'gaming', label: 'Gaming' }, { id: 'professional', label: 'Professional' },
      { id: 'home', label: 'Home' }, { id: 'business', label: 'Business' },
      { id: 'portable', label: 'Portable' },
    ],
  },
  {
    id: 'size', title: 'Size', defaultOpen: false,
    options: [{ id: '17', label: '17"' }, { id: '24', label: '24"' }, { id: '27', label: '27"' }, { id: '32', label: '32"' }],
  },
  {
    id: 'resolution', title: 'Resolution', defaultOpen: false,
    options: [{ id: '1920x1080', label: '1920 x 1080' }, { id: '2560x1440', label: '2560 x 1440' }],
  },
  {
    id: 'refreshRate', title: 'Refresh Rate', defaultOpen: false,
    options: [{ id: '60hz', label: '60Hz' }, { id: '100hz', label: '100Hz' }],
  },
  {
    id: 'panelType', title: 'Panel Type', defaultOpen: false,
    options: [{ id: 'ips', label: 'IPS' }, { id: 'va', label: 'VA' }, { id: 'tn', label: 'TN' }],
  },
]

export function ProductListingPage({
  onNavigateToCompare,
  compareList = [],
  onCompareListChange,
}: {
  onNavigateToCompare?: () => void
  compareList?: Product[]
  onCompareListChange?: (list: Product[]) => void
}) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      if (activeCategory && product.category !== activeCategory) return false
      for (const [groupId, selectedIds] of Object.entries(selectedFilters)) {
        if (selectedIds.length === 0) continue
        const productValue = product[groupId as keyof Product]
        if (productValue && !selectedIds.includes(productValue as string)) return false
      }
      return true
    })
  }, [activeCategory, selectedFilters])

  const toggleFilter = (groupId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const current = prev[groupId] ?? []
      return { ...prev, [groupId]: current.includes(optionId) ? current.filter(id => id !== optionId) : [...current, optionId] }
    })
  }

  const clearAllFilters = () => { setSelectedFilters({}); setActiveCategory(undefined) }
  const addToCompare = (product: Product) => { if (compareList.length >= 4) return; onCompareListChange?.([...compareList, product]) }
  const removeFromCompare = (id: string) => { onCompareListChange?.(compareList.filter(p => p.id !== id)) }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      <div className="w-full bg-[#111] text-white py-12 text-center relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[12px] font-medium text-white/60 mb-1 uppercase tracking-widest">Gaming</p>
          <p className="text-[12px] font-medium text-white/60 mb-2">Professional Monitor</p>
          <h1 className="text-[32px] md:text-[40px] font-bold leading-tight">Your Vision. Precisely.</h1>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>
      <div className="w-full py-6 border-b border-[#e9e9e9]">
        <CategoryTileRow categories={CATEGORIES} activeId={activeCategory} onSelect={id => setActiveCategory(prev => prev === id ? undefined : id)} />
      </div>
      <main className="flex-1">
        <div className="mx-auto max-w-[1170px] px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] text-[#767676]"><span className="font-bold text-[#2a2a2a]">{filteredProducts.length}</span> results</p>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#767676]">Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-[12px] border border-[#cfcfcf] rounded-xs px-2 py-1 text-[#2a2a2a] focus:outline-none focus:border-brand-red">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          <div className="flex gap-6">
            <FilterSidebar filters={FILTER_GROUPS} selectedFilters={selectedFilters} onToggleFilter={toggleFilter} onClearAll={clearAllFilters} totalResults={filteredProducts.length} />
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-[16px] font-medium text-[#2a2a2a] mb-2">No products found</p>
                  <button onClick={clearAllFilters} className="text-[13px] text-brand-red underline">Clear all filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id} id={product.id} name={product.name} description={product.description}
                      isInCompare={compareList.some(p => p.id === product.id)}
                      onAddToCompare={() => addToCompare(product)}
                      onRemoveFromCompare={() => removeFromCompare(product.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer columns={viewsonicFooterColumns} />
      <CompareBar products={compareList} onRemove={removeFromCompare} onClear={() => onCompareListChange?.([])} onCompare={onNavigateToCompare} />
    </div>
  )
}
