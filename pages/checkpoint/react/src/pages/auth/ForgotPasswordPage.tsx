import { AuthCard } from '@/components/auth/AuthCard'
import { AuthInput } from '@/components/auth/AuthInput'
import { AuthButton } from '@/components/auth/AuthButton'
import { DividerOr } from '@/components/auth/DividerOr'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema } from '@/schemas/authSchemas'
import type { ForgotPasswordFormData } from '@/schemas/authSchemas'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { forgotPasswordThunk, clearError, clearSuccessMessage } from '@/store/slices/authSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { useEffect } from 'react'

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch()
  const { isLoading, error, successMessage } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  })

  // Clear error and success messages when component mounts
  useEffect(() => {
    dispatch(clearError())
    dispatch(clearSuccessMessage())
  }, [dispatch])

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    await dispatch(forgotPasswordThunk(data))
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Top Navigation */}
      <header className="w-full border-b border-gray-300 px-6 py-3 bg-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <img
            src="/landingPageLogo.png"
            alt="Instagram"
            className="w-32"
          />
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button
                variant="default"
                className="bg-[#4150F7] hover:bg-[#808EFC] text-white text-sm font-semibold px-4 py-1.5"
              >
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="ghost"
                className="text-[#4150F7] hover:text-[#808EFC] text-sm font-semibold px-4 py-1.5"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <AuthCard className="border-0">
          <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center mb-4">
            <FontAwesomeIcon icon={faLock} className="h-12 w-12" />
          </div>

          <h2 className="text-base font-semibold mb-2">Trouble logging in?</h2>

          <p className="text-sm text-gray-600 text-center mb-6 px-4">
            Enter your email, phone, or username and we'll send you a link to get
            back into your account.
          </p>

          {error && (
            <Alert className="mb-4 bg-red-50 border-red-200 text-red-800 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
              {error}
            </Alert>
          )}

          {successMessage && (
            <Alert className="mb-4 bg-blue-50 border-blue-200 text-blue-800 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
              {successMessage}
            </Alert>
          )}

          <form
            onSubmit={handleSubmit(handleForgotPassword)}
            className="w-full space-y-2"
          >
            <AuthInput
              {...register('identifier')}
              type="text"
              placeholder="Email, Phone, or Username"
              error={errors.identifier?.message}
              aria-label="Email, Phone, or Username"
              className="text-xs"
            />

            <AuthButton
              type="submit"
              loading={isLoading}
              disabled={!isValid || isLoading}
              className="mt-4"
            >
              Send login link
            </AuthButton>
          </form>

          <Link
            to="#"
            className="text-xs text-[#4150F7] mt-4 hover:text-[#808EFC]"
            onClick={(e) => e.preventDefault()}
          >
            Can't reset your password?
          </Link>

          <DividerOr />

          <Link
            to="/signup"
            className="text-sm font-semibold hover:text-gray-700"
          >
            Create new account
          </Link>

          <Link
            to="/login"
            className="w-full text-center py-3 mt-8 border border-gray-300 bg-gray-50 text-sm font-semibold hover:bg-gray-100 rounded"
          >
            Back to login
          </Link>
        </AuthCard>
      </div>

      {/* Footer (simplified for this page) */}
      <footer className="w-full text-center text-xs text-gray-500 py-6">
        <p>© 2026 Instagram from Meta</p>
      </footer>
    </div>
  )
}
