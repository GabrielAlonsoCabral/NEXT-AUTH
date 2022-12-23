import { AllFailures, locale } from '@/types'

const pt: { [statusType in AllFailures]: string } = {
  server: 'Erro interno.',
  'exist-email': 'Email já está sendo usado.',
  'invalid-confirm-password': 'Suas senhas não coincidem.',
  'invalid-email': 'Email inválido.',
  'invalid-name': 'Nome inválido.',
  'invalid-password': 'Senha inválida.',
  'missing-confirm-password': 'Preencha a confirmação da senha.',
  'missing-password': 'Preencha a senha.',
  'missing-email': 'Preencha o email.',
  'missing-name': 'Preencha o nome.',
}

const en: typeof pt = {
  server: 'Internal error.',
  'exist-email': 'Email is already being used.',
  'invalid-confirm-password': 'Your passwords does not match.',
  'invalid-email': 'Invalid email.',
  'invalid-name': 'Invalid name.',
  'invalid-password': 'Invalid password.',
  'missing-confirm-password': 'Missing confirm password.',
  'missing-password': 'Missing password.',
  'missing-email': 'Missing email.',
  'missing-name': 'Missing name.',
}

const translatedMessages = {
  en,
  pt,
}

export const translateErrorMessage = (error: AllFailures, userLocale: string) =>
  translatedMessages[userLocale as locale][error]
