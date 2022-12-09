import { WithClassName } from '@/types'
import { ILinkButtonProps } from '@/types/components/LinkButton'
import Link from 'next/link'
import React from 'react'

function LinkButton({
  title,
  href,
  className,
}: ILinkButtonProps & WithClassName) {
  return (
    <Link
      href={href}
      className={
        className
          ? className
          : 'font-semibold text-gray-800 dark:text-white dark:hover:text-gray-300 hover:text-gray-800/75'
      }
    >
      {title}
    </Link>
  )
}

export default LinkButton
