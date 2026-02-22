import Link from "next/link";
import { ChevronRight, Star, Heart, ShoppingCart } from "lucide-react";
import { products } from "@/lib/data";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <nav className="text-xs text-gray-500 mb-2">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link href="/" className="hover:text-amber-500">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <Link href="/products" className="hover:text-amber-500">Power Tools</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center text-gray-800 font-medium">
                Cordless Drills
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">
            Cordless Drills <span className="text-lg font-normal text-gray-500 align-middle ml-2">(50 results)</span>
          </h1>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <label className="mr-2 text-sm text-gray-600" htmlFor="sort">Sort by:</label>
          <select className="form-select block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-400 focus:border-amber-400 sm:text-sm rounded-md shadow-sm" id="sort">
            <option>Most Relevant</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
            <h4 className="font-semibold text-gray-800 mb-3">Category</h4>
            <div className="space-y-2">
              {['Power Tools', 'Cordless Drills', 'Storage', 'Safety Gear', 'Accessories'].map((cat, i) => (
                <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked={i === 1} className="form-checkbox h-4 w-4 text-amber-400 border-gray-300 rounded focus:ring-amber-400" />
                  <span className={`text-sm group-hover:text-amber-500 transition-colors ${i === 1 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Brand</h4>
            <div className="space-y-2">
              {['Bosch', 'Makita', 'DeWalt', 'Milwaukee', 'Manino'].map((brand) => (
                <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-amber-400 border-gray-300 rounded focus:ring-amber-400" />
                  <span className="text-gray-600 text-sm group-hover:text-amber-500 transition-colors">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Price Range</h4>
            <div className="mb-4 px-2">
              <div className="relative h-1 bg-gray-200 rounded-full">
                <div className="absolute left-0 top-0 h-1 bg-amber-400 rounded-full" style={{ width: '50%' }}></div>
                <div className="absolute -top-1.5 left-[50%] w-4 h-4 bg-amber-400 rounded-full shadow cursor-pointer border-2 border-white"></div>
              </div>
            </div>
            <div className="space-y-2">
              {['0.0 - 5.00 KWD', '25.00 - 50.00 KWD', '50.00 - 100.00 KWD'].map((range) => (
                <label key={range} className="flex items-center space-x-3 cursor-pointer group">
                  <input type="radio" name="price" className="form-radio h-4 w-4 text-amber-400 border-gray-300 focus:ring-amber-400" />
                  <span className="text-gray-600 text-sm group-hover:text-amber-500 transition-colors">{range}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Rating</h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-amber-400 border-gray-300 rounded focus:ring-amber-400" />
                <div className="flex text-amber-400 text-sm">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-amber-400 border-gray-300 rounded focus:ring-amber-400" />
                <div className="flex text-amber-400 text-sm">
                  {[...Array(4)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  <Star className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-xs text-gray-500">& Up</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full relative group">
                <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-10">
                  <Heart className="w-5 h-5" />
                </button>
                <Link href={`/products/${product.id}`} className="p-6 flex items-center justify-center bg-white h-64 relative">
                  <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-amber-500">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-gray-900">{product.price.toFixed(2)} KWD</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-2.5 px-4 rounded transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </a>
              <a href="#" aria-current="page" className="z-10 bg-amber-400 border-amber-400 text-gray-900 relative inline-flex items-center px-4 py-2 border text-sm font-bold">
                1
              </a>
              <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                2
              </a>
              <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                8
              </a>
              <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                9
              </a>
              <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                10
              </a>
              <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
