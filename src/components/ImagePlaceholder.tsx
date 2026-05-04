import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'
import { cn } from '../lib/utils'

export type ImageRatio = '16:9' | '1:1' | '4:3'
export type ImageRadius = 'none' | 'md' | 'xl'

export interface ImagePlaceholderProps {
  ratio?: ImageRatio
  radius?: ImageRadius
  src?: string
  alt?: string
  className?: string
  imgProps?: ImgHTMLAttributes<HTMLImageElement>
}

const radiusStyles: Record<ImageRadius, string> = {
  none: 'rounded-none',
  md:   'rounded-md',
  xl:   'rounded-full',
}

const ratioStyles: Record<ImageRatio, string> = {
  '16:9': 'aspect-video',
  '1:1':  'aspect-square',
  '4:3':  'aspect-[4/3]',
}

function PlaceholderIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="4" y="10" width="32" height="24" rx="3" stroke="#CFCFCF" strokeWidth="2" />
      <circle cx="20" cy="22" r="7" stroke="#CFCFCF" strokeWidth="2" />
      <path d="M14 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="#CFCFCF" strokeWidth="2" />
      <circle cx="20" cy="22" r="3" fill="#CFCFCF" />
    </svg>
  )
}

export function ImagePlaceholder({ ratio = '16:9', radius = 'none', src, alt = '', className, imgProps }: ImagePlaceholderProps) {
  const containerClass = cn('relative overflow-hidden w-full bg-surface-subtle-gray', ratioStyles[ratio], radiusStyles[radius], className)
  if (src) {
    return (
      <div className={containerClass}>
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" {...imgProps} />
      </div>
    )
  }
  return (
    <div className={containerClass} role="img" aria-label={alt || 'Image placeholder'}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <PlaceholderIcon />
        {alt && <span className="text-p-xs text-text-tertiary px-4 text-center line-clamp-2">{alt}</span>}
      </div>
    </div>
  )
}

export interface LazyImageProps extends ImagePlaceholderProps {
  showSkeleton?: boolean
}

export function LazyImage({ showSkeleton = true, src, ...props }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  if (!src || error) return <ImagePlaceholder {...props} src={undefined} />
  return (
    <div className={cn('relative overflow-hidden w-full bg-surface-subtle-gray', ratioStyles[props.ratio ?? '16:9'], radiusStyles[props.radius ?? 'none'], props.className)}>
      {showSkeleton && !loaded && <div className="absolute inset-0 animate-pulse bg-gray-200" aria-hidden />}
      <img
        src={src}
        alt={props.alt ?? ''}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn('absolute inset-0 w-full h-full object-cover transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0')}
        {...props.imgProps}
      />
    </div>
  )
}
