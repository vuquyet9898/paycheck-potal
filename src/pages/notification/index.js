import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Index() {
  const [t] = useTranslation('common')

  return (
    <div className="px-4  py-4">
      <h1 className="text-2xl font-bold uppercase flex justify-end">
        {t('noti.title')}
      </h1>
      <div className="">body </div>
    </div>
  )
}
