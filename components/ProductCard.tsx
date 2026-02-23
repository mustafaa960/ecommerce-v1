"use client";

import Link from "next/link";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

interface ProductCardProps {
    product: Product;
    className?: string;
}

import { useWishlist } from "@/lib/wishlist-context";

export function ProductCard({ product, className = "" }: ProductCardProps) {
    const { addItem } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isFavorite = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, 1);
        alert(`${product.name} added to cart!`);
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    return (
        <div className={`bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all group relative flex flex-col h-full ${className}`}>
            <div className="absolute top-4 right-4 z-10">
                <button
                    onClick={handleToggleFavorite}
                    className={`transition-colors ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                </button>
            </div>

            {product.discount && (
                <span className="absolute top-4 left-4 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded z-10">
                    -{product.discount}%
                </span>
            )}

            {product.isNew && (
                <span className="absolute top-4 left-4 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded z-10">
                    New
                </span>
            )}

            <Link href={`/products/${product.id}`} className="aspect-square w-full mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain h-4/5 w-4/5 group-hover:scale-110 transition-transform duration-300 mix-blend-multiply"
                />
            </Link>

            <div className="space-y-2 flex-1">
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-amber-500 min-h-[2.5rem] leading-tight text-sm">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center text-xs text-amber-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`} />
                    ))}
                    <span className="text-gray-500 ml-1">({product.reviews})</span>
                </div>

                <div className="flex items-end gap-2 pt-1">
                    <span className="text-lg font-bold text-gray-900">{product.price.toFixed(2)} KWD</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through mb-0.5">
                            {product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>

            <button
                onClick={handleAddToCart}
                className="w-full mt-4 bg-gray-100 hover:bg-amber-400 text-gray-900 font-medium py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
            >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
            </button>
        </div>
    );
}
