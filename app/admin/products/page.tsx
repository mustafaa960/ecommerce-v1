import { Product, getProducts } from "@/lib/data";
import { Plus, Edit } from "lucide-react";
import Link from "next/link";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
    // Fetching all products for the admin panel (no pagination limit)
    let products: Product[] = [];
    try {
        products = await getProducts();
    } catch (error) {
        console.error("Failed to load products:", error);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500 mt-2">Manage your store's inventory and product details.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Brand</th>
                                <th className="px-6 py-4 text-right">Price (KWD)</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No products found. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white border border-gray-200 rounded p-1 shrink-0 flex items-center justify-center">
                                                <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                                            </div>
                                            <span className="font-medium text-gray-900">{product.name}</span>
                                        </td>
                                        <td className="px-6 py-4">{product.category}</td>
                                        <td className="px-6 py-4">{product.brand}</td>
                                        <td className="px-6 py-4 text-right font-medium text-gray-900">
                                            {product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                                    title="Edit Product"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <DeleteProductButton productId={product.id} productName={product.name} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
