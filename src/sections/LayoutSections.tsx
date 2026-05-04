import { useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Button } from '../components/Button'

// ════════════════════════════════════════════════════════
// Accordion
// ════════════════════════════════════════════════════════

export interface AccordionItemProps {
  question: string
  answer: ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border-default">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cn(
          'flex w-full items-center justify-between gap-200',
          'py-200 text-left text-p-md font-medium text-text-primary',
          'hover:text-brand-red transition-colors duration-150',
        )}
      >
        <span>{question}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className={cn('flex-shrink-0 transition-transform duration-200', open && 'rotate-180')}>
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={cn('overflow-hidden transition-all duration-200', open ? 'max-h-[600px] pb-200 opacity-100' : 'max-h-0 opacity-0')}>
        <div className="text-p-md text-text-secondary leading-relaxed">{answer}</div>
      </div>
    </div>
  )
}

export interface AccordionProps {
  items: AccordionItemProps[]
  sectionTitle?: string
  sectionSubtitle?: string
  multi?: boolean
  className?: string
}

export function Accordion({ items, sectionTitle, sectionSubtitle, className }: AccordionProps) {
  return (
    <section className={cn('w-full py-600 md:py-800', className)}>
      <div className="mx-auto max-w-container-lg px-200 md:px-600">
        {(sectionTitle || sectionSubtitle) && (
          <div className="mb-400 flex flex-col gap-100">
            {sectionTitle && <h2 className="text-h2-mobile md:text-h2 font-bold text-text-primary">{sectionTitle}</h2>}
            {sectionSubtitle && <p className="text-p-lg text-text-secondary">{sectionSubtitle}</p>}
          </div>
        )}
        <div className="divide-y divide-border-default border-t border-border-default">
          {items.map((item, i) => <AccordionItem key={i} {...item} />)}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// Final CTA
// ════════════════════════════════════════════════════════

export interface FinalCTAProps {
  h2: string
  content?: string
  primaryButton?: { label: string; onClick?: () => void; href?: string }
  secondaryButton?: { label: string; onClick?: () => void; href?: string }
  background?: 'red' | 'dark' | 'light'
  className?: string
}

export function FinalCTA({ h2, content, primaryButton, secondaryButton, className }: FinalCTAProps) {
  return (
    <section className={cn('w-full py-800 md:py-[80px] bg-[#e9e9e9]', className)}>
      <div className="mx-auto max-w-container-lg px-200 md:px-600">
        <div className="bg-white rounded-xl shadow-sm flex flex-col items-center text-center gap-300 py-800 px-400">
          <h2 className="text-h2-mobile md:text-h2 font-bold max-w-2xl text-text-primary">{h2}</h2>
          {content && <p className="text-p-lg max-w-xl text-text-secondary">{content}</p>}
          {(primaryButton || secondaryButton) && (
            <div className="flex flex-wrap items-center justify-center gap-200 pt-100">
              {primaryButton && (
                <Button variant="primary" size="large" onClick={primaryButton.onClick}>
                  {primaryButton.label}
                </Button>
              )}
              {secondaryButton && (
                <Button variant="secondary" size="large" onClick={secondaryButton.onClick}>
                  {secondaryButton.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ════════════════════════════════════════════════════════
// Navigation (simple — use sections/Navigation.tsx for full version)
// ════════════════════════════════════════════════════════

export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

export interface NavigationProps {
  logo?: ReactNode
  logoText?: string
  links?: NavLink[]
  ctaButton?: { label: string; href?: string; onClick?: () => void }
  sticky?: boolean
  className?: string
}

export function Navigation({ logo, logoText = 'ViewSonic', links = [], ctaButton, sticky = true, className }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <header className={cn('w-full bg-surface-default border-b border-border-default z-50', sticky && 'sticky top-0', className)}>
      <div className="mx-auto max-w-container-lg px-200 md:px-600">
        <div className="flex h-14 items-center gap-400">
          <a href="/" className="flex items-center gap-150 flex-shrink-0">
            {logo || <span className="text-p-lg font-bold text-brand-red">{logoText}</span>}
          </a>
          <nav className="hidden md:flex items-center gap-0 flex-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="px-200 py-100 text-p-sm font-medium text-text-secondary hover:text-brand-red transition-colors duration-150 whitespace-nowrap">
                {link.label}
              </a>
            ))}
          </nav>
          {ctaButton && (
            <div className="hidden md:block ml-auto">
              <Button variant="primary" size="small" onClick={ctaButton.onClick}>{ctaButton.label}</Button>
            </div>
          )}
          <button className="ml-auto flex flex-col gap-[5px] p-100 md:hidden" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
            <span className={cn('block h-[2px] w-5 bg-text-primary transition-all duration-200', mobileOpen && 'translate-y-[7px] rotate-45')} />
            <span className={cn('block h-[2px] w-5 bg-text-primary transition-all duration-200', mobileOpen && 'opacity-0')} />
            <span className={cn('block h-[2px] w-5 bg-text-primary transition-all duration-200', mobileOpen && '-translate-y-[7px] -rotate-45')} />
          </button>
        </div>
        {mobileOpen && (
          <nav className="flex flex-col border-t border-border-default py-200 md:hidden">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="py-150 px-100 text-p-sm font-medium text-text-secondary hover:text-brand-red">{link.label}</a>
            ))}
            {ctaButton && (
              <div className="pt-200">
                <Button variant="primary" size="small" onClick={ctaButton.onClick}>{ctaButton.label}</Button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

// ════════════════════════════════════════════════════════
// Footer
// ════════════════════════════════════════════════════════

export interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}

export interface FooterProps {
  logo?: ReactNode
  logoText?: string
  tagline?: string
  columns?: FooterColumn[]
  socialLinks?: { platform: string; href: string; icon?: ReactNode }[]
  copyright?: string
  className?: string
}

export function Footer({ logo, logoText = 'ViewSonic', tagline, columns = [], socialLinks = [], copyright, className }: FooterProps) {
  return (
    <footer className={cn('w-full bg-gray-900 text-white py-600 md:py-800', className)}>
      <div className="mx-auto max-w-container-lg px-200 md:px-600">
        <div className={cn('grid grid-cols-2 gap-400 pb-500 border-b border-white/10', columns.length > 0 ? 'md:grid-cols-[200px_repeat(auto-fill,minmax(140px,1fr))]' : 'md:grid-cols-1')}>
          <div className="col-span-2 md:col-span-1 flex flex-col gap-200">
            <a href="/" className="inline-flex">
              {logo || <span className="text-p-lg font-bold text-brand-red">{logoText}</span>}
            </a>
            {tagline && <p className="text-p-sm text-white/60 max-w-[200px]">{tagline}</p>}
            {socialLinks.length > 0 && (
              <div className="flex gap-150 mt-100">
                {socialLinks.map((s) => (
                  <a key={s.platform} href={s.href} aria-label={s.platform} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    {s.icon || <span className="text-p-xs">{s.platform[0]}</span>}
                  </a>
                ))}
              </div>
            )}
          </div>
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-150">
              <p className="text-p-sm font-semibold text-white">{col.title}</p>
              {col.links.map((link) => (
                <a key={link.href} href={link.href} className="text-p-sm text-white/60 hover:text-white transition-colors">{link.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="pt-300">
          <p className="text-p-xs text-white/40">{copyright || `© ${new Date().getFullYear()} ViewSonic Corporation. All rights reserved.`}</p>
        </div>
      </div>
    </footer>
  )
}
