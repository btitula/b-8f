import express from 'express'
import healthcheckRouter from '~/routers/healthcheck.route'
import userRouter from '~/routers/user.route'
import loggingMiddleware from '~/middlewares/logging.middleware'
import { sendError } from './utils/http'

const app = express()
app.set('trust proxy', true) // IMPORTANT behind ALB/NGINX

// Add JSON body parser middleware
app.use(express.json({ limit: '1mb' }))

// Apply logging middleware to all routes
app.use(loggingMiddleware)

app.use('/healthcheck', healthcheckRouter)

app.use('/user', userRouter)

// Default 404 handler (for any unmatched route)
app.use((req, res) => {
  // you can define a new catalog entry for 404, e.g. 'NOT_FOUND'
  sendError(req, res, 'NOT_FOUND')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
