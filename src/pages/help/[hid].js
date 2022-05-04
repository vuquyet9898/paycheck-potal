import { getHelpDetail } from 'actions/help'
import { renderErrorMessage } from 'helper/utils'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

function HelpCenterDetail() {
  const router = useRouter()
  const { hid } = router.query

  const [helpDetail, setHelpDetail] = useState(null)

  const [t] = useTranslation('common')

  const getHelpDataDetail = async () => {
    const result = await getHelpDetail({ id: hid })
    if (result?.data) {
      setHelpDetail(result.data)
    }
  }

  useEffect(() => {
    if (hid) {
      getHelpDataDetail()
    }
  }, [hid])

  return (
    <div className="rtl pr-4">
      <div className="flex items-center justify-between">
        <h1 className="py-4 text-2xl uppercase font-bold">User Message</h1>
        <button
          type="button"
          className="ml-8 underline text-indigo-500 hover:text-indigo-400 active:text-indigo-600"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      <div className=" py-6">
        <div className="flex flex-col gap-4 pl-4">
          <div className="flex items-center">
            <p className="w-2/12 font-bold">Phone</p>
            {helpDetail && (
              <p className=" rounded-md px-2 py-1 w-9/12 text-justify">
                {helpDetail.phonenumber}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <p className="w-2/12 font-bold">Message</p>
            {helpDetail && (
              <p className=" rounded-md px-2 py-1 w-9/12 text-justify">
                {helpDetail.content}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenterDetail
