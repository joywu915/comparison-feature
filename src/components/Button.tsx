import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/utils'

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'text-link'
  | 'bold-text-link'

export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  iconOnly?: boolean
  children?: ReactNode
  fullWidth?: boolean
}

const sizeStyles: Record<ButtonSize, string> = {
  small: 'h-8  px-4  gap-1.5 text-p-sm',
  medium: 'h-10 px-5  gap-2   text-p-sm',
  large: 'h-12 px-6  gap-2   text-p-md',
}

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  small: 'h-8  w-8',
  medium: 'h-10 w-10',
  large: 'h-12 w-12',
}

const variantStyles: Record<ButtonType, string> = {
  primary: [
    'bg-brand-red text-white border border-transparent',
    'hover:bg-red-700',
    'active:bg-red-800',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red',
    'disabled:bg-surface-disable disabled:text-text-disable disabled:cursor-not-allowed',
  ].join(' '),
  secondary: [
    'bg-transparent text-text-primary border border-border-default',
    'hover:border-border-darker hover:bg-surface-subtle-gray',
    'active:bg-gray-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red',
    'disabled:border-border-disable disabled:text-text-disable disabled:cursor-not-allowed',
  ].join(' '),
  tertiary: [
    'bg-transparent text-text-primary border border-transparent',
    'hover:bg-surface-subtle-gray',
    'active:bg-gray-200',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red',
    'disabled:text-text-disable disabled:cursor-not-allowed',
  ].join(' '),
  'text-link': [
    'bg-transparent text-text-primary border-none underline underline-offset-2 font-normal',
    'hover:text-brand-red',
    'active:text-red-700',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red',
    'disabled:text-text-disable disabled:no-underline disabled:cursor-not-allowed',
  ].join(' '),
  'bold-text-link': [
    'bg-transparent text-text-primary border-none underline underline-offset-2 font-semibold',
    'hover:text-brand-red',
    'active:text-red-700',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red',
    'disabled:text-text-disable disabled:no-underline disabled:cursor-not-allowed',
  ].join(' '),
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'medium', leftIcon, rightIcon, iconOnly = false, fullWidth = false, children, className, disabled, ...props }, ref) => {
    const isLink = variant === 'text-link' || variant === 'bold-text-link'
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center',
          'font-medium leading-none',
          'rounded-full',
          'transition-colors duration-150',
          'cursor-pointer select-none whitespace-nowrap',
          iconOnly ? iconOnlySizeStyles[size] : isLink ? 'gap-1.5 px-0 h-auto' : sizeStyles[size],
          variantStyles[variant],
          fullWidth && !iconOnly && 'w-full',
          className,
        )}
        {...props}
      >
        {!iconOnly && leftIcon && <span className="flex-shrink-0 flex items-center" aria-hidden>{leftIcon}</span>}
        {iconOnly ? <span className="flex items-center" aria-hidden>{children}</span> : <span>{children}</span>}
        {!iconOnly && rightIcon && <span className="flex-shrink-0 flex items-center" aria-hidden>{rightIcon}</span>}
      </button>
    )
  },
)

Button.displayName = 'Button'
