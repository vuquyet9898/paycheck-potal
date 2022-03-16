import {
  IconBankTransfer,
  IconHelpCenter,
  IconInvoices,
  IconPaychecks,
  IconPayment,
  IconSetting,
  IconStatistic,
  IconUser,
} from 'constants/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function Navbar({ isLogin }) {
  const [collapse, setCollapse] = useState(false)

  const router = useRouter()

  const menuItems = [
    {
      id: 0,
      name: 'User Management',
      url: '/user-management',
      icon: <IconUser />,
    },
    {
      id: 1,
      name: 'Statistic',
      url: '/statistics',
      icon: <IconStatistic />,
    },
    {
      id: 2,
      name: 'Payment',
      url: '/payment',
      icon: <IconPayment />,
    },
    {
      id: 3,
      name: 'Invoices',
      url: '/invoices',
      icon: <IconInvoices />,
    },
    {
      id: 4,
      name: 'Bank Transfer',
      url: '/bank-transfer',
      icon: <IconBankTransfer />,
    },
    {
      id: 5,
      name: 'Paychecks',
      url: '/paychecks',
      icon: <IconPaychecks />,
    },
    {
      id: 6,
      name: 'Help Center',
      url: '/help',
      icon: <IconHelpCenter />,
    },
    {
      id: 7,
      name: 'Setting',
      url: '/setting',
      icon: <IconSetting />,
    },
  ]

  if (!isLogin) return null

  return (
    <div className="bg-gray-100 w-full max-w-[250px] h-full min-h-[calc(100vh-72px)] flex flex-col items-end p-1 gap-1 fixed right-0">
      {menuItems.map((menu) => (
        <Link href={menu.url} key={menu.id}>
          <a
            className={`${
              router.pathname.includes(menu.url) ? 'bg-gray-300' : ''
            } flex items-center justify-end space-x-2 px-3 py-2 rounded-md w-full`}
          >
            <span className="text-sm">{menu.name}</span>
            <span>{menu.icon}</span>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Navbar
