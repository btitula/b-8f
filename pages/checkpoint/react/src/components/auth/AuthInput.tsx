import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={inputId} className="sr-only">
            {label}
          </Label>
        )}
        <Input
          id={inputId}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId}
          className={className}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className="text-xs text-red-600 mt-1 animate-in fade-in slide-in-from-top-1 duration-200"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

AuthInput.displayName = 'AuthInput'
