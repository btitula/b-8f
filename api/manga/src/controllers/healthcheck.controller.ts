import { Request, Response } from 'express'
import { MESSAGES_CATALOG } from '~/constants/messages'
import { sendError, sendOk } from '~/utils/http'
import { MongoClient } from 'mongodb'
import { logError, logInfo } from '~/utils/logger'

const uri = process.env.MONGODB_URI || ''
const databaseName = process.env.MONGODB_DATABASE || 'dev_b_manga'
const client = new MongoClient(uri || '')

export async function healthcheckController(req: Request, res: Response) {
  try {
    await client.db(databaseName).command({ ping: 1 })
    logInfo({ msg: 'Pinged your deployment. You successfully connected to MongoDB!' })
    return sendOk(req, res, MESSAGES_CATALOG.HEALTH_OK)
  } catch (error) {
    logError({ msg: 'Error pinging MongoDB!', error })
    return sendError(req, res, 'HEALTH_ERROR')
  } finally {
    await client.close()
  }
}
