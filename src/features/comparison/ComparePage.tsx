import { useState } from 'react'
import { cn } from '../../lib/utils'
import { Navigation } from '../../sections/Navigation'
import { Button } from '../../components/Button'
import { Footer, viewsonicFooterColumns } from '../../sections/Footer'
import { MOCK_PRODUCTS, type Product } from './mockData'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface SpecGroup {
  title: string
  specs: string[]
}

// ─────────────────────────────────────────────
// Spec Groups 設定
// 每個 group 對應規格表的一個 collapsible 區塊
// ─────────────────────────────────────────────

const SPEC_GROUPS: SpecGroup[] = [
  {
    title: 'Display',
    specs: [
      'Display Size (in.)',
      'Viewable Area (in.)',
      'Panel Type',
      'Resolution',
      'Resolution Type',
      'Static Contrast Ratio',
      'Dynamic Contrast Ratio',
      'Brightness',
      'Light Source',
      'Color Space Support',
      'Viewing Angles',
      'Backlight Life (Hours)',
      'Curvature',
      'Refresh Rate (Hz)',
      'Variable Refresh Rate Technology',
      'Low Blue Light',
      'Flicker-Free',
      'Color Gamut',
    ],
  },
  {
    title: 'Compatibility',
    specs: [
      'PC Resolution (max)',
      'Mac® Resolution (max)',
      'PC Operating System',
      'Mac® Resolution (min)',
    ],
  },
  {
    title: 'Audio',
    specs: ['Internal Speakers'],
  },
  {
    title: 'Connectivity',
    specs: ['VGA', 'HDMI', 'DisplayPort', 'USB Type-C', 'Audio In/Out'],
  },
  {
    title: 'Power',
    specs: ['Power Consumption (typical)', 'Standby Power', 'Power Input'],
  },
]

// ─────────────────────────────────────────────
// ProductCard (Compare Page 頂部的產品卡片)
// 注意：這個 ProductCard 是 ComparePage 專用的
// 跟 src/sections/ProductCard.tsx 是不同的 component
// ─────────────────────────────────────────────

