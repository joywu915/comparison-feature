import { useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { ImagePlaceholder } from '../components/ImagePlaceholder'
import { Button } from '../components/Button'

// ════════════════════════════════════════════════════════
// Slider
// Figma: "slider" — Device, Style: h3 no padding | h3 primary | h2 no padding
//        Order: first | middle | last (for looping)
// ════════════════════════════════════════════════════════

export interface SliderItem {
  image?: string
  h2?: string
  h3?: string
  h5?: string
  content?: string
  primaryButton?: { label: string; onClick?: () => void }
  secondaryButton?: { label: string; onClick?: () => void }
}

export interface SliderProps {
  items: SliderItem[]
  /** Figma Style variant */
  style?: 'h3-no-padding' | 'h3-primary' | 'h2-no-padding'
  autoPlay?: boolean
  className?: string
}

export function Slider({ items, style = 'h3-primary', className }: SliderProps) {
  const [current, setCurrent] = useState(0)
  const total = items.length

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  const item = items[current]
  const isH2 = style === 'h2-no-padding'

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      {/* Slide */}
      <div className="relative w-full">
        <ImagePlaceholder src={item.image} ratio="16:9" />

        {/* Text overlay */}
        <div className={cn(
          'absolute inset-0 flex flex-col justify-end',
          style === 'h3-primary' ? 'bg-gradient-to-t from-black/70 to-transparent p-400 md:p-600' : 'p-300 md:p-500',
        )}>
          {item.h5 && (
            <p className="text-h5 font-semibold uppercase tracking-widest text-brand-red mb-100">{item.h5}</p>
          )}
          {isH2 && item.h2 ? (
            <h2 className="text-h2-mobile md:text-h2 font-bold text-white mb-100">{item.h2}</h2>
          ) : item.h3 ? (
            <h3 className="text-h3-mobile md:text-h3 font-semibold text-white mb-100">{item.h3}</h3>
          ) : null}
          {item.content && (
            <p className="text-p-md text-white/80 mb-200 max-w-lg">{item.content}</p>
          )}
          {(item.primaryButton || item.secondaryButton) && (
            <div className="flex gap-200 flex-wrap">
              {item.primaryButton && (
                <Button variant="primary" onClick={item.primaryButton.onClick}>{item.primaryButton.label}</Button>
              )}
              {item.secondaryButton && (
                <Button variant="secondary" onClick={item.secondaryButton.onClick}>{item.secondaryButton.label}</Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Arrows */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-200 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M13 4l-6 6 6 6" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-200 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M7 4l6 6-6 6" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {total > 1 && (
        <div className="absolute bottom-200 left-1/2 -translate-x-1/2 flex gap-100">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === current ? 'w-6 bg-brand-red' : 'w-2 bg-white/60 hover:bg-white',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════
// Tab
// Figma: "tab containor" — Device, Type: with arrow|default, Tab: Tab1..Tab6
// ════════════════════════════════════════════════════════

export interface TabItem {
  label: string
  content: ReactNode
}

export interface TabProps {
  tabs: TabItem[]
  /** Figma: Type variant */
  type?: 'default' | 'with-arrow'
  defaultTab?: number
  className?: string
}

export function Tab({ tabs, type = 'default', defaultTab = 0, className }: TabProps) {
  const [active, setActive] = useState(defaultTab)

  return (
    <div className={cn('w-full', className)}>
      {/* Tab bar */}
      <div className={cn(
        'flex border-b border-border-default overflow-x-auto scrollbar-none',
        type === 'with-arrow' && 'relative',
      )}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'flex-shrink-0 px-300 py-200 text-p-sm font-medium whitespace-nowrap',
              'border-b-2 -mb-px transition-colors duration-150',
              i === active
                ? 'border-brand-red text-brand-red'
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-default',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-300">
        {tabs[active]?.content}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════
// Product Card
// Figma: "product card" — with image, title, price, tag, button
// ════════════════════════════════════════════════════════

export interface ProductCardProps {
  image?: string
  tag?: string
  name: string
  description?: string
  price?: string
  originalPrice?: string
  button?: { label: string; onClick?: () => void }
  href?: string
  className?: string
}

export function ProductCard({
  image,
  tag,
  name,
  description,
  price,
  originalPrice,
  button,
  href,
  className,
}: ProductCardProps) {
  const Wrapper = href ? 'a' : 'div'

  return (
    <Wrapper
      href={href}
      className={cn(
        'group flex flex-col overflow-hidden rounded-sm border border-border-default bg-surface-default',
        'transition-shadow duration-200 hover:shadow-md',
        href && 'cursor-pointer',
        className,
      )}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <ImagePlaceholder src={image} ratio="1:1" />
        {tag && (
          <span className="absolute left-200 top-200 rounded-xs bg-brand-red px-150 py-50 text-p-xs font-medium text-white">
            {tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-100 p-200">
        <h3 className="text-p-md font-semibold text-text-primary group-hover:text-brand-red transition-colors line-clamp-2">
          {name}
        </h3>
        {description && (
          <p className="text-p-sm text-text-secondary line-clamp-2">{description}</p>
        )}
        {price && (
          <div className="mt-auto flex items-baseline gap-100 pt-100">
            <span className="text-p-lg font-bold text-text-primary">{price}</span>
            {originalPrice && (
              <span className="text-p-sm text-text-tertiary line-through">{originalPrice}</span>
            )}
          </div>
        )}
        {button && (
          <Button variant="primary" size="small" fullWidth onClick={button.onClick} className="mt-100">
            {button.label}
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

export interface ProductGridProps {
  sectionTitle?: string
  products: ProductCardProps[]
  columns?: 2 | 3 | 4
  className?: string
}

export function ProductGrid({ sectionTitle, products, columns = 4, className }: ProductGridProps) {
  const colClass: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }
  return (
    <section className={cn('w-full py-600 md:py-800', className)}>
      <div className="mx-auto max-w-container-lg px-200 md:px-600">
        {sectionTitle && (
          <h2 className="mb-400 text-h2-mobile md:text-h2 font-bold text-text-primary">{sectionTitle}</h2>
        )}
        <div className={cn('grid grid-cols-1 gap-300', colClass[columns])}>
          {products.map((p, i) => <ProductCard key={i} {...p} />)}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// Library / Press Card
// Figma: "library/press card"
// ════════════════════════════════════════════════════════

export interface PressCardProps {
  image?: string
  category?: string
  date?: string
  title: string
  excerpt?: string
  href?: string
  className?: string
}

export function PressCard({ image, category, date, title, excerpt, href, className }: PressCardProps) {
  const Wrapper = href ? 'a' : 'div'
  return (
    <Wrapper
      href={href}
      className={cn(
        'group flex flex-col overflow-hidden rounded-sm border border-border-default bg-surface-default',
        'transition-shadow duration-200 hover:shadow-md',
        href && 'cursor-pointer',
        className,
      )}
    >
      <ImagePlaceholder src={image} ratio="16:9" />
      <div className="flex flex-1 flex-col gap-100 p-300">
        <div className="flex items-center gap-200">
          {category && (
            <span className="text-p-xs font-semibold uppercase tracking-wide text-brand-red">{category}</span>
          )}
          {date && <span className="text-p-xs text-text-tertiary ml-auto">{date}</span>}
        </div>
        <h3 className="text-p-md font-semibold text-text-primary group-hover:text-brand-red transition-colors line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="text-p-sm text-text-secondary line-clamp-3">{excerpt}</p>
        )}
      </div>
    </Wrapper>
  )
}

export interface PressGridProps {
  sectionTitle?: string
  cards: PressCardProps[]
  columns?: 2 | 3
  className?: string
}

export function PressGrid({ sectionTitle, cards, columns = 3, className }: PressGridProps) {
  return (
    <section className={cn('w-full py-600 md:py-800', className)}>
      <div className="mx-auto max-w-container-lg px-200 md:px-600">
        {sectionTitle && (
          <h2 className="mb-400 text-h2-mobile md:text-h2 font-bold text-text-primary">{sectionTitle}</h2>
        )}
        <div className={cn('grid grid-cols-1 gap-300', columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
          {cards.map((c, i) => <PressCard key={i} {...c} />)}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// Bento Box
// Figma: "Bento Box" — flexible grid of feature highlight tiles
// ════════════════════════════════════════════════════════

export type BentoSize = '1x1' | '1x2' | '2x1' | '2x2'

export interface BentoItemProps {
  size?: BentoSize
  image?: string
  tag?: string
  title: string
  description?: string
  background?: 'white' | 'gray' | 'dark' | 'red'
  className?: string
}

const bentoSizeClass: Record<BentoSize, string> = {
  '1x1': 'col-span-1 row-span-1',
  '1x2': 'col-span-1 row-span-2',
  '2x1': 'col-span-2 row-span-1',
  '2x2': 'col-span-2 row-span-2',
}

const bentoBgClass: Record<string, string> = {
  white: 'bg-surface-default text-text-primary',
  gray: 'bg-surface-subtle-gray text-text-primary',
  dark: 'bg-gray-900 text-white',
  red: 'bg-brand-red text-white',
}

export function BentoItem({ size = '1x1', image, tag, title, description, background = 'gray', className }: BentoItemProps) {
  const isDark = background === 'dark' || background === 'red'
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md p-300 flex flex-col justify-end min-h-[200px]',
        bentoSizeClass[size],
        bentoBgClass[background],
        className,
      )}
    >
      {image && (
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
      )}
      {image && <div className="absolute inset-0 bg-black/40" aria-hidden />}
      <div className="relative flex flex-col gap-100">
        {tag && (
          <span className={cn('text-p-xs font-semibold uppercase tracking-wide', isDark || image ? 'text-white/70' : 'text-brand-red')}>
            {tag}
          </span>
        )}
        <h3 className={cn('text-p-lg font-bold', isDark || image ? 'text-white' : 'text-text-primary')}>{title}</h3>
        {description && (
          <p className={cn('text-p-sm', isDark || image ? 'text-white/70' : 'text-text-secondary')}>{description}</p>
        )}
      </div>
    </div>
  )
}

export interface BentoBoxProps {
  sectionTitle?: string
  items: BentoItemProps[]
  className?: string
}

export function BentoBox({ sectionTitle, items, className }: BentoBoxProps) {
  return (
    <section className={cn('w-full py-600 md:py-800', className)}>
      <div className="mx-auto max-w-container-lg px-200 md:px-600">
        {sectionTitle && (
          <h2 className="mb-400 text-h2-mobile md:text-h2 font-bold text-text-primary">{sectionTitle}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-200">
          {items.map((item, i) => <BentoItem key={i} {...item} />)}
        </div>
      </div>
    </section>
  )
}
