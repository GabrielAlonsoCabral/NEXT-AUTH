import { BasicPropsTitle } from '@/types'
import React from 'react'

function FieldErrorLabel({ title }: BasicPropsTitle) {
  return title?.length ? (
    <p className="text-red-500 text-sm leading-[8px]">{title}</p>
  ) : null
}

export default FieldErrorLabel
