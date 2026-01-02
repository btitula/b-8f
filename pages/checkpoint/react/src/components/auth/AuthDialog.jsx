import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LoginForm from './forms/LoginForm'
import SignupForm from './forms/SignupForm'

/**
 * AuthDialog Component
 *
 * Modal dialog for user authentication
 *
 * Features:
 * - Tabbed interface (Login/Signup)
 * - Controlled open/close state
 * - Auto-close on successful auth
 * - Responsive design
 *
 * @param {boolean} open - Controls dialog visibility
 * @param {Function} onOpenChange - Callback when dialog open state changes
 */
function AuthDialog({ open, onOpenChange }) {
  /**
   * Handle successful authentication
   *
   * Called by LoginForm or SignupForm after successful API call
   * Closes the dialog
   */
  const handleSuccess = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to Order.uk
          </DialogTitle>
        </DialogHeader>

        {/* Tabbed interface for Login/Signup */}
        <Tabs defaultValue="login" className="w-full">
          {/* Tab selector buttons */}
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab Content */}
          <TabsContent value="login" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Welcome Back!</h3>
              <p className="text-sm text-gray-500">
                Login to access your account
              </p>
            </div>
            {/* LoginForm handles its own validation and submission */}
            <LoginForm onSuccess={handleSuccess} />
          </TabsContent>

          {/* Signup Tab Content */}
          <TabsContent value="signup" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Create Account</h3>
              <p className="text-sm text-gray-500">
                Sign up to start ordering
              </p>
            </div>
            {/* SignupForm handles its own validation and submission */}
            <SignupForm onSuccess={handleSuccess} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
