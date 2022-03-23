import { COMPANY } from 'constants/request'
import fetchApi from 'helper/fetchApi'

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

export const createCompany = (params) =>
  fetchApi({
    url: COMPANY,
    options: {
      method: 'POST',
    },
    params,
  })

export const columnsCompany = [
  {
    name: 'Name',
    selector: (row) => row.name,
    width: '350px',
  },
  {
    name: 'Id',
    selector: (row) => row._id,
    width: '350px',
  },
]
