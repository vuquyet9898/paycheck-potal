import { Menu, Transition } from '@headlessui/react';
import { AUTH_STATUS } from 'constants/auth';
import { getSession, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useMemo } from 'react';

function LayoutWithHeader({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const renderNameAbbr = () => {
    if (session?.user) {
      const splited = session?.user?.name.split(' ');
      if (splited.length > 1) {
        return `${splited[0].charAt(0)}${splited[1].charAt(0)}`;
      }
      return `${splited[0].charAt(0)}`;
    }
    return '';
  };

  const renderLoginBtn = useMemo(() => {
    if (status === AUTH_STATUS.LOADING) {
      return null;
    }
    if (status === AUTH_STATUS.UNAUTHENTICATED) {
      return (
        <Link href="/login">
          <a
            type="button"
            className="flex items-center bg-black bg-opacity-20 hover:bg-opacity-30 focus:outline-none px-8 py-3 rounded-md"
          >
            Login
          </a>
        </Link>
      );
    }
    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex items-center justify-between space-x-2">
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
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right text-sm bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  type="button"
                  className="flex items-center btn-primary-reverse focus:outline-none px-8 py-3 rounded-md capitalize w-full"
                  onClick={signOut}
                >
                  logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }, [status]);

  if (typeof window === 'undefined') return null;

  const renderChildren = () => {
    if (session || router.pathname === '/login') {
      return children;
    }
    return (
      <div className="h-[calc(100vh-90px)] w-full flex flex-col space-y-4 items-center justify-center">
        <Link href="/login">
          <a className="flex items-center btn-primary px-8 py-3 rounded-md">Login</a>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="px-6 py-4 bg-gradient-to-r to-indigo-500 from-purple-500 text-white flex items-center justify-between">
        <p className="uppercase font-bold">paycheck portal</p>
        {renderLoginBtn}
      </div>
      {renderChildren()}
    </>
  );
}

export default LayoutWithHeader;

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
