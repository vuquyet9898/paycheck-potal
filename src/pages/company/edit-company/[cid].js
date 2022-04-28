import { XIcon } from '@heroicons/react/solid'
import {
  deleteFileCompany,
  editCompany,
  getCompanyDetail,
  saveImageCompany,
  uploadFileCompany,
} from 'actions/company'
import { IconPdf } from 'constants/icons'
import { renderErrorMessage } from 'helper/utils'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export default function Index() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [detailCompany, setDetailCompany] = useState(null)
  const { cid } = router.query
  const onUpFIle = async (data) => {
    const response = await uploadFileCompany(data)
    const dataImage = {
      company_id: cid,
      file_url: [response?.data?.file_url[0]],
      file_name: response?.data?.file_name,
    }
    await saveImageCompany(dataImage)
    await getCompanyDetail(cid).then((res) => {
      setCompanyName(res?.data?.name)
      setCompanyId(res?.data?.company_code)
      setDetailCompany(res.data)
    })
    toast.success('Upload Image successfully!')
  }
  const onFileChange = (event) => {
    try {
      const formData = new FormData()
      formData.append('company', event.target.files[0])
      onUpFIle(formData)
    } catch (error) {}
  }
  useEffect(() => {
    getCompanyDetail(cid).then((res) => {
      setCompanyName(res?.data?.name)
      setCompanyId(res?.data?.company_code)
      setDetailCompany(res.data)
    })
  }, [])

  const onEditCompany = async () => {
    const dataResponse = await editCompany(cid, {
      name: companyName,
      company_code: companyId,
    })
    if (dataResponse?.status === 200) {
      toast.success('Change successfully!')
      router.back()
    } else if (dataResponse?.statusCode === 422) {
      renderErrorMessage({
        message: 'Company code already exist',
      })
    } else if (dataResponse?.statusCode === 400) {
      renderErrorMessage({
        message: 'Name or ID should not be empty',
      })
    }
  }

  const [t] = useTranslation('common')
  const onRemoveFile = async (id) => {
    await deleteFileCompany(id)
    toast.success('Delete successfully!')
    getCompanyDetail(cid).then((res) => {
      setCompanyName(res?.data?.name)
      setCompanyId(res?.data?.company_code)
      setDetailCompany(res.data)
    })
  }

  return (
    <div className="rtl pr-4">
      <div className="flex items-center justify-between">
        <h1 className="py-4 text-2xl uppercase font-bold">
          {t('company.editCompany')}
        </h1>
        <button
          type="button"
          className="ml-8 underline text-indigo-500 hover:text-indigo-400 active:text-indigo-600"
          onClick={() => router.back()}
        >
          {t('company.back')}
        </button>
      </div>
      <div className="w-1/2 ">
        <div className="flex flex-col gap-4 pl-4">
          <div className="flex items-center">
            <p className="w-60 font-bold"> {t('company.name')}</p>
            <input
              value={companyName}
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t('company.companyName')}
              className="border border-slate-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="flex items-center">
            <p className="w-60 font-bold"> {t('company.id')}</p>
            <input
              type="text"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              placeholder={t('company.companyId')}
              className="border border-slate-300 rounded-md px-2 py-1 w-full"
            />
          </div>
        </div>
      </div>
      <div className="w-1/2  gap-4 flex justify-end  pl-4 mt-6 ">
        <label className="mt-4 w-32 flex flex-row items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:opacity-60">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mr-2 ml-2 text-sm leading-normal">
            {t('upload')}
          </span>
          <input
            type="file"
            className="hidden"
            required
            onChange={onFileChange}
          />
        </label>
      </div>
      <div>
        {detailCompany?.files?.map((item, index) => {
          const removeItemWithIndex = () => onRemoveFile(item?._id)
          const isPdf = /^.+\.(([pP][dD][fF])|([jJ][pP][gG]))$/.test(
            item?.file_url[0]
          )

          if (isPdf) {
            return (
              <div className="py-4" key={`${item?._id}_uuid_pdf_${index}`}>
                <div className="flex flex-row items-center">
                  <IconPdf />
                  <button
                    onClick={removeItemWithIndex}
                    type="button"
                    className="w-6 h-6 text-red-500 mr-4  "
                  >
                    <XIcon />
                  </button>
                </div>
                <a
                  href={item?.file_url[0]}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t('payment.PDF')}</span>
                  <div>{item?.file_name}</div>
                </a>
              </div>
            )
          }
          return (
            <div key={`${item?._id}_uuid_${index}`} className="py-4">
              <div className="flex flex-row items-center">
                <a
                  href={item?.file_url[0]}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item?.file_url[0]}
                    className="w-12 h-12"
                    alt="Display"
                  />
                </a>
                <button
                  onClick={removeItemWithIndex}
                  type="button"
                  className="w-6 h-6 text-red-500 mr-4  "
                >
                  <XIcon />
                </button>
              </div>
              <div>{item?.currentFile?.name}</div>
            </div>
          )
        })}
      </div>
      <button
        type="button"
        onClick={onEditCompany}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {t('company.save')}
      </button>
    </div>
  )
}
