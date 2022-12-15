import { providers } from '../helpers'

export type IconButtonProps = {
  iconLeft?: JSX.Element
  iconRight?: JSX.Element
  disabled?: boolean
  onClick?: () => void
  basicStyle: providers | 'default' | 'navbar'
  title: string | JSX.Element
  type: 'submit' | 'reset' | 'button'
  href?: 'string'
}
