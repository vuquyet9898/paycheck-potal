import { HELP } from 'constants/request'
import fetchApi from 'helper/fetchApi'
import { useTableHeight } from 'helper/utils'
import { debounce } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useTranslation } from 'react-i18next'

export function ExpandedComponent({ data }) {
  return <div className="text-sm leading-7 px-6">{data.content}</div>
}

const getHelp = ({ page = 0, limit, phoneNumber = '' }) =>
  fetchApi({
    url: `${HELP}/admin`,
    options: {
      method: 'GET',
    },
    params: {
      page,
      limit,
      phone_number: phoneNumber,
    },
  })

export default function Index() {
  const [t] = useTranslation('common')

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
    const response = await getHelp({ page, limit, phoneNumber: keyword })
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

  const columnsHelp = [
    {
      name: t('help.phone'),
      selector: (row) => row.phonenumber,
      width: '200px',
    },
    {
      width: '1200px',
      name: t('help.mes'),
      selector: (row) => row.content,
    },
  ]

  const customStyles = {
    rows: {
      style: {
        cursor: 'pointer',
      },
    },
  }

  const router = useRouter()

  const handleNavigate = (row) => {
    router.push({
      pathname: `/help/[hid]`,
      query: { hid: row?._id },
    })
  }

  return (
    <div className="px-4 py-4">
      <h1 className="text-2xl font-bold  uppercase flex justify-end">
        {t('help.title')}
      </h1>
      <div className="  pt-3  flex flex-row justify-end ">
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
                className=" placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder={t('help.search')}
                type="text"
                name="search Personal ID"
                onChange={debouncedChangeHandler}
              />
            </div>
          </label>
        </div>
      </div>
      <DataTable
        fixedHeader
        title={t('help.allMess')}
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
        onRowClicked={handleNavigate}
        customStyles={customStyles}
        noDataComponent={<div>{t('noData')}</div>}
      />
    </div>
  )
}
