const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>
}

const fetchWithAuth = async (url: string, options: RequestOptions = {}) => {
  const token = localStorage.getItem('token')

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const api = {
  get: (url: string, options?: RequestOptions) =>
    fetchWithAuth(url, { ...options, method: 'GET' }),

  post: (url: string, data?: unknown, options?: RequestOptions) =>
    fetchWithAuth(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: (url: string, data?: unknown, options?: RequestOptions) =>
    fetchWithAuth(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (url: string, options?: RequestOptions) =>
    fetchWithAuth(url, { ...options, method: 'DELETE' }),
}
