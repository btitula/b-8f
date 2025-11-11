import axios from 'axios'
import { toast } from 'react-toastify'

let authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10 // 10 minutes

// withCredentials: true để gửi cookie với request
authorizedAxiosInstance.defaults.withCredentials = true

authorizedAxiosInstance.interceptors.request.use(config => {
  // Do something before request is sent
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

authorizedAxiosInstance.interceptors.response.use(response => {
  // Any status code that falls outside the range of 2xx cause this function to trigger
  // toast.success(response.data?.message || 'Request successful!')
  return response
}, error => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger

  // 410: Gone - refresh token expired
  if (error.response?.status !== 410) {
    toast.error(error.response?.data?.message || error?.message)
  }
  return Promise.reject(error)
})

export default authorizedAxiosInstance
