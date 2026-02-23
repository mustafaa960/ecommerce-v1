"use client";

import { useState } from "react";
import { Star, Heart, ShoppingCart, PlayCircle, Minus, Plus, Zap, Gauge, Scale, Settings, CheckCircle2 } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

interface ProductDetailViewProps {
    product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
    const { addItem } = useCart();
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        addItem(product, quantity);
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6 lg:p-10 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="flex flex-col gap-6">
                    <div className="relative group aspect-[4/3] w-full bg-white rounded-lg border border-gray-200 flex items-center justify-center p-8 overflow-hidden">
                        <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">In Stock</span>
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${isFavorite ? "bg-red-50 text-red-500" : "bg-gray-100 hover:bg-gray-200 text-gray-500"}`}
                        >
                            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                        </button>
                        <img
                            src={selectedImage}
                            alt={product.name}
                            className="object-contain w-full h-full mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    {product.thumbnails && product.thumbnails.length > 0 && (
                        <div className="grid grid-cols-5 gap-3">
                            {[product.image, ...product.thumbnails].slice(0, 5).map((thumb, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(thumb)}
                                    className={`aspect-square bg-white border ${selectedImage === thumb ? 'border-amber-400 border-2' : 'border-gray-200'} rounded-md p-1 overflow-hidden hover:border-gray-400 transition-colors`}
                                >
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
                            <button
                                onClick={decrementQuantity}
                                className="p-3 text-gray-500 hover:text-amber-500 transition-colors"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="w-12 text-center border-none p-0 text-gray-900 bg-transparent focus:ring-0 font-semibold"
                            />
                            <button
                                onClick={incrementQuantity}
                                className="p-3 text-gray-500 hover:text-amber-500 transition-colors"
                                aria-label="Increase quantity"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
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
    );
}
