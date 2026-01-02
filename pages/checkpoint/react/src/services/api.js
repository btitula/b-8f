import axios from 'axios'

/**
 * Axios instance configuration
 *
 * This creates a configured axios instance with:
 * - Base URL from environment variables
 * - Default headers
 * - Request/Response interceptors for token management
 */

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Get base URL from .env file
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request Interceptor
 *
 * Automatically adds the JWT token to every request if it exists
 * This runs before every API call
 */
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('accessToken')

    // If token exists, add it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error)
  }
)

/**
 * Response Interceptor
 *
 * Handles common response scenarios:
 * - 401 Unauthorized: Clear token and redirect to login
 * - Other errors: Pass through for component-level handling
 */
api.interceptors.response.use(
  (response) => {
    // If response is successful, just return the data
    return response
  },
  (error) => {
    // If we get 401 Unauthorized, the token is invalid/expired
    if (error.response?.status === 401) {
      // Clear the invalid token
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')

      // Optionally redirect to login or refresh the page
      // window.location.href = '/'
    }

    return Promise.reject(error)
  }
)

export default api
