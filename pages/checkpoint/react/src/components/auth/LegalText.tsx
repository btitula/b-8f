import type { ReactNode } from 'react'

interface LegalTextProps {
  children: ReactNode
}

export const LegalText = ({ children }: LegalTextProps) => {
  return (
    <p className="text-xs text-center text-gray-500 leading-relaxed">
      {children}
    </p>
  )
}
