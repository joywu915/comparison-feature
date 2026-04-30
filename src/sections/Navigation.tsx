import { useState } from 'react'
import { cn } from '../lib/utils'

// ─────────────────────────────────────────────
// Navigation — 1:1 with Figma node 14992:148419
// Two layers:
// 1. Universal Nav — gray bg, home icon, vertical links, support
// 2. Global Nav — white bg, logo, main links with chevron, search, CTA button
// ─────────────────────────────────────────────

export interface UniversalNavProps {
  verticals?: { label: string; href: string }[]
  supportHref?: string
  homeHref?: string
}

export interface GlobalNavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export interface NavigationProps {
  // Universal nav
  verticals?: { label: string; href: string }[]
  supportHref?: string
  homeHref?: string
  // Global nav
  logoSrc?: string
  logoText?: string
  links?: GlobalNavLink[]
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: () => void
  onSearchClick?: () => void
  className?: string
}

// ── Icons ──

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 8.5L10 2l7 6.5V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5Z" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 18V12h5v6" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="8" height="7" viewBox="0 0 8 7" fill="none" aria-hidden>
      <path d="M1 1.5l3 3 3-3" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="8.5" cy="8.5" r="5.5" stroke="#2a2a2a" strokeWidth="1.5" />
      <path d="M13 13l4 4" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
      <rect x="1" y="1" width="14" height="10" rx="1" stroke="white" strokeWidth="1.5" />
      <path d="M1 2l7 5 7-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ── Main Component ──

export function Navigation({
  verticals = [
    { label: 'Education', href: '#' },
    { label: 'Business', href: '#' },
  ],
  supportHref = '#',
  homeHref = '#',
  logoSrc,
  logoText = 'ViewSonic',
  links = [
    { label: 'Hardware', href: '#' },
    { label: 'Software', href: '#' },
    { label: 'Resources', href: '#' },
  ],
  ctaLabel = 'Talk to an Expert',
  ctaHref = '#',
  onCtaClick,
  onSearchClick,
  className,
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={cn(
        'w-full bg-white sticky top-0 z-50',
        'shadow-[0_2px_16px_rgba(0,0,0,0.10)]',
        className,
      )}
    >
      {/* ── Layer 1: Universal Navigation ── */}
      <div className="w-full bg-[#f2f2f2]">
        <div className="mx-auto max-w-[1170px] h-8 flex items-center justify-between">
          {/* Left: home + verticals */}
          <div className="flex items-center h-full">
            {/* Home icon — white background */}
            <a
              href={homeHref}
              aria-label="Home"
              className="flex items-center justify-center h-full px-3 bg-white hover:bg-gray-50 transition-colors"
            >
              <HomeIcon />
            </a>

            {/* Vertical links */}
            {verticals.map((v) => (
              <a
                key={v.href}
                href={v.href}
                className="flex items-center justify-center h-full px-4 text-[12px] font-normal text-[#2a2a2a] hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                {v.label}
              </a>
            ))}
          </div>

          {/* Right: Support */}
          <a
            href={supportHref}
            className="text-[14px] font-normal text-[#343538] hover:text-brand-red transition-colors whitespace-nowrap pr-4"
          >
            Support
          </a>
        </div>
      </div>

      {/* ── Layer 2: Global Navigation ── */}
      <div className="w-full bg-white px-4 py-3">
        <div className="mx-auto max-w-[1170px] flex items-center justify-between">

          {/* Left: Logo + nav links */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={homeHref} className="flex-shrink-0">
              {logoSrc ? (
                <img src={logoSrc} alt={logoText} className="h-[22px]" />
              ) : (
                <img src="/comparison-feature/viewsonic-logo.svg" alt="ViewSonic" className="h-[22px]" />
              )}
            </a>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 text-[14px] font-normal text-[#2a2a2a] hover:text-brand-red transition-colors whitespace-nowrap"
                >
                  {link.label}
                  <ChevronDown />
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Search + CTA */}
          <div className="flex items-center gap-4">
            {/* Search icon */}
            <button
              onClick={onSearchClick}
              aria-label="Search"
              className="hidden md:flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <SearchIcon />
            </button>

            {/* Talk to an Expert button */}
            <a
              href={ctaHref}
              onClick={onCtaClick}
              className={cn(
                'hidden md:flex items-center gap-2',
                'bg-brand-red text-white',
                'px-6 py-3 rounded-full',
                'text-[16px] font-bold leading-[22px]',
                'hover:bg-red-700 transition-colors whitespace-nowrap',
              )}
            >
              {ctaLabel}
              <MailIcon />
            </a>

            {/* Mobile hamburger */}
            <button
              className="flex flex-col gap-[5px] p-1 md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className={cn('block h-[2px] w-5 bg-[#2a2a2a] transition-all duration-200', mobileOpen && 'translate-y-[7px] rotate-45')} />
              <span className={cn('block h-[2px] w-5 bg-[#2a2a2a] transition-all duration-200', mobileOpen && 'opacity-0')} />
              <span className={cn('block h-[2px] w-5 bg-[#2a2a2a] transition-all duration-200', mobileOpen && '-translate-y-[7px] -rotate-45')} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border-default mt-3 pt-3 flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center justify-between py-2 text-[14px] text-[#2a2a2a] hover:text-brand-red"
              >
                {link.label}
                <ChevronDown />
              </a>
            ))}
            <div className="pt-2 border-t border-border-default">
              <a
                href={ctaHref}
                className="flex items-center justify-center gap-2 w-full bg-brand-red text-white px-6 py-3 rounded-full text-[16px] font-bold"
              >
                {ctaLabel}
                <MailIcon />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
