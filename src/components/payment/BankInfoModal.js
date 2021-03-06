import { Dialog, Transition } from '@headlessui/react'
import { delay } from 'helper/utils'
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function BankInfoModal({ info, visible = false, setVisible = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [t] = useTranslation('common')

  useEffect(() => {
    setIsOpen(visible)
  }, [visible])

  function closeModal() {
    setIsOpen(false)
    delay(500).then(setVisible(false))
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
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
            <Dialog.Overlay className="fixed inset-0 bg-[#00000065]" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="rtl inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="grid grid-cols-2 gap-3">
                <p className="text-sm font-medium text-right">
                  {t('payment.accountNumber')}
                </p>
                <p className="text-sm text-gray-500 text-right">
                  {info?.bank_detail?.account_number}
                </p>
                <p className="text-sm font-medium text-right">
                  {t('payment.accountOwner')}
                </p>
                <p className="text-sm text-gray-500 text-right">
                  {info?.bank_detail?.account_owner}
                </p>
                <p className="text-sm font-medium text-right">
                  {t('payment.bankName1')}
                </p>
                <p className="text-sm text-gray-500 text-right">
                  {info?.bank_detail?.bank_name}
                </p>
                <p className="text-sm font-medium text-right">
                  {t('payment.branchNumber')}
                </p>
                <p className="text-sm text-gray-500 text-right">
                  {info?.bank_detail?.branch_number}
                </p>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default BankInfoModal
