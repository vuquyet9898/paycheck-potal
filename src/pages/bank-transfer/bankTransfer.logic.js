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
    name: 'Bank Transfers No',
    selector: (row) => row.bank_transfer_no,
    width: '450px',
  },
  {
    name: 'Amount',
    selector: (row) => row.amount,
    width: '300px',
  },
  {
    name: 'Transfer Date',
    selector: (row) => row.transferDate,
    width: '300px',
  },

  {
    name: 'Upload date',
    selector: (row) => row.updatedAt,
    width: '300px',
  },
]
