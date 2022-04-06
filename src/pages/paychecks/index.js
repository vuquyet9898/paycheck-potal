import React from 'react'
import DataTableUser from 'components/DataTableUser'

export default function index() {
  const pathRedirect = '/paychecks'

  return (
    <div className="px-4  py-4">
      <h1 className="text-2xl font-bold uppercase flex justify-end">
        PAY CHECK
      </h1>
      <div className="">
        <DataTableUser pathRedirect={pathRedirect} tableName="PayCheck" />
      </div>
    </div>
  )
}
