import { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'
import type { ProductCardProps } from '../../sections/ProductCard'

// ─────────────────────────────────────────────
// CompareBar
// 固定在畫面底部，顯示已選產品 + Compare Now 按鈕
// 支援 Collapse/Expand + Toast message
// ─────────────────────────────────────────────

export interface CompareBarProps {
  products: Pick<ProductCardProps, 'id' | 'name' | 'image'>[]
  maxProducts?: number
  onRemove?: (id: string) => void
  onCompare?: () => void
  onClear?: () => void
  showFullToast?: boolean
  onCloseFullToast?: () => void
}

export function CompareBar({
  products,
  maxProducts = 4,
  onRemove,
  onCompare,
  onClear,
  showFullToast = false,
  onCloseFullToast,
}: CompareBarProps) {
  const [expanded, setExpanded] = useState(true)

  // Auto-dismiss toast after 5 seconds
  useEffect(() => {
    if (showFullToast) {
      const timer = setTimeout(() => onCloseFullToast?.(), 5000)
      return () => clearTimeout(timer)
    }
  }, [showFullToast])

  if (products.length === 0) return null

  return (
    <div data-section="compare-bar" className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e9e9e9] shadow-[0_-4px_16px_rgba(0,0,0,0.10)]">

      {/* Toast */}
      {showFullToast && (
        <div className="flex justify-center pb-6 pt-3">
          <div className="flex items-center gap-2 bg-brand-red text-white px-4 py-2 text-[12px] font-medium rounded-sm shadow-lg">
            Your comparison list is full, please remove one first
            <button onClick={onCloseFullToast} aria-label="Close toast">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M1 1l10 10M11 1L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Desktop layout ── */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-[1170px] px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => setExpanded(o => !o)}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <span className="text-[13px] font-bold text-[#2a2a2a] whitespace-nowrap">
              Compare Products ({products.length}/{maxProducts})
            </span>
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden
              className={cn('transition-transform duration-200', expanded ? 'rotate-0' : 'rotate-180')}
            >
              <path d="M4 10l4-4 4 4" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {expanded && (
            <>
              <div className="flex items-center gap-3 flex-1 overflow-x-auto scrollbar-none">
                {products.map(product => (
                  <div key={product.id} className="flex items-center gap-2 flex-shrink-0 bg-[#f7f7f7] rounded-sm px-2 py-1.5 border border-[#e9e9e9]">
                    <div className="w-10 h-10 bg-white rounded-xs flex items-center justify-center overflow-hidden flex-shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-0.5" />
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <rect x="2" y="4" width="16" height="12" rx="1" stroke="#cfcfcf" strokeWidth="1.5" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[12px] font-medium text-[#2a2a2a] whitespace-nowrap max-w-[100px] truncate">{product.name}</span>
                    <button onClick={() => onRemove?.(product.id)} aria-label={`Remove ${product.name}`} className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full hover:bg-[#e9e9e9] transition-colors">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                        <path d="M1 1l6 6M7 1L1 7" stroke="#767676" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
                {Array.from({ length: maxProducts - products.length }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-[140px] h-[52px] border-2 border-dashed border-[#cfcfcf] rounded-sm flex items-center justify-center">
                    <span className="text-[11px] text-[#cfcfcf]">Add another product</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button onClick={onClear} className="text-[12px] text-[#767676] hover:text-brand-red underline underline-offset-2 transition-colors whitespace-nowrap">Clear all</button>
                <button
                  onClick={onCompare}
                  disabled={products.length < 2}
                  className={cn('px-6 py-2.5 rounded-full text-[14px] font-bold transition-colors whitespace-nowrap', products.length >= 2 ? 'bg-brand-red text-white hover:bg-red-700' : 'bg-[#e9e9e9] text-[#999] cursor-not-allowed')}
                >
                  Compare now
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="md:hidden">
        {/* Header — label + toggle */}
        <button
          onClick={() => setExpanded(o => !o)}
          className="w-full flex items-center justify-between px-6 py-4"
        >
          <span className="text-[14px] font-medium text-[#2a2a2a]">
            Compare products ({products.length}/{maxProducts})
          </span>
          <svg
            width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden
            className={cn('transition-transform duration-200', expanded ? 'rotate-180' : 'rotate-0')}
          >
            <path d="M5 7.5l5 5 5-5" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Expanded — product list + actions */}
        {expanded && (
          <div className="px-6 pb-4 flex flex-col gap-3">
            {/* Product list */}
            <div className="flex flex-col gap-2">
              {products.map(product => (
                <div key={product.id} className="flex items-center gap-3 border border-[#e9e9e9] rounded-md px-3 py-2">
                  <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-sm">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-[#f7f7f7] flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <rect x="2" y="4" width="16" height="12" rx="1" stroke="#cfcfcf" strokeWidth="1.5" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="text-[14px] font-bold text-[#2a2a2a] flex-1 truncate">{product.name}</span>
                  <button
                    onClick={() => onRemove?.(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-md border border-[#cfcfcf] hover:bg-gray-100 transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <path d="M1 1l8 8M9 1L1 9" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClear}
                className="flex-1 border border-[#cfcfcf] text-[#2a2a2a] py-3 rounded-full text-[14px] font-medium hover:border-[#767676] transition-colors"
              >
                Clear all
              </button>
              <button
                onClick={onCompare}
                disabled={products.length < 2}
                className={cn(
                  'flex-1 py-3 rounded-full text-[14px] font-bold transition-colors',
                  products.length >= 2 ? 'bg-brand-red text-white hover:bg-red-700' : 'bg-[#e9e9e9] text-[#999] cursor-not-allowed',
                )}
              >
                Compare now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
