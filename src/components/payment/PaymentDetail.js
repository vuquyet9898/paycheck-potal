/* eslint-disable no-nested-ternary */
import { Listbox, Transition } from '@headlessui/react'
import { IconCheck, IconChevronDown, IconPdf } from 'constants/icons'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'

function PaymentDetail({
  detail,
  data,
  handleVisibleBankModal,
  setFinalizeData,
  finalizeData,
}) {
  const status = [
    { name: 'pending' },
    { name: 'invalid' },
    { name: 'approved' },
  ]
  const [selectedStatus, setSelectedStatus] = useState(status[0])

  const handleUpdateApproval = (s) => {
    setSelectedStatus(s)
    setFinalizeData({
      ...finalizeData,
      [detail.fieldApprovalName]: s?.name,
    })
  }

  useEffect(() => {
    setSelectedStatus({ name: data?.[detail.fieldApprovalName] || '' })
  }, [data, detail])

  const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
  const isPdf = (url) => /\.(pdf)$/.test(url)

  const renderDetailAction = () => (
    <Listbox value={selectedStatus} onChange={handleUpdateApproval}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full max-w-[120px] py-2 px-3 text-left bg-white border border-slate-200 rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-indigo-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate text-right capitalize h-5">
            {selectedStatus.name}
          </span>
          <span className="absolute top-2 left-2">
            <IconChevronDown size={20} />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute right-0 z-10 w-full max-w-[200px] p-1 mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {status.map((s, sIdx) => (
              <Listbox.Option
                key={sIdx}
                className={({ active }) =>
                  `cursor-default select-none relative py-2 px-3 rounded-md capitalize ${
                    active ? 'text-indigo-900 bg-indigo-100' : 'text-gray-900'
                  }`
                }
                value={s}
              >
                <p
                  className={`w-full truncate inline-flex items-center justify-between ${
                    selectedStatus.name === s.name ? 'font-bold' : 'font-normal'
                  }`}
                >
                  <span>{s.name}</span>
                  <span>
                    {selectedStatus.name === s.name && <IconCheck size={16} />}
                  </span>
                </p>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )

  const renderImageOrPdf = (url, index) => {
    if (isImage(url))
      return (
        <a
          href={url}
          key={index}
          className="border px-3 py-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={url}
            width={40}
            height={40}
            className="w-10 h-10 cursor-pointer object-cover"
            alt="document"
          />
        </a>
      )
    if (isPdf(url))
      return (
        <a
          href={url}
          key={index}
          className="flex items-center gap-x-2 border px-3 py-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconPdf /> <span>PDF</span>
        </a>
      )
    return null
  }

  const renderDetailDocument = () => {
    if (detail.fieldName === 'invoice_name') {
      return data?.invoice_name
    }
    if (detail.fieldName === 'bank_detail') {
      return (
        <button
          type="button"
          className="px-3 py-2 btn-primary-reverse rounded-md"
          onClick={handleVisibleBankModal}
        >
          View Detail
        </button>
      )
    }
    if (
      detail.fieldName === 'additional_documents_urls' &&
      data?.additional_documents_urls
    ) {
      return data?.additional_documents_urls.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    if (
      detail.fieldName === 'approval_of_illness_urls' &&
      data?.approval_of_illness_urls
    ) {
      return data?.approval_of_illness_urls.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    if (
      detail.fieldName === 'disability_approval_url' &&
      data?.disability_approval_url
    ) {
      return data?.disability_approval_url.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    if (detail.fieldName === 'release_papers_url' && data?.release_papers_url) {
      return data?.release_papers_url.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    if (
      detail.fieldName === 'social_security_coordinations_urls' &&
      data?.social_security_coordinations_urls
    ) {
      return data?.social_security_coordinations_urls.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    if (
      detail.fieldName === 'military_work_permit_url' &&
      data?.military_work_permit_url
    ) {
      return data?.military_work_permit_url.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    if (
      detail.fieldName === 'tax_coordinations_urls' &&
      data?.tax_coordinations_urls
    ) {
      return data?.tax_coordinations_urls.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
  }

  return (
    <div className="grid grid-cols-3 xl:grid-cols-6 gap-x-4 items-center text-sm">
      <p className="font-medium">{detail.name}</p>
      <div className="flex items-center gap-x-4">{renderDetailDocument()}</div>
      <div>{renderDetailAction()}</div>
    </div>
  )
}

export default PaymentDetail
