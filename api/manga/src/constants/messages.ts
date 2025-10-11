export const HEALTHCHECK_TIMEOUT = 5000
export const DATABASE_CONNECTED_SUCCESS = 'Database connection established successfully.'

export const DATABASE_CONNECTED_ERROR =
  'Unable to connect to the MongoDB database. Please verify the connection configuration and network access.'

export const DATABASE_DISCONNECT_SUCCESS = 'Database connection closed successfully.'

export const DATABASE_DISCONNECT_FAILED =
  'Failed to close the MongoDB connection. Verify that the connection is active and accessible.'

export type MessageCode =
  | 'AUTH_MISSING_CREDENTIALS'
  | 'AUTH_INVALID_CREDENTIALS'
  | 'AUTH_ACCOUNT_LOCKED'
  | 'AUTH_LOGIN_SUCCESS'
  | 'HEALTH_OK'
  | 'HEALTH_ERROR'
  | 'NOT_FOUND'

type MessageSpec = {
  httpStatus: number
  title: string
  defaultMessage: string
  type: string // doc url anchor or about:blank
}

export const MESSAGES_CATALOG: Record<MessageCode, MessageSpec> = {
  AUTH_MISSING_CREDENTIALS: {
    httpStatus: 400,
    title: 'Missing Credentials',
    defaultMessage: 'Both email and password must be provided.',
    type: 'https://docs.example.com/errors#AUTH_MISSING_CREDENTIALS'
  },
  AUTH_INVALID_CREDENTIALS: {
    httpStatus: 401,
    title: 'Invalid Credentials',
    defaultMessage: 'Invalid email or password. Please try again.',
    type: 'https://docs.example.com/errors#AUTH_INVALID_CREDENTIALS'
  },
  AUTH_ACCOUNT_LOCKED: {
    httpStatus: 423,
    title: 'Account Locked',
    defaultMessage: 'This account has been temporarily locked. Please try again later or contact support.',
    type: 'https://docs.example.com/errors#AUTH_ACCOUNT_LOCKED'
  },
  AUTH_LOGIN_SUCCESS: {
    httpStatus: 200,
    title: 'Login Successful',
    defaultMessage: 'You have successfully signed in.',
    type: 'https://docs.example.com/errors#AUTH_LOGIN_SUCCESS'
  },
  HEALTH_OK: {
    httpStatus: 200,
    title: 'Healthy',
    defaultMessage: 'Service is operating normally.',
    type: 'about:blank'
  },
  HEALTH_ERROR: {
    httpStatus: 500,
    title: 'Health Check Failed',
    defaultMessage: 'Service is unavailable or not responding as expected.',
    type: 'https://docs.example.com/errors#HEALTH_ERROR'
  },
  NOT_FOUND: {
    httpStatus: 404,
    title: 'Resource Not Found',
    defaultMessage: 'Requested resource could not be found on the server.',
    type: 'https://docs.example.com/errors#NOT_FOUND'
  }
}
