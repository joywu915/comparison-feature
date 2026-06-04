import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCompare } from './CompareContext'
import { cn } from '../../lib/utils'
import { Navigation } from '../../sections/Navigation'
import { Button } from '../../components/Button'
import { Footer, viewsonicFooterColumns } from '../../sections/Footer'
import { type Product, MOCK_PRODUCTS } from './mockData'

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

const NAV_HEIGHT = 88

// 手機版和桌機版不同欄寬
const MOBILE_LABEL = 90
const MOBILE_COL = 140
const DESKTOP_LABEL = 160
const DESKTOP_COL = 240

// ─────────────────────────────────────────────
// SpecRow
// ─────────────────────────────────────────────
function SpecRow({ label, values, showDiffOnly, totalSlots, isMobile }: {
  label: string
  values: (string | undefined)[]
  showDiffOnly: boolean
  totalSlots: number
  isMobile: boolean
}) {
  const allValues = values.map(v => v ?? '—')
  const isDifferent = new Set(allValues.filter(v => v !== '—')).size > 1
  if (showDiffOnly && !isDifferent) return null

  const labelW = isMobile ? MOBILE_LABEL : DESKTOP_LABEL
  const colW = isMobile ? MOBILE_COL : DESKTOP_COL

  return (
    <tr className="border-b border-[#e9e9e9] hover:bg-[#fafafa]">
      <td
        className="py-2 px-2 md:py-3 md:px-3 text-[10px] md:text-[12px] font-medium text-[#2a2a2a] align-top leading-[16px] md:leading-[18px] bg-white sticky left-0 z-10 relative after:absolute after:top-0 after:right-0 after:bottom-0 after:w-[8px] after:shadow-[4px_0_8px_rgba(0,0,0,0.10)] after:content-['']"
        style={{ width: labelW, minWidth: labelW }}
      >
        {label}
      </td>
      {values.map((val, i) => (
        <td
          key={i}
          className="py-2 px-2 md:py-3 md:px-3 text-[10px] md:text-[12px] text-[#404041] align-top leading-[16px] md:leading-[18px]"
          style={{ width: colW, minWidth: colW }}
        >
          {val ?? '—'}
        </td>
      ))}
      {Array.from({ length: totalSlots - values.length }).map((_, i) => (
        <td key={`empty-${i}`} style={{ width: colW, minWidth: colW }} />
      ))}
    </tr>
  )
}

// ─────────────────────────────────────────────
// SpecGroupSection
// ─────────────────────────────────────────────
function SpecGroupSection({ group, products, showDiffOnly, maxSlots, isMobile }: {
  group: SpecGroup
  products: Product[]
  showDiffOnly: boolean
  maxSlots: number
  isMobile: boolean
}) {
  const [open, setOpen] = useState(true)
  const labelW = isMobile ? MOBILE_LABEL : DESKTOP_LABEL
  const colW = isMobile ? MOBILE_COL : DESKTOP_COL

  return (
    <tbody>
      <tr
        className="bg-[#e8f2f9] cursor-pointer hover:bg-[#d0e8f5] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <td
          className="py-2 px-2 md:py-3 md:px-3 sticky left-0 bg-[#e8f2f9] font-bold text-[11px] md:text-[14px] text-[#2a2a2a] whitespace-nowrap relative after:absolute after:top-0 after:right-0 after:bottom-0 after:w-[8px] after:shadow-[4px_0_8px_rgba(0,0,0,0.10)] after:content-['']"
          style={{ width: labelW, minWidth: labelW }}
        >
          {group.title}
        </td>
        {Array.from({ length: maxSlots - 1 }).map((_, i) => (
          <td key={i} className="bg-[#e8f2f9]" style={{ width: colW, minWidth: colW }} />
        ))}
        <td
          className="py-2 px-2 md:py-3 md:px-3 bg-[#e8f2f9] sticky right-0 text-right"
          style={{ width: colW, minWidth: colW }}
        >
          <svg
            width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden
            className={cn('transition-transform duration-200 inline-block', open && 'rotate-180')}
          >
            <path d="M5 7.5l5 5 5-5" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </td>
      </tr>
      {open && group.specs.map(spec => (
        <SpecRow
          key={spec}
          label={spec}
          values={products.map(p => p.specs[spec])}
          showDiffOnly={showDiffOnly}
          totalSlots={maxSlots}
          isMobile={isMobile}
        />
      ))}
    </tbody>
  )
}

