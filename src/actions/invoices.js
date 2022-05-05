import { XIcon } from '@heroicons/react/solid'
import { INVOICES, UP_FILE } from 'constants/request'
import fetchApi, { uploadFileApi } from 'helper/fetchApi'
import { useTranslation } from 'react-i18next'

export const getInvoicesDetail = (id, page, limit) =>
  fetchApi({
    url: `${INVOICES}/${id}/admin`,
    options: {
      method: 'GET',
    },
    params: {
      page,
      limit,
    },
  })

export const upFileInvoices = (data) =>
  uploadFileApi({
    url: UP_FILE,
    data,
  })

export const createInvoices = (params) =>
  fetchApi({
    url: INVOICES,
    options: {
      method: 'POST',
    },
    params,
  })

export const deleteInvoices = (params) =>
  fetchApi({
    url: `${INVOICES}/${params}`,
    options: {
      method: 'DELETE',
    },
  })

export const columnsInvoices = [
  {
    name: 'File Url',
    selector: (row) => row.file_url,
    width: '450px',
    cell: (row) => (
      <a
        href={row?.file_url ? row?.file_url : ''}
        target="paycheck"
        rel="noreferrer"
        className="text-indigo-500 whitespace-nowrap overflow-hidden  overflow-ellipsis"
      >
        {row?.file_name ? row?.file_name : ''}
      </a>
    ),
  },
  {
    name: 'Date',
    // selector: (row) => format(parseISO(row?.date), 'yyyy-MM-dd'),
    width: '300px',
    selector: (row) => row.date,
    // selector: (row) => format(row?.date, 'yyyy-MM-dd'),
  },
  {
    name: 'Number',
    selector: (row) => row.number,
    width: '300px',
  },

  {
    name: 'Upload date',
    selector: (row) => row.updatedAt,
    width: '300px',
  },
]

export function ExpandedComponentInvoices({ data, callback }) {
  const [t] = useTranslation('common')

  const onDeleteInvoices = async () => {
    try {
      await deleteInvoices(data?._id)
      if (typeof callback === 'function') {
        callback(0)
      }
    } catch (error) {}
  }
  return (
    <div className="flex pr-10 pt-3 gap-x-4 pl-5  pb-2">
      <button
        onClick={onDeleteInvoices}
        key={data.name}
        type="button"
        className="bg-red-500 hover:bg-red-500 text-white  py-2 px-4 rounded mt-2  text-xs flex items-center"
      >
        <div>{t('incvoices.delete')}</div>
        <XIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  )
}
