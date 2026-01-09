import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: ReactNode
}

export const AuthButton = ({
  loading = false,
  disabled,
  children,
  className,
  ...props
}: AuthButtonProps) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn(
        'w-full bg-[#4150F7] hover:bg-[#808EFC] text-white font-semibold py-2 rounded-lg transition-colors',
        'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#4150F7]',
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faSpinner} spin className="h-4 w-4" />
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </Button>
  )
}
