// import { Router } from 'express'

// const loggingMiddleware = Router()

// loggingMiddleware.use((req, res, next) => {
//   console.log(
//     JSON.stringify({
//       timestamp: new Date().toISOString(),
//       method: req.method,
//       url: req.originalUrl || req.url,
//       headers: req.headers,
//       ip: req.ip || req.socket.remoteAddress
//     })
//   )

//   // The next() function is crucial because it passes control to the next middleware function in the stack.
//   // Without next(), the request would hang and not continue processing,
//   // leaving the client waiting indefinitely, as no further handlers would be invoked.
//   next()
// })

import { Router, type Request, type Response, type NextFunction } from 'express'
import crypto from 'crypto'
import onFinished from 'on-finished'
import { logInfo, logWarn, logError } from '../utils/logger'

const SENSITIVE_HEADERS = new Set(['authorization', 'cookie', 'set-cookie', 'x-api-key', 'x-amz-security-token'])

const pickSafeHeaders = (headers: Request['headers']) => {
  const safe: Record<string, string | string[] | undefined> = {}
  for (const [k, v] of Object.entries(headers)) {
    safe[k] = SENSITIVE_HEADERS.has(k.toLowerCase()) ? '[REDACTED]' : v
  }
  return safe
}

const getClientIp = (req: Request) => {
  const xf = (req.headers['x-forwarded-for'] as string) || ''
  const firstHop = xf.split(',')[0]?.trim()
  return firstHop || req.ip || (req.socket && req.socket.remoteAddress) || 'unknown'
}

export const loggingMiddleware = Router()

loggingMiddleware.use((req: Request, res: Response, next: NextFunction) => {
  const inboundId = (req.headers['x-request-id'] as string) || (req.headers['x-correlation-id'] as string)
  const requestId = inboundId || crypto.randomUUID()
  // ;(req as any).request_id = requestId
  req.request_id = requestId
  res.setHeader('X-Request-Id', requestId)

  const start = process.hrtime.bigint()
  const ip = getClientIp(req)

  logInfo({
    msg: 'request.received',
    request_id: requestId,
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl || req.url,
    http_version: req.httpVersion,
    ip,
    headers: pickSafeHeaders(req.headers),
    user_agent: req.headers['user-agent']
  })

  onFinished(res, () => {
    const end = process.hrtime.bigint()
    const durationMs = Number(end - start) / 1_000_000
    const status = res.statusCode
    const base = {
      msg: 'request.completed',
      request_id: requestId,
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl || req.url,
      status,
      duration_ms: Math.round(durationMs * 1000) / 1000,
      ip,
      user_agent: req.headers['user-agent'],
      res_content_length: (res.getHeader('content-length') as string) || undefined
    }
    if (status >= 500) logError(base)
    else if (status >= 400) logWarn(base)
    else logInfo(base)
  })

  next()
})

export default loggingMiddleware
