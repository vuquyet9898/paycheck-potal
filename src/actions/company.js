import { COMPANY } from 'constants/request'
import fetchApi from 'helper/fetchApi'
import { XIcon, PencilIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'

export const getCompany = (name, page, limit) =>
  fetchApi({
    url: `${COMPANY}/admin`,
    // url: COMPANY,

    options: {
      method: 'GET',
    },
    params: {
      'filter.name': name,
      page,
      limit,
    },
  })
export const deleteCompany = (id) =>
  fetchApi({
    url: `${COMPANY}/${id}`,

    options: {
      method: 'DELETE',
    },
  })

export const createCompany = (params) =>
  fetchApi({
    url: COMPANY,
    options: {
      method: 'POST',
    },
    params,
  })

export const columnsCompany = [
  {
    name: 'Name',
    selector: (row) => row.name,
    width: '350px',
  },
  {
    name: 'Id',
    selector: (row) => row._id,
    width: '350px',
  },
]

export function ExpandedComponentCompany({ data, callback }) {
  const [t] = useTranslation('common')

  const onDeleteCompany = async () => {
    try {
      await deleteCompany(data?._id)
      if (typeof callback === 'function') {
        callback(0)
      }
    } catch (error) {}
  }
  return (
    <div className="flex pr-10 pt-3 gap-x-4 pl-5  pb-2 ">
      <button
        onClick={onDeleteCompany}
        key={data.name}
        type="button"
        className=" bg-red-500 text-white  py-2 px-4 rounded mt-2  text-xs flex items-center"
      >
        <div>{t('company.delete')}</div>
        <XIcon className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        onClick={onDeleteCompany}
        key={data.name}
        type="button"
        className=" bg-green-500 text-white py-2 px-4 rounded mt-2  text-xs flex items-center"
      >
        <div>{t('company.edit')}</div>
        <PencilIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  )
}
