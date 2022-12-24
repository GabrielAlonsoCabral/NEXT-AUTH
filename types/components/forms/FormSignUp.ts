import { IUserRequestBody } from '@/types/api'
import { IAddCustomizedToast } from '@/types/useToast'
import { FormikErrors } from 'formik'

export interface IFormSignUpOnValidateError {
  values: IUserRequestBody
  validateForm: (
    values: IUserRequestBody
  ) => Promise<FormikErrors<IUserRequestBody>>
  onToastError: ({ custom, message }: IAddCustomizedToast) => void
}
