export type MessageCode =
  | 'AUTH_MISSING_CREDENTIALS'
  | 'AUTH_INVALID_CREDENTIALS'
  | 'AUTH_ACCOUNT_LOCKED'
  | 'AUTH_LOGIN_SUCCESS'
  | 'HEALTH_OK'
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
    title: 'Missing credentials',
    defaultMessage: 'Email and password are required.',
    type: 'https://docs.example.com/errors#AUTH_MISSING_CREDENTIALS'
  },
  AUTH_INVALID_CREDENTIALS: {
    httpStatus: 401,
    title: 'Invalid credentials',
    defaultMessage: 'The email or password is incorrect.',
    type: 'https://docs.example.com/errors#AUTH_INVALID_CREDENTIALS'
  },
  AUTH_ACCOUNT_LOCKED: {
    httpStatus: 423,
    title: 'Account locked',
    defaultMessage: 'This account is temporarily locked. Try again later.',
    type: 'https://docs.example.com/errors#AUTH_ACCOUNT_LOCKED'
  },
  AUTH_LOGIN_SUCCESS: {
    httpStatus: 200,
    title: 'Login successful',
    defaultMessage: 'Login successful',
    type: 'https://docs.example.com/errors#AUTH_LOGIN_SUCCESS'
  },
  HEALTH_OK: {
    httpStatus: 200,
    title: 'OK',
    defaultMessage: 'OK',
    type: 'about:blank'
  },
  NOT_FOUND: {
    httpStatus: 404,
    title: 'Not found',
    defaultMessage: 'The requested resource was not found.',
    type: 'https://docs.example.com/errors#NOT_FOUND'
  }
}
