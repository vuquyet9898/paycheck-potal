import DataTableUser from 'components/DataTableUser'
import React from 'react'

export default function index() {
  const pathRedirect = '/bank-transfer/[slug]'
  return (
    <div>
      <DataTableUser pathRedirect={pathRedirect} />
    </div>
  )
}
