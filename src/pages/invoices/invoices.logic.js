import { INVOICES } from 'constants/request'
import fetchApi from 'helper/fetchApi'

export const getInvoicesDetail = (id, page = 0, limit = 10) =>
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

export const columnsInvoices = [
  {
    name: 'File name',
    selector: (row) => row.file_url,
  },
  {
    name: 'Date',
    selector: (row) => row.date,
  },
  {
    name: 'Number',
    selector: (row) => row.number,
  },

  {
    name: 'Upload date',
    selector: (row) => row.upload_date,
  },
]
