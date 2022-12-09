import React from 'react'

interface IFormInputProps extends React.InputHTMLAttributes<any> {}

function FormInput({
  value,
  onBlur,
  onChange,
  type,
  placeholder,
  name,
  autoComplete,
  required,
}: IFormInputProps) {
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      className="mt-1 dark:bg-gray-50 block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-50 px-3 py-2 placeholder-gray-400 dark:placeholder-gray-700 shadow-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-black dark:focus:ring-white sm:text-sm"
    />
  )
}

export default FormInput
