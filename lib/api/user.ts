import prisma from '@/lib/prisma'
import { ICreateUserResponseBody, IUserRequestBody } from '@/types'

import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidEmail, isValidPassword } from '../helpers'
import { sendHttpResponse } from '../http/response'
import { unparseBody } from '../util'

export async function createUser(
  req: NextApiRequest,
  response: NextApiResponse
): Promise<void | NextApiResponse<ICreateUserResponseBody>> {
  try {
    const data: IUserRequestBody = unparseBody(req.body)

    const { email, name, password, confirmPassword } = data

    if (!isValidEmail(email))
      return sendHttpResponse<ICreateUserResponseBody>({
        code: 422,
        body: { success: false, failured: 'invalid-email' },
        response,
      })

    if (!isValidPassword(password))
      return sendHttpResponse<ICreateUserResponseBody>({
        code: 422,
        body: { success: false, failured: 'invalid-password' },
        response,
      })

    if (!name)
      return sendHttpResponse<ICreateUserResponseBody>({
        code: 422,
        body: { success: false, failured: 'invalid-name' },
        response,
      })

    if (confirmPassword !== password)
      return sendHttpResponse<ICreateUserResponseBody>({
        code: 422,
        body: {
          success: false,
          failured: 'invalid-confirm-password',
        },
        response,
      })

    const someUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    })

    if (someUser)
      return sendHttpResponse<ICreateUserResponseBody>({
        code: 422,
        body: { success: false, failured: 'exist-email' },
        response,
      })

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
      },
      select: {
        id: true,
      },
    })

    if (!user?.id)
      return sendHttpResponse<ICreateUserResponseBody>({
        code: 500,
        body: { success: false, failured: 'server' },
        response,
      })

    return sendHttpResponse({
      code: 200,
      body: { success: true },
      response,
    })
  } catch (error) {
    console.error(error)
    return sendHttpResponse<ICreateUserResponseBody>({
      code: 500,
      body: { success: false, failured: 'server' },
      response,
    })
  }
}
