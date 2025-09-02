export default function Button({ children, className = '', ...rest }) {
  return (
    <button 
      className={`inline-flex w-full items-center justify-center rounded-md bg-black px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white shadow hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 transition-colors ${className}`} 
      {...rest}
    >
      {children}
    </button>
  )
} 