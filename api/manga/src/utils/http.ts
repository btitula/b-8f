import type { Response, Request } from 'express'
import { MESSAGES_CATALOG, type MessageCode } from '~/constants/messages'

export type ProblemDetails = {
  type: string
  title: string
  status: number
  code: MessageCode
  detail?: string
  details?: Array<Record<string, unknown>>
  trace_id?: string
  instance?: string
}

export const sendError = (
  req: Request,
  res: Response,
  code: MessageCode,
  opts?: {
    detail?: string
    details?: Array<Record<string, unknown>>
  }
) => {
  const spec = MESSAGES_CATALOG[code]
  const body: ProblemDetails = {
    type: spec.type,
    title: spec.title,
    status: spec.httpStatus,
    code,
    detail: opts?.detail ?? spec.defaultMessage,
    details: opts?.details,
    trace_id: req.request_id,
    instance: req.originalUrl || req.url
  }
  res.status(spec.httpStatus).json(body)
}

export const sendOk = <T>(req: Request, res: Response, data: T, meta?: Record<string, unknown>) => {
  res.status(200).json({
    data,
    meta: {
      request_id: req.request_id,
      timestamp: new Date().toISOString(),
      ...meta
    }
  })
}
