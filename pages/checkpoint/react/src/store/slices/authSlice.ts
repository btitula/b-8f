import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { authService } from '@/services/authService'
import type {
  LoginFormData,
  SignupFormData,
  ForgotPasswordFormData,
} from '@/schemas/authSchemas'

interface User {
  id: string
  email: string
  name: string
  username?: string
}

interface AuthState {
  user: User | null
  token: string | null
  status: 'idle' | 'loading' | 'authenticated' | 'error'
  error: string | null
  isAuthenticated: boolean
  isLoading: boolean // Keep for backward compatibility
  successMessage: string | null
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  successMessage: null,
}

// Async Thunks
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials)
      // Persist token to localStorage
      localStorage.setItem('token', response.token)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('An error occurred during login')
    }
  }
)

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (userData: SignupFormData, { rejectWithValue }) => {
    try {
      const response = await authService.signup(userData)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('An error occurred during signup')
    }
  }
)

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async (data: ForgotPasswordFormData, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(data)
      return response
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('An error occurred')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.status = 'authenticated'
    },
    clearUser: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.status = 'idle'
      state.error = null
      localStorage.removeItem('token')
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      state.status = action.payload ? 'loading' : 'idle'
    },
    clearError: (state) => {
      state.error = null
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null
    },
  },
  extraReducers: (builder) => {
    // Login Thunk
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading'
        state.isLoading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'error'
        state.isLoading = false
        state.error = action.payload as string
      })

    // Signup Thunk
    builder
      .addCase(signupThunk.pending, (state) => {
        state.status = 'loading'
        state.isLoading = true
        state.error = null
        state.successMessage = null
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.isLoading = false
        state.error = null
        state.successMessage = action.payload.message
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = 'error'
        state.isLoading = false
        state.error = action.payload as string
        state.successMessage = null
      })

    // Forgot Password Thunk
    builder
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.status = 'loading'
        state.isLoading = true
        state.error = null
        state.successMessage = null
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.isLoading = false
        state.error = null
        state.successMessage = action.payload.message
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.status = 'error'
        state.isLoading = false
        state.error = action.payload as string
        state.successMessage = null
      })
  },
})

export const { setUser, clearUser, setLoading, clearError, clearSuccessMessage } =
  authSlice.actions
export default authSlice.reducer
