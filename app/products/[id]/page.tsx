import Link from "next/link";
import { ChevronRight, Star, Heart, ShoppingCart, PlayCircle, Minus, Plus, Zap, Gauge, Scale, Settings, CheckCircle2 } from "lucide-react";
import { products } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === id) || products[0];

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="flex mb-8 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-amber-500">Home</Link></li>
          <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
          <li><Link href="/products" className="hover:text-amber-500">Power Tools</Link></li>
          <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
          <li><Link href="/products" className="hover:text-amber-500">Grinders</Link></li>
          <li><ChevronRight className="w-4 h-4 text-gray-400" /></li>
          <li className="text-gray-900 font-medium truncate">{product.name}</li>
        </ol>
      </nav>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6 lg:p-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <div className="relative group aspect-[4/3] w-full bg-white rounded-lg border border-gray-200 flex items-center justify-center p-8 overflow-hidden">
              <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">In Stock</span>
              <button className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors z-10">
                <Heart className="w-5 h-5" />
              </button>
              <img src={product.image} alt={product.name} className="object-contain w-full h-full mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
            </div>
            
            {product.thumbnails && (
              <div className="grid grid-cols-5 gap-3">
                {product.thumbnails.map((thumb, i) => (
                  <button key={i} className={`aspect-square bg-white border ${i === 0 ? 'border-amber-400 border-2' : 'border-gray-200'} rounded-md p-1 overflow-hidden hover:border-gray-400 transition-colors`}>
                    <img src={thumb} alt={`Thumbnail ${i}`} className="w-full h-full object-contain" />
                  </button>
                ))}
                <button className="aspect-square bg-white flex items-center justify-center border border-gray-200 rounded-md hover:border-gray-400 transition-colors">
                  <PlayCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-1 text-sm font-semibold text-amber-500 uppercase tracking-wide">{product.brand}</div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">{product.rating} ({product.reviews} reviews)</span>
              <div className="h-4 w-px bg-gray-300"></div>
              <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Verified Supplier
              </span>
            </div>

            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-gray-900">{product.price.toFixed(2)} KWD</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through decoration-gray-400/50">{product.originalPrice.toFixed(2)} KWD</span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-2">Inclusive of all taxes</div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Disc Diameter</label>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 text-sm font-medium rounded-md bg-gray-900 text-white border-2 border-gray-900 shadow-sm">115 mm</button>
                  <button className="px-4 py-2 text-sm font-medium rounded-md bg-white text-gray-700 border border-gray-200 hover:border-amber-400 transition-colors">125 mm</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded-lg bg-white w-fit">
                <button className="p-3 text-gray-500 hover:text-amber-500 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <input type="text" value="1" readOnly className="w-12 text-center border-none p-0 text-gray-900 bg-transparent focus:ring-0 font-semibold" />
                <button className="p-3 text-gray-500 hover:text-amber-500 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mt-auto border-t border-gray-200 pt-6">
              <div className="flex items-start gap-2">
                <Zap className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <span className="block text-gray-500 text-xs">Rated Power</span>
                  <span className="font-medium text-gray-900">900 W</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Gauge className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <span className="block text-gray-500 text-xs">No-load Speed</span>
                  <span className="font-medium text-gray-900">11,500 rpm</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Scale className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <span className="block text-gray-500 text-xs">Weight</span>
                  <span className="font-medium text-gray-900">2.0 kg</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Settings className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <span className="block text-gray-500 text-xs">Switch</span>
                  <span className="font-medium text-gray-900">2-way</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button className="px-8 py-4 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Description</button>
            <button className="px-8 py-4 text-sm font-bold text-amber-500 border-b-2 border-amber-500">Specifications</button>
            <button className="px-8 py-4 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Reviews ({product.reviews})</button>
            <button className="px-8 py-4 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">Shipping</button>
          </div>
          <div className="p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-white p-4">
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Performance</span>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rated power input</span>
                  <span className="font-semibold text-gray-900">900 W</span>
                </div>
              </div>
              <div className="bg-white p-4">
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Dimensions</span>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Grinding spindle thread</span>
                  <span className="font-semibold text-gray-900">M 14</span>
                </div>
              </div>
              <div className="bg-white p-4">
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Speed</span>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">No-load speed</span>
                  <span className="font-semibold text-gray-900">11,500 rpm</span>
                </div>
              </div>
              <div className="bg-white p-4">
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Physical</span>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-semibold text-gray-900">2.0 kg</span>
                </div>
              </div>
              <div className="bg-white p-4">
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Capacity</span>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Disc diameter</span>
                  <span className="font-semibold text-gray-900">115 mm</span>
                </div>
              </div>
              <div className="bg-white p-4">
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Control</span>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Switch</span>
                  <span className="font-semibold text-gray-900">2-way</span>
                </div>
              </div>
              <div className="bg-white p-4">
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Output</span>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Power output</span>
                  <span className="font-semibold text-gray-900">450 W</span>
                </div>
              </div>
              <div className="bg-white p-4">
                <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Dimensions</span>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tool dimensions (L/W/H)</span>
                  <span className="font-semibold text-gray-900">280 x 73 x 100 mm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Frequently Bought Together</h3>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <img src={product.image} alt="Main Product" className="w-12 h-12 object-contain bg-white rounded border border-gray-200 mix-blend-multiply" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 truncate">This Item</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{product.name}</p>
                </div>
                <span className="text-sm font-bold text-gray-900">{product.price.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-center -my-2 z-10">
                <div className="bg-white rounded-full p-1 border border-gray-200 shadow-sm">
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input type="checkbox" defaultChecked className="absolute -top-1 -left-1 w-4 h-4 rounded text-amber-400 focus:ring-amber-400 border-gray-300" />
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxCEDF4bBFWliPI91jsitz_yQNb3O0le1V6k7uSFRqW9OhLetfehtu0EH5xH3fBai42bCJczQ9TUV2Ev9VoxZCWO9SuA2YYGh2Vr_HVXden8AEN3UW9yizSU-s2AsE1CYureZe7WmHJ22uBRCDcpUZ2JXxi4TyVZinwwFw53eGT_Fm6DHy9pIQd_QhjGgi4cjRGQPADmABtaZXdL0wnoPmjbTS4C_LpxqpEquWcLookDuVyo4yIEH4unpjMB4lDfgx6H17PcF28KJ8" alt="Accessory 1" className="w-16 h-16 object-contain bg-white rounded border border-gray-200 mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0">
                  <a href="#" className="text-sm font-medium text-gray-800 hover:text-amber-500 line-clamp-2">Bosch Expert Cutting Disc 115mm</a>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-gray-900">2.50 KWD</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center -my-2 z-10">
                <div className="bg-white rounded-full p-1 border border-gray-200 shadow-sm">
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <input type="checkbox" defaultChecked className="absolute -top-1 -left-1 w-4 h-4 rounded text-amber-400 focus:ring-amber-400 border-gray-300" />
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7fp18OoLI1oNoGn3_ja5Qo_ipBS2QcdY1etvg8aM0zvBXEPI0eCao2WIt-fWkXwXIqRUl3M8hm-gyl_kmmcGwCegRqohCzw_-q1zT8M5hjBd_TypPsApEkco_wxHNnSGHDdofZyfPvrzizq57p4UkbOgIGZ4SeT1vwtnMkF4RbB5GCgGKsPw93mWg5dc5FnJVUjixuVP9T2pfDBF-1pk9hdzBppzXqpITdxmbLv6eETKIeL9no3XPLpB6dWu7IDT_GtoxtqOw_-an" alt="Accessory 2" className="w-16 h-16 object-contain bg-white rounded border border-gray-200 mix-blend-multiply" />
                </div>
                <div className="flex-1 min-w-0">
                  <a href="#" className="text-sm font-medium text-gray-800 hover:text-amber-500 line-clamp-2">Pro Safety Gloves Cut Resistant L</a>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-gray-900">5.50 KWD</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-500">Total Price:</span>
                <span className="text-xl font-black text-gray-900">{(product.price + 2.5 + 5.5).toFixed(2)} KWD</span>
              </div>
              <button className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-lg shadow-sm transition-colors">
                Add all 3 to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
          <Link href="/products" className="text-sm font-medium text-amber-500 hover:underline flex items-center">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relProduct) => (
            <div key={relProduct.id} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 relative flex flex-col">
              <button className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-red-500 transition-colors z-10">
                <Heart className="w-5 h-5" />
              </button>
              <Link href={`/products/${relProduct.id}`} className="aspect-square bg-white rounded-lg mb-4 flex items-center justify-center p-4 overflow-hidden">
                <img src={relProduct.image} alt={relProduct.name} className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
              </Link>
              <div className="space-y-2 flex-1 flex flex-col">
                <div className="text-xs font-semibold text-gray-500 uppercase">{relProduct.brand}</div>
                <Link href={`/products/${relProduct.id}`} className="block text-sm font-bold text-gray-900 hover:text-amber-500 line-clamp-2 h-10">
                  {relProduct.name}
                </Link>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(relProduct.rating) ? "fill-current text-amber-400" : "text-gray-300"}`} />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({relProduct.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-lg font-bold text-gray-900">{relProduct.price.toFixed(2)} KWD</span>
                  <button className="p-2 bg-gray-900 text-white rounded-md hover:bg-amber-400 hover:text-gray-900 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
