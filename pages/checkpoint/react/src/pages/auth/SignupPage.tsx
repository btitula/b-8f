import { AuthLayout } from '@/components/layout/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthInput } from '@/components/auth/AuthInput'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { AuthButton } from '@/components/auth/AuthButton'
import { OAuthButton } from '@/components/auth/OAuthButton'
import { DividerOr } from '@/components/auth/DividerOr'
import { LegalText } from '@/components/auth/LegalText'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '@/schemas/authSchemas'
import type { SignupFormData } from '@/schemas/authSchemas'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { signupThunk, clearError, clearSuccessMessage } from '@/store/slices/authSlice'
import { authService } from '@/services/authService'
import { Alert } from '@/components/ui/alert'
import { useEffect } from 'react'

export const SignupPage = () => {
  const dispatch = useAppDispatch()
  const { isLoading, error, successMessage } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  })

  // Clear error and success messages when component mounts
  useEffect(() => {
    dispatch(clearError())
    dispatch(clearSuccessMessage())
  }, [dispatch])

  const handleSignup = async (data: SignupFormData) => {
    await dispatch(signupThunk(data))
  }

  const handleOAuthClick = (provider: 'facebook' | 'google') => {
    if (provider === 'facebook') {
      authService.oauthFacebookStart()
    } else {
      authService.oauthGoogleStart()
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        className="border-0"
        footer={
          <p className="text-sm">
            Have an account?{' '}
            <Link to="/login" className="text-[#4150F7] font-semibold hover:text-[#808EFC]">
              Log in
            </Link>
          </p>
        }
      >
        <img
          src="/landingPageLogo.png"
          alt="Instagram"
          className="mb-4 w-44"
        />

        <p className="text-center text-gray-600 font-semibold mb-6 px-8">
          Sign up to see photos and videos from your friends.
        </p>

        {error && (
          <Alert className="mb-4 bg-red-50 border-red-200 text-red-800 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert className="mb-4 bg-green-50 border-green-200 text-green-800 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            {successMessage}
          </Alert>
        )}

        <OAuthButton
          provider="facebook"
          onClick={() => handleOAuthClick('facebook')}
          className="mb-4"
        />

        <DividerOr />

        <form onSubmit={handleSubmit(handleSignup)} className="w-full space-y-2">
          <AuthInput
            {...register('emailOnly')}
            type="email"
            placeholder="Mobile Number or Email"
            error={errors.emailOnly?.message}
            aria-label="Mobile Number or Email"
            className="text-xs"
          />

          <AuthInput
            {...register('fullName')}
            type="text"
            placeholder="Full Name"
            error={errors.fullName?.message}
            aria-label="Full Name"
            className="text-xs"
          />

          <AuthInput
            {...register('username')}
            type="text"
            placeholder="Username"
            error={errors.username?.message}
            aria-label="Username"
            className="text-xs"
          />

          <PasswordInput
            {...register('password')}
            placeholder="Password"
            error={errors.password?.message}
            aria-label="Password"
            className="text-xs"
          />

          <LegalText>
            People who use our service may have uploaded your contact information
            to Instagram.{' '}
            <a href="#" className="text-[#4150F7] hover:text-[#808EFC]">
              Learn More
            </a>
          </LegalText>

          <LegalText>
            By signing up, you agree to our{' '}
            <a href="#" className="text-[#4150F7] hover:text-[#808EFC]">
              Terms
            </a>
            ,{' '}
            <a href="#" className="text-[#4150F7] hover:text-[#808EFC]">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#4150F7] hover:text-[#808EFC]">
              Cookies Policy
            </a>
            .
          </LegalText>

          <AuthButton
            type="submit"
            loading={isLoading}
            disabled={!isValid || isLoading}
            className="mt-4"
          >
            Sign up
          </AuthButton>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}
