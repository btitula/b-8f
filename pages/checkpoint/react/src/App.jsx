import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserFromStorage } from './store/slices/authSlice'
import Header from './components/layout/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

/**
 * App Component
 *
 * Root application component
 *
 * Responsibilities:
 * - Auto-login on mount (restore session from localStorage)
 * - Route configuration
 * - Layout structure
 */
function App() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  /**
   * Auto-Login Effect
   *
   * Runs once when app loads
   * Attempts to restore user session from localStorage
   *
   * How it works:
   * 1. Check if accessToken exists in localStorage
   * 2. If yes, validate token by fetching user profile
   * 3. If valid, restore auth state in Redux
   * 4. If invalid, clear localStorage and show login button
   */
  useEffect(() => {
    // Dispatch loadUserFromStorage thunk
    // This automatically handles:
    // - Checking localStorage for token
    // - Validating token with API
    // - Restoring user data to Redux
    dispatch(loadUserFromStorage())
  }, [dispatch])

  /**
   * Show loading screen while validating token
   *
   * Prevents flash of login button before user data loads
   * This gives a smooth UX on page refresh
   */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Routes with Header */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />

        {/* 404 Page without Header */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
