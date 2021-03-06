import { Dialog, Transition } from '@headlessui/react'
import UploadButton from 'components/Button/UploadButton'
import { useTableHeight } from 'helper/utils'
import { useRouter } from 'next/router'
import React, {
  forwardRef,
  Fragment,
  useEffect,
  useMemo,
  useState,
} from 'react'
import DataTable from 'react-data-table-component'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { formatDate } from 'utils/date'
import Spin from 'components/Spin'
import {
  columnsInvoices,
  createInvoices,
  ExpandedComponentInvoices,
  getInvoicesDetail,
  upFileInvoices,
} from 'actions/invoices'
import { useTranslation } from 'react-i18next'

export default function InvoiceDetail() {
  // data table
  const [t] = useTranslation('common')

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingUpFile, setLoadingUpFile] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(20)
  //
  const { tableHeight } = useTableHeight(302)

  const router = useRouter()
  const idUser = router?.query?.slug
  const userId = router?.query?.id

  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const fetchInvoices = async (page) => {
    try {
      setLoading(true)
      const response = await getInvoicesDetail(idUser, page, perPage)
      setData(response.data.data)
      setTotalRows(response.data.total_page * perPage)

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInvoices(0)
  }, [perPage])

  //
  const handlePageChange = (page) => {
    fetchInvoices(page - 1)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage)
  }
  const memoColumnsInvoices = useMemo(() => columnsInvoices, [])

  const [selectedFile, setSelectedFile] = useState(null)
  //
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }
  //
  const [startDate, setStartDate] = useState(new Date())
  // eslint-disable-next-line react/display-name
  const CustomInputDate = forwardRef(({ value, onClick }, ref) => (
    <div className=" pt-2 border-1 rounded-sm pb-2">
      <button type="button" onClick={onClick} ref={ref}>
        <div className="">{value}</div>
      </button>
    </div>
  ))
  //
  const onUploadInvoices = async () => {
    try {
      if (loadingUpFile) return
      setLoadingUpFile(true)
      const selectDateFormat = formatDate(startDate)
      const formData = new FormData()
      formData.append('invoice', selectedFile)
      const responseUpFile = await upFileInvoices(formData)
      const dataUpFile = responseUpFile.data
      const dataInvoices = {
        userId,
        date: selectDateFormat,
        file_name: dataUpFile?.file_name,
        file_url: dataUpFile?.file_url,
      }
      await createInvoices(dataInvoices)
      await fetchInvoices(0)
      closeModal()
      setSelectedFile(null)
      setLoadingUpFile(false)
    } catch (error) {
      setLoadingUpFile(false)
    }
  }
  const isFileSelect = !!selectedFile?.name

  return (
    <div className="pt-10">
      <div className="w-full  flex flex-row  justify-end px-20">
        <UploadButton title={t('incvoices.up')} action={openModal} />
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
                    {t('incvoices.up')}
                  </Dialog.Title>
                  <div className="flex w-96 h-72 items-center mt-6 bg-grey-lighter  flex-col">
                    <div className="flex flex-row items-center w-full ">
                      <DatePicker
                        // showTimeSelect
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        customInput={<CustomInputDate />}
                        // dateFormat=""
                      />
                      <div className="">{t('incvoices.date')}</div>
                    </div>
                    <label className="mt-4 w-full flex flex-row items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:opacity-60">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span className=" ml-2 text-sm leading-normal">
                        {isFileSelect
                          ? selectedFile.name
                          : t('incvoices.select')}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        required
                        onChange={onFileChange}
                      />
                    </label>

                    <button
                      onClick={onUploadInvoices}
                      disabled={!isFileSelect}
                      type="button"
                      className={`${
                        isFileSelect
                          ? 'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 '
                          : 'bg-red-500'
                      }  flex items-center justify-center mt-28 w-full focus:outline-none focus:ring focus:ring-violet-300 text-white py-3 rounded-md text-lg font-semibold`}
                    >
                      <div className="absolute mr-28 flex justify-center items-center">
                        {loadingUpFile && <Spin />}
                      </div>
                      <div className="ml-2">{t('incvoices.up')}</div>
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
      <DataTable
        fixedHeader
        title={t('incvoices.all')}
        columns={memoColumnsInvoices}
        data={data}
        direction="rtl"
        //
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationPerPage={20}
        fixedHeaderScrollHeight={`${tableHeight}px`}
        paginationRowsPerPageOptions={[10, 20, 30, 50]}
        expandableRows
        // eslint-disable-next-line react/no-unstable-nested-components
        expandableRowsComponent={({ data }) => (
          <ExpandedComponentInvoices
            data={data}
            callback={() => fetchInvoices(0)}
          />
        )}
        noDataComponent={<div>{t('noData')}</div>}
        paginationComponentOptions={{
          rangeSeparatorText: t('table.rangeSeparatorText'),
          rowsPerPageText: t('table.rowsPerPageText'),
        }}
      />
    </div>
  )
}
