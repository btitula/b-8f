import express from 'express'
import healthcheckRouter from '~/routers/healthcheck.route'
import userRouter from '~/routers/user.route'
import loggingMiddleware from '~/middlewares/logging.middleware'
import { sendError } from './utils/http'
import databaseService from './services/database.service'
import { logError, logInfo } from './utils/logger'

const app = express()

app.set('trust proxy', true) // IMPORTANT behind ALB/NGINX

app.use(express.json({ limit: '1mb' })) // Add JSON body parser middleware

app.use(loggingMiddleware) // Apply logging middleware to all routes

app.use('/healthcheck', healthcheckRouter)

app.use('/user', userRouter)

// Default 404 handler (for any unmatched route)
app.use((req, res) => {
  sendError(req, res, 'NOT_FOUND')
})

const gracefulExit = async (code = 1) => {
  await databaseService.disconnect()
  process.exit(code)
}

async function startServer() {
  try {
    await databaseService.connect() // Wait for DB
    app.listen(process.env.PORT, () => {
      logInfo({ msg: `Server is running on port ${process.env.PORT}` })
    })
  } catch (err) {
    logError({ msg: 'Failed to start server', error: err })
    await gracefulExit(1)
  }
}

/**
 * Why you want it: prevents corrupted states and connection leaks when container orchestration (Kubernetes, ECS, Docker) stops your service.
 * They’re a small safety net that separates “dev-only” scripts from “production-ready” services.
 */
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason)
  gracefulExit(1)
})
process.on('SIGTERM', () => gracefulExit(0))
process.on('SIGINT', () => gracefulExit(0))

startServer()
