import React from 'react'
import DataTableUser from 'components/DataTableUser'

export default function index() {
  const pathRedirect = '/paychecks'

  return (
    <div>
      <DataTableUser pathRedirect={pathRedirect} tableName="PayCheck" />
    </div>
  )
}
