import { USER } from 'constants/request'
import fetchApi from 'helper/fetchApi'
import { useTranslation } from 'react-i18next'

export const getUser = ({ page = 0, limit, freelancerType, personalId = '' }) =>
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

export const getUserDetail = (id) =>
  fetchApi({
    url: `https://dev.paycheck.just.engineer/api/v1/users/${id}`,
    options: {
      method: 'GET',
    },
  })

export const updateUserDetail = async ({ id, data }) => {
  try {
    const result = await fetchApi({
      url: `https://dev.paycheck.just.engineer/api/v1/users/${id}`,
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

export const UseSchemaColumnsUser = () => {
  const [t] = useTranslation('common')
  return [
    {
      name: t('user.typeOffUser'),
      selector: (row) =>
        row.freelancer_type === 'freelancer'
          ? t('user.freelance')
          : t('user.delivery'),
      width: '150px',
    },
    {
      name: t('user.phone'),
      selector: (row) => row.phone_number,
      width: '200px',
    },
    {
      name: t('user.id'),
      selector: (row) => row.personal_id,
      width: '150px',
    },

    {
      name: t('user.name'),
      selector: (row) => row.full_name,
      width: '200px',
    },
    {
      name: t('user.email'),
      selector: (row) => row.email,
      width: '250px',
    },
    {
      name: t('user.workingStatus'),
      selector: (row) => row.work_status,
      width: '150px',
    },
  ]
}
