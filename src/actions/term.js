import { TERM } from 'constants/request'
import fetchApi from 'helper/fetchApi'
import { useTranslation } from 'react-i18next'

export const getTerm = () =>
  fetchApi({
    url: TERM,
    options: {
      method: 'GET',
    },
  })

export const postTerm = (params) =>
  fetchApi({
    url: TERM,
    options: {
      method: 'POST',
    },
    params,
  })
