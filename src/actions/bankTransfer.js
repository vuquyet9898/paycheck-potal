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
