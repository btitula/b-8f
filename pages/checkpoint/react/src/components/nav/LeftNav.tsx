import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
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
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'

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

const bottomNavItems: NavItem[] = [
  { key: 'more', label: 'More', icon: faBars },
  { key: 'meta', label: 'Also from Meta', icon: faTableCells },
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
  return (
    <nav
      className={cn(
        'fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50',
        'flex flex-col transition-all duration-300 ease-in-out',
        mode === 'full' ? 'w-[245px]' : 'w-[72px]'
      )}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className={cn('px-6 py-8', mode === 'collapsed' && 'px-3 flex justify-center')}>
        {mode === 'full' ? (
          <h1 className="text-3xl font-bold font-['Billabong',cursive]">Instagram</h1>
        ) : (
          <div className="w-6 h-6 border-2 border-black rounded-md flex items-center justify-center">
            <div className="w-3 h-3 border border-black rounded-full" />
          </div>
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
      <div className="mt-auto border-t border-gray-200 pt-4 px-2 pb-4">
        {bottomNavItems.map((item) => (
          <NavItemButton
            key={item.key}
            item={item}
            mode={mode}
            isActive={false}
            onClick={() => onItemClick(item.key)}
          />
        ))}
      </div>
    </nav>
  )
}
