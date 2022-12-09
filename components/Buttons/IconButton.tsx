import { providers } from '@/types/helpers'
import React, { useEffect, useState } from 'react'
import styles from './buttons.module.css'

type ButtonSignInProps = {
  iconLeft?: JSX.Element
  iconRight?: JSX.Element
  disabled: boolean
  onClick: () => void
  basicStyle: providers | 'default'
  title: string | JSX.Element
}

function ButtonSignIn({
  iconLeft,
  iconRight,
  onClick,
  disabled,
  basicStyle,
  title,
}: ButtonSignInProps) {
  const [style, setStyle] = useState<string>()

  useEffect(() => {
    const basicStyles = {
      github: styles.github,
      apple: styles.apple,
      facebook: styles.facebook,
      google: styles.google,
      twitter: styles.twitter,
      default: styles.default,
    }

    const hasStyle = Object.keys(basicStyles).includes(basicStyle)

    setStyle(hasStyle ? basicStyles[basicStyle] : basicStyles['default'])
  }, [])
  return (
    <button
      type="button"
      className={style}
      disabled={disabled}
      onClick={onClick}
    >
      {iconLeft && iconLeft}
      {title}
      {iconRight && iconRight}
    </button>
  )
}

export default ButtonSignIn
