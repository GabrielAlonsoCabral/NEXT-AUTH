import { InternalFailures } from './genericals'
import { IResponseBody } from './responseBody'

export interface IUserRequestBody {
  email: string
  password: string
  confirmPassword: string
  name: string
}
export type CreateUserFailures =
  | InternalFailures
  | UserMissingFailures
  | UserInvalidFailures
  | UserExistFailures

export type UserMissingFailures =
  | 'missing-email'
  | 'missing-password'
  | 'missing-name'
  | 'missing-confirm-password'

export type UserInvalidFailures =
  | 'invalid-email'
  | 'invalid-name'
  | 'invalid-password'
  | 'invalid-confirm-password'

export type UserExistFailures = 'exist-email'

export interface ICreateUserResponseBody
  extends IResponseBody<CreateUserFailures> {}
