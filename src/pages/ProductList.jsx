import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError('')
        const res = await axios.get('/data/products.json')
        setProducts(res.data)
        setFilteredProducts(res.data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products')
        setProducts([])
        setFilteredProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const categories = ['all', ...new Set(products.map(product => product.category))]

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory))
    }
  }, [selectedCategory, products])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-app py-6">
          <div className="flex items-center justify-center">
            <div className="text-lg">Loading products...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container-app py-6">
          <div className="flex items-center justify-center">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container-app py-4 sm:py-6 md:py-[75px]">
        <section className="relative mb-6 rounded-2xl bg-[#F3EFF6] p-4 sm:p-6 md:p-10 h-auto sm:h-[200px] md:h-[287px] overflow-hidden sm:overflow-hidden md:overflow-visible">
          <div className="flex flex-col items-start justify-between gap-4 sm:gap-6 md:flex-row md:items-center h-full">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-bold text-[#3A4980] leading-tight">
                Grab Upto 50% Off On <br className="hidden sm:block"/>Selected Products
              </h3>
              <button className="mt-4 sm:mt-6 md:mt-8 border border-gray-300 px-3 py-2 text-sm sm:text-base md:text-[16px] bg-[#3A4980] text-white hover:bg-[#3A4980]/80 h-[40px] sm:h-[45px] md:h-[50px] rounded-full w-[100px] sm:w-[110px] md:w-[120px] transition-colors">
                Buy Now
              </button>
            </div>
            <img 
              className="w-[200px] sm:w-[250px] md:w-[300px] object-contain md:absolute md:top-[-45px] md:right-[175px] z-10" 
              src="/images/banner.png" 
              alt="banner" 
            />
          </div>
        </section>

        <section className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Products ({filteredProducts.length})
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <label htmlFor="category-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                Filter by category:
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  image={product.image} 
                  name={product.title} 
                  price={product.price} 
                  rating={product.rating?.rate || 0} 
                  reviews={product.rating?.count || 0}
                  onAddToCart={() => alert(`Added ${product.title} to cart`)}
                  onShortlist={() => alert(`Added ${product.title} to shortlist`)}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                <p className="text-lg">No products found in this category</p>
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  View all products
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 