import Link from "next/link";
import { ChevronRight, Star, Heart, ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { products } from "@/lib/data";

export default function CartPage() {
  const cartItems = products.slice(0, 3);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shipping = 10.00;
  const tax = 0.00;
  const total = subtotal + shipping + tax;

  return (
    <main className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 space-y-6">
          <div className="hidden sm:flex justify-between items-center text-sm font-medium text-gray-500 border-b border-gray-200 pb-2">
            <span>Items</span>
            <span className="mr-32">Quantity</span>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-lg flex items-center justify-center p-2 border border-gray-200 shrink-0">
                <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <div className="flex items-center gap-1 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(item.rating) ? "fill-current text-amber-400" : "text-gray-300"}`} />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({item.reviews} reviews)</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900 mt-2">{item.price.toFixed(2)} KWD</p>
                    <p className="text-sm text-green-600 mt-1">In Stock</p>
                  </div>
                  <div className="flex items-center gap-6 self-end sm:self-center">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-900"><Minus className="w-4 h-4" /></button>
                      <input type="text" value="1" readOnly className="w-10 text-center border-none p-1 text-sm bg-transparent focus:ring-0" />
                      <button className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-900"><Plus className="w-4 h-4" /></button>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors" title="Remove Item">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <button className="text-sm font-medium text-gray-500 hover:text-red-500 underline decoration-1 underline-offset-4 transition-colors">
              Remove all items
            </button>
          </div>
        </div>

        <div className="lg:w-[380px] shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:sticky lg:top-28">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-medium text-gray-900">{subtotal.toFixed(2)} KWD</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping Estimate</span>
                <span className="font-medium text-gray-900">{shipping.toFixed(2)} KWD</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax</span>
                <span className="font-medium text-gray-900">{tax.toFixed(2)} KWD</span>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>{total.toFixed(2)} KWD</span>
              </div>
            </div>
            <button className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3.5 rounded-lg mt-8 transition-colors shadow-md hover:shadow-lg flex justify-center items-center gap-2">
              <span>Proceed to Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-xs text-gray-500">We accept</p>
              <div className="flex gap-3 opacity-70 grayscale hover:grayscale-0 transition-all">
                <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                <div className="h-6 w-10 bg-gray-200 rounded flex items-center justify-center text-[8px] font-bold">KNET</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16 border-t border-gray-200 pt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">You might also like</h2>
            <p className="text-gray-500 mt-1">Customers who bought these items also bought</p>
          </div>
          <Link href="/products" className="text-amber-500 hover:text-amber-600 font-medium flex items-center gap-1 text-sm">
            See all
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(4, 8).map((product) => (
            <div key={product.id} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 relative flex flex-col">
              <button className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors z-10">
                <Heart className="w-5 h-5" />
              </button>
              <Link href={`/products/${product.id}`} className="aspect-square bg-white rounded-lg mb-4 flex items-center justify-center p-4 overflow-hidden">
                <img src={product.image} alt={product.name} className="object-contain max-h-full group-hover:scale-110 transition-transform duration-300 mix-blend-multiply" />
              </Link>
              <div className="flex-1 flex flex-col">
                <Link href={`/products/${product.id}`}>
                  <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 h-10 hover:text-amber-500">{product.name}</h4>
                </Link>
                <div className="flex items-center gap-1 mt-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-current text-amber-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-bold text-lg text-gray-900">{product.price.toFixed(2)} KWD</span>
                  <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-amber-500 hover:bg-amber-400 hover:text-gray-900 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
