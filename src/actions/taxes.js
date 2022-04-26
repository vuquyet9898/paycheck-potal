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

export const getDetailTaxes = (params) =>
  fetchApi({
    url: TAXES,
    options: {
      method: 'GET',
    },
    params,
  })
