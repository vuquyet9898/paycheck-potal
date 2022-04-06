import { getUserDetail, updateUserDetail } from 'actions/user'
import UserDetail from 'components/user/UserDetail'
import { USER_APPROVAL, USER_DELIVERY_APPROVAL } from 'constants/user-approval'
import { renderErrorMessage } from 'helper/utils'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function PersonalPaymentDetail() {
  const router = useRouter()
  const { pid, id } = router.query

  const [userDetail, setUserDetail] = useState(null)
  const [bankModalVisible, setBankModalVisible] = useState(false)
  const [finalizeData, setFinalizeData] = useState(null)
  const dataApproval =
    userDetail?.freelancer_type === 'freelancer'
      ? USER_APPROVAL
      : USER_DELIVERY_APPROVAL
  useEffect(() => {
    if (userDetail) {
      const temp = {}
      dataApproval.forEach((info) => {
        temp[info.fieldApprovalName] = userDetail[info.fieldApprovalName] || ''
      })
      setFinalizeData(temp)
    }
  }, [userDetail])

  const getPaymentDataDetail = async () => {
    const result = await getUserDetail(id)
    if (result?.data) {
      setUserDetail(result.data)
    }
  }

  const handleVisibleBankModal = () => {
    setBankModalVisible(!bankModalVisible)
  }

  useEffect(() => {
    if (pid) {
      getPaymentDataDetail()
    }
  }, [pid])

  const handleUpdatePayment = async () => {
    const result = await updateUserDetail({ id, data: finalizeData })
    if (result?.status === 200) {
      toast.success('Update successfully!')
    } else {
      renderErrorMessage({
        message: 'Unexpected error occurs, please try again',
      })
    }
  }

  return (
    <div className="rtl pr-4">
      <div className="flex items-center justify-between">
        <h1 className="py-4 uppercase">
          Personal ID: <span className="font-bold text-2xl">{pid}</span>
        </h1>
        <button
          type="button"
          className="ml-8 underline text-indigo-500 hover:text-indigo-400 active:text-indigo-600"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      <div className="flex flex-col gap-4 pl-4">
        {dataApproval.map((info) => (
          <Fragment key={info.id}>
            <UserDetail
              detail={info}
              data={userDetail}
              handleVisibleBankModal={handleVisibleBankModal}
              setFinalizeData={setFinalizeData}
              finalizeData={finalizeData}
            />
          </Fragment>
        ))}
      </div>

      <button
        type="button"
        className="mt-10 btn-primary px-3 py-2 rounded-md text-sm"
        onClick={handleUpdatePayment}
      >
        Update
      </button>
    </div>
  )
}

export default PersonalPaymentDetail
