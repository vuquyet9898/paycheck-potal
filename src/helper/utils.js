import { ERRORS, ERROR_TYPES } from 'constants/errors'
import { toast } from 'react-toastify'

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const renderErrorMessage = ({ type, message }) => {
  if (type === ERROR_TYPES.AUTH) {
    return toast.error(ERRORS.auth[message])
  }
  return toast.error(message)
}
