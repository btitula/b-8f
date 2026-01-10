import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { LeftNav } from '@/components/nav/LeftNav'
import { SearchPanel } from '@/components/nav/SearchPanel'

export const AppShell = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Handle search toggle
  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev)
  }

  // Handle search close
  const handleSearchClose = () => {
    setIsSearchOpen(false)
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

  return (
    <div className="flex h-screen bg-white">
      {/* Left Navbar */}
      <LeftNav
        mode={isSearchOpen ? 'collapsed' : 'full'}
        activeKey="home"
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
    </div>
  )
}
