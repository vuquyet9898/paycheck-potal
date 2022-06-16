import { debounce } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useTableHeight } from 'helper/utils'
import { getUser, UseSchemaColumnsUser } from 'actions/user'
import FilterUser from 'components/user/FilterUser'
import { userType } from 'pages/user-management'
import { useTranslation } from 'react-i18next'

const customStyles = {
  rows: {
    style: {
      cursor: 'pointer',
    },
  },
}

export default function Index() {
  const [keyword, setKeyword] = useState('')
  const changeHandler = (event) => {
    setKeyword(event.target.value)
  }
  const [selectedUserType, setSelectedUserType] = useState(userType[0])
  const [t] = useTranslation('common')

  const router = useRouter()
  const { tableHeight } = useTableHeight(302)

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

  const columns = UseSchemaColumnsUser()
  const memoColumnsUser = useMemo(() => columns, [columns])

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalRows, setTotalRows] = useState(0)
  const [limit, setPerPage] = useState(20)

  //
  //
  const fetchUsers = async (page) => {
    setLoading(true)
    const response = await getUser({
      page,
      limit,
      personalId: keyword,
      freelancerType: selectedUserType.name,
    })
    setData(response.data.data)
    setTotalRows(response.data.total_page * limit)

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
  }, [keyword, limit, selectedUserType])

  const handleNavigate = (row) => {
    router.push({
      pathname: `/invoices/[slug]`,
      query: { slug: row?.personal_id, id: row?._id },
    })
  }
  return (
    <div className="px-4 py-4 ">
      <h1 className="text-2xl font-bold  uppercase flex justify-end">
        {t('incvoices.title')}
      </h1>
      <div className=" mt-3 md:flex flex-row justify-end grid grid-rows-2 gap-x-8 gap-y-3">
        <div className="rtl flex flex-row items-center">
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
                placeholder={t('payment.titleSearch')}
                type="text"
                name="search"
                onChange={debouncedChangeHandler}
              />
            </div>
          </label>
        </div>
        <div className="w-48 z-10 ">
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
        direction="rtl"
        onRowClicked={handleNavigate}
        customStyles={customStyles}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
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
