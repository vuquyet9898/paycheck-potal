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
