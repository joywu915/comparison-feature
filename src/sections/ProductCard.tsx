import { cn } from '../lib/utils'
import { Checkbox } from '../components/Checkbox'

// ─────────────────────────────────────────────
// ProductCard
// 用於 Product Listing Page 和其他產品列表頁面
// ─────────────────────────────────────────────

export interface ProductCardProps {
  id: string
  name: string
  description?: string
  image?: string
  tag?: string                    // e.g. "NEW", "SALE"
  isInCompare?: boolean           // 是否已加入比較
  onAddToCompare?: () => void
  onRemoveFromCompare?: () => void
  buyHref?: string
  learnMoreHref?: string
  className?: string
}

export function ProductCard({
  name,
  description,
  image,
  tag,
  isInCompare = false,
  onAddToCompare,
  onRemoveFromCompare,
  buyHref = '#',
  learnMoreHref = '#',
  className,
}: ProductCardProps) {
  return (
    <div className={cn('flex flex-col bg-white border border-[#e9e9e9] rounded-md hover:shadow-md transition-shadow', className)}>

      {/* Image area */}
      <div className="relative w-full aspect-square overflow-hidden rounded-t-md">
        {tag && (
          <span className="absolute top-2 left-2 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10">
            {tag}
          </span>
        )}
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-4"
            onLoad={() => console.log('Image loaded:', image)}
            onError={(e) => console.log('Image failed to load', image, e)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
              <rect x="4" y="12" width="40" height="28" rx="2" stroke="#cfcfcf" strokeWidth="2" />
              <path d="M4 32l10-8 8 6 6-4 16 10" stroke="#cfcfcf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <p className="text-[14px] font-bold text-[#2a2a2a] leading-[20px] line-clamp-2">{name}</p>
        {description && (
          <p className="text-[12px] text-[#767676] leading-[18px] line-clamp-2">{description}</p>
        )}

        {/* Where to buy button */}
        <a
          href={buyHref}
          className="mt-auto flex items-center justify-center gap-1 bg-brand-red text-white px-3 py-2 rounded-full text-[12px] font-bold hover:bg-red-700 transition-colors"
        >
          Where to Buy
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
            <path d="M2 4l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* Learn more */}
        <a
          href={learnMoreHref}
          className="flex items-center justify-center border border-[#cfcfcf] text-[#2a2a2a] px-3 py-2 rounded-full text-[12px] font-medium hover:border-[#767676] transition-colors"
        >
          Learn more
        </a>

        {/* Add to Compare */}
        <div className="pt-2 border-t border-[#e9e9e9] flex justify-center">
          <Checkbox
            label="Compare"
            checked={isInCompare}
            onChange={isInCompare ? onRemoveFromCompare : onAddToCompare}
          />
        </div>
      </div>
    </div>
  )
}
