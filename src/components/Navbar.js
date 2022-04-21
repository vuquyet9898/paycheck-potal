import { Dialog } from '@headlessui/react'
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
import { LanguageContext } from 'hooks/languageContent'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import NavbarTooltip from './NavbarTooltip'

function Navbar({ isLogin, collapse, handleCollapse }) {
  const router = useRouter()
  const [modalChangeLanguage, setIsOpenModalChangeLanguage] = useState(false)
  const { currentLanguage } = React.useContext(LanguageContext)

  const { setEnLanguage, setHbLanguage } = React.useContext(LanguageContext)
  const onSetEnLanguage = () => {
    setEnLanguage()
    setIsOpenModalChangeLanguage(false)
  }
  const onSetHbLanguage = () => {
    setHbLanguage()
    setIsOpenModalChangeLanguage(false)
  }

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
          <button
            className="py-2 px-3  flex items-center justify-center hover:bg-indigo-200 rounded-md"
            type="button"
            onClick={() => setIsOpenModalChangeLanguage(true)}
          >
            <span className="text-sm  w-full flex  justify-end ">
              Change Language
            </span>
          </button>
        </div>
        <button
          className="py-2 px-3 hover:bg-gray-300 flex items-center justify-center"
          type="button"
          onClick={handleCollapse}
        >
          {!showMenuText ? <IconExpandNav /> : 'Collapse'}
        </button>
      </div>
      <Dialog
        open={modalChangeLanguage}
        onClose={() => setIsOpenModalChangeLanguage(false)}
        className="bg-slate-400 justify-center items-center flex absolute w-full h-full top-0 bg-transparent"
      >
        <div className="w-72 h-40 bg-white rounded-md drop-shadow-xl flex justify-center pt-4">
          <div className="  w-6 h-6 absolute z-10  top-4 right-4">
            <button
              type="button"
              onClick={() => setIsOpenModalChangeLanguage(false)}
              className="w-6 h-6"
            >
              <XIcon />
            </button>
          </div>
          <div>
            <div className="w-72 flex justify-center">
              <Dialog.Title>Choose language</Dialog.Title>
            </div>
            <div className="flex mt-8 w-72 justify-center gap-x-4">
              <button
                disabled={currentLanguage === 'en'}
                type="button"
                onClick={onSetEnLanguage}
                className={`w-28 p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg hover:scale-105 border-blue-300 ${
                  currentLanguage === 'en' ? 'bg-blue-300' : 'bg-blue-500'
                }`}
              >
                <span className={`text-sm  w-full flex  justify-center `}>
                  English
                </span>
              </button>
              <button
                disabled={currentLanguage === 'hb'}
                type="button"
                onClick={onSetHbLanguage}
                className={`w-28 p-2 pl-5 pr-5  text-gray-100 text-lg rounded-lg  hover:scale-105 border-blue-300 ${
                  currentLanguage === 'hb' ? 'bg-blue-300' : 'bg-blue-500'
                }`}
              >
                <span className="text-sm  w-full flex  justify-center ">
                  Hebrew
                </span>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Navbar
