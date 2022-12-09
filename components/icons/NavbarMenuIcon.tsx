import { INavbarMenuIconProps } from '@/types'
import React from 'react'
import styles from './icons.module.css'

function NavbarMenuIcon({ isOpen }: INavbarMenuIconProps) {
  return (
    <svg
      className={styles.menuSvg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {isOpen && (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
        />
      )}
      {!isOpen && (
        <path
          fillRule="evenodd"
          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
        />
      )}
    </svg>
  )
}

export default NavbarMenuIcon
