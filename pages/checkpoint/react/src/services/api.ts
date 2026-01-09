import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
})

// Request interceptor - Add auth token to requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle responses and errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return response data directly
    return response.data
  },
  (error: AxiosError) => {
    // Handle common error scenarios
    if (error.response) {
      // Server responded with error status
      const status = error.response.status

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          // Forbidden
          console.error('Access forbidden')
          break
        case 404:
          // Not found
          console.error('Resource not found')
          break
        case 500:
          // Server error
          console.error('Server error')
          break
        default:
          console.error(`Error: ${status}`)
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error - no response received')
    } else {
      // Something else happened
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  }
)

// Export API methods
export const api = {
  get: <T = unknown>(url: string) =>
    axiosInstance.get<T, T>(url),

  post: <T = unknown>(url: string, data?: unknown) =>
    axiosInstance.post<T, T>(url, data),

  put: <T = unknown>(url: string, data?: unknown) =>
    axiosInstance.put<T, T>(url, data),

  delete: <T = unknown>(url: string) =>
    axiosInstance.delete<T, T>(url),

  patch: <T = unknown>(url: string, data?: unknown) =>
    axiosInstance.patch<T, T>(url, data),
}

// Export axios instance for custom configurations if needed
export default axiosInstance
