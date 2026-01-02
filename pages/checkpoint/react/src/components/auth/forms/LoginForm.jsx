import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '@/store/slices/authSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect } from 'react'

/**
 * Zod Validation Schema for Login Form
 *
 * Defines validation rules for each field:
 * - email: Must be valid email format
 * - password: Minimum 8 characters
 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required') // Must not be empty
    .email('Invalid email format'), // Must be valid email

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'), // Minimum length
})

/**
 * LoginForm Component
 *
 * Features:
 * - Form validation with Zod
 * - State management with react-hook-form
 * - Redux integration for API calls
 * - Error handling and display
 * - Loading state management
 *
 * @param {Function} onSuccess - Callback when login succeeds
 */
function LoginForm({ onSuccess }) {
  const dispatch = useDispatch()

  // Get auth state from Redux
  const { loading, error } = useSelector((state) => state.auth)

  /**
   * Initialize react-hook-form with Zod resolver
   *
   * register: Function to register input fields
   * handleSubmit: Wrapper for form submission
   * formState.errors: Validation errors object
   * reset: Function to reset form fields
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema), // Use Zod for validation
    mode: 'onBlur', // Validate on blur (when user leaves field)
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
   * @param {string} data.email - User email
   * @param {string} data.password - User password
   */
  const onSubmit = async (data) => {
    try {
      // Dispatch login action (async thunk)
      // unwrap() converts the result to a promise that throws on rejection
      await dispatch(loginUser(data)).unwrap()

      // Reset form fields on success
      reset()

      // Call success callback (e.g., close dialog)
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      // Error is already stored in Redux state
      // No need to handle here, will be displayed below
      console.error('Login failed:', error)
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

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@mail.com"
          {...register('email')} // Register field with react-hook-form
          className={errors.email ? 'border-red-500' : ''} // Highlight error
        />
        {/* Display field-level validation error */}
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')} // Register field with react-hook-form
          className={errors.password ? 'border-red-500' : ''}
        />
        {/* Display field-level validation error */}
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600"
        disabled={loading} // Disable during API call
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>

      {/* Helper text for demo */}
      <p className="text-xs text-gray-500 text-center">
        Demo: john@mail.com / changeme
      </p>
    </form>
  )
}

export default LoginForm
