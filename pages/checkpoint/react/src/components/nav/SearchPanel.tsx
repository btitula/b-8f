import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export const SearchPanel = () => {
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleClear = () => {
    setSearchValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="fixed left-[72px] top-0 h-screen w-[397px] bg-white border-r border-gray-200 shadow-sm z-40 flex flex-col">
      {/* Header */}
      <div className="px-6 py-6">
        <h2 className="text-2xl font-semibold text-gray-900">Search</h2>
      </div>

      {/* Search Input */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-sm text-gray-400"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="flex-1 bg-transparent focus:ring-0 focus:border-0 border-none outline-none text-base placeholder:text-gray-500"
            aria-label="Search"
          />
          {searchValue && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
              aria-label="Clear search"
              type="button"
            >
              <FontAwesomeIcon icon={faCircleXmark} className="text-lg" />
            </button>
          )}
        </div>
      </div>

      {/* Divider */}
      {/* <div className="border-t border-gray-200" /> */}

      {/* Recent Section */}
      <div className="px-6 py-4">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Recent</h3>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-gray-500 text-center">
          No recent searches.
        </p>
      </div>
    </div>
  )
}
