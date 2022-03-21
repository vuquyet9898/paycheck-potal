import Link from 'next/link'
import React from 'react'

const listMenuExpanded = [
  { name: 'PayCheck', href: 'user-management/' },
  { name: 'Bank Transfer', href: 'bank-transfer/' },
  { name: 'Invoices', href: '/invoices/' },
  { name: 'Payment', href: 'user-management/' },
  { name: 'Edit', href: 'user-management/edit-user' },
]
export function ExpandedComponent({ data }) {
  return (
    <div className="flex pr-10 pt-2 gap-x-4 pl-5 ">
      {listMenuExpanded.map((item) => (
        <button
          key={item.name}
          type="button"
          className="bg-blue-500 hover:bg-blue-500 text-white  py-2 px-4 rounded  text-xs"
        >
          <Link
            href={{
              pathname: `${item.href}[slug]`,
              query: {
                slug: data?.personal_id,
                id: data?._id,
                branchNumber: data?.payment?.bank_detail?.branch_number,
                bankName: data?.payment?.bank_detail?.bank_name,
                accountNumber: data?.payment?.bank_detail?.account_number,
              },
            }}
          >
            <a>{item.name}</a>
          </Link>
        </button>
      ))}
    </div>
  )
}
