import { getPaymentData } from 'actions/payment'
import FilterUser from 'components/user/FilterUser'
import { format, parseISO } from 'date-fns'
import { useDebounce, useTableHeight } from 'helper/utils'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'

const userType = [{ name: 'freelancer' }, { name: 'delivery' }]

function Payment() {
  const [payment, setPayment] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(20)
  const [search, setSearch] = useState('')
  const [selectedUserType, setSelectedUserType] = useState(userType[0])

  const router = useRouter()
  const { tableHeight } = useTableHeight(302)

  const getPayment = async (page, limit, query) => {
    const result = await getPaymentData({
      page,
      limit,
      query: search,
    })
    const { data, status } = result
    if (status === 200) {
      setPayment(data?.data)
      setTotalRows(data?.total_page * limit)
    }
  }

  const debouncedSearchTerm = useDebounce(search, 500)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      await getPayment(0, perPage, debouncedSearchTerm)
      setLoading(false)
    }
    loadData()
  }, [debouncedSearchTerm])

  const handlePageChange = async (page) => {
    setLoading(true)
    await getPayment(page - 1, perPage)
    setLoading(false)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true)
    await getPayment(page - 1, newPerPage)
    setPerPage(newPerPage)
    setLoading(false)
  }

  const columns = useMemo(
    () => [
      {
        name: 'Personal ID',
        selector: (row) => row?.personal_id,
        width: '130px',
        sortable: true,
      },
      {
        name: 'User ID',
        selector: (row) => row?.user_id,
        width: '220px',
        sortable: true,
      },
      {
        name: 'Invoice Name',
        selector: (row) => row?.invoice_name,
      },
      {
        name: 'Bank ID',
        selector: (row) => row?.bank_detail?.bank_id,
        width: '220px',
      },
      {
        name: 'Bank Name',
        selector: (row) => row?.bank_detail?.bank_name,
        width: '200px',
      },
      {
        name: 'Bank Account Number',
        selector: (row) => row?.bank_detail?.account_number,
        width: '200px',
      },
      {
        name: 'Bank Account Owner',
        selector: (row) => row?.bank_detail?.account_owner,
        minWidth: '200px',
      },
      {
        name: 'Bank Branch Number',
        selector: (row) => row?.bank_detail?.branch_number,
        width: '200px',
      },
      {
        name: 'Created At',
        selector: (row) => format(parseISO(row?.createdAt), 'yyyy-MM-dd'),
        width: '150px',
        sortable: true,
      },
      {
        name: 'Updated At',
        selector: (row) => format(parseISO(row?.updatedAt), 'yyyy-MM-dd'),
        width: '150px',
        sortable: true,
      },
    ],
    []
  )

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleNavigate = (row) => {
    router.push(`/payment/${row?.personal_id}?id=${row?._id}`)
  }

  const customStyles = {
    rows: {
      style: {
        cursor: 'pointer',
      },
    },
  }

  return (
    <div className="pr-4 py-4">
      <h1 className="text-2xl font-bold  uppercase flex justify-end">
        Payment
      </h1>
      <div className="w-full flex justify-end flex-row mt-3 ">
        <div className="w-96 rtl flex flex-row items-center">
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
            <div className="flex flex-row">
              <input
                type="text"
                placeholder="Search Personal ID"
                className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </label>
        </div>
      </div>
      <div className="mt-12">
        <DataTable
          columns={columns}
          data={payment}
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
          onRowClicked={handleNavigate}
          customStyles={customStyles}
        />
      </div>
    </div>
  )
}

export default Payment
