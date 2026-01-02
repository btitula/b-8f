import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthDialog from '@/components/auth/AuthDialog'
import UserProfileDropdown from './UserProfileDropdown'

/**
 * Header Component
 *
 * Main navigation header
 *
 * Features:
 * - Responsive navigation
 * - Conditional rendering based on auth state
 * - Login button (when not authenticated)
 * - User profile dropdown (when authenticated)
 * - Active route highlighting
 */
function Header() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)

  // Get authentication state from Redux
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">
            Order<span className="text-orange-500">.uk</span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'bg-orange-500 text-white px-6 py-2 rounded-full'
                  : 'text-gray-700 hover:text-orange-500 px-6 py-2'
              }
            >
              Home
            </NavLink>
            <button className="text-gray-700 hover:text-orange-500">
              Browse Menu
            </button>
            <button className="text-gray-700 hover:text-orange-500">
              Special Offers
            </button>
            <button className="text-gray-700 hover:text-orange-500">
              Restaurants
            </button>
            <button className="text-gray-700 hover:text-orange-500">
              Track Order
            </button>
          </nav>

          {/* Conditional Rendering: Login Button OR User Profile */}
          {isAuthenticated ? (
            // Show user profile dropdown when logged in
            <UserProfileDropdown />
          ) : (
            // Show login button when not logged in
            <button
              onClick={() => setIsAuthDialogOpen(true)}
              className="bg-gray-900 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <span>👤</span>
              Login/Signup
            </button>
          )}
        </div>
      </div>

      {/* Auth Dialog - Only shown when user clicks Login */}
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen} />
    </header>
  )
}

export default Header
