import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DUMMY_JSON_API_URL || 'https://dummyjson.com',
})

export default axiosInstance
