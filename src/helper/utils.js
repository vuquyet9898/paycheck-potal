import { ERRORS, ERROR_TYPES } from 'constants/errors'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
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

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )
  return debouncedValue
}
