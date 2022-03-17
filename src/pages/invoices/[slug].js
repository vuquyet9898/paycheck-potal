import { Dialog, Transition } from '@headlessui/react'
import UploadButton from 'components/Button/UploadButton'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState, Fragment } from 'react'
import DataTable from 'react-data-table-component'
import { columnsInvoices, getInvoicesDetail } from './invoices.logic'

export default function InvoiceDetail() {
  // data table

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  //
  const router = useRouter()
  const idUser = router?.query?.slug

  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const fetchUsers = async (page) => {
    try {
      setLoading(true)
      const response = await getInvoicesDetail(idUser, page, perPage)
      setData(response.data.data)
      setTotalRows(response.data.total_page)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(0)
  }, [idUser])

  //
  const handlePageChange = (page) => {
    fetchUsers(page - 1)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true)
    const response = await getInvoicesDetail(page - 1, newPerPage)
    setData(response.data.data)
    setPerPage(newPerPage)
    setLoading(false)
  }

  //
  const memoColumnsInvoices = useMemo(() => columnsInvoices, [])

  return (
    <div className="pt-10">
      <div className="w-full  flex flex-row  justify-end px-20">
        <UploadButton title="Upload Invoices" action={openModal} />
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
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
      <DataTable
        title="All invoices"
        columns={memoColumnsInvoices}
        data={data}
        direction="rtl"
        //
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows * 10}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  )
}
