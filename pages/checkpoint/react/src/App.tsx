import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { AppShell } from '@/layouts/AppShell'
import { ProfilePage } from '@/pages/profile/ProfilePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth routes - NO navbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* App routes - WITH navbar via AppShell */}
        <Route path="/app" element={<AppShell />}>
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<div className="p-8">Explore (placeholder)</div>} />
          <Route path="reels" element={<div className="p-8">Reels (placeholder)</div>} />
          <Route path="messages" element={<div className="p-8">Messages (placeholder)</div>} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Legacy /home redirect for backward compatibility */}
        <Route path="/home" element={<Navigate to="/app/home" replace />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
