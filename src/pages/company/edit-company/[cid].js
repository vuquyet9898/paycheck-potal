import { editCompany, getCompanyDetail } from 'actions/company'
import { renderErrorMessage } from 'helper/utils'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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

  const onEditCompany = async () => {
    const dataResponse = await editCompany(cid, {
      name: companyName,
      company_code: companyId,
    })
    if (dataResponse?.status === 200) {
      toast.success('Change successfully!')
      router.back()
    } else if (dataResponse?.statusCode === 422) {
      renderErrorMessage({
        message: 'Company code already exist',
      })
    } else if (dataResponse?.statusCode === 400) {
      renderErrorMessage({
        message: 'Name or ID should not be empty',
      })
    }
  }

  const [t] = useTranslation('common')

  return (
    <div className="rtl pr-4">
      <div className="flex items-center justify-between">
        <h1 className="py-4 text-2xl uppercase font-bold">
          {t('company.editCompany')}
        </h1>
        <button
          type="button"
          className="ml-8 underline text-indigo-500 hover:text-indigo-400 active:text-indigo-600"
          onClick={() => router.back()}
        >
          {t('company.back')}
        </button>
      </div>
      <div className="w-11/12 py-6">
        <div className="flex flex-col gap-4 pl-4">
          <div className="flex items-center">
            <p className="w-60 font-bold"> {t('company.name')}</p>
            <input
              value={companyName}
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t('company.companyName')}
              className="border border-slate-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="flex items-center">
            <p className="w-60 font-bold"> {t('company.id')}</p>
            <input
              type="text"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              placeholder={t('company.companyId')}
              className="border border-slate-300 rounded-md px-2 py-1 w-full"
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onEditCompany}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {t('company.save')}
      </button>
    </div>
  )
}
