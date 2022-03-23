import fetchApi from 'helper/fetchApi'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Dashboard() {
  const router = useRouter()

  const getUser = async () => {
    const result = await fetchApi({
      url: '/api/v1/users',
    })
    if (result?.status === 200) router.push('/user-management')
    return result
  }

  useEffect(() => {
    getUser()
  }, [])

  return <div className="px-8 py-6" />
}
