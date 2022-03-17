import { UploadIcon } from '@heroicons/react/solid'
import React from 'react'

export default function UploadButton({ title, action }) {
  return (
    <button
      onClick={action}
      type="button"
      className="w-48 mt-4 bg-green-500 text-white py-2 rounded-md text-lg font-semibold"
    >
      <div className="flex flex-row  items-center justify-center">
        <UploadIcon className="w-5 h-5" aria-hidden="true" />
        <p>{title}</p>
      </div>
    </button>
  )
}
