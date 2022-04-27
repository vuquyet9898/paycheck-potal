import { TAXES } from 'constants/request'
import fetchApi from 'helper/fetchApi'

export const createTaxes = (params) =>
  fetchApi({
    url: TAXES,
    options: {
      method: 'POST',
    },
    params,
  })

export const getDetailTaxes = (id) =>
  fetchApi({
    url: `${TAXES}/${id}`,
    options: {
      method: 'GET',
    },
  })
