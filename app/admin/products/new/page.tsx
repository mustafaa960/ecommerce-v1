import ProductForm from "@/components/admin/ProductForm";
import { PackagePlus } from "lucide-react";
import Link from "next/link";
import { getCategories, getBrands } from "@/lib/data";

export default async function NewProductPage() {
    const categories = await getCategories();
    const brands = await getBrands();
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                >
                    &larr; Back to Products
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                        <PackagePlus className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                        <p className="text-gray-500 mt-1">Fill in the details to add a new item to your catalog.</p>
                    </div>
                </div>

                <ProductForm categories={categories} brands={brands} />
            </div>
        </div>
    );
}
