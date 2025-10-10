import { Router } from 'express'
import { userLoginValidationMiddleware } from '../middlewares/user.middleware'
import { userLoginController } from '~/controllers/user.controller'

const userRouter = Router()

// userRouter.use(userLoginValidationMiddleware)

userRouter.post('/auth/login', userLoginValidationMiddleware, userLoginController)

export default userRouter
