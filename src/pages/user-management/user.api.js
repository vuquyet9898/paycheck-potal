const { default: axiosInstance } = require('helper/axiosInstance')

export const getUser = async (page = 0) =>
  axiosInstance.get('users', {
    params: {
      page,
      limit: 10,
    },
  })
