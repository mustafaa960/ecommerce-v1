"use client";

import Link from "next/link";
import { Search, MapPin, ShoppingCart, User, Menu, Heart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { useAuth } from "@/lib/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function Header() {
    const { totalItems } = useCart();
    const { wishlist } = useWishlist();
    const { user, isAdmin, signOut, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

    useEffect(() => {
        setSearchQuery(searchParams.get("search") || "");
    }, [searchParams]);

    const handleSearch = (e?: React.SyntheticEvent) => {
        e?.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push("/products");
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
                <Link href="/" className="flex-shrink-0">
                    <span className="text-2xl font-bold tracking-tight text-gray-900">
                        STEEL<span className="text-amber-400 text-lg font-normal">.com.kw</span>
                    </span>
                </Link>
                <div className="flex-1 max-w-2xl mx-auto hidden md:block">
                    <form onSubmit={handleSearch} className="relative flex items-center">
                        <input
                            className="w-full pl-4 pr-12 py-2.5 rounded-l-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                            placeholder="Search for tools, brands, or categories..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium px-6 py-2.5 rounded-r-lg absolute right-0 top-0 bottom-0 flex items-center justify-center transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                </div>
                <div className="flex items-center space-x-6 text-sm font-medium">
                    <div className="hidden lg:flex items-center gap-2 hover:text-amber-500 transition-colors cursor-pointer">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div className="flex flex-col leading-tight">
                            <span className="text-xs text-gray-500 font-normal">Deliver to</span>
                            <span>Kuwait City</span>
                        </div>
                    </div>
                    <Link href="/cart" className="flex items-center gap-2 hover:text-amber-500 transition-colors relative group">
                        <div className="relative">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {totalItems}
                            </span>
                        </div>
                        <span className="hidden sm:inline">Cart</span>
                    </Link>
                    <Link href="/favorites" className="flex items-center gap-2 hover:text-amber-500 transition-colors relative group">
                        <div className="relative">
                            <Heart className="w-6 h-6" />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {wishlist.length}
                                </span>
                            )}
                        </div>
                        <span className="hidden sm:inline">Favorites</span>
                    </Link>

                    {!loading && user ? (
                        <div className="flex items-center gap-4">
                            {isAdmin && (
                                <Link href="/admin" className="text-amber-500 hover:text-amber-600 font-bold hidden sm:inline">
                                    Admin Panel
                                </Link>
                            )}
                            <div className="group relative">
                                <button className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                                    <User className="w-6 h-6" />
                                    <span className="hidden sm:inline truncate max-w-[100px]">{user.user_metadata?.first_name || 'Account'}</span>
                                </button>
                                <div className="absolute right-0 top-full pt-2 hidden group-hover:block w-48 z-50">
                                    <div className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-1">
                                        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                            <p className="text-xs text-gray-500">Signed in as</p>
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={signOut}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login" className="flex items-center gap-2 hover:text-amber-500 transition-colors cursor-pointer">
                            <User className="w-6 h-6" />
                            <span className="hidden sm:inline">Sign In</span>
                        </Link>
                    )}

                    <button className="md:hidden p-1">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="border-t border-gray-200 hidden md:block">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center text-sm font-medium overflow-x-auto hide-scrollbar">
                        <div className="group relative py-3 pr-6 cursor-pointer border-r border-gray-100 mr-4">
                            <div className="flex items-center gap-2 text-gray-900 group-hover:text-amber-500 transition-colors">
                                <Menu className="w-5 h-5" />
                                <span>All Categories</span>
                            </div>
                        </div>
                        <ul className="flex items-center space-x-8 whitespace-nowrap">
                            <li><Link href="/products?category=Power Tools" className="block py-3 hover:text-amber-500 transition-colors">Power Tools</Link></li>
                            <li><Link href="/products?category=Hand Tools" className="block py-3 hover:text-amber-500 transition-colors">Hand Tools</Link></li>
                            <li><Link href="/products?category=Storage" className="block py-3 hover:text-amber-500 transition-colors">Storage Solutions</Link></li>
                            <li><Link href="/products?category=Safety Gear" className="block py-3 hover:text-amber-500 transition-colors">Safety Gear</Link></li>
                            <li><Link href="/products" className="block py-3 hover:text-amber-500 transition-colors">Brands</Link></li>
                            <li><Link href="/products?sort=newest" className="block py-3 text-red-500 hover:text-red-600 font-semibold transition-colors">Deals</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
