import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  error?: boolean
  errorMessage?: string
  wrapperClassName?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error = false, errorMessage, disabled, checked, defaultChecked, wrapperClassName, className, id: idProp, ...props }, ref) => {
    const generatedId = useId()
    const id = idProp ?? generatedId
    return (
      <div className={cn('flex flex-col gap-1', wrapperClassName)}>
        <label
          htmlFor={id}
          className={cn(
            'inline-flex items-center gap-2 cursor-pointer select-none',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <input
            ref={ref}
            id={id}
            type="checkbox"
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
            aria-invalid={error}
            className="sr-only peer"
            {...props}
          />
          <span
            className={cn(
              'flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-[2px] border transition-all duration-150',
              'border-border-default bg-surface-default',
              'peer-checked:bg-brand-red peer-checked:border-brand-red',
              error && !disabled && 'border-danger ring-1 ring-danger',
              'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-red',
              disabled && 'border-border-disable bg-surface-disable peer-checked:bg-border-default peer-checked:border-border-default',
              className,
            )}
            aria-hidden
          >
            <svg className="w-2.5 h-2.5 text-white opacity-0" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {label && (
            <span className={cn('text-p-sm text-text-primary leading-none', disabled && 'text-text-disable', error && !disabled && 'text-danger')}>
              {label}
            </span>
          )}
        </label>
        {error && errorMessage && <p className="text-p-xs text-danger ml-6">{errorMessage}</p>}
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
