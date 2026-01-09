import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { forwardRef, useState, useId } from 'react'
import type { InputHTMLAttributes } from 'react'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const generatedId = useId()
    const inputId = id || `password-${generatedId}`
    const errorId = error ? `${inputId}-error` : undefined

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={inputId} className="sr-only">
            {label}
          </Label>
        )}
        <div className="relative">
          <Input
            id={inputId}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={errorId}
            className={className}
            {...props}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="h-4 w-4"
            />
          </button>
        </div>
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

PasswordInput.displayName = 'PasswordInput'
