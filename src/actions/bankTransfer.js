import { BANK_TRANSFER, UP_FILE } from 'constants/request'
import fetchApi, { uploadFileApi } from 'helper/fetchApi'

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

export const columnsBankTransfer = [
  {
    name: 'File url',
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
    name: 'Bank Transfers No',
    selector: (row) => row.bank_transfer_no,
    width: '200px',
  },
  {
    name: 'Amount',
    selector: (row) => row.amount,
    width: '200px',
  },
  {
    name: 'Transfer Date',
    selector: (row) => row.transferDate,
    width: '300px',
  },

  {
    name: 'Upload date',
    selector: (row) => row.updatedAt,
    width: '250px',
  },
]
