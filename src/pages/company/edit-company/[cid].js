import { getCompanyDetail } from 'actions/company'
import { renderErrorMessage } from 'helper/utils'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export default function Index() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const { cid } = router.query

  useEffect(() => {
    getCompanyDetail(cid).then((res) => {
      setCompanyName(res.data.name)
      setCompanyId(res.data.company_code)
    })
  }, [])

  const editCompany = async ({
    url = `https://dev.paycheck.just.engineer/api/v1/companies/${cid}`,
    data = {
      name: companyName,
      company_code: companyId,
    },
    headers = {
      'content-type': 'application/json',
    },
  }) => {
    const session = await getSession()
    if (session && session?.accessToken) {
      headers.authorization = `Bearer ${session?.accessToken}`
    }

    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: headers,
    })

    if (res?.status === 201) {
      toast.success('Change successfully!')
      router.back()
    } else if (res?.status === 422) {
      renderErrorMessage({
        message: 'Company code already exist',
      })
    }
    return res.json()
  }

  return (
    <div className="rtl pr-4">
      <div className="flex items-center justify-between">
        <h1 className="py-4 text-2xl uppercase font-bold">Edit company</h1>
        <button
          type="button"
          className="ml-8 underline text-indigo-500 hover:text-indigo-400 active:text-indigo-600"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      <div className="w-11/12 py-6">
        <div className="flex flex-col gap-4 pl-4">
          <div className="flex items-center">
            <p className="w-60 font-bold">Name</p>
            <input
              value={companyName}
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company name"
              className="border border-slate-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="flex items-center">
            <p className="w-60 font-bold">Id</p>
            <input
              type="text"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              placeholder="Company id"
              className="border border-slate-300 rounded-md px-2 py-1 w-full"
            />
          </div>
        </div>
      </div>
      <button
        onClick={editCompany}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </div>
  )
}
