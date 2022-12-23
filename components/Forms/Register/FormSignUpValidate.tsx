import { isValidEmail, isValidName, isValidPassword } from '@/lib/helpers'
import { IUserRequestBody } from '@/types'
import { TFunction } from 'next-i18next'

export interface IFormSignUpProps {
  values: IUserRequestBody
  t: TFunction
}

export const FormSignUpValidate = ({ values, t }: IFormSignUpProps) => {
  const errors = {
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  }
  if (!values.email) {
    errors.email = t('forms.requireds.email')
    return errors
  }

  if (!values.name) {
    errors.name = t('forms.requireds.name')
    return errors
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = t('forms.requireds.confirmPassword')
    return errors
  }

  if (!values.password) {
    errors.password = t('forms.requireds.password')
    return errors
  }

  if (!isValidEmail(values.email)) {
    errors.email = t('forms.invalids.email')
    return errors
  }

  if (!isValidName(values.name)) {
    errors.name = t('forms.invalids.name')
    return errors
  }

  if (!isValidPassword(values.password)) {
    errors.password = t('forms.invalids.password')
    return errors
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = t('forms.invalids.confirmPassword')
    return errors
  }

  return errors
}
