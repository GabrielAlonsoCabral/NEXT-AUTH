import { AllFailures } from './api'

export type CustomizedToasts = 'error' | 'loading' | 'validate'

export interface IAddCustomizedToast {
  custom: CustomizedToasts
  message?: AllFailures
}
