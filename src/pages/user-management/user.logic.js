import { USER } from 'constants/request'
import fetchApi from 'helper/fetchApi'

export const getUser = ({
  page = 0,
  limit,
  freelancerType = 'freelancer',
  personalId = '',
}) =>
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
    width: '250px',
  },
  {
    name: 'Phone',
    selector: (row) => row.phone_number,
    width: '200px',
  },
  {
    name: 'ID',
    selector: (row) => row.personal_id,
    width: '200px',
  },

  {
    name: 'Company',
    selector: (row) => row.company_name,
    width: '200px',
  },
  {
    name: 'Email',
    selector: (row) => row.email,
    width: '350px',
  },
  {
    name: 'Name',
    selector: (row) => row.full_name,
    width: '200px',
  },
]
