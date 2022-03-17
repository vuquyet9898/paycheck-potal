import { USER } from 'constants/request'
import fetchApi from 'helper/fetchApi'

export const getUser = (
  page = 0,
  limit = 10,
  freelancerType = 'freelancer',
  personalId = ''
) =>
  fetchApi({
    url: USER,
    options: {
      method: 'GET',
    },
    params: {
      page,
      limit,
      freelancer_type: freelancerType,
      personal_id: personalId,
    },
  })

export const columnsUser = [
  {
    name: 'Type of user',
    selector: (row) => row.freelancer_type,
  },
  {
    name: 'Phone',
    selector: (row) => row.phone_number,
  },
  {
    name: 'ID',
    selector: (row) => row.personal_id,
  },

  {
    name: 'Company',
    selector: (row) => row.company_name,
  },
  {
    name: 'Email',
    selector: (row) => row.email,
  },
  {
    name: 'Name',
    selector: (row) => row.full_name,
  },
]
