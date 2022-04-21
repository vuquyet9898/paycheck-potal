import { XIcon } from '@heroicons/react/solid'
import { BANKS } from 'constants/request'
import fetchApi from 'helper/fetchApi'
import { useTranslation } from 'react-i18next'

export const getBanks = (name, page, limit) =>
  fetchApi({
    url: BANKS,
    options: {
      method: 'GET',
    },
    params: {
      'filter.bank_name': name,
      page,
      limit,
    },
  })

export const createBank = (params) =>
  fetchApi({
    url: BANKS,
    options: {
      method: 'POST',
    },
    params,
  })

export const deleteBank = (id) =>
  fetchApi({
    url: `${BANKS}/${id}`,

    options: {
      method: 'DELETE',
    },
  })

export function ExpandedComponentBank({ data, callback }) {
  const [t] = useTranslation('common')

  const onDeleteCompany = async () => {
    try {
      await deleteBank(data?._id)
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

export const UseSchemaColumnsCompany = () => {
  const [t] = useTranslation('common')
  return [
    {
      name: t('bank.nameTb'),
      selector: (row) => row.bank_name,
      width: '350px',
    },
    {
      name: t('bank.id'),
      selector: (row) => row._id,
      width: '350px',
    },
  ]
}
