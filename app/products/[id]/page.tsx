import Link from "next/link";
import { ChevronRight, Star, Heart, ShoppingCart, PlayCircle, Plus } from "lucide-react";
import { getProductById, getProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/ProductDetailView";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const products = await getProducts();
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

      <ProductDetailView product={product} />

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
