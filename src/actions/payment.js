import { PAYMENT } from 'constants/request'
import { format, parseISO } from 'date-fns'
import fetchApi from 'helper/fetchApi'
import { useTranslation } from 'react-i18next'

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

export const UseSchemaColumnsPayment = () => {
  const [t] = useTranslation('common')
  return [
    {
      name: t('payment.personalId'),
      selector: (row) => row?.personal_id,
      width: '130px',
      sortable: true,
    },
    {
      name: t('payment.userId'),
      selector: (row) => row?.user_id,
      width: '220px',
      sortable: true,
    },
    {
      name: t('payment.invoiceName'),
      selector: (row) => row?.invoice_name,
    },
    {
      name: t('payment.bankId'),
      selector: (row) => row?.bank_detail?.bank_id,
      width: '220px',
    },
    {
      name: t('payment.bankName'),
      selector: (row) => row?.bank_detail?.bank_name,
      width: '200px',
    },
    {
      name: t('payment.bankAccountNumber'),
      selector: (row) => row?.bank_detail?.account_number,
      width: '200px',
    },
    {
      name: t('payment.bankAccountOwner'),
      selector: (row) => row?.bank_detail?.account_owner,
      minWidth: '200px',
    },
    {
      name: t('payment.bankBranchNumber'),
      selector: (row) => row?.bank_detail?.branch_number,
      width: '200px',
    },
    {
      name: t('payment.createdAt'),
      selector: (row) => format(parseISO(row?.createdAt), 'yyyy-MM-dd'),
      width: '150px',
      sortable: true,
    },
    {
      name: t('payment.updatedAt'),
      selector: (row) => format(parseISO(row?.updatedAt), 'yyyy-MM-dd'),
      width: '150px',
      sortable: true,
    },
  ]
}
