import { Router } from 'express'
import { userLoginValidationMiddleware } from '../middlewares/user.middleware'
import { userLoginController, userRegisterController } from '~/controllers/user.controller'

const userRouter = Router()

/**
 * Login user route with validation middleware
 */
userRouter.post('/auth/login', userLoginValidationMiddleware, userLoginController)

/**
 * Register user route
 */
userRouter.post('/auth/register', userRegisterController)

export default userRouter
