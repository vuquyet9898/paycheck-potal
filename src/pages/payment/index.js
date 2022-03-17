import React, { useEffect, useLayoutEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { parseISO, format } from 'date-fns'
import { getPaymentData } from 'actions/payment'
import fetchApi from 'helper/fetchApi'
import { useTableHeight } from 'helper/utils'

function Payment() {
  const [payment, setPayment] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)

  const { tableHeight } = useTableHeight(136)

  const getPayment = async (page, limit) => {
    setLoading(true)
    const result = await getPaymentData({ page, limit })
    const { data, status } = result
    if (status === 200) {
      setPayment(data?.data)
      setTotalPage(data?.total_page)
    }
    setLoading(false)
    // console.log('🚀 ===== result', result)
  }

  useEffect(() => {
    getPayment()
  }, [])

  const handlePageChange = (page) => {
    getPayment(page)
  }

  // const handlePerRowsChange = async (newPerPage, page) => {
  // 	setLoading(true);

  // 	const response = await fetchApi.get(`https://reqres.in/api/users?page=${page}&per_page=${newPerPage}&delay=1`);

  // 	setData(response.data.data);
  // 	setPerPage(newPerPage);
  // 	setLoading(false);
  // };

  const columns = [
    {
      name: 'ID',
      selector: (row) => row?._id,
      width: '250px',
      sortable: true,
    },
    {
      name: 'User ID',
      selector: (row) => row?.user_id,
      width: '250px',
      sortable: true,
    },
    {
      name: 'Bank ID',
      selector: (row) => row?.bank_detail?.bank_id,
      width: '250px',
      sortable: true,
    },
    {
      name: 'Bank Name',
      selector: (row) => row?.bank_detail?.bank_name,
      width: '200px',
      sortable: true,
    },
    {
      name: 'Bank Account Number',
      selector: (row) => row?.bank_detail?.account_number,
      width: '200px',
      sortable: true,
    },
    {
      name: 'Bank Account Owner',
      selector: (row) => row?.bank_detail?.account_owner,
      sortable: true,
    },
    {
      name: 'Bank Branch Number',
      selector: (row) => row?.bank_detail?.branch_number,
      width: '200px',
      sortable: true,
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
  ]

  return (
    <div className="pr-6">
      <h1 className="rtl text-2xl font-bold p-4 uppercase">Payment</h1>

      <DataTable
        columns={columns}
        data={payment}
        direction="rtl"
        fixedHeader
        fixedHeaderScrollHeight={`${tableHeight}px`}
      />
    </div>
  )
}

export default Payment
