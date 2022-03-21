import React from 'react'
import DataTableUser from 'components/DataTableUser'

export default function index() {
  const pathRedirect = '/paychecks/[slug]'

  return (
    <div>
      <DataTableUser pathRedirect={pathRedirect} />
    </div>
  )
}
