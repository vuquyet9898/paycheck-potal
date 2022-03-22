import { HELP } from 'constants/request'
import fetchApi from 'helper/fetchApi'
import { useTableHeight } from 'helper/utils'
import { debounce } from 'lodash'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'

export function ExpandedComponent({ data }) {
  return <div className="text-sm leading-7 px-6">{data.content}</div>
}

const columnsHelp = [
  {
    name: 'Phone number',
    selector: (row) => row.phonenumber,
    width: '200px',
  },
  {
    width: '1200px',
    name: 'Messages',
    selector: (row) => row.content,
  },
]
const getHelp = ({ page = 0, limit, freelancerType, personalId = '' }) =>
  fetchApi({
    url: HELP,
    options: {
      method: 'GET',
    },
    params: {
      page,
      limit,
      freelancer_type: freelancerType,
      personal_id: personalId,
    },
  })

export default function Index() {
  const [keyword, setKeyword] = useState('')
  const changeHandler = (event) => {
    setKeyword(event.target.value)
  }
  const { tableHeight } = useTableHeight(302)

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [limit, setPerPage] = useState(20)

  //
  //
  const fetchUsers = async (page) => {
    setLoading(true)
    const response = await getHelp({ page, limit, personalId: keyword })
    setData(response?.data?.data)
    setTotalRows(response?.data?.total_page * limit)

    setLoading(false)
  }

  const handlePageChange = (page) => {
    fetchUsers(page - 1)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage)
  }

  useEffect(() => {
    fetchUsers()
  }, [keyword, limit])

  return (
    <div className="pt-8 ">
      <div className="rtl flex flex-row items-center pr-4">
        <div className="pl-2">
          <p>Search User</p>
        </div>
        <div className="w-96 rtl">
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
              placeholder="Personal Id"
              type="text"
              name="search"
              onChange={debouncedChangeHandler}
            />
          </label>
        </div>
      </div>
      <DataTable
        expandableRows
        title="All Messages"
        columns={columnsHelp}
        data={data}
        direction="rtl"
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationPerPage={20}
        fixedHeaderScrollHeight={`${tableHeight}px`}
        paginationRowsPerPageOptions={[10, 20, 30, 50]}
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  )
}
