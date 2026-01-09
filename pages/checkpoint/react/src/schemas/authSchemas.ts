import { z } from 'zod'

// Login Schema
export const loginSchema = z.object({
  identifier: z
    .string()
    .min(3, 'Please enter a valid email, username, or phone number')
    .trim(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Signup Schema
export const signupSchema = z.object({
  emailOnly: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(
      /^[a-z0-9._]+$/,
      'Username can only contain lowercase letters, numbers, periods, and underscores'
    )
    .trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export type SignupFormData = z.infer<typeof signupSchema>

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  identifier: z
    .string()
    .min(3, 'Please enter a valid email, phone, or username')
    .trim()
    .refine(
      (value) => {
        if (value.includes('@')) {
          return z.string().email().safeParse(value).success
        }
        return true
      },
      { message: 'Please enter a valid email address' }
    ),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
