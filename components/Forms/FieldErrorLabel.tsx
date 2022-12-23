import { BasicPropsTitle } from '@/types'

function FieldErrorLabel({ title }: BasicPropsTitle) {
  return title?.length ? (
    <p className="text-red-500 text-sm leading-[8px] py-1">{title}</p>
  ) : null
}

export default FieldErrorLabel
