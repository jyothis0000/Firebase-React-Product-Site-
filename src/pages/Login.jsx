import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../firebase/auth'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.email) nextErrors.email = 'Email is required'
    if (!form.password) nextErrors.password = 'Password is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setAuthError('')
    if (!validate()) return
    
    setLoading(true)
    const result = await signIn(form.email, form.password)
    
    if (result.success) {
      navigate('/products')
    } else {
      setAuthError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:block">
          <img src="/images/signin.png" alt="login" className="h-[100svh] w-full object-cover" />
        </div>
        
        <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-white">
          <div className="w-full max-w-sm sm:max-w-md">
            <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-extrabold text-gray-900 mb-2">
              Welcome Back!!
            </h2>
            <p className="mb-6 text-center text-xs sm:text-sm text-gray-500">
              Please login your Account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <Input 
                label="Email" 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
                error={errors.email} 
              />
              <Input 
                label="Password" 
                type="password" 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                placeholder="Enter your password" 
                error={errors.password} 
              />
              
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span />
                <Link to="#" className="text-gray-600 hover:underline hover:text-gray-900 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
            
            {authError && (
              <p className="mt-4 text-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {authError}
              </p>
            )}

            <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
              Didn't have an Account?{' '}
              <Link to="/signup" className="font-semibold text-black hover:underline hover:text-gray-700 transition-colors">
                Sign-up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 