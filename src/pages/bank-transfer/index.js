import DataTableUser from 'components/DataTableUser'
import React from 'react'

export default function index() {
  const pathRedirect = '/bank-transfer'
  return (
    <div>
      <DataTableUser pathRedirect={pathRedirect} tableName="Bank Transfer" />
    </div>
  )
}
