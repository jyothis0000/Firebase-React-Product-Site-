export default function ProductCard({ image, name, price, rating, reviews, onAddToCart, onShortlist }) {
  return (
    <div className="relative overflow-hidden rounded-tl-[15px] rounded-tr-[15px] w-full">
      <div className="flex items-center justify-center rounded-tl-[15px] rounded-tr-[15px] h-[200px] sm:h-[250px] md:h-[305px] w-full bg-[#f5eef5]">
        <img 
          src={image} 
          alt={name} 
          className="h-[140px] w-[140px] sm:h-[180px] sm:w-[180px] md:h-[205px] md:w-[203px] object-contain transition-transform duration-300 hover:scale-105" 
        />
        <img 
          src="/images/heart.png" 
          alt="heart" 
          className="w-[25px] sm:w-[30px] absolute right-2 top-2 cursor-pointer bg-white rounded-full p-1 shadow-sm" 
        />
      </div>
      
      <div className="rounded-bl-[15px] rounded-br-[15px] border-b border-l border-r border-[#6a728230] p-3 sm:p-4">
        <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1 flex-1 mr-2">
              {name}
            </h3>
            <span className="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap">
              ₹ {price.toFixed(2)}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 text-xs sm:text-sm">★★★★</span>
            <span className="text-xs sm:text-sm text-gray-600">{rating}</span>
            <span className="text-xs sm:text-sm text-gray-500">({reviews})</span>
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button 
            onClick={onAddToCart} 
            className="border border-gray-300 px-2 sm:px-3 py-2 text-xs font-medium bg-[#3A4980] text-white hover:bg-[#3A4980]/80 h-[35px] sm:h-[40px] rounded-full transition-colors"
          >
            Add To Cart
          </button>
          <button 
            onClick={onShortlist} 
            className="rounded-full border border-gray-300 px-2 sm:px-3 py-2 text-xs font-medium hover:bg-gray-50 h-[35px] sm:h-[40px] transition-colors"
          >
            Add Shortlist
          </button>
        </div>
      </div>
    </div>
  )
} 