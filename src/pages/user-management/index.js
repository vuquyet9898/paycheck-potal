import { useTableHeight } from 'helper/utils'
import { debounce } from 'lodash'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import { columnsUser, getUser } from 'actions/user'
import FilterUser from './components/FilterUser'
import { ExpandedComponent } from './components/UserExpandedComponent'

const userType = [{ name: 'freelancer' }, { name: 'delivery' }]

export default function Index() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(20)

  const [keyword, setKeyword] = useState('')
  const { tableHeight } = useTableHeight(302)

  const changeHandler = (event) => {
    setKeyword(event.target.value)
  }
  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])
  //
  const [selectedUserType, setSelectedUserType] = useState(userType[0])
  //
  const fetchUsers = async (page) => {
    setLoading(true)
    const response = await getUser({
      page,
      limit: perPage,
      freelancerType: selectedUserType.name,
      personalId: keyword,
    })
    setData(response.data.data)
    setTotalRows(response.data.total_page * perPage)
    setLoading(false)
  }

  const handlePageChange = (page) => {
    fetchUsers(page - 1)
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage)
  }
  useEffect(() => {
    fetchUsers(0)
  }, [selectedUserType, keyword, perPage])
  const memoColumnsUser = useMemo(() => columnsUser, [])

  return (
    <div>
      <div className="w-full flex justify-end flex-row pt-8 ">
        <div className="w-96 rtl flex flex-row items-center">
          <p className="text-sm px-4">Personal ID</p>
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
                className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search"
                type="text"
                name="search"
                onChange={debouncedChangeHandler}
              />
            </div>
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
        fixedHeader
        title="All user"
        columns={memoColumnsUser}
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
        expandableRowsComponent={ExpandedComponent}
        paginationPerPage={20}
        fixedHeaderScrollHeight={`${tableHeight}px`}
        paginationRowsPerPageOptions={[10, 20, 30, 50]}
      />
    </div>
  )
}
