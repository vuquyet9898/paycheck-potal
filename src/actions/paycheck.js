import { PAY_CHECK, UP_FILE } from 'constants/request'
import { format, parseISO } from 'date-fns'
import fetchApi, { uploadFileApi } from 'helper/fetchApi'

export const getPayCheckDetail = (id, page, limit) =>
  fetchApi({
    url: `${PAY_CHECK}/${id}/admin`,
    options: {
      method: 'GET',
    },
    params: {
      page,
      limit,
    },
  })

export const upFilePayCheck = (data) =>
  uploadFileApi({
    url: UP_FILE,
    data,
  })

export const createPayCheck = (params) =>
  fetchApi({
    url: PAY_CHECK,
    options: {
      method: 'POST',
    },
    params,
  })

export const columnsPayCheck = [
  {
    name: 'File url',
    selector: (row) => row.file_url,
    width: '450px',
    cell: (row) => (
      <a
        href={row.file_url}
        target="paycheck"
        rel="noreferrer"
        className="truncate text-indigo-500 whitespace-nowrap overflow-hidden  overflow-ellipsis"
      >
        {row?.file_url}
      </a>
    ),
  },
  {
    name: 'File name',
    selector: (row) => row.file_name,
    width: '250px',
  },
  {
    name: 'Id',
    selector: (row) => row._id,
    width: '250px',
  },

  {
    name: 'Create date',
    selector: (row) => format(parseISO(row?.createdAt), 'yyyy-MM-dd'),
    width: '250px',
  },
]
