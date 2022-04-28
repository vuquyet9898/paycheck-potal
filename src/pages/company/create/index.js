import { Dialog, Transition } from '@headlessui/react'
import { createCompany } from 'actions/company'
import { renderErrorMessage } from 'helper/utils'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export default function Index() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  const changeCompanyName = (event) => {
    setCompanyName(event.target.value)
  }

  const onCreateCompany = async () => {
    const res = await createCompany({
      name: companyName,
      company_code: companyId,
    })

    if (res?.status === 201) {
      toast.success('Create successfully!')
      router.back()
    } else if (res?.statusCode === 422) {
      renderErrorMessage({
        message: 'Company code already exist',
      })
    } else if (res?.statusCode === 400) {
      renderErrorMessage({
        message: 'Name or ID should not be empty',
      })
    }
  }

  const [t] = useTranslation('common')

  return (
    <div className="rtl pr-4">
      <div className="flex items-center justify-between">
        <h1 className="py-4 text-2xl uppercase font-bold">
          {t('company.newCompany')}
        </h1>
        <button
          type="button"
          className="ml-8 underline text-indigo-500 hover:text-indigo-400 active:text-indigo-600"
          onClick={() => router.back()}
        >
          {t('company.back')}
        </button>
      </div>
      <div className="w-11/12 py-6">
        <div className="flex flex-col gap-4 pl-4">
          <div className="flex items-center">
            <p className="w-60 font-bold">{t('company.name')}</p>
            <input
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t('company.companyName')}
              className="border border-slate-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="flex items-center">
            <p className="w-60 font-bold">{t('company.id')}</p>
            <input
              type="text"
              onChange={(e) => setCompanyId(e.target.value)}
              placeholder={t('company.companyId')}
              className="border border-slate-300 rounded-md px-2 py-1 w-full"
            />
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            />
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="pt-6 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 "
                >
                  {t('company.createNew')}
                </Dialog.Title>
                <div className="flex w-96 h-48 items-center mt-6 bg-grey-lighter  flex-col">
                  <div className=" flex flex-row items-center w-full justify-between mt-2 ">
                    <input
                      type="text"
                      placeholder="Name"
                      className="border border-slate-300 rounded-md px-2 py-1"
                      value={companyName}
                      onChange={changeCompanyName}
                    />
                    <p className="text-sm  "> {t('company.createNew')}</p>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <button
        type="button"
        onClick={onCreateCompany}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {t('company.save')}
      </button>
    </div>
  )
}
