import type {
  LoginFormData,
  SignupFormData,
  ForgotPasswordFormData,
} from '@/schemas/authSchemas'

// Mock demo user for testing (not real credentials)
const DEMO_USER = {
  identifier: 'test@local.host',
  username: 'test',
  password: 'abc@123!', // pragma: allowlist secret
  id: '1',
  email: 'test@local.host',
  name: 'Test User',
  fullName: 'Test User',
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export interface AuthResponse {
  user: {
    id: string
    email: string
    name: string
    username?: string
  }
  token: string
}

export interface MessageResponse {
  message: string
}

// Mock login function
export const login = async (
  data: LoginFormData
): Promise<AuthResponse> => {
  await delay(1000) // Simulate network delay

  // Check if credentials match demo user
  const isValidIdentifier =
    data.identifier === DEMO_USER.identifier ||
    data.identifier === DEMO_USER.username

  const isValidPassword = data.password === DEMO_USER.password

  if (isValidIdentifier && isValidPassword) {
    return {
      user: {
        id: DEMO_USER.id,
        email: DEMO_USER.email,
        name: DEMO_USER.name,
        username: DEMO_USER.username,
      },
      token: 'mock-jwt-token-' + Date.now(),
    }
  }

  throw new Error('Invalid credentials. Try demo@test.com / password123')
}

// Mock signup function
export const signup = async (
  data: SignupFormData
): Promise<MessageResponse> => {
  await delay(1000) // Simulate network delay

  // Check if email already exists (demo user)
  if (data.emailOnly === DEMO_USER.email) {
    throw new Error('Email already registered')
  }

  // Check if username already exists (demo user)
  if (data.username === DEMO_USER.username) {
    throw new Error('Username already taken')
  }

  // Simulate successful signup
  return {
    message:
      'Account created successfully! Please check your email to verify your account.',
  }
}

// Mock forgot password function
export const forgotPassword = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _data: ForgotPasswordFormData
): Promise<MessageResponse> => {
  await delay(1000) // Simulate network delay

  // Always return neutral message to prevent account enumeration
  // TODO: Use _data when implementing real API call
  return {
    message:
      'If an account exists with this information, a password reset link will be sent.',
  }
}

// OAuth redirect functions
export const oauthGoogleStart = () => {
  // In production, this would redirect to Google OAuth
  window.location.href = '/auth/oauth/google/start'
}

export const oauthFacebookStart = () => {
  // In production, this would redirect to Facebook OAuth
  window.location.href = '/auth/oauth/facebook/start'
}

export const authService = {
  login,
  signup,
  forgotPassword,
  oauthGoogleStart,
  oauthFacebookStart,
}
