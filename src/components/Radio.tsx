import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/utils'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode
  error?: boolean
  errorMessage?: string
  wrapperClassName?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
            type="radio"
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
            aria-invalid={error}
            className="sr-only peer"
            {...props}
          />
          <span
            className={cn(
              'flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full border-[1.5px] transition-all duration-150',
              'border-border-default bg-surface-default',
              'peer-checked:border-brand-red peer-checked:bg-surface-default',
              error && !disabled && 'border-danger ring-1 ring-danger',
              'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-red',
              disabled && 'border-border-disable bg-surface-disable peer-checked:border-border-default',
              className,
            )}
            aria-hidden
          >
            <span className={cn('w-2 h-2 rounded-full bg-brand-red scale-0 transition-transform duration-150', disabled && 'bg-border-default')} />
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

Radio.displayName = 'Radio'

export interface RadioGroupProps {
  name: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  options: Array<{ value: string; label: ReactNode; disabled?: boolean; error?: boolean }>
  className?: string
  direction?: 'vertical' | 'horizontal'
}

export function RadioGroup({ name, value, defaultValue, onChange, options, className, direction = 'vertical' }: RadioGroupProps) {
  return (
    <div role="radiogroup" className={cn('flex', direction === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-6 flex-wrap', className)}>
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          disabled={opt.disabled}
          error={opt.error}
          checked={value !== undefined ? value === opt.value : undefined}
          defaultChecked={defaultValue !== undefined ? defaultValue === opt.value : undefined}
          onChange={() => onChange?.(opt.value)}
        />
      ))}
    </div>
  )
}
