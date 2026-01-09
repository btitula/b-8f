import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface AuthCardProps {
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export const AuthCard = ({ children, footer, className }: AuthCardProps) => {
  return (
    <div className="w-full max-w-[350px] flex flex-col gap-2 ">
      <div
        className={cn(
          'bg-white border border-gray-300 p-10 flex flex-col items-center',
          className
        )}
      >
        {children}
      </div>
      {footer && (
        <div
          className={cn(
            'bg-white border border-gray-300 p-6 text-center',
            className
          )}
        >
          {footer}
        </div>
      )}
    </div>
  )
}
