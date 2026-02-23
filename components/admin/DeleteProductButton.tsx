"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertCircle } from "lucide-react";
import { deleteProduct } from "@/app/admin/products/actions";
import { useRouter } from "next/navigation";

interface DeleteProductButtonProps {
    productId: string;
    productName: string;
}

export default function DeleteProductButton({ productId, productName }: DeleteProductButtonProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);

        const result = await deleteProduct(productId);

        if (result.error) {
            setError(result.error);
            setIsDeleting(false);
        } else if (result.success) {
            setShowConfirm(false);
            setIsDeleting(false);
            router.refresh();
        }
    };

    if (showConfirm) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-xs text-red-600 font-medium">Delete {productName}?</span>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors disabled:opacity-50 flex items-center gap-1"
                >
                    {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : "Yes"}
                </button>
                <button
                    onClick={() => {
                        setShowConfirm(false);
                        setError(null);
                    }}
                    disabled={isDeleting}
                    className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded transition-colors disabled:opacity-50"
                >
                    No
                </button>
                {error && <span className="text-xs text-red-500 absolute mt-8 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Error</span>}
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="text-gray-400 hover:text-red-600 transition-colors"
            title="Delete Product"
        >
            <Trash2 className="w-5 h-5" />
        </button>
    );
}
