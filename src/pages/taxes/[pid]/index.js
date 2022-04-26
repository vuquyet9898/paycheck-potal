import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cloneDeep } from 'lodash'
import { useRouter } from 'next/router'
import { createTaxes } from 'actions/taxes'

const dataField = [
  'grossAmount',
  'aCommissions',
  'incomeTax',
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

  const userId = router?.query?.id
  useEffect(() => {
    const transformData = cloneDeep(data)
    transformData.map((item) => {
      if (dataField.includes(item?.field)) {
        item.value = '100'
      }
      return null
    })
    setData(transformData)
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
  }
  return (
    <div className="rtl pr-4 py-4">
      <h1 className="text-2xl font-bold uppercase">{t('texas.title')}</h1>
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
        key={data?.name}
        type="button"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded mt-12"
      >
        <div>{t('company.save')}</div>
      </button>
    </div>
  )
}
