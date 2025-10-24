import { Request, Response } from 'express'
import { MESSAGES_CATALOG } from '~/constants/messages'
// import User, { UserSchema } from '~/models/schemas/user.schema'
// import databaseService from '~/services/database.service'
import { sendError, sendOk } from '~/utils/http'
// import { logError, logInfo } from '~/utils/logger'
// import { fromZodError } from 'zod-validation-error'
import userService from '~/services/user.service'

export const userLoginController = (req: Request, res: Response) => {
  return sendOk(req, res, MESSAGES_CATALOG.AUTH_LOGIN_SUCCESS)
}

export const userRegisterController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return sendError(req, res, 'AUTH_MISSING_CREDENTIALS')
    }

    const result = await userService.registerUser(email, password)
    console.log(result)
    if (result.success) {
      return sendOk(req, res, 'AUTH_REGISTER_SUCCESS')
    }
    switch (result.code) {
      case 'AUTH_EMAIL_ALREADY_IN_USE':
        return sendError(req, res, 'AUTH_EMAIL_ALREADY_IN_USE')
      case 'INTERNAL_SERVER_ERROR':
        return sendError(req, res, 'INTERNAL_SERVER_ERROR')
      case 'VALIDATION_ERROR':
        return sendError(req, res, 'VALIDATION_ERROR', { detail: result.detail })
      default:
        return sendError(req, res, 'INTERNAL_SERVER_ERROR', {
          detail: result.detail
        })
    }
  } catch (error) {
    return sendError(req, res, 'INTERNAL_SERVER_ERROR', {
      detail: `Failed to register user with error: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
}
