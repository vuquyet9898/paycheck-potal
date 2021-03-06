/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import {
  createCompany,
  saveImageCompany,
  uploadFileCompany,
} from 'actions/company'
import { IconPdf } from 'constants/icons'
import { renderErrorMessage } from 'helper/utils'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export default function Index() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState([])

  const closeModal = () => {
    setIsOpen(false)
  }

  const changeCompanyName = (event) => {
    setCompanyName(event.target.value)
  }

  const onUpFile = async (companyId) => {
    try {
      const formData = new FormData()
      images?.map((item) => {
        return formData.append('company', item)
      })

      const response = await uploadFileCompany(formData)
      const listUrl = []
      response?.data?.file_url.map((item) => {
        const dataImage = {
          company_id: companyId,
          file_url: [item],
          file_name: item.substring(item.lastIndexOf('/') + 1),
        }
        listUrl.push(saveImageCompany(dataImage))
        return null
      })
      await Promise.all(listUrl)
    } catch (error) {}
  }

  const onCreateCompany = async () => {
    try {
      const res = await createCompany({
        name: companyName,
        company_code: companyId,
      })
      if (images.length > 0) {
        await onUpFile(res?.data?._id)
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
    } catch (error) {}
  }

  const [t] = useTranslation('common')
  const onFileChange = (event) => {
    try {
      setImages([...images, event.target.files[0]])
    } catch (error) {}
  }

  const onRemoveFile = async (indexDelete) => {
    const newData = images?.filter((item, index) => index !== indexDelete)
    setImages(newData)
  }

  const isDisableBtnSave = companyName.length < 1 || companyId.length < 1
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
      <div className="w-1/2 py-6">
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            />
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="pt-6 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 "
                >
                  {t('company.createNew')}
                </Dialog.Title>
                <div className="flex w-96 h-48 items-center mt-6 bg-grey-lighter  flex-col">
                  <div className=" flex flex-row items-center w-full justify-between mt-2 ">
                    <input
                      type="text"
                      placeholder="Name"
                      className="border border-slate-300 rounded-md px-2 py-1"
                      value={companyName}
                      onChange={changeCompanyName}
                    />
                    <p className="text-sm  "> {t('company.createNew')}</p>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {images?.map((item, index) => {
        const isPdf = item?.type === 'application/pdf'

        if (isPdf) {
          return (
            <div className="py-4 flex " key={`${item?.size}_uuid_pdf_${index}`}>
              <a
                href={URL.createObjectURL(item)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconPdf />
                <span>{t('payment.PDF')}</span>
                <div>{item?.name}</div>
              </a>
              <div className="flex flex-row items-center">
                <button
                  onClick={() => onRemoveFile(index)}
                  type="button"
                  className="w-6 h-6 text-red-500 mr-4  "
                >
                  <XIcon />
                </button>
              </div>
            </div>
          )
        }
        return (
          <div key={`${item?.size}_uuid_${index}`} className="py-4">
            <div className="flex flex-row items-center">
              <a
                href={URL.createObjectURL(item)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={URL.createObjectURL(item)}
                  className="w-12 h-12"
                  alt="Display"
                />
                <div>{item?.name}</div>
              </a>

              <button
                onClick={() => onRemoveFile(index)}
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
      <button
        disabled={isDisableBtnSave}
        type="button"
        onClick={onCreateCompany}
        className={`text-white font-bold py-2 px-4 rounded ${
          !isDisableBtnSave ? 'bg-green-500' : 'bg-gray-400'
        } ${!isDisableBtnSave ? 'hover:bg-green-600' : 'hover:bg-gray-400'}`}
      >
        {t('company.save')}
      </button>
    </div>
  )
}
