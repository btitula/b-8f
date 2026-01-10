import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useAppDispatch } from '@/store/hooks'
import { clearUser } from '@/store/slices/authSlice'
import {
  faHouse,
  faMagnifyingGlass,
  faCompass,
  faFilm,
  faPaperPlane,
  faHeart,
  faSquarePlus,
  faUser,
  faBars,
  faTableCells,
  faCircleDot,
  faGear,
  faChartLine,
  faBookmark,
  faSun,
  faCircleExclamation,
  faUserGroup,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faWhatsapp, faThreads } from '@fortawesome/free-brands-svg-icons'
import { cn } from '@/lib/utils'
import { LogoutDialog } from '@/components/auth/LogoutDialog'

interface NavItem {
  key: string
  label: string
  icon: IconDefinition
  path?: string
}

interface LeftNavProps {
  mode: 'full' | 'collapsed'
  activeKey?: string
  onItemClick: (key: string) => void
}

interface NavItemButtonProps {
  item: NavItem
  mode: 'full' | 'collapsed'
  isActive: boolean
  onClick: () => void
}

interface MetaMenuItem {
  key: string
  label: string
  icon: IconDefinition
}

interface MoreMenuItem {
  key: string
  label: string
  icon: IconDefinition
  section?: 'top' | 'bottom'
}

const mainNavItems: NavItem[] = [
  { key: 'home', label: 'Home', icon: faHouse, path: '/app/home' },
  { key: 'search', label: 'Search', icon: faMagnifyingGlass },
  { key: 'explore', label: 'Explore', icon: faCompass, path: '/app/explore' },
  { key: 'reels', label: 'Reels', icon: faFilm, path: '/app/reels' },
  { key: 'messages', label: 'Messages', icon: faPaperPlane, path: '/app/messages' },
  { key: 'notifications', label: 'Notifications', icon: faHeart },
  { key: 'create', label: 'Create', icon: faSquarePlus },
  { key: 'profile', label: 'Profile', icon: faUser, path: '/app/profile' },
]

const metaMenuItems: MetaMenuItem[] = [
  { key: 'meta-ai', label: 'Meta AI', icon: faCircleDot },
  { key: 'whatsapp', label: 'WhatsApp', icon: faWhatsapp },
  { key: 'threads', label: 'Threads', icon: faThreads },
]

const moreMenuItems: MoreMenuItem[] = [
  { key: 'settings', label: 'Settings', icon: faGear, section: 'top' },
  { key: 'your-activity', label: 'Your activity', icon: faChartLine, section: 'top' },
  { key: 'saved', label: 'Saved', icon: faBookmark, section: 'top' },
  { key: 'switch-appearance', label: 'Switch appearance', icon: faSun, section: 'top' },
  { key: 'report-problem', label: 'Report a problem', icon: faCircleExclamation, section: 'top' },
  { key: 'switch-accounts', label: 'Switch accounts', icon: faUserGroup, section: 'bottom' },
  { key: 'log-out', label: 'Log out', icon: faRightFromBracket, section: 'bottom' },
]

const NavItemButton = ({ item, mode, isActive, onClick }: NavItemButtonProps) => {
  const content = (
    <div
      className={cn(
        'flex items-center gap-4 px-3 py-3 my-1 rounded-lg cursor-pointer',
        'transition-colors duration-150',
        'hover:bg-gray-100',
        isActive && 'bg-gray-100 font-semibold',
        mode === 'collapsed' && 'justify-center'
      )}
      role="button"
      tabIndex={0}
      aria-label={item.label}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <FontAwesomeIcon icon={item.icon} className="text-2xl" />
      {mode === 'full' && (
        <span className="text-base transition-opacity duration-300">{item.label}</span>
      )}
    </div>
  )

  if (item.path) {
    return (
      <Link to={item.path} className="block">
        {content}
      </Link>
    )
  }

  return content
}

