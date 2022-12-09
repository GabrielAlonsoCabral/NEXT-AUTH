import { providers } from '@/types/helpers'
import React, {
  ButtonHTMLAttributes,
  HtmlHTMLAttributes,
  useEffect,
  useState,
} from 'react'
import styles from './buttons.module.css'

type IconButtonProps = {
  iconLeft?: JSX.Element
  iconRight?: JSX.Element
  disabled: boolean
  onClick?: () => void
  basicStyle: providers | 'default'
  title: string | JSX.Element
  type: 'submit' | 'reset' | 'button'
}

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
