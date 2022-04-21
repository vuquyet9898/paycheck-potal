import { LanguageContext } from 'hooks/languageContent'
import i18next from 'i18next'
import React, { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import commonEn from '../language/commonEn.json'
import commonHb from '../language/commonHb.json'

export default function LanguageProvider({ children }) {
  const { currentLanguage } = React.useContext(LanguageContext)

  // useEffect(() => {
  //   localStorage.setItem('currentLanguage', JSON.stringify(currentLanguage))
  // }, [currentLanguage])
  const { setEnLanguage, setHbLanguage } = React.useContext(LanguageContext)

  useEffect(() => {
    const language = localStorage.getItem('currentLanguage')
    if (language === 'en') {
      setEnLanguage()
    } else {
      setHbLanguage()
    }
  }, [])

  useEffect(() => {
    i18next.init({
      interpolation: { escapeValue: false }, // React already does escaping
      lng: currentLanguage, // language to use
      resources: {
        en: {
          common: commonEn, // 'common' is our custom namespace
        },
        hb: {
          common: commonHb,
        },
      },
    })
  }, [currentLanguage])
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}
