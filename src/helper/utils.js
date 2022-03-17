import { ERRORS, ERROR_TYPES } from 'constants/errors'
import { useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const renderErrorMessage = ({ type, message }) => {
  if (type === ERROR_TYPES.AUTH) {
    return toast.error(ERRORS.auth[message])
  }
  if (type === ERROR_TYPES.USER) {
    return toast.error(ERRORS.user[message])
  }
  return toast.error(message)
}

export const useTableHeight = (additionalHeight) => {
  const [tableHeight, setTableHeight] = useState(0)

  useLayoutEffect(() => {
    setTableHeight(window.innerHeight - additionalHeight)
  }, [])

  return { tableHeight }
}
