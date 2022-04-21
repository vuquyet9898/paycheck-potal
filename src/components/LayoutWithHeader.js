import { Menu, Transition } from '@headlessui/react'
import { AUTH_STATUS } from 'constants/auth'
import { LanguageContext } from 'hooks/languageContent'
import { getSession, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment, useMemo, useState } from 'react'
import Navbar from './Navbar'

function LayoutWithHeader({ children }) {
  const { currentLanguage } = React.useContext(LanguageContext)

  const { data: session, status } = useSession()
  const router = useRouter()

  const [collapse, setCollapse] = useState(false)

  const handleCollapse = () => {
    setCollapse(!collapse)
  }

  const renderNameAbbr = () => {
    if (session?.user) {
      const splited = session?.user?.name.split(' ')
      if (splited.length > 1) {
        return `${splited[0].charAt(0)}${splited[1].charAt(0)}`
      }
      return `${splited[0].charAt(0)}`
    }
    return ''
  }
  const isEnLanguage = currentLanguage === 'en'
  const renderLoginBtn = useMemo(() => {
    if (status === AUTH_STATUS.LOADING) {
      return null
    }
    if (status === AUTH_STATUS.UNAUTHENTICATED) {
      return (
        <Link href="/login">
          <a
            type="button"
            className="flex items-center bg-black bg-opacity-20 hover:bg-opacity-30 focus:outline-none px-8 py-3 rounded-md"
          >
            {isEnLanguage ? 'Login' : 'login hb'}
          </a>
        </Link>
      )
    }
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full p-2 font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex items-center justify-between space-x-2 text-sm">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-500 uppercase">
                <p>{renderNameAbbr()}</p>
              </div>
              <div>
                <p>{session?.user?.name}</p>
              </div>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 right-0 w-56 mt-2 origin-top-right text-sm bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  type="button"
                  className="flex items-center justify-end btn-primary-reverse focus:outline-none px-4 py-3 rounded-md capitalize w-full"
                  onClick={signOut}
                >
                  {isEnLanguage ? 'logout' : 'logout hb'}
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }, [status])

  const renderChildren = () => {
    if (session) {
      return (
        <div className={`w-full ${collapse ? 'pr-[58px]' : 'pr-[250px]'}`}>
          {children}
        </div>
      )
    }
    if (router.pathname === '/login') {
      return <div className="w-full">{children}</div>
    }
    return (
      <div className="h-[calc(100vh-90px)] w-full flex flex-col space-y-4 items-center justify-center">
        <Link href="/login">
          <a className="flex items-center btn-primary px-8 py-3 rounded-md">
            {isEnLanguage ? 'Login' : 'login hb'}
          </a>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="px-3 py-2 bg-gradient-to-r to-indigo-500 from-purple-500 text-white flex items-center justify-between fixed w-full top-0 left-0 right-0 z-20">
        <p className="uppercase font-bold">
          {isEnLanguage ? ' paycheck portal' : ' paycheck portal hb'}
        </p>
        {renderLoginBtn}
      </div>
      <div className="flex justify-between pt-[72px]">
        {renderChildren()}
        <Navbar
          isLogin={!!session?.user}
          collapse={collapse}
          handleCollapse={handleCollapse}
        />
      </div>
    </>
  )
}

export default LayoutWithHeader

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
