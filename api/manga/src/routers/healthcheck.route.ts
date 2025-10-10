import { Router } from 'express'
import { healthcheckController } from '~/controllers/healthcheck.controller'

const healthcheckRouter = Router()

healthcheckRouter.get('/', healthcheckController)

export default healthcheckRouter
