import { Router } from 'express'

const healthcheckMiddleware = Router()

healthcheckMiddleware.use((req, res, next) => {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl || req.url,
      headers: req.headers,
      ip: req.ip || req.socket.remoteAddress
    })
  )

  // The next() function is crucial because it passes control to the next middleware function in the stack.
  // Without next(), the request would hang and not continue processing,
  // leaving the client waiting indefinitely, as no further handlers would be invoked.
  next()
})

export default healthcheckMiddleware
