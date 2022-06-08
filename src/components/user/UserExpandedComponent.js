import { updateUserDetail } from 'actions/user'
import { renderErrorMessage } from 'helper/utils'
import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { getQuery } from 'utils/getQuery'

export function ExpandedComponent({ data, callback }) {
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

  const [workingStatus, setWorkingStatus] = useState(data.work_status)
  const isBlock = workingStatus === 'blocked'
  const id = data._id
  const changeWorkingStatus = async () => {
    // setWorkingStatus(!workingStatus)
    // console.log(workingStatus)
    if (workingStatus === 'blocked') {
      const result = await updateUserDetail({
        id,
        data: { work_status: 'not_working' },
      })
      if (typeof callback === 'function') {
        callback(0)
      }
      if (result?.status === 200) {
        toast.success('Update successfully!')
      } else {
        renderErrorMessage({
          message: 'Unexpected error occurs, please try again',
        })
      }
      console.log(result)
    } else {
      const result = await updateUserDetail({
        id,
        data: { work_status: 'blocked' },
      })
      if (typeof callback === 'function') {
        callback(0)
      }
      if (result?.status === 200) {
        toast.success('Update successfully!')
      } else {
        renderErrorMessage({
          message: 'Unexpected error occurs, please try again',
        })
      }
    }
  }

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
      <button
        type="button"
        onClick={changeWorkingStatus}
        className={`${
          isBlock ? 'bg-green-500' : 'bg-red-500 '
        } text-white  py-2 px-4 rounded text-xs min-w-[76px]`}
      >
        {isBlock ? t('user.unBlock') : t('user.block')}
      </button>
    </div>
  )
}
