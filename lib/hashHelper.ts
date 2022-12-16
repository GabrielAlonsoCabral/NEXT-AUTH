import { ICompareHash, IGenerateHash } from '@/types'
import bcryptjs from 'bcryptjs'

export default class HashHelper {
  async generate({ text, salt = 5 }: IGenerateHash) {
    return await bcryptjs.hash(text, salt)
  }

  generateSync({ text, salt = 5 }: IGenerateHash) {
    return bcryptjs.hashSync(text, salt)
  }

  async compare({ text, textHash }: ICompareHash) {
    return await bcryptjs.compare(text, textHash)
  }
}
