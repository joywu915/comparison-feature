import { useState } from 'react'
import { cn } from '../lib/utils'
import { Button } from '../components/Button'
import { Navigation } from '../sections/Navigation'
import { Footer, viewsonicFooterColumns } from '../sections/Footer'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface Product {
  id: string
  name: string
  image?: string
  buyHref?: string
  learnMoreHref?: string
  specs: Record<string, string>
}

export interface SpecGroup {
  title: string
  specs: string[]
}

// ─────────────────────────────────────────────
// Mock Data
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

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'VA242-H',
    buyHref: '#',
    learnMoreHref: '#',
    specs: {
      'Display Size (in.)': '24',
      'Viewable Area (in.)': '23.8',
      'Panel Type': 'VA Technology',
      'Resolution': '1920 x 1080',
      'Resolution Type': 'FHD (Full HD)',
      'Static Contrast Ratio': '4,000:1 (typ)',
      'Dynamic Contrast Ratio': '50M:1',
      'Brightness': '250 cd/m² (typ)',
      'Light Source': 'LED',
      'Color Space Support': '8 bit true',
      'Viewing Angles': '178° horizontal, 178° vertical',
      'Backlight Life (Hours)': '30000 Hrs (Min)',
      'Curvature': 'Flat',
      'Refresh Rate (Hz)': '100',
      'Variable Refresh Rate Technology': 'Yes',
      'Low Blue Light': 'Software solution',
      'Flicker-Free': 'Yes',
      'Color Gamut': 'NTSC: 72% size (Typ)',
      'PC Resolution (max)': '1920x1080',
      'Mac® Resolution (max)': '1920x1080',
      'PC Operating System': 'Windows 10/11 certified; macOS tested',
      'Mac® Resolution (min)': '1920x1080',
      'Internal Speakers': '0.8Watts x2',
      'VGA': '1x',
      'HDMI': '1x',
      'DisplayPort': '-',
      'USB Type-C': '-',
      'Audio In/Out': 'Audio in',
      'Power Consumption (typical)': '17W',
      'Standby Power': '< 0.5W',
      'Power Input': '100-240V, 50/60Hz',
    },
  },
  {
    id: '2',
    name: 'VA242-H',
    buyHref: '#',
    learnMoreHref: '#',
    specs: {
      'Display Size (in.)': '24',
      'Viewable Area (in.)': '23.8',
      'Panel Type': 'IPS Technology',
      'Resolution': '1920 x 1080',
      'Resolution Type': 'FHD (Full HD)',
      'Static Contrast Ratio': '1,000:1 (typ)',
      'Dynamic Contrast Ratio': '80M:1',
      'Brightness': '300 cd/m² (typ)',
      'Light Source': 'LED',
      'Color Space Support': '8 bit (6 bit + FRC)',
      'Viewing Angles': '178° horizontal, 178° vertical',
      'Backlight Life (Hours)': '30000 Hrs (Min)',
      'Curvature': 'Flat',
      'Refresh Rate (Hz)': '100',
      'Variable Refresh Rate Technology': 'Yes',
      'Low Blue Light': 'Software solution',
      'Flicker-Free': 'Yes',
      'Color Gamut': 'NTSC: 80% size (Typ)',
      'PC Resolution (max)': '1920x1080',
      'Mac® Resolution (max)': '1920x1080',
      'PC Operating System': 'Windows 10/11 certified; macOS tested',
      'Mac® Resolution (min)': '1920x1080',
      'Internal Speakers': '0.8Watts x2',
      'VGA': '-',
      'HDMI': '2x',
      'DisplayPort': '1x',
      'USB Type-C': '-',
      'Audio In/Out': 'Audio in',
      'Power Consumption (typical)': '18W',
      'Standby Power': '< 0.5W',
      'Power Input': '100-240V, 50/60Hz',
    },
  },
  {
    id: '3',
    name: 'VA242-MHD',
    buyHref: '#',
    learnMoreHref: '#',
    specs: {
      'Display Size (in.)': '24',
      'Viewable Area (in.)': '23.8',
      'Panel Type': 'IPS Technology',
      'Resolution': '1920 x 1080',
      'Resolution Type': 'FHD (Full HD)',
      'Static Contrast Ratio': '1,000:1 (typ)',
      'Dynamic Contrast Ratio': '80M:1',
      'Brightness': '300 cd/m² (typ)',
      'Light Source': 'LED',
      'Color Space Support': '8 bit (6 bit + FRC)',
      'Viewing Angles': '178° horizontal, 178° vertical',
      'Backlight Life (Hours)': '30000 Hrs (Min)',
      'Curvature': 'Flat',
      'Refresh Rate (Hz)': '100',
      'Variable Refresh Rate Technology': 'Yes',
      'Low Blue Light': 'Software solution',
      'Flicker-Free': 'Yes',
      'Color Gamut': 'NTSC: 80% size (Typ)',
      'PC Resolution (max)': '3840 x 1280',
      'Mac® Resolution (max)': '3840 x 1280',
      'PC Operating System': 'Windows 10/11 certified; macOS tested',
      'Mac® Resolution (min)': '1920x1080',
      'Internal Speakers': '0.8Watts x2',
      'VGA': '-',
      'HDMI': '2x',
      'DisplayPort': '1x',
      'USB Type-C': '-',
      'Audio In/Out': 'Audio in/out',
      'Power Consumption (typical)': '19W',
      'Standby Power': '< 0.5W',
      'Power Input': '100-240V, 50/60Hz',
    },
  },
]

