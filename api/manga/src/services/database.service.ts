/**
 * This service is used to connect to the database MongoDB and perform CRUD operations.
 */

import { MongoClient, Db } from 'mongodb'
import {
  DATABASE_CONNECTED_ERROR,
  DATABASE_CONNECTED_SUCCESS,
  DATABASE_DISCONNECT_FAILED,
  DATABASE_DISCONNECT_SUCCESS,
  HEALTHCHECK_TIMEOUT
} from '~/constants/messages'
import { logError, logInfo } from '~/utils/logger'

const uri = process.env.MONGODB_URI || ''
const databaseName = process.env.MONGODB_DATABASE || 'dev_b_manga'
const timeout = HEALTHCHECK_TIMEOUT || 5000

class DatabaseService {
  private client: MongoClient
  private db?: Db

  constructor() {
    this.client = new MongoClient(uri, {
      maxPoolSize: 10,
      connectTimeoutMS: timeout
    })
  }

  async connect() {
    try {
      await this.client.connect()
      this.db = this.client.db(databaseName)
      await this.db.command({ ping: 1 })
      logInfo({ msg: DATABASE_CONNECTED_SUCCESS, database: databaseName })
    } catch (error) {
      logError({ msg: DATABASE_CONNECTED_ERROR, error })
      throw error // <– IMPORTANT: rethrow to let caller decide
    } finally {
      await this.client.close()
    }
  }

  async disconnect() {
    try {
      await this.client.close()
      logInfo({ msg: DATABASE_DISCONNECT_SUCCESS })
    } catch (error) {
      logError({ msg: DATABASE_DISCONNECT_FAILED, error })
    }
  }
}

// New object from class
const databaseService = new DatabaseService()
export default databaseService
