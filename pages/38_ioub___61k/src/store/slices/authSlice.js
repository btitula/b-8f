import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '@/services/authService'

/**
 * Initial state for authentication
 *
 * user: User profile data (null when not authenticated)
 * isAuthenticated: Boolean flag for quick auth checks
 * loading: Loading state for async operations
 * error: Error message from failed operations
 */
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

/**
 * Async Thunk: Login User
 *
 * createAsyncThunk automatically generates:
 * - loginUser.pending: When API call starts
 * - loginUser.fulfilled: When API call succeeds
 * - loginUser.rejected: When API call fails
 *
 * @param {Object} credentials - { email, password }
 * @returns {Object} User profile data
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Step 1: Call login API
      const loginResponse = await authService.login(credentials)

      // Step 2: Store tokens in localStorage
      authService.storeTokens(
        loginResponse.access_token,
        loginResponse.refresh_token
      )

      // Step 3: Fetch user profile using the token
      const userProfile = await authService.getProfile()

      // Step 4: Store user data in localStorage for persistence
      authService.storeUser(userProfile)

      // Step 5: Return user data to Redux store
      return userProfile
    } catch (error) {
      // Extract error message from API response
      const message =
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please try again.'

      return rejectWithValue(message)
    }
  }
)

/**
 * Async Thunk: Signup User
 *
 * @param {Object} userData - { name, email, password }
 * @returns {Object} User profile data
 */
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      // Step 1: Create user account
      await authService.signup(userData)

      // Step 2: Automatically log in the new user
      // We dispatch the loginUser thunk to avoid code duplication
      const loginResult = await dispatch(
        loginUser({
          email: userData.email,
          password: userData.password,
        })
      ).unwrap() // unwrap() returns the payload or throws error

      return loginResult
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Signup failed. Please try again.'

      return rejectWithValue(message)
    }
  }
)

/**
 * Async Thunk: Load User from Storage
 *
 * Called on app initialization to restore authentication state
 * Checks localStorage for stored user data
 *
 * @returns {Object} User profile data or null
 */
export const loadUserFromStorage = createAsyncThunk(
  'auth/loadFromStorage',
  async (_, { rejectWithValue }) => {
    try {
      // Check if access token exists
      const token = authService.getAccessToken()

      if (!token) {
        throw new Error('No token found')
      }

      // Try to get user from localStorage first (faster)
      const storedUser = authService.getStoredUser()

      if (storedUser) {
        // Optionally, validate token by fetching fresh profile
        // This ensures token is still valid
        try {
          const freshProfile = await authService.getProfile()
          authService.storeUser(freshProfile) // Update stored data
          return freshProfile
        } catch (error) {
          // If profile fetch fails, token is invalid
          authService.logout()
          throw error
        }
      }

      // If no stored user, fetch from API
      const userProfile = await authService.getProfile()
      authService.storeUser(userProfile)
      return userProfile
    } catch (error) {
      return rejectWithValue('Session expired. Please login again.')
    }
  }
)

/**
 * Auth Slice
 *
 * Manages authentication state with reducers and extraReducers
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Logout reducer
     *
     * Synchronous action to clear auth state
     * Called when user clicks logout
     */
    logout: (state) => {
      // Clear localStorage
      authService.logout()

      // Reset state to initial values
      state.user = null
      state.isAuthenticated = false
      state.loading = false
      state.error = null
    },

    /**
     * Clear error reducer
     *
     * Allows components to clear error messages
     */
    clearError: (state) => {
      state.error = null
    },
  },

  /**
   * Extra Reducers
   *
   * Handle async thunk state changes
   * Each thunk has pending/fulfilled/rejected states
   */
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
      })

    // Signup User
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
        state.error = null
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
      })

    // Load User from Storage
    builder
      .addCase(loadUserFromStorage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
        state.error = null
      })
      .addCase(loadUserFromStorage.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
      })
  },
})

// Export actions
export const { logout, clearError } = authSlice.actions

// Export reducer
export default authSlice.reducer
