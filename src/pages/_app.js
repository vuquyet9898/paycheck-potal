/* eslint-disable react/jsx-props-no-spreading */
import LanguageProvider from 'components/LanguageProvider'
import LayoutWithHeader from 'components/LayoutWithHeader'
import { LanguageContext } from 'hooks/languageContent'
import { SessionProvider } from 'next-auth/react'
import React, { useState, useMemo, useCallback } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'styles/globals.scss'

toast.configure()
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const setEnLanguage = useCallback(() => {
    setCurrentLanguage('en')
  }, [])
  const setHbLanguage = useCallback(() => {
    setCurrentLanguage('hb')
  }, [])
  const languageMemoValue = useMemo(
    () => ({ currentLanguage, setEnLanguage, setHbLanguage }),
    [currentLanguage, setEnLanguage, setHbLanguage]
  )
  // const [t] = useTranslation('common')

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <LanguageContext.Provider value={languageMemoValue}>
        <LanguageProvider>
          <LayoutWithHeader>
            <Component {...pageProps} />
          </LayoutWithHeader>
        </LanguageProvider>
      </LanguageContext.Provider>
    </SessionProvider>
  )
}
