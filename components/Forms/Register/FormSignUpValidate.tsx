import { isValidEmail, isValidName, isValidPassword } from '@/lib/helpers'
import { IUserRequestBody } from '@/types'
import {
  IFormSignUpOnValidateError,
  IFormValidateProps,
} from '@/types/components/forms'

export const FormSignUpOnValidateError = async ({
  values,
  validateForm,
  onToastError,
}: IFormSignUpOnValidateError) => {
  const formValidated = await validateForm(values)
  const formValidatedFiltered = Object.values(formValidated).filter(
    (formValidated) => formValidated.length
  )
  if (formValidatedFiltered.length) {
    onToastError({
      custom: 'validate',
      message: formValidatedFiltered[0]?.toString(),
    })

    return { isValid: false }
  }

  return { isValid: true }
}

export const FormSignUpValidate = ({
  values,
  t,
}: IFormValidateProps<IUserRequestBody>) => {
  const errors: { [error in keyof typeof values]: string } = {
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  }

  Object.keys(values).map((fieldKey) => {
    const fieldValue = values[fieldKey as keyof typeof values]
    if (!fieldValue) {
      //@ts-ignore
      errors[fieldKey] = t(`forms.requireds.${fieldKey}`)
      return errors
    }
  })

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
