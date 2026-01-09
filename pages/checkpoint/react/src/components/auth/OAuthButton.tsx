import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface OAuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'facebook' | 'google'
  loading?: boolean
}

export const OAuthButton = ({
  provider,
  loading = false,
  disabled,
  onClick,
  className,
  ...props
}: OAuthButtonProps) => {
  const isFacebook = provider === 'facebook'

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading || disabled}
      className={cn(
        'w-full font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2',
        isFacebook
          ? 'bg-[#4150F7] hover:bg-[#808EFC] text-white'
          : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin className="h-4 w-4" />
      ) : (
        <>
          <FontAwesomeIcon
            icon={isFacebook ? faFacebook : faGoogle}
            className="h-4 w-4"
          />
          <span>
            {isFacebook ? 'Log in with Facebook' : 'Log in with Google'}
          </span>
        </>
      )}
    </Button>
  )
}
