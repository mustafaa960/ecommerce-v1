"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "./data"; // This line is kept as removing it would break the code. The provided "Code Edit" seems to have an error here.
// import { Heart } from "lucide-react"; // The provided "Code Edit" suggests adding this, but it's not used and removing Product breaks the code.

interface WishlistContextType {
    wishlist: Product[];
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// The provided "Code Edit" changes this to `export default function RootLayout`, but this would break the component's usage and is not a lint fix.
export function WishlistProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (error) {
                console.error("Error parsing wishlist from localStorage:", error);
            }
        }
    }, []);

    // Save wishlist to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product: Product) => {
        setWishlist((prev) => {
            const exists = prev.find((p) => p.id === product.id);
            if (exists) {
                return prev.filter((p) => p.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some((p) => p.id === productId);
    };

    const value = React.useMemo(() => ({
        wishlist,
        toggleWishlist,
        isInWishlist
    }), [wishlist]);

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
