import { PAYMENT } from 'constants/request'
import fetchApi from 'helper/fetchApi'

export const getPaymentData = async ({ page = 0, limit = 20 }) => {
  try {
    const result = await fetchApi({
      url: PAYMENT,
      params: {
        limit,
        page,
      },
    })
    return result
  } catch (error) {
    console.log(error)
  }
}
