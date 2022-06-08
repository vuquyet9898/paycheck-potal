import { HELP } from 'constants/request'
import fetchApi from 'helper/fetchApi'

export const getHelp = () =>
  fetchApi({
    url: HELP,
    options: {
      method: 'GET',
    },
  })

export const getHelpDetail = async ({ id }) => {
  try {
    const result = await fetchApi({
      url: `${HELP}/${id}`,
    })
    return result
  } catch (error) {
    console.log(error)
  }
}
