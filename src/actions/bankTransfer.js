import { XIcon } from '@heroicons/react/solid'
import { BANK_TRANSFER, UP_FILE } from 'constants/request'
import fetchApi, { uploadFileApi } from 'helper/fetchApi'
import { useTranslation } from 'react-i18next'

export const getBankTransferDetail = (id, page, limit) =>
  fetchApi({
    url: `${BANK_TRANSFER}/${id}/admin`,
    options: {
      method: 'GET',
    },
    params: {
      page,
      limit,
    },
  })

export const upFileBankTransfer = (data) =>
  uploadFileApi({
    url: UP_FILE,
    data,
  })

export const createBankTransfer = (params) =>
  fetchApi({
    url: BANK_TRANSFER,
    options: {
      method: 'POST',
    },
    params,
  })

export const deleteTransfer = (params) =>
  fetchApi({
    url: `${BANK_TRANSFER}/${params}`,
    options: {
      method: 'DELETE',
    },
  })

export const UseSchemaColumnsBankTransfer = () => {
  const [t] = useTranslation('common')
  return [
    {
      name: t('bankTransfer.file'),
      width: '450px',
      cell: (row) => (
        <a
          href={row?.invoiceFileUrl ? row?.invoiceFileUrl[0] : ''}
          target="paycheck"
          rel="noreferrer"
          className="text-indigo-500 whitespace-nowrap overflow-hidden  overflow-ellipsis"
        >
          {row?.invoiceFileUrl
            ? row?.invoiceFileUrl[0].replace(/^.*[\\\/]/, '')
            : ''}
        </a>
      ),
    },

    {
      name: t('bankTransfer.bankNo'),
      selector: (row) => row.bank_transfer_no,
      width: '200px',
    },
    {
      name: t('bankTransfer.amount'),
      selector: (row) => row.amount,
      width: '200px',
    },
    {
      name: t('bankTransfer.dateTransfer'),

      selector: (row) => row.transferDate,
      width: '300px',
    },

    {
      name: t('bankTransfer.dateUpload'),

      selector: (row) => row.updatedAt,
      width: '250px',
    },
  ]
}

export function ExpandedComponentBankTransfer({ data, callback }) {
  const [t] = useTranslation('common')

  const onDeleteCompany = async () => {
    try {
      await deleteTransfer(data?._id)
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
