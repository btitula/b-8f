import { useState, useEffect } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { LeftNav } from '@/components/nav/LeftNav'
import { SearchPanel } from '@/components/nav/SearchPanel'
import { MessagesFloatingButton } from '@/components/messages/MessagesFloatingButton'
import { MessagesPopup } from '@/components/messages/MessagesPopup'
import { useAppSelector } from '@/store/hooks'

export const AppShell = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const location = useLocation()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMessagesOpen, setIsMessagesOpen] = useState(false)

  // Determine active nav key from current route and search state
  const getActiveKey = () => {
    // If search panel is open, search is active
    if (isSearchOpen) return 'search'

    // Otherwise, check current route
    const path = location.pathname
    if (path.includes('/app/home')) return 'home'
    if (path.includes('/app/explore')) return 'explore'
    if (path.includes('/app/reels')) return 'reels'
    if (path.includes('/app/messages')) return 'messages'
    if (path.includes('/app/profile')) return 'profile'
    return 'home' // default
  }

  // Handle search toggle
  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev)
  }

  // Handle search close
  const handleSearchClose = () => {
    setIsSearchOpen(false)
  }

  // Handle messages toggle
  const handleMessagesToggle = () => {
    setIsMessagesOpen((prev) => !prev)
  }

  // Handle messages close
  const handleMessagesClose = () => {
    setIsMessagesOpen(false)
  }

  // Handle nav item clicks
  const handleNavItemClick = (key: string) => {
    if (key === 'search') {
      handleSearchToggle()
    } else {
      // Close search if open when navigating to other sections
      if (isSearchOpen) {
        handleSearchClose()
      }
      // Navigation is handled by React Router Link in LeftNav
    }
  }

  // ESC key listener to close search panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        handleSearchClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  // Redirect to login if not authenticated (after all hooks)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Left Navbar */}
      <LeftNav
        mode={isSearchOpen ? 'collapsed' : 'full'}
        activeKey={getActiveKey()}
        onItemClick={handleNavItemClick}
      />

      {/* Search Panel (conditional) */}
      {isSearchOpen && <SearchPanel />}

      {/* Overlay for outside clicks (conditional) */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={handleSearchClose}
          aria-hidden="true"
        />
      )}

      {/* Main content area */}
      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSearchOpen ? 'ml-[469px]' : 'ml-[245px]'
        }`}
      >
        <Outlet />
      </main>

      {/* Messages Feature */}
      <MessagesFloatingButton
        isOpen={isMessagesOpen}
        onToggle={handleMessagesToggle}
      />
      <MessagesPopup
        open={isMessagesOpen}
        onClose={handleMessagesClose}
      />
    </div>
  )
}
