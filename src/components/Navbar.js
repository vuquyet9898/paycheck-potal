import {
  IconBankTransfer,
  IconExpandNav,
  IconHelpCenter,
  IconInvoices,
  IconPaychecks,
  IconPayment,
  IconSetting,
  IconUser,
} from 'constants/icons'
import { delay } from 'helper/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NavbarTooltip from './NavbarTooltip'

function Navbar({ isLogin, collapse, handleCollapse }) {
  const router = useRouter()

  const [showMenuText, setShowMenuText] = useState(true)

  useEffect(() => {
    if (collapse) {
      setShowMenuText(!collapse)
    } else {
      delay(200).then(() => setShowMenuText(!collapse))
    }
  }, [collapse])

  const menuItems = [
    {
      id: 0,
      name: 'User Management',
      url: '/user-management',
      icon: <IconUser />,
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
      name: 'Company',
      url: '/company',
      icon: <IconSetting />,
    },
    {
      id: 8,
      name: 'Banks',
      url: '/banks',
      icon: <IconSetting />,
    },
  ]

  if (!isLogin) return null

  return (
    <div
      className={`bg-gray-100 w-full ${
        collapse ? 'max-w-[56px]' : 'max-w-[250px]'
      } h-[calc(100vh-72px)] items-end fixed right-0 transition-all duration-300 z-10`}
    >
      <div className="w-full h-full flex flex-col justify-between divide-y">
        <div className="w-full p-1 gap-1 flex flex-col">
          {menuItems.map((menu) => (
            <Link href={menu.url} key={menu.id}>
              <a
                className={`${
                  router.pathname.includes(menu.url)
                    ? 'bg-indigo-400 text-white font-bold'
                    : ''
                } flex items-center justify-end space-x-2 px-3 py-2 rounded-md w-full hover:bg-indigo-200 relative group`}
              >
                <span
                  className={`text-sm ${showMenuText ? 'block' : 'hidden'}`}
                >
                  {menu.name}
                </span>
                <span>{menu.icon}</span>
                {collapse && <NavbarTooltip title={menu.name} />}
              </a>
            </Link>
          ))}
        </div>
        <button
          className="py-2 px-3 hover:bg-gray-300 flex items-center justify-center"
          type="button"
          onClick={handleCollapse}
        >
          {!showMenuText ? <IconExpandNav /> : 'Collapse'}
        </button>
      </div>
    </div>
  )
}

export default Navbar
