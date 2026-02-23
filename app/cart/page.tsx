"use client";

import Link from "next/link";
import { ChevronRight, Star, ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setRecommendedProducts);
  }, []);

  const shipping = 10;
  const tax = 0;
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

          {items.length === 0 ? (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 mb-6">Your cart is empty</p>
              <Link href="/products" className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors inline-block">
                Start Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-lg flex items-center justify-center p-2 border border-gray-200 shrink-0">
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <div className="flex items-center gap-1 my-1">
                        {[...new Array(5)].map((_, i) => (
                          <Star key={`star-${i}`} className={`w-3.5 h-3.5 ${i < Math.floor(item.rating) ? "fill-current text-amber-400" : "text-gray-300"}`} />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({item.reviews} reviews)</span>
                      </div>
                      <p className="text-xl font-bold text-gray-900 mt-2">{item.price.toFixed(2)} KWD</p>
                      <p className="text-sm text-green-600 mt-1">In Stock</p>
                    </div>
                    <div className="flex items-center gap-6 self-end sm:self-center">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-900"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input type="text" value={item.quantity} readOnly className="w-10 text-center border-none p-1 text-sm bg-transparent focus:ring-0" />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors text-gray-900"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to remove all items?")) {
                    items.forEach(item => removeItem(item.id));
                  }
                }}
                className="text-sm font-medium text-gray-500 hover:text-red-500 underline decoration-1 underline-offset-4 transition-colors"
              >
                Remove all items
              </button>
            </div>
          )}
        </div>

        <div className="lg:w-[380px] shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:sticky lg:top-28">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
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
            <Link href="/checkout" className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3.5 rounded-lg mt-8 transition-colors shadow-md hover:shadow-lg flex justify-center items-center gap-2">
              <span>Proceed to Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
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
          {recommendedProducts.slice(4, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
