"use client";

import Link from "next/link";
import { ChevronRight, Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/lib/wishlist-context";

export default function FavoritesPage() {
    const { wishlist } = useWishlist();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <nav className="text-xs text-gray-500 mb-2">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <Link href="/" className="hover:text-amber-500">Home</Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="flex items-center text-gray-800 font-medium">
                            Favorites
                        </li>
                    </ol>
                </nav>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <Heart className="w-8 h-8 text-red-500 fill-current" />
                    My Favorites
                    <span className="text-lg font-normal text-gray-500 align-middle ml-2">({wishlist.length} items)</span>
                </h1>
            </div>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="py-24 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-10 h-10 text-gray-300" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your favorites list is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Explore our collection and save the tools you love to find them easily later.
                    </p>
                    <Link
                        href="/products"
                        className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all shadow-md hover:shadow-amber-500/20"
                    >
                        Start Shopping
                    </Link>
                </div>
            )}
        </div>
    );
}
