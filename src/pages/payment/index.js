import { getPaymentData } from 'actions/payment'
import { format, parseISO } from 'date-fns'
import { useDebounce, useTableHeight } from 'helper/utils'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'

function Payment() {
  const [payment, setPayment] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(20)
  const [search, setSearch] = useState('')

  const router = useRouter()
  const { tableHeight } = useTableHeight(302)

  const getPayment = async (page, limit, query) => {
    const result = await getPaymentData({ page, limit, query: search })
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
    <div className="pr-4">
      <div className="rtl">
        <h1 className="text-2xl font-bold py-4 uppercase">Payment</h1>
        <div className="space-y-2 py-6">
          <p className="text-sm">Personal ID</p>
          <input
            type="text"
            placeholder="Search"
            className="border border-slate-300 rounded-md px-2 py-1"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
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
  )
}

export default Payment
