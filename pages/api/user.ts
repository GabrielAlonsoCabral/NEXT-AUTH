import type { NextApiRequest, NextApiResponse } from 'next'
import { createUser } from '@/lib/api'

export default async function CreateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return createUser(req, res)
}
