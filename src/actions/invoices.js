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
    name: 'File Url',
    selector: (row) => row.file_url,
    width: '450px',
    cell: (row) => (
      <a
        href={row?.file_url ? row?.file_url : ''}
        target="paycheck"
        rel="noreferrer"
        className="text-indigo-500 whitespace-nowrap overflow-hidden  overflow-ellipsis"
      >
        {row?.file_name ? row?.file_name : ''}
      </a>
    ),
  },
  {
    name: 'Date',
    // selector: (row) => format(parseISO(row?.date), 'yyyy-MM-dd'),
    width: '300px',
    selector: (row) => row.date,
    // selector: (row) => format(row?.date, 'yyyy-MM-dd'),
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
