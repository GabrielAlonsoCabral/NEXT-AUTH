import { TFunction } from 'next-i18next'

export interface IFormValidateProps<T> {
  values: T
  t: TFunction
}
