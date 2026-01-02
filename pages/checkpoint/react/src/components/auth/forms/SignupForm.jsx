import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser, clearError } from '@/store/slices/authSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect } from 'react'

/**
 * Zod Validation Schema for Signup Form
 *
 * More complex validation than login:
 * - Name must be at least 2 characters
 * - Email must be valid format
 * - Password must be 8+ chars with number and special character
 * - Confirm password must match password
 */
const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),

    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email format'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*]/,
        'Password must contain at least one special character (!@#$%^&*)'
      ),

    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  /**
   * Custom validation: Password match
   *
   * .refine() allows custom validation logic
   * Checks if password and confirmPassword match
   */
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // Show error on confirmPassword field
  })

/**
 * SignupForm Component
 *
 * Features:
 * - Complex form validation with Zod
 * - Password strength requirements
 * - Password confirmation
 * - Redux integration for API calls
 * - Error handling and display
 * - Auto-login after successful signup
 *
 * @param {Function} onSuccess - Callback when signup succeeds
 */
function SignupForm({ onSuccess }) {
  const dispatch = useDispatch()

  // Get auth state from Redux
  const { loading, error } = useSelector((state) => state.auth)

  /**
   * Initialize react-hook-form with Zod resolver
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur', // Validate on field blur
  })

  /**
   * Clear Redux errors when component unmounts
   */
  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  /**
   * Form Submit Handler
   *
   * @param {Object} data - Form data validated by Zod
   */
  const onSubmit = async (data) => {
    try {
      // Extract only needed fields (no confirmPassword)
      const { name, email, password } = data

      // Dispatch signup action (async thunk)
      // This will create account AND auto-login
      await dispatch(signupUser({ name, email, password })).unwrap()

      // Reset form on success
      reset()

      // Call success callback (close dialog)
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      // Error is already stored in Redux state
      console.error('Signup failed:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg">
      {/* Display API error if exists */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="john@mail.com"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
        {/* Password requirements hint */}
        {!errors.password && (
          <p className="text-xs text-gray-500">
            Must be 8+ characters with a number and special character
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register('confirmPassword')}
          className={errors.confirmPassword ? 'border-red-500' : ''}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-[#FC8A06] hover:bg-orange-600"
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Sign Up'}
      </Button>
    </form>
  )
}

export default SignupForm
