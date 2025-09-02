export default function Input({ label, type = 'text', name, value, onChange, placeholder, error, ...rest }) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-md border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base placeholder-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
        }`}
        {...rest}
      />
      {error && <p className="text-xs sm:text-sm text-red-600">{error}</p>}
    </div>
  )
} 