/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cloneDeep } from 'lodash'
import { useRouter } from 'next/router'
import { createTaxes, getDetailTaxes } from 'actions/taxes'
import Spin from 'components/Spin'
import { toast } from 'react-toastify'

const dataField = [
  'grossAmount',
  'aCommissions',
  'incomeTax',
  'employerSocialSercurity',
  'socialSercurityWorks',
  'healthTax',
  'compensation',
  'reward',
  'required',
  'advancesDebtRepayment',
  'netAmount',
]
const listField = [
  { title: 'Gross amount', field: 'grossAmount', value: '' },
  { title: 'A commission', field: 'aCommissions', value: '' },
  { title: 'Income Tax', field: 'incomeTax', value: '' },
  {
    title: 'Employer Social Security',
    field: 'employerSocialSercurity',
    value: '',
  },

  {
    title: 'Social Security works',
    field: 'socialSercurityWorks',
    value: '',
  },

  { title: 'health tax', field: 'healthTax', value: '' },

  { title: 'Compensation', field: 'compensation', value: '' },
  { title: 'Rewards', field: 'reward', value: '' },
  { title: 'Required', field: 'required', value: '' },
  {
    title: 'Advances / debt repayments',
    field: 'advancesDebtRepayment',
    value: '',
  },
  { title: 'Net amount', field: 'netAmount', value: '' },
]

export default function Index() {
  const listFieldClone = cloneDeep(listField)
  const [data, setData] = useState(listFieldClone)
  const [t] = useTranslation('common')
  const router = useRouter()
  const [isLoadingUpFile, setIsLoadingUpFile] = useState(false)

  const userId = router?.query?.id

  useEffect(() => {
    const fetchDetailTaxes = async () => {
      const response = await getDetailTaxes(userId)
      const valueDetail = response.data
      const transformData = cloneDeep(data)
      transformData.map((item) => {
        if (dataField.includes(item?.field)) {
          const field = item?.field
          item.value = valueDetail[field]
        }
        return null
      })
      setData(transformData)
    }
    fetchDetailTaxes()
  }, [])

  const onChangeInput = (type, value) => {
    const transformData = cloneDeep(data)
    transformData.map((item) => {
      if (type === item?.field) {
        item.value = value
      }
      return null
    })
    setData(transformData)
  }
  const onCreateTaxes = async () => {
    if (isLoadingUpFile) return
    setIsLoadingUpFile(true)
    const dataSendRequest = {
      userId,
    }
    const transformData = cloneDeep(data)
    transformData?.map((item) => {
      if (dataField.includes(item?.field)) {
        const filedData = item?.field
        dataSendRequest[filedData] = item.value
      }
      return null
    })
    await createTaxes(dataSendRequest)
    toast.success(t('alert.success'))
    setIsLoadingUpFile(false)
  }
  return (
    <div className="rtl pr-4 py-4">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold uppercase">{t('texas.title')}</h1>
        <button
          type="button"
          className="ml-8 underline text-indigo-500 hover:text-indigo-400 active:text-indigo-600"
          onClick={() => router.back()}
        >
          {t('payment.Back')}
        </button>
      </div>
      {data?.map((field) => {
        return (
          <div key={field?.title}>
            <div className="relative flex flex-row py-4 w-1/2">
              <div className="w-72 ml-4">{field?.title}</div>
              <input
                className=" placeholder:italic placeholder:text-slate-400  bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Enter value"
                type="text"
                name="search"
                value={field.value}
                onChange={(event) => {
                  onChangeInput(field.field, event.target.value)
                }}
              />
            </div>
          </div>
        )
      })}

      <button
        onClick={onCreateTaxes}
        disabled={false}
        type="button"
        className="bg-green-500 hover:bg-green-600 active:bg-green-700  w-36  flex items-center justify-center mt-10  focus:outline-none focus:ring focus:ring-violet-300 text-white py-3 rounded-md text-lg font-semibold"
      >
        <div className="absolute mr-16 flex justify-center items-center">
          {isLoadingUpFile && <Spin />}
        </div>
        <div className="ml-2">{t('company.save')}</div>
      </button>
    </div>
  )
}
