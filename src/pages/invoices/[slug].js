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
import {
  columnsInvoices,
  createInvoices,
  getInvoicesDetail,
  upFileInvoices,
} from './invoices.logic'

export default function InvoiceDetail() {
  // data table
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
    <div className="px-4 pt-2 border-1 rounded-sm pb-2">
      <button type="button" onClick={onClick} ref={ref}>
        <div className="font-medium">{value}</div>
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
                    Upload invoices
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
                      <div className=" font-medium">Date</div>
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
                          : 'Select a file invoices'}
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
                        {loadingUpFile && (
                          <svg
                            role="status"
                            className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-purple-300 fill-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="ml-2">Upload</div>
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
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationPerPage={20}
        fixedHeaderScrollHeight={`${tableHeight}px`}
        paginationRowsPerPageOptions={[10, 20, 30, 50]}
      />
    </div>
  )
}
