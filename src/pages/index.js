import fetchApi from 'helper/fetchApi'
import { useEffect } from 'react'

export default function Dashboard() {
  const getUser = async () => {
    const result = await fetchApi({
      url: '/api/v1/users',
    })
    return result
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="px-8 py-6">
      <p>hehe</p>
    </div>
  )
}
