import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { getUser } from './user.api'
import { columnsUser } from './user.data'

export default function Index() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)

  const fetchUsers = async (page) => {
    setLoading(true)
    const response = await getUser()
    setData(response.data.data)
    setTotalRows(response.data.total_page)
    setLoading(false)
  }

  const handlePageChange = (page) => {
    fetchUsers(page)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log('newPerPage, page', newPerPage, page)
    setLoading(true)

    const response = await getUser()

    setData(response.data.data)
    // setPerPage(newPerPage)
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <div>
      <div className="w-full flex justify-end pt-8">
        <div className="w-96">
          <label className="relative block" htmlFor="first-name">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <img
                src="search.svg"
                className="h-5 w-5 fill-slate-300"
                viewBox="0 0 20 20"
              />
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search personal Id"
              type="text"
              name="search"
            />
          </label>
        </div>
      </div>
      <DataTable
        title="All user"
        columns={columnsUser}
        data={data}
        expandableRows
        direction="rtl"
        //
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
      />
    </div>
  )
}
