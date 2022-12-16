import { SendReponseProps } from '@/types'

export async function sendHttpResponse<T>({
  code,
  body,
  response,
}: SendReponseProps<T>) {
  return response.status(code).json(body)
}
