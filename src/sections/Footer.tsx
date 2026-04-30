import { useState } from 'react'
import { cn } from '../lib/utils'

// ─────────────────────────────────────────────
// Footer — 1:1 with Figma node 15016:54568
// Background: #f7f7f7 (light gray)
// Desktop: logo + social + 5 link columns
// Mobile: accordion columns
// ─────────────────────────────────────────────

export interface FooterLinkGroup {
  title: string
  bold?: boolean  // sub-category titles like "For Education"
  links: { label: string; href: string }[]
}

export interface FooterColumn {
  title: string
  groups: FooterLinkGroup[]
}

export interface FooterProps {
  logoSrc?: string
  logoText?: string
  region?: string
  socialLinks?: { platform: string; href: string }[]
  columns: FooterColumn[]
  legalLinks?: { label: string; href: string }[]
  copyright?: string
  className?: string
}

// Plus icon for mobile accordion
function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="#333" strokeWidth="1.5" strokeLinecap="round"
        className={cn('transition-transform duration-200', open && 'rotate-45')}
        style={{ transformOrigin: 'center', transform: open ? 'rotate(45deg)' : 'none' }}
      />
    </svg>
  )
}

// Mobile accordion column
function MobileColumn({ column }: { column: FooterColumn }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="w-full border-b border-[#ddd]">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between py-3"
      >
        <span className="text-[16px] font-bold text-[#2a2a2a] leading-[22px]">
          {column.title}
        </span>
        <PlusIcon open={open} />
      </button>
      {open && (
        <div className="pb-3 flex flex-col gap-2">
          {column.groups.map((group, gi) => (
            <div key={gi} className="flex flex-col gap-1">
              {group.title !== column.title && (
                <p className="text-[12px] font-bold text-[#2a2a2a] leading-[18px]">{group.title}</p>
              )}
              {group.links.map((link, li) => (
                <a key={li} href={link.href}
                  className="text-[12px] font-normal text-[#404041] leading-[18px] hover:text-[#db0025]">
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Footer({
  logoSrc = "/ViewSonic Corporate Logo.svg", logoText = "ViewSonic",
  region = 'Global',
  socialLinks = [],
  columns = [],
  legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of use', href: '#' },
    { label: 'Accessibility', href: '#' },
  ],
  copyright = 'Programs, specifications, pricing and availability are subject to change without notice. Selections, offers and programs may vary by country; see your ViewSonic representative for complete details. Copyright © ViewSonic Corporation 2000-2024. All rights reserved.',
  className,
}: FooterProps) {
  return (
    <footer className={cn('w-full bg-[#f7f7f7]', className)}>
      <div className="mx-auto max-w-[1600px] px-6 py-5">

        {/* ── Top bar: logo + social + region ── */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#ddd] pb-3 mb-3 gap-2">
          {/* Left: logo + FOLLOW US ON + icons */}
          <div className="flex flex-wrap items-center gap-0">
            {/* Logo */}
            <div className="pr-2.5 py-1">
              {logoSrc ? (
                <img src={logoSrc} alt={logoText} className="h-[17px]" />
              ) : (
                <span className="text-[14px] font-bold text-[#db0025]">{logoText}</span>
              )}
            </div>

            {/* FOLLOW US ON */}
            <div className="pr-2.5 py-1">
              <span className="text-[14.4px] font-bold text-[#555] uppercase tracking-wide">
                FOLLOW US ON
              </span>
            </div>

            {/* Social icons */}
            {socialLinks.map((s, i) => (
              <a key={i} href={s.href} aria-label={s.platform}
                className="pr-2.5 py-1 text-[#111] hover:text-[#db0025] text-[24px] leading-none">
                {s.platform}
              </a>
            ))}
          </div>

          {/* Right: Region */}
          <div className="flex items-center gap-1 text-[12px] text-[#222]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <circle cx="6" cy="6" r="5" stroke="#222" strokeWidth="1" />
              <path d="M6 1C6 1 4 3.5 4 6s2 5 2 5" stroke="#222" strokeWidth="1" fill="none" />
              <path d="M1 6h10" stroke="#222" strokeWidth="1" />
            </svg>
            <span>Region : <strong className="font-normal text-[#111]">{region}</strong></span>
          </div>
        </div>

        {/* ── Desktop: 5 columns ── */}
        <div className="hidden md:flex gap-3 w-full">
          {columns.map((col, ci) => (
            <div key={ci} className="flex-1 min-w-0 flex flex-col gap-3">
              {col.groups.map((group, gi) => (
                <div key={gi} className="flex flex-col gap-2">
                  {/* Column title (first group only) or sub-category title */}
                  {gi === 0 ? (
                    <p className="text-[16px] font-bold text-[#2a2a2a] leading-[22px]">
                      {col.title}
                    </p>
                  ) : null}
                  {/* Sub-category title */}
                  {group.title !== col.title && (
                    <p className="text-[12px] font-bold text-[#2a2a2a] leading-[18px]">
                      {group.title}
                    </p>
                  )}
                  {group.links.map((link, li) => (
                    <a key={li} href={link.href}
                      className="text-[12px] font-normal text-[#404041] leading-[18px] hover:text-[#db0025] transition-colors">
                      {link.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Mobile: accordion ── */}
        <div className="flex flex-col md:hidden">
          {columns.map((col, i) => (
            <MobileColumn key={i} column={col} />
          ))}
        </div>

        {/* ── Bottom: legal links + copyright ── */}
        <div className="mt-4 flex flex-col items-center gap-2 border-t border-[#ddd] pt-4">
          <div className="flex gap-0">
            {legalLinks.map((link, i) => (
              <a key={i} href={link.href}
                className="px-3 py-1.5 text-[9.6px] font-light text-[#111] hover:underline text-center">
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-[9.6px] font-light text-[#222] text-center max-w-3xl leading-[14px]">
            {copyright}
          </p>
        </div>

      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// Default ViewSonic footer data
// ─────────────────────────────────────────────

export const viewsonicFooterColumns: FooterColumn[] = [
  {
    title: 'Products',
    groups: [
      {
        title: 'Products',
        links: [
          { label: 'Monitors', href: '#' },
          { label: 'Projector', href: '#' },
          { label: 'Interactive Displays', href: '#' },
          { label: 'Direct View LED Displays', href: '#' },
          { label: 'Commercial Displays', href: '#' },
          { label: 'Pen Displays', href: '#' },
        ],
      },
      {
        title: 'Software',
        links: [
          { label: 'myViewBoard', href: '#' },
          { label: 'Manager', href: '#' },
          { label: 'ClassSwift', href: '#' },
          { label: 'TeamOne', href: '#' },
          { label: 'AirSync', href: '#' },
          { label: 'Display Portal', href: '#' },
          { label: 'vDisplay Manager', href: '#' },
          { label: 'Touch Controller', href: '#' },
          { label: 'vSplit', href: '#' },
          { label: 'Firmware Update Tool', href: '#' },
          { label: 'ColorPro Display Manager', href: '#' },
          { label: 'ColorPro Sense', href: '#' },
          { label: 'Colorbration+', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Solutions',
    groups: [
      {
        title: 'For Education',
        links: [
          { label: 'Education Home', href: '#' },
          { label: 'Higher Education', href: '#' },
          { label: "Teacher's Community", href: '#' },
          { label: '3D Campus', href: '#' },
        ],
      },
      {
        title: 'For Business',
        links: [
          { label: 'Business Home', href: '#' },
          { label: 'Meeting Rooms', href: '#' },
          { label: 'Personal Workspaces', href: '#' },
          { label: 'Office Communication', href: '#' },
          { label: 'Remote Device Management', href: '#' },
          { label: 'Digital Whiteboarding', href: '#' },
          { label: 'Microsoft Teams Rooms', href: '#' },
        ],
      },
      {
        title: 'For Consumer',
        links: [
          { label: 'Personal Display Solutions', href: '#' },
          { label: 'Gaming', href: '#' },
          { label: 'ColorPro', href: '#' },
          { label: 'Reimagine Your Space', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Resources',
    groups: [
      {
        title: 'Resources',
        links: [
          { label: 'Library', href: '#' },
          { label: 'Case Study', href: '#' },
          { label: 'Solution Brief', href: '#' },
          { label: 'Brochure', href: '#' },
          { label: 'White Paper', href: '#' },
          { label: 'Reports', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Support',
    groups: [
      {
        title: 'Support',
        links: [
          { label: 'Support Center', href: '#' },
          { label: 'Contact Us', href: '#' },
          { label: 'RMA Status', href: '#' },
          { label: 'Warranty Service', href: '#' },
          { label: 'Downloads', href: '#' },
          { label: 'General Inquiries', href: '#' },
          { label: 'Hardware Quick Start Guide', href: '#' },
          { label: 'Software Knowledge Base', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Company',
    groups: [
      {
        title: 'Company',
        links: [
          { label: 'About ViewSonic', href: '#' },
          { label: 'Environmental Social and Governance', href: '#' },
          { label: 'Awards', href: '#' },
          { label: 'News', href: '#' },
          { label: 'Library & Blog', href: '#' },
          { label: 'Resources', href: '#' },
          { label: 'Brochure', href: '#' },
          { label: 'Careers', href: '#' },
          { label: 'Partners', href: '#' },
          { label: 'Partner Program', href: '#' },
        ],
      },
    ],
  },
]
