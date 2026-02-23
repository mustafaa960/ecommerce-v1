import ProductForm from "@/components/admin/ProductForm";
import { Edit } from "lucide-react";
import Link from "next/link";
import { getProductById, getCategories, getBrands } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function EditProductPage(
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const [product, categories, brands] = await Promise.all([
        getProductById(params.id),
        getCategories(),
        getBrands()
    ]);

    if (!product) {
        notFound();
    }

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
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                        <Edit className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                        <p className="text-gray-500 mt-1">Modify the details of {product.name}.</p>
                    </div>
                </div>

                <ProductForm initialData={product} categories={categories} brands={brands} />
            </div>
        </div>
    );
}
