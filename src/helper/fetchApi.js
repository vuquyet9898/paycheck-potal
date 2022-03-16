import axios from 'axios'
import { getSession } from 'next-auth/react'

const { API_URL } = process.env

const fetchApi = async (
  { url, options, params, cancelToken, timeout },
  cb = (f) => f
) => {
  try {
    const defaultOptions = {
      method: 'GET',
      baseURL: API_URL,
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      cancelToken,
      timeout,
    }

    const opts = { ...defaultOptions, ...options }
    const session = await getSession()

    // Set auth token
    if (session && session?.accessToken) {
      opts.headers.authorization = `Bearer ${session?.accessToken}`
    }

    if (opts && opts.method === 'GET') {
      opts.params = params
    } else {
      opts.data = params
    }

    const res = await axios(opts)
    cb(null, res)
    return res
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      // console.error('Call API Error: ', err);
    }
    if (err?.response?.data) {
      return err?.response?.data
    }
    cb(err)
    return Promise.reject(err)
  }
}

export default fetchApi
