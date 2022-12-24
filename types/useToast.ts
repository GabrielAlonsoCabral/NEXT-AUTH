import { AllFailures } from './api'

export type CustomizedToasts = 'error' | 'loading' | 'validate' | 'success'

export interface IAddCustomizedToast extends ICustomizedToast {
  custom: CustomizedToasts
}

export interface ICustomizedToast {
  failure?: AllFailures
  message?: string
  title?: string
}
