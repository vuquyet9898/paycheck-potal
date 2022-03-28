export const getQuery = (key, data) => {
  switch (key) {
    case 'Bank Transfer':
      return {
        id: data?._id,
        branchNumber: data?.payment?.bank_detail?.branch_number,
        bankName: data?.payment?.bank_detail?.bank_name,
        accountNumber: data?.payment?.bank_detail?.account_number,
      }
    case 'Invoices':
      return {
        slug: data?.personal_id,
        id: data?._id,
      }
    case 'PayCheck':
      return {
        id: data?._id,
      }

    case 'Payment':
      return {
        id: data?._id,
      }
    default:
      break
  }
}
