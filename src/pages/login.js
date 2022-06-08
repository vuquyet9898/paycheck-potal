import { delay, renderErrorMessage } from 'helper/utils'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ERROR_TYPES } from 'constants/errors'
import { useTranslation } from 'react-i18next'

function Login() {
  const [loading, setLoading] = useState(false)
  const [pid, setPid] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()
  const [t] = useTranslation('common')

  const handleChange = (e, type) => {
    if (type === 'pid') {
      setPid(e.target.value)
    }
    if (type === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const values = {
        personal_id: pid,
        password,
        callbackUrl: `${window.location.origin}`,
      }
      const result = await signIn('credentials', { redirect: false, ...values })
      await delay(100).then(() => setLoading(false))
      if (result?.url) {
        return router.push(result?.url)
      }
      return renderErrorMessage({
        type: ERROR_TYPES.AUTH,
        message: result?.error,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-slate-300 rounded-lg space-y-8 p-8">
        <p className="text-center uppercase text-3xl font-semibold">
          Paycheck portal
        </p>
        <div className="grid grid-cols-12 gap-x-2 gap-y-3 items-center max-w-3xl w-full">
          <p className="col-span-4">{t('login.id')}</p>
          <input
            type="text"
            className="col-span-8 border border-slate-400 rounded-md px-3 py-2"
            onChange={(e) => handleChange(e, 'pid')}
          />
          <p className="col-span-4">{t('login.pass')}</p>
          <input
            type="password"
            className="col-span-8 border border-slate-400 rounded-md px-3 py-2"
            onChange={(e) => handleChange(e, 'password')}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 btn-primary rounded-md uppercase"
          onClick={handleSubmit}
          disabled={loading}
        >
          {t('login.title')}
        </button>
      </div>
    </div>
  )
}
export default Login
