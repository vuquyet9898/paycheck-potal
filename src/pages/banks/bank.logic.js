import { BANKS } from 'constants/request'
import fetchApi from 'helper/fetchApi'

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

export const columnsCompany = [
  {
    name: 'Name',
    selector: (row) => row.bank_name,
    width: '350px',
  },
  {
    name: 'Id',
    selector: (row) => row._id,
    width: '350px',
  },
]
