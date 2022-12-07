import { providers } from '@/types/helpers'
import React, { useEffect, useState } from 'react'
import styles from './buttons.module.css'

type ButtonSignInProps = {
  icon: JSX.Element
  disabled: boolean
  onClick: () => void
  provider: providers
}

function ButtonSignIn({
  icon,
  onClick,
  disabled,
  provider,
}: ButtonSignInProps) {
  const [style, setStyle] = useState<string>()

  useEffect(() => {
    const providersStyles = {
      github: styles.github,
      apple: styles.apple,
      facebook: styles.facebook,
      google: styles.google,
    }

    setStyle(providersStyles[provider])
  }, [])
  return (
    <button
      type="button"
      className={style}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

export default ButtonSignIn
