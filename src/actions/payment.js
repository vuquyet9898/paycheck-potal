import { PAYMENT } from 'constants/request'
import fetchApi from 'helper/fetchApi'

export const getPaymentData = async ({ page = 0, limit = 20, query = '' }) => {
  try {
    const result = await fetchApi({
      url: PAYMENT,
      params: {
        limit,
        page,
        'filter.personal_id': query,
      },
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

export const getPaymentDetail = async ({ id }) => {
  try {
    const result = await fetchApi({
      url: `${PAYMENT}/${id}/admin`,
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

export const updatePaymentDetail = async ({ id, data }) => {
  try {
    const result = await fetchApi({
      url: `${PAYMENT}/${id}`,
      options: {
        method: 'PATCH',
      },
      params: data,
    })
    return result
  } catch (error) {
    console.log(error)
  }
}
