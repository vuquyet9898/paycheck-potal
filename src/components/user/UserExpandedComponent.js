import Link from 'next/link'
import React from 'react'
import { getQuery } from 'utils/getQuery'
import { useTranslation } from 'react-i18next'

export function ExpandedComponent({ data }) {
  const [t] = useTranslation('common')

  const listMenuExpanded = [
    {
      name: 'PayCheck',
      href: 'paychecks',
      title: t('user.payCheck'),
    },
    {
      name: 'Bank Transfer',
      href: 'bank-transfer',
      title: t('user.bankTransfer'),
    },
    {
      name: 'Invoices',
      href: 'invoices',
      title: t('user.Invoices'),
    },
    {
      name: 'Payment',
      href: 'payment',
      title: t('user.payment'),
    },
    {
      name: 'Edit User',
      href: 'user-management/edit-user',
      title: t('user.edit'),
    },
  ]
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
              <a>{item.title}</a>
            </Link>
          </button>
        )
      })}
    </div>
  )
}
