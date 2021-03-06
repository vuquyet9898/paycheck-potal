import { getUser, UseSchemaColumnsUser } from 'actions/user'
import FilterUser from 'components/user/FilterUser'
import { ExpandedComponent } from 'components/user/UserExpandedComponent'
import { useTableHeight } from 'helper/utils'
import { debounce } from 'lodash'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useTranslation } from 'react-i18next'

export const userType = [{ name: 'freelancer' }, { name: 'delivery' }]

export default function Index() {
  const [t] = useTranslation('common')

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  console.log('🚀 ~ file: index.js ~ line 18 ~ Index ~ loading', loading)
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(20)

  const [keyword, setKeyword] = useState('')
  const [fullNameSearch, setFullNameSearch] = useState('')

  const { tableHeight } = useTableHeight(302)

  const changeHandler = (event) => {
    setKeyword(event.target.value)
  }
  const changeSearchNameHandler = (event) => {
    setFullNameSearch(event.target.value)
  }
  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

  const debouncedSearchNameHandler = useMemo(
    () => debounce(changeSearchNameHandler, 300),
    []
  )

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
      fullName: fullNameSearch,
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
  }, [selectedUserType, keyword, perPage, fullNameSearch])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUsers(0)
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [selectedUserType, keyword, perPage, fullNameSearch])

  const columns = UseSchemaColumnsUser()
  const memoColumnsUser = useMemo(() => columns, [columns])

  return (
    <div className="px-4 py-4">
      <h1 className="text-2xl font-bold  uppercase flex justify-end">
        {t('user.title')}
      </h1>

      <div className="w-full  justify-end flex-row mt-3 md:flex grid grid-rows-2 gap-y-3 md:gap-x-4  ">
        <div className=" rtl flex flex-row items-center">
          {/* <p className="text-sm px-4">Personal ID</p> */}
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
                placeholder={t('user.titleSearch')}
                type="text"
                name="search"
                onChange={debouncedChangeHandler}
              />
            </div>
          </label>
        </div>
        <div className=" rtl flex flex-row items-center ">
          {/* <p className="text-sm px-4">Personal ID</p> */}
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
                placeholder={t('searchName')}
                type="text"
                name="search"
                onChange={debouncedSearchNameHandler}
              />
            </div>
          </label>
        </div>
        <div className="w-48 z-10 md:ml-4 ml-0">
          <FilterUser
            selectedUserType={selectedUserType}
            setSelectedUserType={setSelectedUserType}
          />
        </div>
      </div>
      <DataTable
        fixedHeader
        title={t('user.allUser')}
        columns={memoColumnsUser}
        data={data}
        expandableRows
        direction="rtl"
        //
        // progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        // eslint-disable-next-line react/no-unstable-nested-components
        expandableRowsComponent={({ data }) => (
          <ExpandedComponent data={data} callback={fetchUsers} />
        )}
        paginationPerPage={20}
        fixedHeaderScrollHeight={`${tableHeight}px`}
        paginationRowsPerPageOptions={[10, 20, 30, 50]}
        noDataComponent={<div>{t('noData')}</div>}
        paginationComponentOptions={{
          rangeSeparatorText: t('table.rangeSeparatorText'),
          rowsPerPageText: t('table.rowsPerPageText'),
        }}
      />
    </div>
  )
}
