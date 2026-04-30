import { cn } from '../lib/utils'

// ─────────────────────────────────────────────
// CategoryTile
// 橫向捲動的 category 選擇磚塊
// ─────────────────────────────────────────────

export interface CategoryTileProps {
  label: string
  image?: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export function CategoryTile({ label, image, active = false, onClick, className }: CategoryTileProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 flex-shrink-0',
        'w-[100px] md:w-[120px]',
        'transition-colors duration-150',
        'group',
        className,
      )}
    >
      {/* Image tile */}
      <div
        className={cn(
          'w-full aspect-square rounded-sm overflow-hidden',
          'bg-[#f7f7f7]',
          'border-2 transition-colors duration-150',
          active ? 'border-brand-red' : 'border-transparent group-hover:border-[#cfcfcf]',
        )}
      >
        {image ? (
          <img src={image} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
              <rect x="2" y="8" width="28" height="18" rx="2" stroke="#cfcfcf" strokeWidth="1.5" />
              <path d="M2 20l7-5 5 4 4-3 10 7" stroke="#cfcfcf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Label */}
      <span
        className={cn(
          'text-[12px] font-medium leading-[18px] text-center',
          active ? 'text-brand-red' : 'text-[#2a2a2a] group-hover:text-brand-red',
        )}
      >
        {label}
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────
// CategoryTileRow — 橫向捲動的 row
// ─────────────────────────────────────────────

export interface CategoryTileRowProps {
  categories: { id: string; label: string; image?: string }[]
  activeId?: string
  onSelect?: (id: string) => void
  className?: string
}

export function CategoryTileRow({ categories, activeId, onSelect, className }: CategoryTileRowProps) {
  return (
    <div className={cn('w-full overflow-x-auto scrollbar-none', className)}>
      <div className="flex gap-4 pb-2 min-w-max mx-auto px-6 md:px-0 justify-center">
        {categories.map(cat => (
          <CategoryTile
            key={cat.id}
            label={cat.label}
            image={cat.image}
            active={activeId === cat.id}
            onClick={() => onSelect?.(cat.id)}
          />
        ))}
      </div>
    </div>
  )
}
