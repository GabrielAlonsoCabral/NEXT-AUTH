import { INavigationButtonProps } from '@/types'
import Link from 'next/link'
import React from 'react'

function NavigationButton({ title, href, isMobile }: INavigationButtonProps) {
  return (
    <Link
      href={href}
      className={`px-4 ${isMobile ? 'w-full' : ''} ${
        isMobile ? 'px-4 py-2 -ml-4' : ''
      }
      text-sm text-gray-600 hover:text-gray-400 focus:text-gray-300  dark:text-gray-300  dark:hover:text-gray-500 dark:focus:text-gray-600  focus:outline-none`}
    >
      {title}
    </Link>
  )
}

export default NavigationButton
