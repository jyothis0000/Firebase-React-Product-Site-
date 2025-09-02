import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { signOutUser } from '../firebase/auth'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const { currentUser, userData } = useAuth()

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  const handleLogout = async () => {
    try {
      await signOutUser()
      setOpen(false)
      setMobileMenuOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-white shadow-sm relative sticky top-0 left-0 z-[999]">
      <div className="container-app flex items-center justify-between py-3 sm:py-4">
        {/* Logo */}
        <div className="flex items-center gap-4 sm:gap-8 lg:gap-12">
          <img src="/images/logo.png" alt="logo" className="w-24 sm:w-32 md:w-40 lg:w-[195px]" />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10 text-sm">
            <Link to="#" className="text-[#1D364D] font-medium hover:text-[#3A4980] transition-colors">Category</Link>
            <Link to="#" className="text-[#1D364D] font-medium hover:text-[#3A4980] transition-colors">Brand</Link>
            <Link to="#" className="text-[#1D364D] font-medium hover:text-[#3A4980] transition-colors">Contact</Link>
            <Link to="#" className="text-[#1D364D] font-medium hover:text-[#3A4980] transition-colors">FAQs</Link>
          </nav>
        </div>

        {/* Right Side - Cart and Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Icon */}
          <img src="/images/cart.png" alt="cart" className="w-8 sm:w-10 md:w-[50px]" />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="relative" ref={menuRef}>
                  <button 
                    aria-label="profile" 
                    onClick={() => setOpen(v => !v)} 
                    className="flex w-10 xl:w-[50px] items-center justify-center rounded-full border bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <img src="/images/account.png" alt="profile" className="w-10 xl:w-[50px]" />
                  </button>
                  {open && (
                    <div className="absolute right-[-20] z-20 mt-2 w-40 overflow-hidden rounded-md border-[#6a728230] bg-white shadow-lg ">
                      <div className="border-b px-3 py-2 border-[#6a728230]">
                        <p className="text-sm font-medium text-gray-900">{userData?.fullName || currentUser.displayName}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-600">Good Morning</p>
                  <p className="text-sm font-medium text-gray-900">
                    {userData?.fullName || currentUser.displayName || 'User'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  Sign in
                </Link>
                <Link to="/signup" className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-900 transition-colors">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container-app py-4 space-y-4">
            {/* Mobile Navigation */}
            <nav className="space-y-3">
              <Link to="#" className="block text-[#1D364D] font-medium hover:text-[#3A4980] transition-colors">Category</Link>
              <Link to="#" className="block text-[#1D364D] font-medium hover:text-[#3A4980] transition-colors">Brand</Link>
              <Link to="#" className="block text-[#1D364D] font-medium hover:text-[#3A4980] transition-colors">Contact</Link>
              <Link to="#" className="block text-[#1D364D] font-medium hover:text-[#3A4980] transition-colors">FAQs</Link>
            </nav>

            {/* Mobile Auth Section */}
            {currentUser ? (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center gap-3">
                  <img src="/images/account.png" alt="profile" className="w-10 rounded-full" />
                  <div>
                    <p className="text-sm text-gray-600">Good Morning</p>
                    <p className="text-sm font-medium text-gray-900">
                      {userData?.fullName || currentUser.displayName || 'User'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md "
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link to="/login" className="block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  Sign in
                </Link>
                <Link to="/signup" className="block text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
} 