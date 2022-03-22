import { Dialog, Transition } from '@headlessui/react'
import Spin from 'components/Spin'
import { useTableHeight } from 'helper/utils'
import { debounce } from 'lodash'
import Image from 'next/image'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import 'react-datepicker/dist/react-datepicker.css'
import { columnsCompany, createCompany, getCompany } from './company.logic'

export default function Company() {
  // data table
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(20)
  //
  const { tableHeight } = useTableHeight(302)
  const [keyword, setKeyword] = useState('')
  const [companyName, setCompanyName] = useState('')

  const changeHandler = (event) => {
    setKeyword(event.target.value)
  }
  const changeCompanyName = (event) => {
    setCompanyName(event.target.value)
  }
  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const fetchPayCheck = async (page) => {
    try {
      setLoading(true)
      const response = await getCompany(keyword, page, perPage)
      setData(response.data.data)
      setTotalRows(response.data.total_page * perPage)

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayCheck(0)
  }, [perPage, keyword])

  //
  const handlePageChange = (page) => {
    fetchPayCheck(page - 1)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage)
  }

  const onCreateCompany = async () => {
    try {
      if (loading === true) return
      setLoading(true)
      await createCompany({
        name: companyName,
      })
      fetchPayCheck(0)
      setLoading(false)
      closeModal()
      setCompanyName('')
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className="pr-4 pl-12  py-4">
      <div className="rtl flex justify-between">
        <h1 className="text-2xl font-bold py-4 uppercase">COMPANY</h1>

        <button
          onClick={openModal}
          type="button"
          className={` px-4  text-white py-2 rounded-md text-lg font-semibold  bg-green-500`}
        >
          <div className="flex flex-row  items-center justify-center">
            <p>Create Company</p>
          </div>
        </button>
      </div>
      <div className=" flex flex-row justify-end">
        <div className="w-96 rtl ">
          <label className="relative block" htmlFor="first-name">
            <span className="absolute inset-y-0 right-3 flex items-center pl-2">
              <Image
                src="/search.svg"
                alt=""
                className="h-5 w-5 fill-slate-300"
                viewBox="0 0 20 20"
                width={20}
                height={20}
              />
            </span>
            <input
              className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Company name"
              type="text"
              name="search"
              onChange={debouncedChangeHandler}
            />
          </label>
        </div>
        <div className="flex flex-row  items-center justify-center text-sm ml-4">
          <p>search Company</p>
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
                  Create New Company
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
                    <p className="text-sm">Company</p>
                  </div>

                  <button
                    onClick={onCreateCompany}
                    disabled={loading}
                    type="button"
                    className={`${
                      !loading && keyword.length > 1
                        ? 'bg-violet-500 hover:bg-violet-600 active:bg-violet-700 '
                        : 'bg-red-500'
                    }  flex items-center justify-center mt-10 w-full focus:outline-none focus:ring focus:ring-violet-300 text-white py-3 rounded-md text-lg font-semibold`}
                  >
                    <div className="absolute mr-28 flex justify-center items-center">
                      {loading && <Spin />}
                    </div>
                    <div className="ml-2">Create</div>
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <DataTable
        columns={columnsCompany}
        data={data}
        direction="rtl"
        fixedHeader
        fixedHeaderScrollHeight={`${tableHeight}px`}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationPerPage={20}
        paginationRowsPerPageOptions={[10, 20, 30, 50]}
      />
    </div>
  )
}