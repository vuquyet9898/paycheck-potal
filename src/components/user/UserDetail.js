/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */
import { Listbox, Transition } from '@headlessui/react'
import { IconCheck, IconChevronDown, IconPdf } from 'constants/icons'
import { isEmpty } from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function UserDetail({ detail, data, setFinalizeData, finalizeData }) {
  const status = [
    { name: 'pending' },
    { name: 'invalid' },
    { name: 'approved' },
  ]

  const [selectedStatus, setSelectedStatus] = useState(status[0])
  const handleUpdateApproval = (s) => {
    if (detail.fieldName === 'phone_number') {
      setSelectedStatus(s)
      setFinalizeData({
        ...finalizeData,
        [detail.fieldApprovalName]:
          s?.name === 'pending' ? 'pending_admin' : s?.name,
      })
    } else {
      setSelectedStatus(s)
      setFinalizeData({
        ...finalizeData,
        [detail.fieldApprovalName]: s?.name,
      })
    }
  }
  const [t] = useTranslation('common')

  useEffect(() => {
    setSelectedStatus({ name: data?.[detail.fieldApprovalName] || '' })
  }, [data, detail])
  const isImage = (url) =>
    /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url?.toLowerCase())
  const isPdf = (url) => /\.(pdf)$/.test(url?.toLowerCase())
  const renderStatus = (name) => {
    switch (name) {
      case 'pending':
        return t('user.pending')
      case 'pending_admin':
        return t('user.pending')
      case 'approved':
        return t('user.approved')
      case 'invalid':
        return t('user.invalid')
      default:
        return name
    }
  }
  const renderRowName = (name) => {
    // check vale in USER_APPROVAL || USER_DELIVERY_APPROVAL
    switch (name) {
      //
      case 'Full Name':
        return t('user.fullName')

      case 'Email':
        return t('user.email')

      case 'Company':
        return t('user.company')

      case 'Phone number':
        return t('user.phoneNumber')

      case 'Driving License':
        return t('user.driving_license_url')

      case 'Address':
        return t('user.address')

      case 'Insurance Policy':
        return t('user.insurancePolicy')

      case 'Name on the Invoice':
        return t('payment.nameOnTheInvoice')

      case 'Personal Accidents Insurance':
        return t('user.personalAccidentsInsurance')
      //
      case 'Pension Policy':
        return t('user.pensionPolicy')

      case 'Life Insurance':
        return t('user.lifeInsurance')

      case 'Health Insurance':
        return t('user.healthInsurance')

      case 'Car License':
        return t('user.carLicense')

      case 'Tax Coordination':
        return t('payment.taxCoordination')

      case 'Social Security Coordination':
        return t('payment.socialSecurityCoordination')

      case 'Approval of Illness':
        return t('payment.approvalOfIllness')

      case 'Release Papers':
        return t('payment.releasePapers')

      case 'Disability Approval':
        return t('payment.disabilityApproval')

      case 'Military Work Permit':
        return t('payment.militaryWorkPermit')

      case 'Additional documents':
        return t('payment.additionalDocuments')

      default:
        return '-'
    }
  }

  const renderDetailAction = () => (
    <Listbox value={selectedStatus} onChange={handleUpdateApproval}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full max-w-[120px] py-2 px-3 text-left bg-white border border-slate-200 rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-indigo-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate text-right capitalize h-5">
            {renderStatus(selectedStatus.name)}
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
                  {/* <span>{s.name}</span> */}
                  <span>{renderStatus(s.name)}</span>

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
          <img
            className="w-12 h-12 cursor-pointer object-cover"
            src={url}
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

  const renderUserInfo = (data) => {
    return (
      <p key={data} className="flex items-center gap-x-2 px-3 py-2">
        {data}
      </p>
    )
  }

  const renderDetailDocument = () => {
    if (detail.fieldName === 'full_name' && data?.full_name) {
      return renderUserInfo(data.full_name)
    }
    if (detail.fieldName === 'email' && data?.email) {
      return renderUserInfo(data.email)
    }

    if (detail.fieldName === 'company_id' && data?.company_id) {
      return renderUserInfo(data.company_name)
    }
    if (detail.fieldName === 'address' && data?.address) {
      return renderUserInfo(data.address)
    }
    if (detail.fieldName === 'phone_number' && data?.phone_number) {
      return renderUserInfo(data.phone_number)
    }
    if (
      detail.fieldName === 'insurance_policy_url' &&
      data?.insurance_policy_url
    ) {
      return data?.insurance_policy_url.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    if (
      detail.fieldName === 'personal_accidents_insurance_url' &&
      data?.personal_accidents_insurance_url
    ) {
      return data?.personal_accidents_insurance_url.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    if (detail.fieldName === 'pension_policy_url' && data?.pension_policy_url) {
      return data?.pension_policy_url.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    if (detail.fieldName === 'life_insurance_url' && data?.life_insurance_url) {
      return data?.life_insurance_url.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    if (
      detail.fieldName === 'health_insurance_url' &&
      data?.health_insurance_url
    ) {
      return data?.health_insurance_url.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    // Delivery

    if (detail.fieldName === 'car_license_url' && data?.car_license_url) {
      return data?.car_license_url.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
    if (detail.fieldName === 'companies' && !isEmpty(data?.companies)) {
      return (
        <div>{data?.companies?.map((item) => renderUserInfo(item?.name))}</div>
      )
    }
    if (
      detail.fieldName === 'driving_license_url' &&
      data?.driving_license_url
    ) {
      return data?.driving_license_url.map((url, index) =>
        renderImageOrPdf(url, index)
      )
    }
  }
  return (
    <div className="grid grid-cols-3 xl:grid-cols-6 gap-x-4 items-center text-sm">
      <p className="font-medium">{renderRowName(detail.name)}</p>
      <div className="flex items-center gap-x-4">{renderDetailDocument()}</div>
      {detail?.fieldApprovalName && <div>{renderDetailAction()}</div>}
    </div>
  )
}

export default UserDetail
