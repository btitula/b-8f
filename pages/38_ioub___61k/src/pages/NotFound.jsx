import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist.
        </p>
        <Link to="/">
          <Button>Go back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
