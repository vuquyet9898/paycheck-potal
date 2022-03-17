import { debounce } from 'lodash'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import FilterUser from './components/FilterUser'
import { ExpandedComponent } from './components/UserExpandedComponent'
import { columnsUser, getUser } from './user.logic'

const userType = [{ name: 'freelancer' }, { name: 'delivery' }]

export default function Index() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [keyword, setKeyword] = useState('')

  const changeHandler = (event) => {
    setKeyword(event.target.value)
  }
  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])
  //
  const [selectedUserType, setSelectedUserType] = useState(userType[0])
  //
  const fetchUsers = async (page) => {
    setLoading(true)
    const response = await getUser(
      page,
      perPage,
      selectedUserType.name,
      keyword
    )
    setData(response.data.data)
    setTotalRows(response.data.total_page)
    setLoading(false)
  }

  const handlePageChange = (page) => {
    fetchUsers(page - 1)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true)
    const response = await getUser(page - 1, newPerPage, selectedUserType.name)
    setData(response.data.data)
    setPerPage(newPerPage)

    setLoading(false)
  }

  useEffect(() => {
    fetchUsers(0)
  }, [selectedUserType, keyword])
  const memoColumnsUser = useMemo(() => columnsUser, [])

  return (
    <div>
      <div className="w-full flex justify-end flex-row pt-8 ">
        <div className="w-96">
          <label className="relative block" htmlFor="first-name">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
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
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search personal Id"
              type="text"
              name="search"
              onChange={debouncedChangeHandler}
            />
          </label>
        </div>
        <div className="w-48 z-10 ml-4">
          <FilterUser
            selectedUserType={selectedUserType}
            setSelectedUserType={setSelectedUserType}
          />
        </div>
      </div>
      <DataTable
        title="All user"
        columns={memoColumnsUser}
        data={data}
        expandableRows
        direction="rtl"
        //
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows * 10}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  )
}
