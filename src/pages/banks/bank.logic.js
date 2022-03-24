import { BANKS } from 'constants/request'
import fetchApi from 'helper/fetchApi'

export const getBanks = (name, page, limit) =>
  fetchApi({
    url: BANKS,
    options: {
      method: 'GET',
    },
    params: {
      'filter.bank_name': name,
      page,
      limit,
    },
  })

export const createBank = (params) =>
  fetchApi({
    url: BANKS,
    options: {
      method: 'POST',
    },
    params,
  })

export const columnsCompany = [
  {
    name: 'Name',
    selector: (row) => row.bank_name,
    width: '350px',
  },
  {
    name: 'Id',
    selector: (row) => row._id,
    width: '350px',
  },
]

export const deleteBank = (id) =>
  fetchApi({
    url: `${BANKS}/${id}`,

    options: {
      method: 'DELETE',
    },
  })

export function ExpandedComponentBank({ data, callback }) {
  const onDeleteCompany = async () => {
    try {
      await deleteBank(data?._id)
      if (typeof callback === 'function') {
        callback(0)
      }
    } catch (error) {}
  }
  return (
    <div className="flex pr-10 pt-3 gap-x-4 pl-5 ">
      <button
        onClick={onDeleteCompany}
        key={data.name}
        type="button"
        className="bg-red-500 hover:bg-red-500 text-white  py-2 px-4 rounded  text-xs"
      >
        <div>Delete</div>
      </button>
    </div>
  )
}
