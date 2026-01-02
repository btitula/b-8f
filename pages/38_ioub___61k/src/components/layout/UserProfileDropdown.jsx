import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/store/slices/authSlice'
import { User, LogOut } from 'lucide-react'

/**
 * UserProfileDropdown Component
 *
 * Displays logged-in user info with dropdown menu
 *
 * Features:
 * - User avatar and name display
 * - Dropdown menu (Profile, Logout)
 * - Click outside to close
 * - Logout functionality
 *
 * This matches the design from Image #2 you provided
 */
function UserProfileDropdown() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  // State to control dropdown visibility
  const [isOpen, setIsOpen] = useState(false)

  // Ref to detect clicks outside dropdown
  const dropdownRef = useRef(null)

  /**
   * Handle click outside dropdown
   *
   * Closes dropdown when user clicks anywhere outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  /**
   * Handle logout
   *
   * Dispatches logout action which:
   * - Clears localStorage
   * - Resets Redux auth state
   */
  const handleLogout = () => {
    dispatch(logout())
    setIsOpen(false)
  }

  /**
   * Toggle dropdown visibility
   */
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Profile Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 hover:bg-gray-50 rounded-full p-2 transition-colors"
      >
        {/* User Avatar */}
        <img
          src={user?.avatar || 'https://api.lorem.space/image/face?w=150&h=150'}
          alt={user?.name || 'User'}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
        />

        {/* User Info - Hidden on mobile, shown on desktop */}
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        {/* Dropdown indicator */}
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* Mobile: Show user info in dropdown */}
          <div className="md:hidden px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          {/* Profile Menu Item */}
          <button
            onClick={() => {
              // TODO: Navigate to profile page
              console.log('Navigate to profile')
              setIsOpen(false)
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-900">Profile</span>
          </button>

          {/* Logout Menu Item */}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Log out</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfileDropdown
