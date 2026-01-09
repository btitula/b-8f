import { Footer } from './Footer'
import type { ReactNode } from 'react'

interface AuthLayoutProps {
  leftSlot?: ReactNode
  children: ReactNode
}

export const AuthLayout = ({ leftSlot, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl flex items-center justify-center gap-8">
          {leftSlot && (
            <div className="hidden lg:flex flex-1 items-center justify-center">
              {leftSlot}
            </div>
          )}
          <div className="flex-1 flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
