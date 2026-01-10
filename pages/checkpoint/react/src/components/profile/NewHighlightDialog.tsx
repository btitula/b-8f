import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface NewHighlightDialogProps {
  open: boolean
  onClose: () => void
}

export const NewHighlightDialog = ({ open, onClose }: NewHighlightDialogProps) => {
  const [highlightName, setHighlightName] = useState('')

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setHighlightName('')
    }
  }, [open])

  const handleNext = () => {
    console.log('Creating highlight:', highlightName)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[448px] p-0 gap-0">
        {/* Header with Close Button and Title */}
        <DialogHeader className="p-4 border-b border-gray-200 flex-row items-center justify-between">
          <button
            onClick={onClose}
            className="p-0 hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faXmark} className="text-2xl" />
          </button>
          <DialogTitle className="text-base font-semibold text-center flex-1 pr-8">
            New Highlight
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="p-6">
          <input
            type="text"
            placeholder="Highlight Name"
            value={highlightName}
            onChange={(e) => setHighlightName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-center">
          <button
            onClick={handleNext}
            disabled={!highlightName.trim()}
            className="px-8 py-1.5 bg-[#4150F7] hover:bg-[#808EFC] disabled:bg-blue-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded transition-colors"
          >
            Next
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
