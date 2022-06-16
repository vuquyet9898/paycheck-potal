import { getTerm, postTerm } from 'actions/term'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export default function Index() {
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(true)
  const [termContent, setTermContent] = useState(null)
  const isBlock = data !== ''

  const fetchTerm = async () => {
    try {
      const res = await getTerm()
      const defaultTerm = res.data[res.data.length - 1]
      setTermContent(defaultTerm)
    } catch (error) {
      console.log(error)
    }
  }

  const updateTerm = async () => {
    const res = await postTerm({
      content: data,
    })
    if (res?.status === 201) {
      toast.success('Change successfully!')
    }
  }

  useEffect(() => {
    fetchTerm()
  }, [])

  const [t] = useTranslation('common')

  return (
    <div className="rtl px-4">
      <div className="flex items-center justify-between">
        <h1 className="py-4 text-2xl uppercase font-bold">{t('term.title')}</h1>
      </div>
      <div className="w-full  mx-auto  rtl mt-6">
        <div className="flex flex-row mt-4">
          <div>{t('term.content')}</div>
          <div className="text-red-500 px-2">(*)</div>
        </div>
        <div className="lg:w-1/2 mt-6 w-full p-4">
          <textarea
            defaultValue={termContent?.content}
            className="h-48 w-full border rounded-xl overflow-hidden resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300"
            onChange={(e) => setData(e.target.value)}
          />
          <button
            type="button"
            onClick={updateTerm}
            disabled={!isBlock}
            className={`${
              isBlock ? 'bg-green-500' : 'bg-gray-500 '
            } text-white  py-2 px-4 rounded text-xs min-w-[76px]`}
          >
            {t('term.save')}
          </button>
        </div>
      </div>
    </div>
  )
}
