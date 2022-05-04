import { XIcon } from '@heroicons/react/solid'
import { PAY_CHECK, UP_FILE } from 'constants/request'
import { format, parseISO } from 'date-fns'
import fetchApi, { uploadFileApi } from 'helper/fetchApi'
import { useTranslation } from 'react-i18next'

export const getPayCheckDetail = (id, page, limit) =>
  fetchApi({
    url: `${PAY_CHECK}/${id}/admin`,
    options: {
      method: 'GET',
    },
    params: {
      page,
      limit,
    },
  })

export const upFilePayCheck = (data) =>
  uploadFileApi({
    url: UP_FILE,
    data,
  })

export const createPayCheck = (params) =>
  fetchApi({
    url: PAY_CHECK,
    options: {
      method: 'POST',
    },
    params,
  })

export const deletePayCheck = (params) =>
  fetchApi({
    url: `${PAY_CHECK}/${params}`,
    options: {
      method: 'DELETE',
    },
  })

export const columnsPayCheck = [
  {
    name: 'File url',
    selector: (row) => row.file_url,
    width: '450px',
    cell: (row) => (
      <a
        href={row.file_url}
        target="paycheck"
        rel="noreferrer"
        className="truncate text-indigo-500 whitespace-nowrap overflow-hidden  overflow-ellipsis"
      >
        {row?.file_url}
      </a>
    ),
  },
  {
    name: 'File name',
    selector: (row) => row.file_name,
    width: '250px',
  },
  {
    name: 'Id',
    selector: (row) => row._id,
    width: '250px',
  },

  {
    name: 'Create date',
    selector: (row) => format(parseISO(row?.createdAt), 'yyyy-MM-dd'),
    width: '250px',
  },
]

export function ExpandedComponentPaycheck({ data, callback }) {
  const [t] = useTranslation('common')

  const onDeleteCompany = async () => {
    try {
      await deletePayCheck(data?._id)
      if (typeof callback === 'function') {
        callback(0)
      }
    } catch (error) {}
  }
  return (
    <div className="flex pr-10 pt-3 gap-x-4 pl-5  pb-2">
      <button
        onClick={onDeleteCompany}
        key={data.name}
        type="button"
        className="bg-red-500 hover:bg-red-500 text-white  py-2 px-4 rounded mt-2  text-xs flex items-center"
      >
        <div>{t('bank.delete')}</div>
        <XIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  )
}
