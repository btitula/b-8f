import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCamera,
  faGear,
  faPlus,
  faTableCells,
  faBookmark,
  faUserTag,
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/utils'
import { NewHighlightDialog } from '@/components/profile/NewHighlightDialog'

type TabType = 'posts' | 'saved' | 'tagged'

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('posts')
  const [isHighlightDialogOpen, setIsHighlightDialogOpen] = useState(false)

  const handleNewHighlightClick = () => {
    setIsHighlightDialogOpen(true)
  }

  const handleHighlightDialogClose = () => {
    setIsHighlightDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Container */}
      <div className="max-w-[935px] mx-auto px-5 pt-8">
        {/* Profile Header */}
        <header className="mb-11">
          <div className="flex gap-8 mb-11">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <FontAwesomeIcon icon={faCamera} className="text-white text-4xl" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 pt-3">
              {/* Username and Actions Row */}
              <div className="flex items-center gap-5 mb-5">
                <h1 className="text-xl font-light">Unknown User</h1>
                <button className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-sm transition-colors">
                  Edit profile
                </button>
                <button className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-sm transition-colors">
                  View archive
                </button>
                <button
                  className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Settings"
                >
                  <FontAwesomeIcon icon={faGear} className="text-2xl" />
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex gap-10 mb-5">
                <div className="flex gap-1">
                  <span className="font-semibold">0</span>
                  <span className="text-gray-600">posts</span>
                </div>
                <div className="flex gap-1">
                  <span className="font-semibold">0</span>
                  <span className="text-gray-600">followers</span>
                </div>
                <div className="flex gap-1">
                  <span className="font-semibold">0</span>
                  <span className="text-gray-600">following</span>
                </div>
              </div>

              {/* Display Name */}
              <div className="font-semibold text-sm">Unknown User</div>
            </div>
          </div>

          {/* Highlights Row */}
          <div className="flex items-center gap-12 py-4 border-t border-gray-200">
            {/* New Highlight Button */}
            <button
              onClick={handleNewHighlightClick}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <FontAwesomeIcon icon={faPlus} className="text-3xl text-gray-400 group-hover:text-gray-500" />
              </div>
              <span className="text-xs font-semibold">New</span>
            </button>
          </div>
        </header>

        {/* Tabs Navigation */}
        <div className="border-t border-gray-200">
          <div className="flex justify-center gap-16">
            <button
              onClick={() => setActiveTab('posts')}
              className={cn(
                'flex items-center gap-1.5 py-3.5 text-xs font-semibold tracking-wider uppercase',
                'border-t border-transparent -mt-px',
                activeTab === 'posts'
                  ? 'border-black text-black'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <FontAwesomeIcon icon={faTableCells} className="text-xs" />
              <span>Posts</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={cn(
                'flex items-center gap-1.5 py-3.5 text-xs font-semibold tracking-wider uppercase',
                'border-t border-transparent -mt-px',
                activeTab === 'saved'
                  ? 'border-black text-black'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <FontAwesomeIcon icon={faBookmark} className="text-xs" />
              <span>Saved</span>
            </button>

            <button
              onClick={() => setActiveTab('tagged')}
              className={cn(
                'flex items-center gap-1.5 py-3.5 text-xs font-semibold tracking-wider uppercase',
                'border-t border-transparent -mt-px',
                activeTab === 'tagged'
                  ? 'border-black text-black'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <FontAwesomeIcon icon={faUserTag} className="text-xs" />
              <span>Tagged</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-16">
          {activeTab === 'posts' && <PostsTabContent />}
          {activeTab === 'saved' && <SavedTabContent />}
          {activeTab === 'tagged' && <TaggedTabContent />}
        </div>
      </div>

      {/* New Highlight Dialog */}
      <NewHighlightDialog
        open={isHighlightDialogOpen}
        onClose={handleHighlightDialogClose}
      />
    </div>
  )
}

// Posts Tab Content Component
const PostsTabContent = () => {
  return (
    <div className="max-w-[900px] mx-auto">
      <h2 className="text-center text-xl font-semibold mb-8">Getting Started</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Card 1 - Share Photos */}
        <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg">
          <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faCamera} className="text-2xl text-gray-400" />
          </div>
          <h3 className="font-semibold mb-2">Share Photos</h3>
          <p className="text-xs text-gray-600 mb-4">When you share photos, they will appear on your profile.</p>
          <button className="px-4 py-1.5 bg-[#4150F7] hover:bg-[#808EFC] text-white text-sm font-semibold rounded transition-colors">
            Share your first photo
          </button>
        </div>

        {/* Card 2 - Add Phone Number */}
        <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg">
          <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faCamera} className="text-2xl text-gray-400" />
          </div>
          <h3 className="font-semibold mb-2">Add phone number</h3>
          <p className="text-xs text-gray-600 mb-4">Add your phone number so you can reset your password, find friends and more.</p>
          <button className="px-4 py-1.5 bg-[#4150F7] hover:bg-[#808EFC] text-white text-sm font-semibold rounded transition-colors">
            Add phone number
          </button>
        </div>

        {/* Card 3 - Add Profile Photo */}
        <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg">
          <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faCamera} className="text-2xl text-gray-400" />
          </div>
          <h3 className="font-semibold mb-2">Add Profile Photo</h3>
          <p className="text-xs text-gray-600 mb-4">Add a profile photo so your friends know it's you.</p>
          <button className="px-4 py-1.5 bg-[#4150F7] hover:bg-[#808EFC] text-white text-sm font-semibold rounded transition-colors">
            Add profile photo
          </button>
        </div>
      </div>
    </div>
  )
}

// Saved Tab Content Component
const SavedTabContent = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-6">
          <FontAwesomeIcon icon={faBookmark} className="text-2xl" />
        </div>
        <h2 className="text-3xl font-light mb-4">Save</h2>
        <p className="text-sm text-gray-600 max-w-md mb-4">
          Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.
        </p>
        <button className="text-[#4150F7] hover:text-[#808EFC] font-semibold text-sm">
          + New Collection
        </button>
      </div>
    </div>
  )
}

// Tagged Tab Content Component
const TaggedTabContent = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-6">
          <FontAwesomeIcon icon={faUserTag} className="text-2xl" />
        </div>
        <h2 className="text-3xl font-light mb-4">Photos of you</h2>
        <p className="text-sm text-gray-600">When people tag you in photos, they'll appear here.</p>
      </div>
    </div>
  )
}
