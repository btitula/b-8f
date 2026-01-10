import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'

interface MessagesFloatingButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export const MessagesFloatingButton = ({ isOpen, onToggle }: MessagesFloatingButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex items-center gap-3 px-6 py-3',
        'bg-white rounded-full shadow-lg',
        'hover:bg-gray-50 transition-colors',
        'border border-gray-200',
        isOpen && 'hidden'
      )}
      aria-label="Toggle messages"
    >
      <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
      <span className="font-medium">Messages</span>
    </button>
  )
}
