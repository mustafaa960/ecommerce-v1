"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { placeOrder } from "./actions";
import { ShieldCheck, Banknote, ChevronRight } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, subtotal, removeItem } = useCart();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
    });

    const shipping = 10;
    const total = subtotal + shipping;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (items.length === 0) return;

        setLoading(true);

        // Create the order in Supabase via Server Action
        // We do not pass a Stripe Payment Intent ID for Cash On Delivery
        const result = await placeOrder(formData, items, total);

        if (result.success) {
            // Clear cart
            items.forEach(item => removeItem(item.id));
            alert("Order placed successfully via Cash on Delivery! Redirecting to confirmation...");
            router.push("/");
        } else {
            alert("Failed to place order. Error: " + result.error);
        }

        setLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8">Add items to your cart before proceeding to checkout.</p>
                <button onClick={() => router.push('/products')} className="bg-amber-400 font-bold py-3 px-8 rounded-lg">Return to Shop</button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-24">
            {/* Checkout Header */}
            <header className="bg-white border-b border-gray-200 py-6">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">STEEL<span className="text-amber-500">.</span></h1>
                    <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                        <ShieldCheck className="w-5 h-5" />
                        Secure Checkout
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 lg:px-8 py-10 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column - Forms */}
                    <div className="flex-1 space-y-8">

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-gray-900 font-bold">Checkout Information</h2>
                                <p className="text-sm text-gray-500 mt-1">Please enter your shipping address to calculate final delivery timeframe.</p>
                            </div>
                        </div>

                        <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                                <span>Shipping Details</span>
                            </h2>

                            <div className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            id="name"
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            id="email"
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address (Kuwait)</label>
                                    <textarea
                                        id="address"
                                        required
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all resize-none"
                                        placeholder="Block, Street, House/Building Number, Area"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 my-8"></div>

                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                                <span>Payment Method</span>
                            </h2>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                                <div className="flex items-center gap-3">
                                    <Banknote className="w-6 h-6 text-green-600 shrink-0" />
                                    <div>
                                        <p className="font-bold text-green-800">Cash on Delivery</p>
                                        <p className="text-sm text-green-700 mt-1">
                                            Pay with cash when your order is delivered to your address. Online payments will be coming soon!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-amber-400 hover:bg-amber-500 disabled:bg-amber-200 disabled:cursor-not-allowed text-gray-900 font-bold py-4 rounded-lg mt-8 transition-colors flex justify-center items-center gap-2"
                            >
                                {loading ? "Processing..." : `Place Order (${total.toFixed(2)} KWD)`}
                                {!loading && <ChevronRight className="w-5 h-5" />}
                            </button>

                        </form>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:w-[400px] shrink-0">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden sticky top-6">
                            <div className="bg-gray-900 p-5 text-white">
                                <h2 className="text-lg font-bold">Order Summary</h2>
                                <p className="text-gray-400 text-sm mt-1">{items.reduce((acc, item) => acc + item.quantity, 0)} items</p>
                            </div>

                            <div className="p-6">
                                {/* Mini Cart Items */}
                                <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-6">
                                    {items.map(item => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-16 h-16 bg-gray-50 rounded border border-gray-100 p-1 shrink-0 flex items-center justify-center">
                                                <img src={item.image} alt={item.name} className="max-w-full max-h-full mix-blend-multiply" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                                                <div className="flex justify-between mt-1 items-center">
                                                    <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                                    <span className="text-sm font-bold text-gray-900">{(item.price * item.quantity).toFixed(2)} KWD</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-gray-900">{subtotal.toFixed(2)} KWD</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Shipping</span>
                                        <span className="font-medium text-gray-900">{shipping.toFixed(2)} KWD</span>
                                    </div>
                                    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>{total.toFixed(2)} KWD</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
