import { IComparePassword, IGenerateHash, IVerifyPassword } from '@/types'
import HashHelper from './hashHelper'

export default class PasswordHelper {
  verifyStrong({ password }: IVerifyPassword) {
    const regexValidator = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
    ) //eslint-disable-line
    return regexValidator.test(password)
  }

  async compare({ password, passwordHash }: IComparePassword) {
    const hashHelper = new HashHelper()
    return await hashHelper.compare({ text: password, textHash: passwordHash })
  }

  generate({ text, salt = 5 }: IGenerateHash) {
    const hashHelper = new HashHelper()
    return hashHelper.generateSync({ text, salt })
  }
}
