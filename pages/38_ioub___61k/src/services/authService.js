import api from './api'

/**
 * Authentication Service
 *
 * Centralized service for all authentication-related API calls
 * This keeps API logic separate from components and Redux
 */

const authService = {
  /**
   * Login user
   *
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise} Response with access_token and refresh_token
   *
   * API Endpoint: POST /api/v1/auth/login
   * Response: { access_token: "string", refresh_token: "string" }
   */
  login: async (credentials) => {
    const response = await api.post('/api/v1/auth/login', credentials)
    return response.data
  },

  /**
   * Get user profile
   *
   * Fetches the authenticated user's profile using the stored token
   * Token is automatically added by axios interceptor
   *
   * @returns {Promise} User profile data
   *
   * API Endpoint: GET /api/v1/auth/profile
   * Headers: Authorization: Bearer {access_token}
   * Response: { id, email, name, role, avatar }
   */
  getProfile: async () => {
    const response = await api.get('/api/v1/auth/profile')
    return response.data
  },

  /**
   * Signup/Register new user
   *
   * @param {Object} userData - New user data
   * @param {string} userData.name - User's full name
   * @param {string} userData.email - User's email
   * @param {string} userData.password - User's password
   * @param {string} userData.avatar - User's avatar URL (optional)
   * @returns {Promise} Created user data
   *
   * API Endpoint: POST /api/v1/users/
   * Response: { id, email, name, role, avatar }
   */
  signup: async (userData) => {
    const response = await api.post('/api/v1/users/', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar || 'https://api.lorem.space/image/face?w=150&h=150',
    })
    return response.data
  },

  /**
   * Logout user (client-side)
   *
   * Since we're using localStorage instead of HttpOnly cookies,
   * logout is handled by clearing the stored token
   *
   * For HttpOnly cookies implementation:
   * - This would call a backend endpoint: POST /api/logout
   * - Backend would clear the HttpOnly cookie
   * - More secure but requires custom backend
   */
  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  },

  /**
   * Check if user is authenticated
   *
   * @returns {boolean} True if access token exists
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken')
  },

  /**
   * Get stored access token
   *
   * @returns {string|null} Access token or null
   */
  getAccessToken: () => {
    return localStorage.getItem('accessToken')
  },

  /**
   * Store authentication tokens
   *
   * NOTE: This uses localStorage which is vulnerable to XSS attacks
   *
   * For production with sensitive data:
   * 1. Create a backend proxy server
   * 2. Have backend set HttpOnly cookies
   * 3. Never expose tokens to JavaScript
   *
   * @param {string} accessToken - JWT access token
   * @param {string} refreshToken - JWT refresh token
   */
  storeTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }
  },

  /**
   * Store user data
   *
   * @param {Object} user - User profile data
   */
  storeUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user))
  },

  /**
   * Get stored user data
   *
   * @returns {Object|null} User data or null
   */
  getStoredUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },
}

export default authService
