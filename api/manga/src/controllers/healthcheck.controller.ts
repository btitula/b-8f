import { Request, Response } from 'express'
import { MESSAGES_CATALOG } from '~/constants/messages'
import { sendOk } from '~/utils/http'

export const healthcheckController = (req: Request, res: Response) => {
  return sendOk(req, res, MESSAGES_CATALOG.HEALTH_OK)
}
