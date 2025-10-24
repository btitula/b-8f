import { MESSAGES_INFO_CATALOG } from '~/constants/messages'
import User, { UserSchema } from '~/models/schemas/user.schema'
import databaseService from './database.service'
import { logError, logInfo } from '~/utils/logger'
import { fromZodError } from 'zod-validation-error'

class UserService {
  async registerUser(email: string, password: string) {
    try {
      const user = await databaseService.usersCollection.findOne({ email })
      if (user) {
        logError({ msg: MESSAGES_INFO_CATALOG.EMAIL_ALREADY_EXISTS, user: email })
        return {
          success: false,
          code: 'AUTH_EMAIL_ALREADY_IN_USE'
        }
      }

      const newUser = new User({ email, password })
      const validatedUser = UserSchema.safeParse(newUser)
      if (!validatedUser.success) {
        const validationMessage = fromZodError(validatedUser.error).message
        logError({ msg: MESSAGES_INFO_CATALOG.EMAIL_REGISTER_FAILED, error: validationMessage })
        return {
          success: false,
          code: 'VALIDATION_ERROR',
          detail: validationMessage
        }
      }

      await databaseService.usersCollection.findOne({ email })
      logInfo({ msg: MESSAGES_INFO_CATALOG.EMAIL_REGISTER_SUCCESS, user: newUser.email })
      return { success: true }
    } catch (error) {
      logError({ msg: MESSAGES_INFO_CATALOG.EMAIL_REGISTER_FAILED, error })
      return {
        success: false,
        code: 'INTERNAL_SERVER_ERROR',
        detail: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}

const userService = new UserService()
export default userService
