import { INVOICES, UP_FILE } from 'constants/request'
import fetchApi, { uploadFileApi } from 'helper/fetchApi'

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

export const columnsInvoices = [
  {
    name: 'File name',
    selector: (row) => row.file_name,
    width: '450px',
  },
  {
    name: 'Date',
    selector: (row) => row.date,
    width: '300px',
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
