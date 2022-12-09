import { BasicPropsTitle } from '@/types/helpers'
import React from 'react'

function DividerWithTitle({ title }: BasicPropsTitle) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t dark:border-white"></div>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="px-2 text-gray-500 dark:text-white bg-white dark:bg-black">
          {title}
        </span>
      </div>
    </div>
  )
}

export default DividerWithTitle
