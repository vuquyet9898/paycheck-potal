import { useRouter } from 'next/router'
import React from 'react'

function PaymentDetail() {
  const router = useRouter()
  const { pid } = router.query
  return <div>{pid}</div>
}

export default PaymentDetail