// ─────────────────────────────────────────────
// Product Card (top section)
// ─────────────────────────────────────────────

function ProductCard({ product, onRemove, colIndex }: { product: Product; onRemove: () => void; colIndex: number }) {
  return (
    <div className="relative flex flex-col items-center gap-3 p-4 bg-white">
      {/* Remove button */}
      <button
        onClick={onRemove}
        aria-label={`Remove ${product.name}`}
        className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-white border border-[#cfcfcf] hover:bg-gray-100 transition-colors"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path d="M1 1l8 8M9 1L1 9" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Product image */}
      <div className="w-full aspect-[4/3] bg-[#f7f7f7] rounded-sm flex items-center justify-center overflow-hidden">
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

      {/* Product name */}
      <p className="text-[14px] font-bold text-[#2a2a2a] text-center leading-[22px]">{product.name}</p>

      {/* Where to buy */}
      <button className="w-full flex items-center justify-center gap-2 bg-brand-red text-white px-4 py-2 rounded-full text-[14px] font-bold hover:bg-red-700 transition-colors">
        Where to buy
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M3 5l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Learn more */}
      <button className="w-full flex items-center justify-center gap-1 border border-[#cfcfcf] text-[#2a2a2a] px-4 py-2 rounded-full text-[14px] font-medium hover:border-[#767676] transition-colors">
        Learn more
      </button>
    </div>
  )
}

// Empty slot (dashed + button)
function EmptySlot({ onAdd }: { onAdd: () => void }) {
  return (
    <div
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
// Spec Table Row
// ─────────────────────────────────────────────

function SpecRow({ label, values, showDiffOnly }: { label: string; values: (string | undefined)[]; showDiffOnly: boolean }) {
  const allValues = values.map(v => v ?? '—')
  const isDifferent = new Set(allValues.filter(v => v !== '—')).size > 1

  if (showDiffOnly && !isDifferent) return null

  return (
    <tr className="border-b border-[#e9e9e9] hover:bg-[#fafafa]">
      <td className="py-3 px-4 text-[12px] font-medium text-[#2a2a2a] w-[160px] align-top leading-[18px]">
        {label}
      </td>
      {values.map((val, i) => (
        <td key={i} className="py-3 px-4 text-[12px] text-[#404041] align-top leading-[18px]">
          {val ?? '—'}
        </td>
      ))}
      {/* Empty column for add slot */}
      <td className="py-3 px-4" />
    </tr>
  )
}

// ─────────────────────────────────────────────
// Spec Group (collapsible section)
// ─────────────────────────────────────────────

function SpecGroupSection({ group, products, showDiffOnly }: { group: SpecGroup; products: Product[]; showDiffOnly: boolean }) {
  const [open, setOpen] = useState(true)

  return (
    <tbody>
      {/* Group header row */}
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

      {/* Spec rows */}
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
// Compare Page
// ─────────────────────────────────────────────

export function ComparePage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [showDiffOnly, setShowDiffOnly] = useState(false)

  const removeProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const addProduct = () => {
    // In real app: open product picker modal
    alert('Open product picker')
  }

  const maxSlots = 4
  const emptySlots = maxSlots - products.length

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation logoSrc="/viewsonic-logo.svg" />

      {/* Page content */}
      <main className="flex-1">
        <div className="mx-auto max-w-[1170px] px-6 py-10">

          {/* Page title */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <h1 className="text-[32px] font-bold text-[#2a2a2a] leading-[36px]">Compare Products</h1>
            <a href="#" className="text-[14px] text-[#2a2a2a] underline underline-offset-2 hover:text-brand-red flex items-center gap-1">
              Contact Sales
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Product cards grid */}
          <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `160px repeat(${maxSlots}, 1fr)` }}>
            {/* Empty label column */}
            <div />

            {/* Product cards */}
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                colIndex={i}
                onRemove={() => removeProduct(product.id)}
              />
            ))}

            {/* Empty slots */}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <EmptySlot key={i} onAdd={addProduct} />
            ))}
          </div>

          {/* Controls: Show Differences + Print */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#e9e9e9]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showDiffOnly}
                onChange={e => setShowDiffOnly(e.target.checked)}
                className="w-4 h-4 accent-brand-red cursor-pointer"
              />
              <span className="text-[12px] text-[#2a2a2a]">Show Differences Only</span>
            </label>

            <button className="flex items-center gap-2 border border-[#cfcfcf] text-[#2a2a2a] px-4 py-2 rounded-sm text-[12px] font-medium hover:border-[#767676] transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="2" y="4" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 4V2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 9h6M4 11h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Print this page
            </button>
          </div>

          {/* Spec comparison table */}
          <div className="overflow-x-auto">
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

      <Footer columns={viewsonicFooterColumns} logoSrc="/viewsonic-logo.svg" />
    </div>
  )
}
