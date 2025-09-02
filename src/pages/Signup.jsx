import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signUp } from '../firebase/auth'
import Input from '../components/Input'
import Button from '../components/Button'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', dob: '', mobile: '', password: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.fullName) nextErrors.fullName = 'Full name is required'
    if (!form.email) nextErrors.email = 'Email is required'
    if (!form.dob) nextErrors.dob = 'Date of birth is required'
    if (!form.mobile) nextErrors.mobile = 'Mobile is required'
    if (!form.password) nextErrors.password = 'Password is required'
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    
    setLoading(true)
    const result = await signUp(form.email, form.password, form)
    
    if (result.success) {
      setSuccess('Account created successfully!')
      setTimeout(() => navigate('/login'), 1200)
    } else {
      setSuccess('')
      // Handle specific Firebase errors
      let errorMessage = result.error
      if (errorMessage.includes('email-already-in-use')) {
        errorMessage = 'An account with this email already exists'
      } else if (errorMessage.includes('weak-password')) {
        errorMessage = 'Password is too weak'
      }
      setErrors({ general: errorMessage })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Image (Hidden on mobile, visible on large screens) */}
        <div className="hidden lg:block">
          <img src="/images/signup.png" alt="signup" className="h-[100svh] w-full object-cover" />
        </div>
        
        {/* Right Side - Signup Form */}
        <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="w-full max-w-sm sm:max-w-md">
            <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Create an Account
            </h2>
            <p className="mb-6 text-center text-xs sm:text-sm text-gray-500">
              Are you ready to join us? Let's create Account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <Input 
                label="Full name" 
                name="fullName" 
                value={form.fullName} 
                onChange={handleChange} 
                placeholder="John Doe" 
                error={errors.fullName} 
              />
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
                label="Date of Birth" 
                type="date" 
                name="dob" 
                value={form.dob} 
                onChange={handleChange} 
                error={errors.dob} 
              />
              <Input 
                label="Mobile" 
                name="mobile" 
                value={form.mobile} 
                onChange={handleChange} 
                placeholder="1234567890" 
                error={errors.mobile} 
              />
              <Input 
                label="Password" 
                type="password" 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                placeholder="At least 6 characters" 
                error={errors.password} 
              />
              
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            {success && (
              <p className="mt-4 text-center text-sm text-green-600 bg-green-50 p-3 rounded-md">
                {success}
              </p>
            )}
            
            {errors.general && (
              <p className="mt-4 text-center text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {errors.general}
              </p>
            )}

            <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-black hover:underline hover:text-gray-700 transition-colors">
                Sign-in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 