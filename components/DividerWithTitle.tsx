import { BasicPropsTitle } from '@/types'
import React from 'react'

function DividerWithTitle({ title }: BasicPropsTitle) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t dark:border-gray-500"></div>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="px-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-black">
          {title}
        </span>
      </div>
    </div>
  )
}

export default DividerWithTitle
