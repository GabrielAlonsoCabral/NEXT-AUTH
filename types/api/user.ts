import { IResponseBody } from './responseBody'

export type createUserFailures =
  | 'user'
  | 'email'
  | 'server'
  | 'missing'
  | 'wrong-email'
  | 'wrong-name'
  | 'wrong-password'
  | 'wrong-confirm-password'

export interface ICreateUserResponseBody
  extends IResponseBody<createUserFailures> {}
