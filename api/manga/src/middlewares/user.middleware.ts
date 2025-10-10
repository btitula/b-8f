import { Router } from 'express'
import { sendError } from '~/utils/http'

const userLoginValidationMiddleware = Router()

userLoginValidationMiddleware.use((req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return sendError(req, res, 'AUTH_MISSING_CREDENTIALS')
  }
  next()
})

export { userLoginValidationMiddleware }
