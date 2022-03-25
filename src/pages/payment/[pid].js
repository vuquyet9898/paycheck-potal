import { getPaymentDetail, updatePaymentDetail } from 'actions/payment'
import BankInfoModal from 'components/payment/BankInfoModal'
import PaymentDetail from 'components/payment/PaymentDetail'
import { PAYMENT_APPROVAL } from 'constants/payment-approval'
import { renderErrorMessage } from 'helper/utils'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function PersonalPaymentDetail() {
  const router = useRouter()
  const { pid, id } = router.query

  const [paymentDetail, setPaymentDetail] = useState(null)
  const [bankModalVisible, setBankModalVisible] = useState(false)
  const [finalizeData, setFinalizeData] = useState(null)

  useEffect(() => {
    if (paymentDetail) {
      const temp = {}
      PAYMENT_APPROVAL.forEach((info) => {
        temp[info.fieldApprovalName] =
          paymentDetail[info.fieldApprovalName] || ''
      })
      console.log('temp', temp)
      setFinalizeData(temp)
    }
  }, [paymentDetail])

  const getPaymentDataDetail = async () => {
    const result = await getPaymentDetail({ id: pid })
    if (result?.data) {
      setPaymentDetail(result.data)
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
    const result = await updatePaymentDetail({ id, data: finalizeData })
    console.log('finalizeData', finalizeData)
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
        {PAYMENT_APPROVAL.map((info) => (
          <Fragment key={info.id}>
            <PaymentDetail
              detail={info}
              data={paymentDetail}
              handleVisibleBankModal={handleVisibleBankModal}
              setFinalizeData={setFinalizeData}
              finalizeData={finalizeData}
            />
          </Fragment>
        ))}
      </div>
      <BankInfoModal
        info={paymentDetail}
        visible={bankModalVisible}
        setVisible={handleVisibleBankModal}
      />
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
