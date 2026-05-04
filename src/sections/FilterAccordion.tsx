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

      {open && (
        <div className="flex flex-col gap-1.5 mt-2">
          {options.map(opt => {
            const isSelected = selectedIds.includes(opt.id)
            return (
              <label key={opt.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle?.(opt.id)}
                  className="sr-only peer"
                />
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
// FilterSidebar
// Desktop: 左側固定側欄
// Mobile: Filter 按鈕 + 底部 Drawer
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalSelected = Object.values(selectedFilters).flat().length

  // ── Selected tags (desktop only) ──
  const SelectedTags = () => (
    <>
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
          <button onClick={onClearAll} className="text-[11px] text-brand-red hover:underline">
            Clear all
          </button>
        </div>
      )}
    </>
  )

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className={cn('w-[200px] flex-shrink-0 hidden md:block', className)}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] font-bold text-[#2a2a2a]">Filter</span>
          {totalResults !== undefined && (
            <span className="text-[12px] text-[#767676]">{totalResults} results</span>
          )}
        </div>
        <SelectedTags />
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

      {/* ── Mobile filter button ── */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 border border-[#cfcfcf] text-[#2a2a2a] px-3 py-2 rounded-sm text-[12px] font-medium"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Filter
          {totalSelected > 0 && (
            <span className="bg-brand-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalSelected}
            </span>
          )}
        </button>

        {/* ── Mobile drawer ── */}
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-xl max-h-[80vh] flex flex-col">
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#e9e9e9] flex-shrink-0">
                <span className="text-[16px] font-bold text-[#2a2a2a]">Filter</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close filter">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M4 4l12 12M16 4L4 16" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Drawer content — scrollable */}
              <div className="overflow-y-auto flex-1 px-6 py-2">
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
              </div>

              {/* Drawer footer */}
              <div className="flex-shrink-0 border-t border-[#e9e9e9] px-6 py-4 flex gap-3">
                <button
                  onClick={() => { onClearAll(); setMobileOpen(false) }}
                  className="flex-1 border border-[#cfcfcf] text-[#2a2a2a] py-3 rounded-full text-[14px] font-medium hover:border-[#767676] transition-colors"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 bg-brand-red text-white py-3 rounded-full text-[14px] font-bold hover:bg-red-700 transition-colors"
                >
                  Show {totalResults} results
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
