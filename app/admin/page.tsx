"use client";

import { Package, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div>
            <div className="mb-8 block">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2">Welcome back. Here is what is happening with your store today.</p>
            </div>

            {/* High-level metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                        <div className="p-2 bg-green-50 rounded-lg">
                            <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mt-4">0.00 KWD</p>
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +0% from last month
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-500 text-sm font-medium">Active Orders</h3>
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <ShoppingCart className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mt-4">0</p>
                    <p className="text-sm text-gray-500 mt-2">Pending fulfillment</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <Package className="w-5 h-5 text-amber-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mt-4">8</p>
                    <p className="text-sm text-gray-500 mt-2">In your catalog</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to start selling?</h2>
                <p className="text-gray-500">Your dashboard is currently empty. Orders will appear here once customers checkout.</p>
            </div>
        </div>
    );
}
