
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Button } from '../components/Button'
import { ImagePlaceholder } from '../components/ImagePlaceholder'

// ─────────────────────────────────────────────
// Figma: "hero section"
// Variants → Device: desktop | mobile
//            Style: 16:9 slider | 1:1 & 3:4 slider | embedded image slider |
//                   image carousel | full screen | double image layer
// ─────────────────────────────────────────────

export type HeroStyle =
  | '16:9'
  | '1:1'
  | 'embedded'
  | 'carousel'
  | 'fullscreen'
  | 'double-layer'

export interface HeroSectionProps {
  /** Figma: H1 */
  h1: string
  /** Figma: Content */
  content?: string
  /** Figma: H5 (eyebrow label above H1) */
  h5?: string
  /** Figma: Show H5 */
  showH5?: boolean
  /** Figma: Disclaimer */
  disclaimer?: string
  /** Figma: Show Disclaimer */
  showDisclaimer?: boolean
  /** Figma: Primary Button */
  primaryButton?: { label: string; onClick?: () => void }
  /** Figma: Secondary Button */
  secondaryButton?: { label: string; onClick?: () => void }
  /** Figma: Show Arrow — scroll-down chevron */
  showArrow?: boolean
  /** Figma: Style variant */
  style?: HeroStyle
  /** Image content — src or custom ReactNode */
  image?: string | ReactNode
  /** Background colour / image override */
  background?: string
  className?: string
}

export function HeroSection({
  h1,
  content,
  h5,
  showH5 = true,
  disclaimer,
  showDisclaimer = false,
  primaryButton,
  secondaryButton,
  showArrow = false,
  style = '16:9',
  image,
  background,
  className,
}: HeroSectionProps) {
  const isFullscreen = style === 'fullscreen'

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-surface-default',
        isFullscreen && 'min-h-screen',
        className,
      )}
      style={background ? { background } : undefined}
    >
      <div
        className={cn(
          'mx-auto max-w-container-lg px-200 md:px-600',
          'py-600 md:py-800',
          isFullscreen
            ? 'flex min-h-screen flex-col items-center justify-center text-center'
            : 'grid grid-cols-1 gap-300 md:grid-cols-2 md:items-center',
        )}
      >
        {/* ── Text column ── */}
        <div className="flex flex-col gap-200">
          {showH5 && h5 && (
            <p className="text-h5 font-semibold uppercase tracking-widest text-brand-red">
              {h5}
            </p>
          )}

          <h1 className="text-h1-mobile md:text-h1 font-bold text-text-primary leading-tight">
            {h1}
          </h1>

          {content && (
            <p className="text-p-lg text-text-secondary">{content}</p>
          )}

          {/* Buttons */}
          {(primaryButton || secondaryButton) && (
            <div className="flex flex-wrap gap-200 pt-100">
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

          {/* Disclaimer */}
          {showDisclaimer && disclaimer && (
            <p className="text-p-xs text-text-tertiary mt-100">{disclaimer}</p>
          )}
        </div>

        {/* ── Image column ── */}
        {!isFullscreen && (
          <div className="w-full">
            {typeof image === 'string' ? (
              <ImagePlaceholder
                src={image}
                ratio={style === '1:1' ? '1:1' : '16:9'}
                radius="md"
              />
            ) : image ? (
              image
            ) : (
              <ImagePlaceholder
                ratio={style === '1:1' ? '1:1' : '16:9'}
                radius="md"
              />
            )}
          </div>
        )}
      </div>

      {/* Scroll-down arrow */}
      {showArrow && (
        <div className="absolute bottom-300 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 9l6 6 6-6" stroke="#2a2a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </section>
  )
}
