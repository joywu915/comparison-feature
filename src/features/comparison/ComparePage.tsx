import { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'
import { Navigation } from '../../sections/Navigation'
import { Button } from '../../components/Button'
import { Footer, viewsonicFooterColumns } from '../../sections/Footer'
import { MOCK_PRODUCTS, type Product } from './mockData'

export interface SpecGroup {
  title: string
  specs: string[]
}

const SPEC_GROUPS: SpecGroup[] = [
  {
    title: 'Display',
    specs: [
      'Display Size (in.)', 'Viewable Area (in.)', 'Panel Type', 'Resolution',
      'Resolution Type', 'Static Contrast Ratio', 'Dynamic Contrast Ratio',
      'Brightness', 'Light Source', 'Color Space Support', 'Viewing Angles',
      'Backlight Life (Hours)', 'Curvature', 'Refresh Rate (Hz)',
      'Variable Refresh Rate Technology', 'Low Blue Light', 'Flicker-Free', 'Color Gamut',
    ],
  },
  {
    title: 'Compatibility',
    specs: ['PC Resolution (max)', 'Mac® Resolution (max)', 'PC Operating System', 'Mac® Resolution (min)'],
  },
  { title: 'Audio', specs: ['Internal Speakers'] },
  { title: 'Connectivity', specs: ['VGA', 'HDMI', 'DisplayPort', 'USB Type-C', 'Audio In/Out'] },
  { title: 'Power', specs: ['Power Consumption (typical)', 'Standby Power', 'Power Input'] },
]

// ─────────────────────────────────────────────
// SpecRow
// ─────────────────────────────────────────────
function SpecRow({ label, values, showDiffOnly, totalSlots }: {
  label: string
  values: (string | undefined)[]
  showDiffOnly: boolean
  totalSlots: number
}) {
  const allValues = values.map(v => v ?? '—')
  const isDifferent = new Set(allValues.filter(v => v !== '—')).size > 1
  if (showDiffOnly && !isDifferent) return null

  return (
    <tr className="border-b border-[#e9e9e9] hover:bg-[#fafafa]">
      {/* Label — sticky left */}
      <td className="py-3 px-3 md:px-4 text-[11px] md:text-[12px] font-medium text-[#2a2a2a] align-top leading-[18px] bg-white sticky left-0 z-10 border-r border-[#e9e9e9]">
        {label}
      </td>
      {values.map((val, i) => (
        <td key={i} className="py-3 px-3 md:px-4 text-[11px] md:text-[12px] text-[#404041] align-top leading-[18px]">
          {val ?? '—'}
        </td>
      ))}
      {Array.from({ length: totalSlots - values.length }).map((_, i) => (
        <td key={`empty-${i}`} className="py-3 px-3 md:px-4" />
      ))}
    </tr>
  )
}

// ─────────────────────────────────────────────
// SpecGroupSection
// ─────────────────────────────────────────────
function SpecGroupSection({ group, products, showDiffOnly, maxSlots }: {
  group: SpecGroup
  products: Product[]
  showDiffOnly: boolean
  maxSlots: number
}) {
  const [open, setOpen] = useState(true)

  return (
    <tbody data-section={`spec-group-${group.title.toLowerCase()}`}>
      <tr
        className="bg-[#e8f2f9] cursor-pointer hover:bg-[#d0e8f5] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <td colSpan={maxSlots + 1} className="py-3 px-3 md:px-4 sticky left-0 bg-[#e8f2f9]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] md:text-[14px] font-bold text-[#2a2a2a]">{group.title}</span>
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden
              className={cn('transition-transform duration-200', open && 'rotate-180')}
            >
              <path d="M5 7.5l5 5 5-5" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </td>
      </tr>
      {open && group.specs.map(spec => (
        <SpecRow
          key={spec}
          label={spec}
          values={products.map(p => p.specs[spec])}
          showDiffOnly={showDiffOnly}
          totalSlots={maxSlots}
        />
      ))}
    </tbody>
  )
}

// ─────────────────────────────────────────────
// ComparePage
// ─────────────────────────────────────────────
export function ComparePage({ onBack, products: initialProducts = MOCK_PRODUCTS, onProductsChange }: {
  onBack?: () => void
  products?: Product[]
  onProductsChange?: (products: Product[]) => void
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showDiffOnly, setShowDiffOnly] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const removeProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id)
    setProducts(updated)
    onProductsChange?.(updated)
  }

  const addProduct = () => onBack?.()

  const maxSlots = 4
  const emptySlots = maxSlots - products.length

  // 欄寬設定
  const LABEL_WIDTH = 100   // px — 手機版 label 欄
  const LABEL_WIDTH_MD = 160 // px — 桌機版 label 欄
  const COL_WIDTH = 160      // px — 每個產品欄的最小寬度

  return (
    <div data-page="compare-page" className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <main data-section="compare-main" className="flex-1">
        <div className="mx-auto max-w-[1170px] px-4 md:px-6 py-6 md:py-10">

          {/* Page Header */}
          <div data-section="compare-header" className="flex flex-col items-center gap-2 mb-6 md:mb-8">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-[13px] text-[#767676] hover:text-brand-red transition-colors mb-2 md:mb-4"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Products
              </button>
            )}
            <h1 className="text-[24px] md:text-[32px] font-bold text-[#2a2a2a] leading-tight">Compare Products</h1>
            <a href="#" className="text-[13px] md:text-[14px] text-[#2a2a2a] underline underline-offset-2 hover:text-brand-red flex items-center gap-1">
              Contact Sales
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Controls */}
          <div data-section="compare-controls" className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showDiffOnly}
                onChange={e => setShowDiffOnly(e.target.checked)}
                className="w-4 h-4 accent-brand-red cursor-pointer"
              />
              <span className="text-[12px] text-[#2a2a2a]">Show Differences Only</span>
            </label>
            <button className="hidden md:flex items-center gap-2 border border-[#cfcfcf] text-[#2a2a2a] px-4 py-2 rounded-sm text-[12px] font-medium hover:border-[#767676] transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="2" y="4" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 9h6M4 11h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Print this page
            </button>
          </div>

          {/* ── 單一 overflow 容器，產品卡片和規格表一起捲動 ── */}
          <div
            data-section="compare-wrapper"
            className="overflow-x-auto -mx-4 md:mx-0"
          >
            <div style={{ minWidth: `${LABEL_WIDTH + COL_WIDTH * maxSlots}px` }} className="px-4 md:px-0">
              <table className="w-full border-collapse">
                <colgroup>
                  {/* Label 欄 — sticky left */}
                  <col style={{ width: `${LABEL_WIDTH}px`, minWidth: `${LABEL_WIDTH}px` }} />
                  {/* 產品欄 */}
                  {Array.from({ length: maxSlots }).map((_, i) => (
                    <col key={i} style={{ width: `${COL_WIDTH}px`, minWidth: `${COL_WIDTH}px` }} />
                  ))}
                </colgroup>

                {/* ── 產品卡片 — sticky top ── */}
                <thead className="sticky top-[88px] z-30 bg-white">
                  <tr>
                    {/* 空白 label 欄 */}
                    <td className="sticky left-0 bg-white z-40 p-0" />

                    {/* 產品卡片 */}
                    {products.map(product => (
                      <td key={product.id} className="p-2 align-top">
                        <div className="relative flex flex-col items-center gap-2 p-3 bg-white border border-[#e9e9e9] rounded-sm hover:shadow-md transition-shadow">
                          {/* Remove button */}
                          <button
                            onClick={() => removeProduct(product.id)}
                            aria-label={`Remove ${product.name}`}
                            className="absolute top-1.5 right-1.5 flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white border border-[#cfcfcf] hover:bg-gray-100 transition-colors z-10"
                          >
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden>
                              <path d="M1 1l8 8M9 1L1 9" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          </button>

                          {/* Image */}
                          <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                            ) : (
                              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" aria-hidden>
                                <rect x="4" y="12" width="40" height="28" rx="2" stroke="#cfcfcf" strokeWidth="2" />
                                <path d="M4 32l10-8 8 6 6-4 16 10" stroke="#cfcfcf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>

                          {/* Name */}
                          <p className="text-[11px] md:text-[14px] font-bold text-[#2a2a2a] text-center leading-tight">
                            {product.name}
                          </p>

                          {/* Buttons — desktop only, hidden when scrolled */}
                          {!scrolled && (
                            <>
                              <div className="hidden md:block w-full">
                                <Button variant="primary" fullWidth rightIcon={
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                                    <path d="M3 5l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                }>
                                  Where to buy
                                </Button>
                              </div>
                              <div className="hidden md:block w-full">
                                <Button variant="secondary" fullWidth>Learn more</Button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    ))}

                    {/* Empty slots */}
                    {Array.from({ length: emptySlots }).map((_, i) => (
                      <td key={i} className="p-2 align-top">
                        <div
                          onClick={addProduct}
                          role="button"
                          aria-label="Add product to compare"
                          className="flex flex-col items-center justify-center border-2 border-dashed border-[#cfcfcf] rounded-sm cursor-pointer hover:border-brand-red transition-colors group w-full aspect-square md:min-h-[260px] md:aspect-auto"
                        >
                          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#cfcfcf] group-hover:border-brand-red transition-colors">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                              <path d="M10 4v12M4 10h12" stroke="#cfcfcf" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Divider */}
                  <tr>
                    <td colSpan={maxSlots + 1} className="border-b-2 border-[#e9e9e9] p-0" />
                  </tr>
                </thead>

                {/* ── 規格表 ── */}
                {SPEC_GROUPS.map(group => (
                  <SpecGroupSection
                    key={group.title}
                    group={group}
                    products={products}
                    showDiffOnly={showDiffOnly}
                    maxSlots={maxSlots}
                  />
                ))}
              </table>
            </div>
          </div>

        </div>
      </main>

      <Footer columns={viewsonicFooterColumns} />
    </div>
  )
}
