import { BasicPropsTitle } from '@/types/helpers'
import React from 'react'

function FormLabel({ title }: BasicPropsTitle) {
  return (
    <label
      htmlFor="email"
      className="block text-xs text-gray-700 uppercase dark:text-gray-50"
    >
      {title}
    </label>
  )
}

export default FormLabel
