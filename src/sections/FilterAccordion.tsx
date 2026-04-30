import { useState } from 'react'
import { cn } from '../lib/utils'

// ─────────────────────────────────────────────
// FilterAccordion
// 左側 filter 側欄的每個 accordion 區塊
// ─────────────────────────────────────────────

export interface FilterOption {
  id: string
  label: string
  count?: number
}

export interface FilterAccordionProps {
  title: string
  options: FilterOption[]
  selectedIds?: string[]
  onToggle?: (id: string) => void
  defaultOpen?: boolean
  className?: string
}

export function FilterAccordion({
  title,
  options,
  selectedIds = [],
  onToggle,
  defaultOpen = true,
  className,
}: FilterAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn('border-b border-[#e9e9e9] py-3', className)}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between py-1"
      >
        <span className="text-[13px] font-bold text-[#2a2a2a]">{title}</span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden
          className={cn('flex-shrink-0 transition-transform duration-200', open && 'rotate-180')}
        >
          <path d="M4 6l4 4 4-4" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Options */}
      {open && (
        <div className="flex flex-col gap-1.5 mt-2">
          {options.map(opt => {
            const isSelected = selectedIds.includes(opt.id)
            return (
              <label
                key={opt.id}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle?.(opt.id)}
                  className="sr-only peer"
                />
                {/* Custom checkbox */}
                <span
                  className={cn(
                    'flex-shrink-0 flex items-center justify-center w-3.5 h-3.5 rounded-[2px] border transition-all',
                    isSelected
                      ? 'bg-brand-red border-brand-red'
                      : 'bg-white border-[#cfcfcf] group-hover:border-[#767676]',
                  )}
                >
                  {isSelected && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden>
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className={cn('text-[12px] leading-[18px]', isSelected ? 'text-[#2a2a2a] font-medium' : 'text-[#404041]')}>
                  {opt.label}
                  {opt.count !== undefined && (
                    <span className="text-[#999] ml-1">({opt.count})</span>
                  )}
                </span>
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// FilterSidebar — 完整的左側 filter 側欄
// ─────────────────────────────────────────────

export interface FilterGroup {
  id: string
  title: string
  options: FilterOption[]
  defaultOpen?: boolean
}

export interface FilterSidebarProps {
  filters: FilterGroup[]
  selectedFilters: Record<string, string[]>
  onToggleFilter: (groupId: string, optionId: string) => void
  onClearAll: () => void
  totalResults?: number
  className?: string
}

export function FilterSidebar({
  filters,
  selectedFilters,
  onToggleFilter,
  onClearAll,
  totalResults,
  className,
}: FilterSidebarProps) {
  const totalSelected = Object.values(selectedFilters).flat().length

  return (
    <aside className={cn('w-[200px] flex-shrink-0', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[14px] font-bold text-[#2a2a2a]">Filter</span>
        {totalResults !== undefined && (
          <span className="text-[12px] text-[#767676]">{totalResults} results</span>
        )}
      </div>

      {/* Selected tags */}
      {totalSelected > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {Object.entries(selectedFilters).flatMap(([groupId, ids]) =>
            ids.map(id => {
              const group = filters.find(f => f.id === groupId)
              const option = group?.options.find(o => o.id === id)
              return option ? (
                <span
                  key={`${groupId}-${id}`}
                  className="flex items-center gap-1 bg-[#f2f2f2] text-[#2a2a2a] text-[11px] px-2 py-0.5 rounded-full"
                >
                  {option.label}
                  <button onClick={() => onToggleFilter(groupId, id)} aria-label={`Remove ${option.label}`}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                      <path d="M1 1l6 6M7 1L1 7" stroke="#767676" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                </span>
              ) : null
            })
          )}
          <button
            onClick={onClearAll}
            className="text-[11px] text-brand-red hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter groups */}
      {filters.map(group => (
        <FilterAccordion
          key={group.id}
          title={group.title}
          options={group.options}
          selectedIds={selectedFilters[group.id] ?? []}
          onToggle={id => onToggleFilter(group.id, id)}
          defaultOpen={group.defaultOpen}
        />
      ))}
    </aside>
  )
}
