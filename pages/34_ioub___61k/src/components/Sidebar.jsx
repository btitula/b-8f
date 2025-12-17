import React, { useState, useRef, useEffect } from 'react'

const Sidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState(300) // Initial sidebar width
  const [isResizing, setIsResizing] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showResizeIcon, setShowResizeIcon] = useState(false)

  // useRef to store sidebar width when collapsed
  const savedWidthRef = useRef(300)
  const sidebarRef = useRef(null)
  const resizeHandleRef = useRef(null)

  // Handle resize on mousedown
  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsResizing(true)
  }

  // Handle mousemove to resize
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return

      // Calculate new width based on mouse position
      const newWidth = e.clientX
      const minWidth = 200
      const maxWidth = 500

      // Clamp width between min and max
      const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth))
      setSidebarWidth(clampedWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    // Cleanup: remove event listeners on unmount or when isResizing changes
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    if (isCollapsed) {
      // Restore sidebar with saved width from useRef
      setIsCollapsed(false)
      setSidebarWidth(savedWidthRef.current)
    } else {
      // Save current width to useRef before collapsing
      savedWidthRef.current = sidebarWidth
      setIsCollapsed(true)
      setSidebarWidth(0)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-gray-200 relative overflow-hidden ${isResizing ? '' : 'transition-all duration-300 ease-in-out'
          }`}
        style={{ width: isCollapsed ? '0' : `${sidebarWidth}px`, minWidth: isCollapsed ? '0' : 'auto' }}
        onMouseEnter={() => !isCollapsed && setShowResizeIcon(true)}
        onMouseLeave={() => setShowResizeIcon(false)}
      >
        {/* Collapse button - only show when not collapsed */}
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 z-20 p-2 hover:bg-gray-300 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            <i className="fas fa-chevron-left text-gray-700"></i>
          </button>
        )}

        {/* Sidebar Content - hide when collapsed */}
        {!isCollapsed && (
          <div className="p-6 h-full overflow-hidden">
            <h2 className="text-2xl font-bold mb-4">Side Bar</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            </p>
          </div>
        )}

        {/* Resize Handle */}
        {!isCollapsed && (
          <div
            ref={resizeHandleRef}
            className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors ${showResizeIcon || isResizing ? 'bg-blue-400' : 'bg-transparent'
              }`}
            onMouseDown={handleMouseDown}
          >
            {/* Resize Icon - shows on hover or when resizing */}
            {(showResizeIcon || isResizing) && (
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-blue-500 text-white rounded-full p-1 pointer-events-none">
                <i className="fas fa-grip-vertical text-xs"></i>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-6 overflow-auto">
        {/* Hamburger menu - shows when sidebar is collapsed */}
        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="mb-4 p-2 hover:bg-gray-100 rounded transition-colors"
            aria-label="Show sidebar"
          >
            <i className="fas fa-bars text-gray-700 text-xl"></i>
          </button>
        )}

        <div className="flex items-center gap-2 mb-4">
          {/* {!isCollapsed && (
            <span className="text-2xl">«</span>
          )} */}
          <h1 className="text-2xl font-bold">Notion</h1>
        </div>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          temporibus nihil quaerat harum! Repellat odio tempore unde a nemo
          architecto amet provident, illo pariatur doloremque, iure officiis,
          autem totam consectetur!
        </p>
      </div>
    </div>
  )
}

export default Sidebar

