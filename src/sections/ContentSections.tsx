import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Button } from '../components/Button'
import { ImagePlaceholder } from '../components/ImagePlaceholder'

// ════════════════════════════════════════════════════════
// USP Card
// ════════════════════════════════════════════════════════

export interface USPCardProps {
  h3: string
  description?: string
  showContent?: boolean
  icon?: string | ReactNode
  showButton?: boolean
  button?: { label: string; onClick?: () => void }
  align?: 'left' | 'center'
  className?: string
}

export function USPCard({
  h3,
  description,
  showContent = true,
  icon,
  showButton = false,
  button,
  align = 'left',
  className,
}: USPCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 p-8 bg-white rounded-md',
        'shadow-[0_4px_12px_rgba(0,0,0,0.10)]',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {icon && (
        <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 rounded-md bg-surface-subtle-gray overflow-hidden">
          {typeof icon === 'string' ? (
            <img src={icon} alt="" className="w-full h-full object-contain" />
          ) : (
            icon
          )}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h3 className="text-h3 font-bold text-text-primary leading-[30px]">{h3}</h3>
        {showContent && description && (
          <p className="text-p-md text-text-secondary leading-[22px]">{description}</p>
        )}
      </div>

      {showButton && button && (
        <div>
          <Button variant="primary" onClick={button.onClick}>
            {button.label}
          </Button>
        </div>
      )}
    </div>
  )
}

export interface USPSectionProps {
  sectionTitle?: string
  sectionSubtitle?: string
  cards: USPCardProps[]
  columns?: 2 | 3 | 4
  className?: string
}

export function USPSection({
  sectionTitle,
  sectionSubtitle,
  cards,

  className,
}: USPSectionProps) {
  const colClass: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className={cn('w-full py-600 md:py-800', className)}>
      <div className="mx-auto max-w-container-lg px-200 md:px-600">
        {(sectionTitle || sectionSubtitle) && (
          <div className="mb-400 flex flex-col gap-100 text-center items-center">
            {sectionSubtitle && (
              <p className="text-h5 font-bold text-text-secondary">{sectionSubtitle}</p>
            )}
            {sectionTitle && (
              <h2 className="text-h2-mobile md:text-h2 font-bold text-text-primary">{sectionTitle}</h2>
            )}
          </div>
        )}
        <div className={cn('grid grid-cols-1 gap-300', colClass[3])}>
          {cards.map((card, i) => (
            <USPCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// Testimonial
// ════════════════════════════════════════════════════════

export interface TestimonialProps {
  name: string
  position?: string
  showPosition?: boolean
  content: string
  avatar?: string
  showImage?: boolean
  logo?: string
  showLink?: boolean
  link?: { label: string; href: string }
  className?: string
}

export function Testimonial({
  name,
  position,
  showPosition = true,
  content,
  avatar,
  showImage = true,
  showLink = false,
  link,
  className,
}: TestimonialProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 p-8 bg-white rounded-md',
        'shadow-[0_4px_12px_rgba(0,0,0,0.10)]',
        className,
      )}
    >
      <div className="flex items-start gap-4">
        {showImage && (
          <div className="flex-shrink-0 w-20 h-20 bg-surface-disable rounded-sm overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="3" width="18" height="14" rx="1" stroke="#cfcfcf" strokeWidth="1.5" />
                  <path d="M3 13l5-4 4 3 3-2 6 4" stroke="#cfcfcf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <p className="text-p-md font-bold text-text-primary leading-[22px]">{name}</p>
          {showPosition && position && (
            <p className="text-p-sm text-text-secondary leading-[18px]">{position}</p>
          )}
        </div>
      </div>

      <p className="text-p-md text-text-primary leading-[22px] flex-1">{content}</p>

      {showLink && link && (
        <a
          href={link.href}
          className="inline-flex items-center gap-1 text-p-sm text-text-primary underline underline-offset-2 hover:text-brand-red transition-colors"
        >
          {link.label} +
        </a>
      )}
    </div>
  )
}

export interface TestimonialSectionProps {
  sectionTitle?: string
  sectionSubtitle?: string
  testimonials: TestimonialProps[]
  columns?: 1 | 2 | 3
  className?: string
}

export function TestimonialSection({
  sectionTitle,
  sectionSubtitle,
  testimonials,

  className,
}: TestimonialSectionProps) {
  return (
    <section className={cn('w-full bg-white py-600 md:py-800', className)}>
      <div className="mx-auto max-w-container-lg px-200 md:px-600">
        {(sectionTitle || sectionSubtitle) && (
          <div className="mb-400 flex flex-col gap-100 text-center items-center">
            {sectionSubtitle && (
              <p className="text-h5 font-bold text-text-secondary">{sectionSubtitle}</p>
            )}
            {sectionTitle && (
              <h2 className="text-h2 font-bold text-text-primary">{sectionTitle}</h2>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-300">
          {testimonials.map((t, i) => (
            <Testimonial key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// Anchor Link
// ════════════════════════════════════════════════════════

export interface AnchorLinkProps {
  title: string
  href: string
  active?: boolean
  className?: string
}

export function AnchorLink({ title, href, active = false, className }: AnchorLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center gap-100 px-200 py-100',
        'text-p-sm font-medium whitespace-nowrap',
        'border-b-2 transition-colors duration-150',
        active
          ? 'border-brand-red text-brand-red'
          : 'border-transparent text-text-secondary hover:border-brand-red hover:text-brand-red',
        className,
      )}
    >
      {title}
    </a>
  )
}

export interface AnchorNavProps {
  links: AnchorLinkProps[]
  activeHref?: string
  sticky?: boolean
  className?: string
}

export function AnchorNav({ links, activeHref, sticky = true, className }: AnchorNavProps) {
  return (
    <nav
      className={cn(
        'w-full border-b border-border-default bg-surface-default',
        sticky && 'sticky top-0 z-40',
        className,
      )}
    >
      <div className="mx-auto max-w-container-lg px-200 md:px-600">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {links.map((link) => (
            <AnchorLink
              key={link.href}
              {...link}
              active={activeHref ? link.href === activeHref : link.active}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

// ════════════════════════════════════════════════════════
// RC Block
// ════════════════════════════════════════════════════════

export interface RCBlockProps {
  headingLevel?: 'h2' | 'h3'
  heading: string
  h5?: string
  showH5?: boolean
  content: string
  imagePosition?: 'left' | 'right'
  image?: string
  imageRatio?: '4:3' | '16:9'
  imageRadius?: boolean
  layout?: 'horizontal' | 'vertical'
  shadow?: boolean
  primaryButton?: { label: string; onClick?: () => void }
  secondaryButton?: { label: string; onClick?: () => void }
  padding?: boolean
  className?: string
}

export function RCBlock({
  headingLevel = 'h3',
  heading,
  h5,
  showH5 = false,
  content,
  imagePosition = 'right',
  image,
  imageRatio = '4:3',
  imageRadius = false,
  layout = 'horizontal',
  shadow = false,
  primaryButton,
  secondaryButton,
  padding = true,
  className,
}: RCBlockProps) {
  const isHorizontal = layout === 'horizontal'
  const imageFirst = imagePosition === 'left'

  const textBlock = (
    <div className="flex flex-col gap-200 justify-center">
      {showH5 && h5 && (
        <p className="text-h5 font-semibold uppercase tracking-widest text-brand-red">{h5}</p>
      )}
      {headingLevel === 'h2' ? (
        <h2 className="text-h2-mobile md:text-h2 font-bold text-text-primary">{heading}</h2>
      ) : (
        <h3 className="text-h3-mobile md:text-h3 font-semibold text-text-primary">{heading}</h3>
      )}
      <p className="text-p-md text-text-secondary leading-relaxed">{content}</p>
      {(primaryButton || secondaryButton) && (
        <div className="flex flex-wrap gap-200 pt-100">
          {primaryButton && (
            <Button variant="primary" onClick={primaryButton.onClick}>{primaryButton.label}</Button>
          )}
          {secondaryButton && (
            <Button variant="secondary" onClick={secondaryButton.onClick}>{secondaryButton.label}</Button>
          )}
        </div>
      )}
    </div>
  )

  const imageBlock = (
    <div className="w-full">
      <ImagePlaceholder
        src={image}
        ratio={imageRatio === '4:3' ? '4:3' : '16:9'}
        radius={imageRadius ? 'md' : 'none'}
      />
    </div>
  )

  return (
    <div
      className={cn(
        'w-full rounded-sm',
        padding && 'p-300 md:p-400',
        shadow && 'shadow-md',
        className,
      )}
    >
      {isHorizontal ? (
        <div
          className={cn(
            'grid grid-cols-1 gap-300 md:gap-400',
            'md:grid-cols-2 md:items-center',
            imageFirst && 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1',
          )}
        >
          {imageFirst ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
        </div>
      ) : (
        <div className="flex flex-col gap-300">
          {imageBlock}
          {textBlock}
        </div>
      )}
    </div>
  )
}
