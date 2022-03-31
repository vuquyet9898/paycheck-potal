import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: 'https://dev.paycheck.just.engineer/api/v1/',
})

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // const token = getCookie('token')
      config.headers = {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAanVzdC5lbmdpbmVlci5jb20iLCJwaG9uZV9udW1iZXIiOiI5NjQ4MTYyMzUiLCJfaWQiOiI2MjMwMzcwZjZmNzUxMjdlMzM0Y2UzYjgiLCJzdWIiOiI2MjMwMzcwZjZmNzUxMjdlMzM0Y2UzYjgiLCJpYXQiOjE2NDc0MTMyMDksImV4cCI6MTY3ODk0OTIwOX0.C9O3wDAPDyjMOo9H2VHtCOPGZCsCdDz9EgYvXxTqaIk`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      return config
    } catch (error) {}
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
