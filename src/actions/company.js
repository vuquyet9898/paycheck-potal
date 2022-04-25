import { COMPANY } from 'constants/request'
import fetchApi from 'helper/fetchApi'
import { XIcon, PencilIcon } from '@heroicons/react/solid'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

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

export const getCompanyDetail = (_id) =>
  fetchApi({
    url: `https://dev.paycheck.just.engineer/api/v1/companies/${_id}`,
    options: {
      method: 'GET',
    },
  })

export const UseSchemaColumnsCompany = () => {
  const [t] = useTranslation('common')
  return [
    {
      name: t('company.name'),
      selector: (row) => row.name,
      width: '350px',
    },
    {
      name: t('company.id'),
      selector: (row) => row._id,
      width: '350px',
    },
  ]
}

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
        key={`${data.name}-delete`}
        type="button"
        className=" bg-red-500 text-white  py-2 px-4 rounded mt-2  text-xs flex items-center"
      >
        <div>{t('company.delete')}</div>
        <XIcon className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        key={`${data.name}-edit`}
        type="button"
        className=" bg-green-500 text-white py-2 px-4 rounded mt-2 "
      >
        <Link
          href={{
            pathname: `company/edit-company/${data._id}`,
          }}
        >
          <a className="text-xs flex items-center">
            <div>{t('company.edit')}</div>
            <PencilIcon className="w-5 h-5" aria-hidden="true" />
          </a>
        </Link>
      </button>
    </div>
  )
}