function ProductCard({ product, onRemove }: { product: Product; onRemove: () => void }) {
  return (
    <div data-element="compare-product-card" className="relative flex flex-col items-center gap-3 p-4 bg-white border border-[#e9e9e9] rounded-md hover:shadow-md transition-shadow'">

      {/* Remove Button — 點擊從比較清單移除此產品 */}
      <button
        onClick={onRemove}
        aria-label={`Remove ${product.name}`}
        className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-white border border-[#cfcfcf] hover:bg-gray-100 transition-colors"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path d="M1 1l8 8M9 1L1 9" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Product Image */}
      <div className="w-full aspect-[4/3] bg-white rounded-sm flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
              <rect x="4" y="12" width="40" height="28" rx="2" stroke="#cfcfcf" strokeWidth="2" />
              <path d="M4 32l10-8 8 6 6-4 16 10" stroke="#cfcfcf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Name */}
      <p className="text-[14px] font-bold text-[#2a2a2a] text-center leading-[22px]">{product.name}</p>

      {/* Where to Buy Button */}
      <Button
        variant="primary"
        fullWidth
        rightIcon={
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3 5l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        Where to buy
      </Button>

      {/* Learn More Button */}
      <Button variant="secondary" fullWidth>
        Learn more
      </Button>
    </div>
  )
}

// ─────────────────────────────────────────────
// EmptySlot — 虛線 + 號槽
// 點擊會跳回 Product Listing Page 繼續選產品
// ─────────────────────────────────────────────

function EmptySlot({ onAdd }: { onAdd: () => void }) {
  return (
    <div
      data-element="compare-empty-slot"
      className="flex flex-col items-center justify-center border-2 border-dashed border-[#cfcfcf] rounded-sm cursor-pointer hover:border-brand-red transition-colors group min-h-[260px]"
      onClick={onAdd}
      role="button"
      aria-label="Add product to compare"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#cfcfcf] group-hover:border-brand-red transition-colors">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M10 4v12M4 10h12" stroke="#cfcfcf" strokeWidth="2" strokeLinecap="round" className="group-hover:stroke-brand-red transition-colors" />
        </svg>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// SpecRow — 規格表的單一列
// showDiffOnly=true 時，相同值的列會被隱藏
// ─────────────────────────────────────────────

function SpecRow({ label, values, showDiffOnly }: { label: string; values: (string | undefined)[]; showDiffOnly: boolean }) {
  const allValues = values.map(v => v ?? '—')
  const isDifferent = new Set(allValues.filter(v => v !== '—')).size > 1

  if (showDiffOnly && !isDifferent) return null

  return (
    <tr data-element="spec-row" className="border-b border-[#e9e9e9] hover:bg-[#fafafa]">
      {/* Spec Label */}
      <td className="py-3 px-4 text-[12px] font-medium text-[#2a2a2a] w-[160px] align-top leading-[18px]">
        {label}
      </td>
      {/* Spec Values — 每個產品對應的值 */}
      {values.map((val, i) => (
        <td key={i} className="py-3 px-4 text-[12px] text-[#404041] align-top leading-[18px]">
          {val ?? '—'}
        </td>
      ))}
      {/* Empty column — 對應 EmptySlot 的欄位 */}
      <td className="py-3 px-4" />
    </tr>
  )
}

// ─────────────────────────────────────────────
// SpecGroupSection — 可 collapse 的規格區塊
// 點擊 header 可展開/收合
// ─────────────────────────────────────────────

function SpecGroupSection({ group, products, showDiffOnly }: { group: SpecGroup; products: Product[]; showDiffOnly: boolean }) {
  const [open, setOpen] = useState(true)

  return (
    <tbody data-section={`spec-group-${group.title.toLowerCase()}`}>
      {/* Group Header Row — 點擊展開/收合 */}
      <tr
        className="bg-[#e8f2f9] cursor-pointer hover:bg-[#d0e8f5] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <td colSpan={products.length + 2} className="py-3 px-4">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#2a2a2a]">{group.title}</span>
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden
              className={cn('transition-transform duration-200', open && 'rotate-180')}
            >
              <path d="M5 7.5l5 5 5-5" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </td>
      </tr>

      {/* Spec Rows — 展開時顯示 */}
      {open && group.specs.map(spec => (
        <SpecRow
          key={spec}
          label={spec}
          values={products.map(p => p.specs[spec])}
          showDiffOnly={showDiffOnly}
        />
      ))}
    </tbody>
  )
}

// ─────────────────────────────────────────────
// ComparePage — 主頁面
// ─────────────────────────────────────────────

export function ComparePage({ onBack, products: initialProducts = MOCK_PRODUCTS }: { onBack?: () => void; products?: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showDiffOnly, setShowDiffOnly] = useState(false)

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  // + 號槽點擊 → 跳回 Product Listing Page
  const addProduct = () => {
    onBack?.()
  }

  const maxSlots = 4
  const emptySlots = maxSlots - products.length

  return (
    <div data-page="compare-page" className="min-h-screen flex flex-col bg-white">

      {/* Navigation — src/sections/Navigation.tsx */}
      <Navigation />

      {/* Page Content */}
      <main data-section="compare-main" className="flex-1">
        <div className="mx-auto max-w-[1170px] px-6 py-10">

          {/* Page Header — Back button + 標題 + Contact Sales */}
          <div data-section="compare-header" className="flex flex-col items-center gap-2 mb-8">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-[13px] text-[#767676] hover:text-brand-red transition-colors mb-4"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Products
              </button>
            )}
            <h1 className="text-[32px] font-bold text-[#2a2a2a] leading-[36px]">Compare Products</h1>
            <a href="#" className="text-[14px] text-[#2a2a2a] underline underline-offset-2 hover:text-brand-red flex items-center gap-1">
              Contact Sales
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Product Cards Grid — 頂部產品卡片區 (最多 4 個) */}
          <div data-section="compare-products-grid" className="grid gap-4 mb-6" style={{ gridTemplateColumns: `160px repeat(${maxSlots}, 1fr)` }}>
            {/* 第一欄空白 — 對應規格表的 label 欄 */}
            <div />

            {/* 已選產品卡片 */}
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onRemove={() => removeProduct(product.id)}
              />
            ))}

            {/* 空白槽 — 點擊跳回 Product Listing Page */}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <EmptySlot key={i} onAdd={addProduct} />
            ))}
          </div>

          {/* Controls Bar — Show Differences Only + Print */}
          <div data-section="compare-controls" className="flex items-center gap-4 mb-6 pb-4 border-b border-[#e9e9e9]">
            {/* Show Differences Only Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showDiffOnly}
                onChange={e => setShowDiffOnly(e.target.checked)}
                className="w-4 h-4 accent-brand-red cursor-pointer"
              />
              <span className="text-[12px] text-[#2a2a2a]">Show Differences Only</span>
            </label>

            {/* Print Button */}
            <button className="flex items-center gap-2 border border-[#cfcfcf] text-[#2a2a2a] px-4 py-2 rounded-sm text-[12px] font-medium hover:border-[#767676] transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="2" y="4" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 9h6M4 11h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Print this page
            </button>
          </div>

          {/* Spec Comparison Table — 規格比較表 */}
          <div data-section="spec-table" className="overflow-x-auto">
            <table className="w-full border-collapse">
              {SPEC_GROUPS.map(group => (
                <SpecGroupSection
                  key={group.title}
                  group={group}
                  products={products}
                  showDiffOnly={showDiffOnly}
                />
              ))}
            </table>
          </div>

        </div>
      </main>

      {/* Footer — src/sections/Footer.tsx */}
      <Footer columns={viewsonicFooterColumns} />
    </div>
  )
}
