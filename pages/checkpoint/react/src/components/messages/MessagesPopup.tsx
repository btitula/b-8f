import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faUpRightAndDownLeftFromCenter, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'

interface MessagesPopupProps {
  open: boolean
  onClose: () => void
}

export const MessagesPopup = ({ open, onClose }: MessagesPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null)

  // ESC key handler
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // Auto-focus popup on open
  useEffect(() => {
    if (open && popupRef.current) {
      popupRef.current.focus()
    }
  }, [open])

  const handleExpand = () => {
    // Future: Navigate to full messages page
    console.log('Expand messages')
  }

  const handleCompose = () => {
    // Future: Open compose modal
    console.log('Compose new message')
  }

  if (!open) return null

  return (
    <div
      ref={popupRef}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'w-[400px] h-[600px]',
        'max-h-[calc(100vh-48px)]',
        'bg-white rounded-2xl shadow-2xl border border-gray-200',
        'flex flex-col overflow-hidden'
      )}
      tabIndex={-1}
      role="dialog"
      aria-label="Messages"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Messages</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExpand}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Expand messages"
          >
            <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className="text-lg" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close messages"
          >
            <FontAwesomeIcon icon={faXmark} className="text-xl" />
          </button>
        </div>
      </div>

      {/* Empty State Body */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500 text-base">No messages found.</p>
      </div>

      {/* Compose FAB */}
      <div className="absolute bottom-6 right-6">
        <button
          className="w-14 h-14 bg-white hover:bg-gray-100 rounded-full shadow-lg flex items-center justify-center transition-colors"
          aria-label="Compose new message"
          onClick={handleCompose}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="text-black text-lg" />
        </button>
      </div>
    </div>
  )
}
