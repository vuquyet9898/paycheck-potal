import React from 'react'
import DataTableUser from 'components/DataTableUser'
import { useTranslation } from 'react-i18next'

export default function Index() {
  const pathRedirect = '/paychecks'
  const [t] = useTranslation('common')

  return (
    <div className="px-4  py-4">
      <h1 className="text-2xl font-bold uppercase flex justify-end">
        {/* PAY CHECK */}
        {t('paycheck.title')}
      </h1>
      <div className="">
        <DataTableUser pathRedirect={pathRedirect} tableName="PayCheck" />
      </div>
    </div>
  )
}
