"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Star } from "lucide-react";
import { Category } from "@/lib/data";

interface ProductFiltersProps {
    type: "sidebar" | "sort";
    categories?: Category[];
    activeCategory?: string;
    activeBrand?: string;
    initialSort?: string;
}

export function ProductFilters({
    type,
    categories,
    activeCategory,
    activeBrand,
    initialSort
}: ProductFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilters = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/products?${params.toString()}`);
    };

    if (type === "sort") {
        return (
            <div className="mt-4 md:mt-0 flex items-center">
                <label className="mr-2 text-sm text-gray-600" htmlFor="sort">Sort by:</label>
                <select
                    className="form-select block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-400 focus:border-amber-400 sm:text-sm rounded-md shadow-sm"
                    id="sort"
                    value={initialSort}
                    onChange={(e) => updateFilters("sort", e.target.value)}
                >
                    <option value="relevant">Most Relevant</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                </select>
            </div>
        );
    }

    return (
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>
                <h4 className="font-semibold text-gray-800 mb-3">Category</h4>
                <div className="space-y-2">
                    <button
                        onClick={() => updateFilters("category", null)}
                        className={`block text-sm transition-colors ${activeCategory ? 'text-gray-600 hover:text-amber-500' : 'font-bold text-amber-500'}`}
                    >
                        All Categories
                    </button>
                    {categories?.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => updateFilters("category", cat.name)}
                            className={`block text-sm transition-colors ${activeCategory === cat.name ? 'font-bold text-amber-500' : 'text-gray-600 hover:text-amber-500'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-gray-800 mb-3">Brand</h4>
                <div className="space-y-2">
                    {['Bosch', 'Makita', 'DeWalt', 'Milwaukee', 'Manino'].map((brand) => (
                        <button
                            key={brand}
                            onClick={() => updateFilters("brand", activeBrand === brand ? null : brand)}
                            className={`block text-sm transition-colors ${activeBrand === brand ? 'font-bold text-amber-500' : 'text-gray-600 hover:text-amber-500'}`}
                        >
                            {brand}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-gray-800 mb-3">Rating</h4>
                <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                        <button key={rating} className="flex items-center space-x-2 group">
                            <div className="flex text-amber-400 text-sm">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={`rating-${rating}-star-${i}`} className={`w-4 h-4 ${i < rating ? "fill-current" : "text-gray-300"}`} />
                                ))}
                            </div>
                            {rating < 5 && <span className="text-xs text-gray-500 group-hover:text-amber-500">& Up</span>}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
