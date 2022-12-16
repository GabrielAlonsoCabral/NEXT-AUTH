import { NextApiResponse } from 'next'

export type providers = 'github' | 'apple' | 'facebook' | 'google' | 'twitter'

export type locale = 'pt' | 'en'

export type BasicPropsTitle = {
  title: string
}

export type IGenerateHash = {
  text: string
  salt?: number
}

export type ICompareHash = {
  text: string
  textHash: string
}

export interface SendReponseProps<T> {
  code: number
  body: T
  response: NextApiResponse
}

export type IVerifyPassword = {
  password: string
}

export type IComparePassword = {
  password: string
  passwordHash: string
}
