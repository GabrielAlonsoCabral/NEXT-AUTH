import { BasicPropsTitle } from '@/types/helpers'
import React from 'react'

function FieldErrorLabel({ title }: BasicPropsTitle) {
  return title?.length ? (
    <p className="text-gray-600 dark:text-white text-sm leading-[8px]">
      {title}
    </p>
  ) : null
}

export default FieldErrorLabel
