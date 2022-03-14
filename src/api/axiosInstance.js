import axios from 'axios'
import { getCookie } from 'src/utils/cookie'

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: 'http://159.223.75.67/api/v1/',
})

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = getCookie('token')
      if (token.length > 0) {
        config.headers = {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
      return config
    } catch (error) {}
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
