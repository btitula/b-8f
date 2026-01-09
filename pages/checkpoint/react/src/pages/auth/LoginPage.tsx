import { AuthLayout } from '@/components/layout/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthInput } from '@/components/auth/AuthInput'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { AuthButton } from '@/components/auth/AuthButton'
import { OAuthButton } from '@/components/auth/OAuthButton'
import { DividerOr } from '@/components/auth/DividerOr'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/authSchemas'
import type { LoginFormData } from '@/schemas/authSchemas'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loginThunk, clearError, clearSuccessMessage } from '@/store/slices/authSlice'
import { authService } from '@/services/authService'
import { Alert } from '@/components/ui/alert'
import { useEffect } from 'react'

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  // Clear error and success messages when component mounts
  useEffect(() => {
    dispatch(clearError())
    dispatch(clearSuccessMessage())
  }, [dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (data: LoginFormData) => {
    await dispatch(loginThunk(data))
  }

  const handleOAuthClick = (provider: 'facebook' | 'google') => {
    if (provider === 'facebook') {
      authService.oauthFacebookStart()
    } else {
      authService.oauthGoogleStart()
    }
  }

  return (
    <AuthLayout
      leftSlot={
        <div className="w-full max-w-md">
          <img
            src="/src/assets/landingPageLeft.png"
            alt="Instagram app preview"
            className="w-full h-auto"
          />
        </div>
      }
    >
      <AuthCard
        className="border-0"
        footer={
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#4150F7] font-semibold hover:text-[#808EFC]">
              Sign up
            </Link>
          </p>
        }
      >
        <img
          src="/src/assets/landingPageLogo.png"
          alt="Instagram"
          className="mb-8 w-44"
        />

        {error && (
          <Alert className="mb-4 bg-red-50 border-red-200 text-red-800 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className="w-full space-y-2">
          <AuthInput
            {...register('identifier')}
            type="text"
            placeholder="Phone number, username, or email"
            error={errors.identifier?.message}
            aria-label="Phone number, username, or email"
            className="text-xs"
          />

          <PasswordInput
            {...register('password')}
            placeholder="Password"
            error={errors.password?.message}
            aria-label="Password"
            className="text-xs"
          />

          <AuthButton
            type="submit"
            loading={isLoading}
            disabled={!isValid || isLoading}
            className="mt-4"
          >
            Log in
          </AuthButton>
        </form>

        <DividerOr />

        <OAuthButton
          provider="facebook"
          onClick={() => handleOAuthClick('facebook')}
        />

        <Link
          to="/forgot-password"
          className="text-xs text-[#4150F7] mt-4 hover:text-[#808EFC]"
        >
          Forgot password?
        </Link>
      </AuthCard>
    </AuthLayout>
  )
}
