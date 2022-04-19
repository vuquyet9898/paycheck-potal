import DataTableUser from 'components/DataTableUser'
import React from 'react'

export default function index() {
  const pathRedirect = '/bank-transfer'
  return (
    <div className="px-4 mt-4">
      <h1 className="text-2xl font-bold uppercase flex justify-end">
        BANK TRANSFER
      </h1>
      <DataTableUser pathRedirect={pathRedirect} tableName="Bank Transfer" />
    </div>
  )
}
