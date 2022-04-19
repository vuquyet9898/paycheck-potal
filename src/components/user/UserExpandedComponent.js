import Link from 'next/link'
import React from 'react'
import { getQuery } from 'utils/getQuery'

const listMenuExpanded = [
  { name: 'PayCheck', href: 'paychecks' },
  { name: 'Bank Transfer', href: 'bank-transfer/' },
  { name: 'Invoices', href: 'invoices/' },
  { name: 'Payment', href: 'payment' },
  { name: 'Edit User', href: 'user-management/edit-user' },
]

export function ExpandedComponent({ data }) {
  return (
    <div className="flex pr-10 pt-2 gap-x-4 pl-5 ">
      {listMenuExpanded.map((item) => {
        const query = getQuery(item.name, data)
        return (
          <button
            key={item.name}
            type="button"
            className="bg-blue-500 hover:bg-blue-500 text-white  py-2 px-4 rounded  text-xs"
          >
            <Link
              href={{
                pathname: `${item.href}/${data?.personal_id}`,
                query,
              }}
            >
              <a>{item.name}</a>
            </Link>
          </button>
        )
      })}
    </div>
  )
}
