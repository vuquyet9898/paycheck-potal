import DataTableUser from 'components/DataTableUser'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Index() {
  const [t] = useTranslation('common')

  const pathRedirect = '/bank-transfer'

  return (
    <div className="px-4 mt-4">
      <h1 className="text-2xl font-bold uppercase flex justify-end">
        {t('bankTransfer.title')}
      </h1>
      <DataTableUser pathRedirect={pathRedirect} tableName="Bank Transfer" />
    </div>
  )
}
