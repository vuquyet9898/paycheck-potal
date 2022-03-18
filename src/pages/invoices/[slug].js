import { Dialog, Transition } from '@headlessui/react'
import UploadButton from 'components/Button/UploadButton'
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
  getInvoicesDetail,
  upFileInvoices,
} from './invoices.logic'

export default function InvoiceDetail() {
  // data table
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  //
  const router = useRouter()
  const idUser = router?.query?.slug
  const _id = router?.query?.id

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
  const memoColumnsInvoices = useMemo(() => columnsInvoices, [])

  const [selectedFile, setSelectedFile] = useState(null)
  //
  const onFileChange = (event) => {
    // Update the state
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
    const selectDateFormat = formatDate(startDate)
    const formData = new FormData() // formdata object
    formData.append('invoice', selectedFile) // append the values with key, value pair
    const responseUpFile = await upFileInvoices(formData)
    const dataUpFile = responseUpFile.data
    console.log('responseUpFile', dataUpFile)
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
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        customInput={<CustomInputDate />}
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
                      className="mt-28 w-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 text-white py-2 rounded-md text-lg font-semibold"
                    >
                      Up Load
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
