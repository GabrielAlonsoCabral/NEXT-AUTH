import { IconButtonProps } from '@/types'
import React, { useEffect, useState } from 'react'
import styles from './buttons.module.css'

function IconButton({
  iconLeft,
  iconRight,
  onClick,
  disabled,
  basicStyle,
  title,
  type,
}: IconButtonProps) {
  const [style, setStyle] = useState<string>()

  useEffect(() => {
    const basicStyles = {
      github: styles.github,
      apple: styles.apple,
      facebook: styles.facebook,
      google: styles.google,
      twitter: styles.twitter,
      navbar: styles.navbar,
      default: styles.default,
    }

    const hasStyle = Object.keys(basicStyles).includes(basicStyle)

    setStyle(hasStyle ? basicStyles[basicStyle] : basicStyles['default'])
  }, [])
  return (
    <button type={type} className={style} disabled={disabled} onClick={onClick}>
      {iconLeft && iconLeft}
      {title}
      {iconRight && iconRight}
    </button>
  )
}

export default IconButton
