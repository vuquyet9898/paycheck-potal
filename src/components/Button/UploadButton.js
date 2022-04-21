import { UploadIcon } from '@heroicons/react/solid'
import React from 'react'

export default function UploadButton({ title, action, isDisable }) {
  return (
    <button
      disabled={isDisable}
      onClick={action}
      type="button"
      className={` uppercase px-4  text-white py-2 rounded-md text-lg font-semibold ${
        isDisable ? 'bg-gray-400 ' : 'bg-green-500 '
      }`}
    >
      <div className="flex flex-row  items-center justify-center">
        <UploadIcon className="w-5 h-5" aria-hidden="true" />
        <p>{title}</p>
      </div>
    </button>
  )
}
