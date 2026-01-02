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
            <img src="/logo.png" alt="Order.uk" className="w-36" />
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'bg-[#FC8A06] text-white px-6 py-2 rounded-full'
                  : 'text-gray-700 hover:text-[#FC8A06] px-6 py-2'
              }
            >
              Home
            </NavLink>
            <button className="cursor-pointer text-gray-700 hover:text-[#FC8A06]">
              Browse Menu
            </button>
            <button className="cursor-pointer text-gray-700 hover:text-[#FC8A06]">
              Special Offers
            </button>
            <button className="cursor-pointer text-gray-700 hover:text-[#FC8A06]">
              Restaurants
            </button>
            <button className="cursor-pointer text-gray-700 hover:text-[#FC8A06]">
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
              className="cursor-pointer bg-gray-900 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <img src="/male_user_login.png" alt="User" className="w-8" />
              <span>Login/Signup</span>
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
