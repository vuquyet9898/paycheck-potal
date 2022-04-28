import { XIcon } from '@heroicons/react/solid'
import {
  createCompany,
  saveImageCompany,
  uploadFileCompany,
} from 'actions/company'
import { IconPdf } from 'constants/icons'
import { renderErrorMessage } from 'helper/utils'
import { isArray, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export default function Index() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [selectedFile, setSelectedFile] = useState([])

  const onCreateCompany = async () => {
    const res = await createCompany({
      name: companyName,
      company_code: companyId,
    })
    const _idCompany = res?.data?._id

    if (!isEmpty(selectedFile)) {
      const listPromiseUpLoadImage = []
      selectedFile?.map((itemSelect) => {
        const formData = new FormData()
        formData.append('company', itemSelect.currentFile)
        listPromiseUpLoadImage.push(uploadFileCompany(formData))
        return null
      })
      const responseUrlImage = await Promise.all(listPromiseUpLoadImage)

      const listPromiseUpLoadCompanyImage = []

      if (isArray(responseUrlImage) && !isEmpty(responseUrlImage)) {
        responseUrlImage?.map((item) => {
          const data = {
            company_id: _idCompany,
            file_url: [item?.data?.file_url[0]],
            file_name: item?.data?.file_name,
          }

          listPromiseUpLoadCompanyImage.push(saveImageCompany(data))
          return null
        })
        await Promise.all(listPromiseUpLoadCompanyImage)
      }
    }

    if (res?.status === 201) {
      toast.success('Create successfully!')
      router.back()
    } else if (res?.statusCode === 422) {
      renderErrorMessage({
        message: 'Company code already exist',
      })
    } else if (res?.statusCode === 400) {
      renderErrorMessage({
        message: 'Name or ID should not be empty',
      })
    }
  }
  const onRemoveFile = (indexFile) => {
    const arr = selectedFile.filter((item, index) => {
      return indexFile !== index
    })
    setSelectedFile(arr)
  }

  const [t] = useTranslation('common')
  const onFileChange = (event) => {
    setSelectedFile([
      ...selectedFile,
      {
        currentFile: event.target.files[0],
        previewImage: URL.createObjectURL(event.target.files[0]),
      },
    ])
  }

  return (
    <div className="rtl pr-4">
      <div className="flex items-center justify-between">
        <h1 className="py-4 text-2xl uppercase font-bold">
          {t('company.newCompany')}
        </h1>
        <button
          type="button"
          className="ml-8 underline text-indigo-500 hover:text-indigo-400 active:text-indigo-600"
          onClick={() => router.back()}
        >
          {t('company.back')}
        </button>
      </div>
      <div className=" py-6 w-1/2">
        <div className="flex flex-col gap-4 pl-4">
          <div className="flex items-center">
            <p className="w-60 font-bold">{t('company.name')}</p>
            <input
              type="text"
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder={t('company.companyName')}
              className="border border-slate-300 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="flex items-center">
            <p className="w-60 font-bold">{t('company.id')}</p>
            <input
              type="text"
              onChange={(e) => setCompanyId(e.target.value)}
              placeholder={t('company.companyId')}
              className="border border-slate-300 rounded-md px-2 py-1 w-full"
            />
          </div>
        </div>
        <div className="w-full  gap-4 flex justify-end  pl-4 mt-6 ">
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
          {selectedFile?.map((item, index) => {
            const removeItemWithIndex = () => onRemoveFile(index)
            const isPdf = item?.currentFile?.type === 'application/pdf'
            if (isPdf) {
              return (
                <div
                  className="py-4"
                  key={`${item?.lastModified}_uuid_pdf_${index}`}
                >
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
                    href={item.previewImage}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{t('payment.PDF')}</span>
                    <div>{item?.currentFile?.name}</div>
                  </a>
                </div>
              )
            }
            return (
              <div key={`${item?.lastModified}_uuid_${index}`} className="py-4">
                <div className="flex flex-row items-center">
                  <a
                    href={item.previewImage}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={item.previewImage}
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
      </div>

      <button
        type="button"
        onClick={onCreateCompany}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        {t('company.save')}
      </button>
    </div>
  )
}