export const LeftNav = ({ mode, activeKey, onItemClick }: LeftNavProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // Logout dialog state
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)

  // More menu state
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const moreTriggerRef = useRef<HTMLDivElement>(null)
  const moreMenuRef = useRef<HTMLDivElement>(null)

  // Meta menu state
  const [isMetaMenuOpen, setIsMetaMenuOpen] = useState(false)
  const metaTriggerRef = useRef<HTMLDivElement>(null)
  const metaMenuRef = useRef<HTMLDivElement>(null)

  // Handle more menu toggle
  const handleMoreMenuToggle = () => {
    setIsMoreMenuOpen((prev) => !prev)
    // Close meta menu when opening more menu
    if (!isMoreMenuOpen) {
      setIsMetaMenuOpen(false)
    }
  }

  // Handle more menu close
  const handleMoreMenuClose = () => {
    setIsMoreMenuOpen(false)
  }

  // Handle logout - show dialog and auto-navigate after delay
  const handleLogout = () => {
    // Close the More menu
    handleMoreMenuClose()
    // Show logout dialog
    setIsLogoutDialogOpen(true)

    // Auto-navigate after 750ms delay
    setTimeout(() => {
      console.log('Timeout executed - clearing auth and navigating')
      // Clear auth state and localStorage
      dispatch(clearUser())
      // Navigate to login
      navigate('/login')
    }, 750) // 0.75 seconds delay
  }

  // Handle more item click
  const handleMoreItemClick = (key: string) => {
    if (key === 'log-out') {
      handleLogout()
      return
    }
    console.log(`Clicked: ${key}`)
    handleMoreMenuClose()
  }

  // Handle meta menu toggle
  const handleMetaMenuToggle = () => {
    setIsMetaMenuOpen((prev) => !prev)
    // Close more menu when opening meta menu
    if (!isMetaMenuOpen) {
      setIsMoreMenuOpen(false)
    }
  }

  // Handle meta menu close
  const handleMetaMenuClose = () => {
    setIsMetaMenuOpen(false)
  }

  // Handle meta item click
  const handleMetaItemClick = (item: string) => {
    console.log(`Clicked: ${item}`)
    handleMetaMenuClose()
  }

  // Outside click handler for both menus
  useEffect(() => {
    if (!isMoreMenuOpen && !isMetaMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      // Handle More menu
      if (
        isMoreMenuOpen &&
        moreTriggerRef.current &&
        !moreTriggerRef.current.contains(target) &&
        moreMenuRef.current &&
        !moreMenuRef.current.contains(target)
      ) {
        handleMoreMenuClose()
      }

      // Handle Meta menu
      if (
        isMetaMenuOpen &&
        metaTriggerRef.current &&
        !metaTriggerRef.current.contains(target) &&
        metaMenuRef.current &&
        !metaMenuRef.current.contains(target)
      ) {
        handleMetaMenuClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMoreMenuOpen, isMetaMenuOpen])

  // ESC key handler for both menus
  useEffect(() => {
    if (!isMoreMenuOpen && !isMetaMenuOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMoreMenuOpen) handleMoreMenuClose()
        if (isMetaMenuOpen) handleMetaMenuClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMoreMenuOpen, isMetaMenuOpen])

  return (
    <>
    <nav
      className={cn(
        'fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50',
        'flex flex-col transition-all duration-300 ease-in-out',
        mode === 'full' ? 'w-[245px]' : 'w-[72px]'
      )}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className={cn('px-6 py-4 flex items-center justify-center', mode === 'collapsed' && 'px-3 flex justify-center')}>
        {mode === 'full' ? (
          <img
            src="/landingPageLogo.png"
            alt="Instagram"
            className="h-12 w-auto"
          />
        ) : (
          <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
        )}
      </div>

      {/* Main nav items */}
      <div className="flex flex-col px-2">
        {mainNavItems.map((item) => (
          <NavItemButton
            key={item.key}
            item={item}
            mode={mode}
            isActive={activeKey === item.key}
            onClick={() => onItemClick(item.key)}
          />
        ))}
      </div>

      {/* Bottom items */}
      <div className="mt-auto border-t border-gray-200 pt-4 px-2 pb-4 relative">
        {/* More button with trigger ref */}
        <div ref={moreTriggerRef}>
          <div
            className={cn(
              'flex items-center gap-4 px-3 py-3 my-1 rounded-lg cursor-pointer',
              'transition-colors duration-150',
              'hover:bg-gray-100',
              isMoreMenuOpen && 'bg-gray-100',
              mode === 'collapsed' && 'justify-center'
            )}
            role="button"
            tabIndex={0}
            aria-label="More"
            aria-expanded={isMoreMenuOpen}
            onClick={handleMoreMenuToggle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleMoreMenuToggle()
              }
            }}
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
            {mode === 'full' && (
              <span className="text-base">More</span>
            )}
          </div>
        </div>

        {/* More Menu Popup */}
        {isMoreMenuOpen && (
          <div
            ref={moreMenuRef}
            className={cn(
              'absolute bottom-[116px] mb-2',
              mode === 'full' ? 'left-0 right-0 mx-2' : 'left-full ml-2',
              mode === 'collapsed' && 'w-[240px]',
              'bg-white rounded-2xl py-1 z-50',
              '[box-shadow:0_12px_32px_0px_rgba(16,24,40,0.24),0_1.5px_5px_0px_rgba(16,24,40,0.11)] backdrop-blur-sm'
            )}
            role="menu"
          >
            {/* Top section items */}
            <div className="py-1">
              {moreMenuItems
                .filter((item) => item.section === 'top')
                .map((item) => (
                  <div
                    key={item.key}
                    className={cn(
                      'flex items-center gap-4 px-4 py-3',
                      'hover:bg-gray-100 cursor-pointer transition-colors'
                    )}
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => handleMoreItemClick(item.key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleMoreItemClick(item.key)
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="text-lg" />
                    <span className="text-base">{item.label}</span>
                  </div>
                ))}
            </div>

            {/* Divider */}
            <div className="border-t border-4 border-gray-200 my-1" />

            {/* Bottom section items */}
            <div className="py-1">
              {moreMenuItems
                .filter((item) => item.section === 'bottom')
                .map((item) => (
                  <div
                    key={item.key}
                    className={cn(
                      'flex items-center gap-4 px-4 py-3',
                      'hover:bg-gray-100 cursor-pointer transition-colors'
                    )}
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => handleMoreItemClick(item.key)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleMoreItemClick(item.key)
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="text-lg" />
                    <span className="text-base">{item.label}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Also from Meta button with trigger ref */}
        <div ref={metaTriggerRef}>
          <div
            className={cn(
              'flex items-center gap-4 px-3 py-3 my-1 rounded-lg cursor-pointer',
              'transition-colors duration-150',
              'hover:bg-gray-100',
              isMetaMenuOpen && 'bg-gray-100',
              mode === 'collapsed' && 'justify-center'
            )}
            role="button"
            tabIndex={0}
            aria-label="Also from Meta"
            aria-expanded={isMetaMenuOpen}
            onClick={handleMetaMenuToggle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleMetaMenuToggle()
              }
            }}
          >
            <FontAwesomeIcon icon={faTableCells} className="text-2xl" />
            {mode === 'full' && (
              <span className="text-base">Also from Meta</span>
            )}
          </div>
        </div>

        {/* Meta Menu Popup */}
        {isMetaMenuOpen && (
          <div
            ref={metaMenuRef}
            className={cn(
              'absolute bottom-16 mb-2',
              mode === 'full' ? 'left-0 right-0 mx-2' : 'left-full ml-2',
              mode === 'collapsed' && 'w-[240px]',
              // 'bg-white rounded-xl shadow-lg border border-gray-200',
              // 'py-2 z-50'
              'bg-white rounded-2xl py-1 z-50',
              '[box-shadow:0_12px_32px_0px_rgba(16,24,40,0.24),0_1.5px_5px_0px_rgba(16,24,40,0.11)] backdrop-blur-sm'
            )}
            role="menu"
          >
            {metaMenuItems.map((item) => (
              <div
                key={item.key}
                className={cn(
                  'flex items-center gap-4 px-4 py-3',
                  'hover:bg-gray-100 cursor-pointer transition-colors'
                )}
                role="menuitem"
                tabIndex={0}
                onClick={() => handleMetaItemClick(item.label)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleMetaItemClick(item.label)
                  }
                }}
              >
                <FontAwesomeIcon icon={item.icon} className="text-xl" />
                <span className="text-base">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>

    {/* Logout Dialog */}
    <LogoutDialog open={isLogoutDialogOpen} />
  </>
  )
}