// ─────────────────────────────────────────────
// ComparePage
// ─────────────────────────────────────────────
export function ComparePage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { compareList, setCompareList } = useCompare()

  const initProducts = (): Product[] => {
    const idsParam = searchParams.get('ids')
    if (idsParam) {
      const ids = idsParam.split(',')
      const fromUrl = ids.map(id => MOCK_PRODUCTS.find(p => p.id === id)).filter((p): p is Product => !!p)
      if (fromUrl.length > 0) return fromUrl
    }
    return compareList
  }

  const [products, setProducts] = useState<Product[]>(initProducts)
  const [showDiffOnly, setShowDiffOnly] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const cardScrollRef = useRef<HTMLDivElement>(null)
  const tableScrollRef = useRef<HTMLDivElement>(null)
  const isSyncing = useRef(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleCardScroll = () => {
    if (isSyncing.current) return
    isSyncing.current = true
    if (tableScrollRef.current && cardScrollRef.current) {
      tableScrollRef.current.scrollLeft = cardScrollRef.current.scrollLeft
    }
    isSyncing.current = false
  }

  const handleTableScroll = () => {
    if (isSyncing.current) return
    isSyncing.current = true
    if (cardScrollRef.current && tableScrollRef.current) {
      cardScrollRef.current.scrollLeft = tableScrollRef.current.scrollLeft
    }
    isSyncing.current = false
  }

  const removeProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id)
    setProducts(updated)
    setCompareList(updated)
    if (updated.length > 0) {
      setSearchParams({ ids: updated.map(p => p.id).join(',') }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  const addProduct = () => navigate('/')

  const maxSlots = 4
  const emptySlots = maxSlots - products.length

  const labelW = isMobile ? MOBILE_LABEL : DESKTOP_LABEL
  const colW = isMobile ? MOBILE_COL : DESKTOP_COL
  const totalWidth = labelW + colW * maxSlots

  return (
    <div data-page="compare-page" className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <main className="flex-1">

        {/* Page Header + Controls */}
        <div className="mx-auto max-w-[1170px] px-4 md:px-6 py-6 md:py-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[13px] text-[#767676] hover:text-brand-red transition-colors self-start mb-4"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Previous page
          </button>

          <div className="flex flex-col items-center gap-2 mb-6 md:mb-8">
            <h1 className="text-[24px] md:text-[32px] font-bold text-[#2a2a2a]">Compare Products</h1>
            <a href="#" className="text-[13px] text-[#2a2a2a] underline underline-offset-2 hover:text-brand-red flex items-center gap-1">
              Contact Sales
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showDiffOnly}
                onChange={e => setShowDiffOnly(e.target.checked)}
                className="w-4 h-4 accent-brand-red cursor-pointer"
              />
              <span className="text-[12px] text-[#2a2a2a]">Show Differences Only</span>
            </label>
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="secondary"
                leftIcon={
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M7 2v7M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                }
                onClick={() => {
                  const headers = ['Spec', ...products.map(p => p.name)]
                  const rows = SPEC_GROUPS.flatMap(g =>
                    g.specs.map(spec => [spec, ...products.map(p => p.specs[spec] ?? '—')])
                  )
                  const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
                  const blob = new Blob([csv], { type: 'text/csv' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url; a.download = 'comparison.csv'; a.click()
                  URL.revokeObjectURL(url)
                }}
              >
                Download CSV
              </Button>
              <Button
                variant="secondary"
                leftIcon={
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <rect x="2" y="4" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 9h6M4 11h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                }
                onClick={() => window.print()}
              >
                Print this page
              </Button>
            </div>
          </div>
        </div>

        {/* ── Sticky product cards ── */}
        <div
          className="sticky z-30 bg-white"
          style={{ top: NAV_HEIGHT }}
        >
          <div className="mx-auto max-w-[1170px] px-4 md:px-6 border-b border-[#e9e9e9]">
            <div
              ref={cardScrollRef}
              className="overflow-x-auto scrollbar-none"
              onScroll={handleCardScroll}
            >
              <div
                className="grid"
                style={{ gridTemplateColumns: `${labelW}px repeat(${maxSlots}, ${colW}px)`, minWidth: totalWidth }}
              >
                {/* Models label */}
                <div
                  className="sticky left-0 bg-white z-20 flex items-end pb-2 px-2 md:px-3 relative after:absolute after:top-0 after:right-0 after:bottom-0 after:w-[8px] after:shadow-[4px_0_8px_rgba(0,0,0,0.10)] after:content-['']"
                  style={{ width: labelW, minWidth: labelW }}
                >
                  <span className="text-[11px] md:text-[12px] font-bold text-[#2a2a2a]">Models</span>
                </div>

                {/* 產品卡片 */}
                {products.map(product => (
                  <div key={product.id} className="p-1.5 md:p-2">
                    <div className="relative flex flex-col items-center gap-1.5 md:gap-2 p-2 md:p-3 bg-white border border-[#e9e9e9] rounded-sm hover:shadow-md transition-shadow">
                      <button
                        onClick={() => removeProduct(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-white border border-[#cfcfcf] hover:bg-gray-100 transition-colors z-10"
                      >
                        <svg width="6" height="6" viewBox="0 0 10 10" fill="none" aria-hidden>
                          <path d="M1 1l8 8M9 1L1 9" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>

                      <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                        ) : (
                          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" aria-hidden>
                            <rect x="4" y="12" width="40" height="28" rx="2" stroke="#cfcfcf" strokeWidth="2" />
                            <path d="M4 32l10-8 8 6 6-4 16 10" stroke="#cfcfcf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>

                      <p className="text-[10px] md:text-[14px] font-bold text-[#2a2a2a] text-center leading-tight">
                        {product.name}
                      </p>

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
                  </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: emptySlots }).map((_, i) => (
                  <div key={i} className="p-1.5 md:p-2">
                    <div
                      onClick={addProduct}
                      role="button"
                      aria-label="Add product to compare"
                      className="flex flex-col items-center justify-center border-2 border-dashed border-[#cfcfcf] rounded-sm cursor-pointer hover:border-brand-red transition-colors group w-full aspect-square md:min-h-[200px] md:aspect-auto"
                    >
                      <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-[#cfcfcf] group-hover:border-brand-red transition-colors">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <path d="M10 4v12M4 10h12" stroke="#cfcfcf" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Spec table ── */}
        <div className="mx-auto max-w-[1170px] px-4 md:px-6">
          <div
            ref={tableScrollRef}
            className="overflow-x-auto"
            onScroll={handleTableScroll}
          >
            <table className="border-collapse" style={{ minWidth: totalWidth }}>
              <colgroup>
                <col style={{ width: labelW, minWidth: labelW }} />
                {Array.from({ length: maxSlots }).map((_, i) => (
                  <col key={i} style={{ width: colW, minWidth: colW }} />
                ))}
              </colgroup>
              {SPEC_GROUPS.map(group => (
                <SpecGroupSection
                  key={group.title}
                  group={group}
                  products={products}
                  showDiffOnly={showDiffOnly}
                  maxSlots={maxSlots}
                  isMobile={isMobile}
                />
              ))}
            </table>
          </div>
        </div>

      </main>

      <Footer columns={viewsonicFooterColumns} />
    </div>
  )
}
