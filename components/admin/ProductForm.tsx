"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/app/admin/products/actions";
import { Product, Category, Brand } from "@/lib/data";
import { AlertCircle, Save, UploadCloud } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface ProductFormProps {
    initialData?: Product;
    categories: Category[];
    brands: Brand[];
}

export default function ProductForm({ initialData, categories, brands }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);

        let imageUrl = initialData?.image || "";

        if (imageFile) {
            const supabase = createClient();
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('product-images')
                .upload(filePath, imageFile);

            if (uploadError) {
                setError("Image Upload Failed: " + uploadError.message + ". You may need to create a 'product-images' public bucket in Supabase.");
                setLoading(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            imageUrl = publicUrl;
        }

        formData.set("image", imageUrl);

        let result;
        if (initialData) {
            result = await updateProduct(initialData.id, formData);
        } else {
            result = await createProduct(formData);
        }

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else if (result.success) {
            router.push("/admin/products");
            router.refresh();
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <form action={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start gap-3 border border-red-100">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="name">
                            Product Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            defaultValue={initialData?.name}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="brand">
                            Brand
                        </label>
                        <select
                            id="brand"
                            name="brand"
                            required
                            defaultValue={initialData?.brand || ""}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all cursor-pointer bg-white"
                        >
                            <option value="" disabled>Select a brand</option>
                            {brands.map(b => (
                                <option key={b.id} value={b.name}>{b.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="category_name">
                            Category Name
                        </label>
                        <select
                            id="category_name"
                            name="category_name"
                            required
                            defaultValue={initialData?.category || ""}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all cursor-pointer bg-white"
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="price">
                            Price (KWD)
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            defaultValue={initialData?.price}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="original_price">
                            Original Price (KWD - Optional)
                        </label>
                        <input
                            id="original_price"
                            name="original_price"
                            type="number"
                            step="0.01"
                            min="0"
                            defaultValue={initialData?.originalPrice}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="image">
                            Product Image
                        </label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-xl hover:border-amber-400 transition-colors bg-gray-50 flex items-center justify-center overflow-hidden h-32 group">
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                            ) : (
                                <div className="text-center">
                                    <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-amber-500 transition-colors" />
                                    <span className="text-sm font-medium text-gray-500 group-hover:text-amber-600">Drop an image or click to browse</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    defaultValue={initialData?.description}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all placeholder:text-gray-400 resize-none"
                />
            </div>

            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id="is_new"
                    name="is_new"
                    defaultChecked={initialData?.isNew}
                    className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="is_new" className="text-sm font-medium text-gray-700 font-semibold">
                    Mark as "New Arrival"
                </label>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={loading}
                    className="px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 px-8 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    {loading ? "Saving..." : "Save Product"}
                </button>
            </div>
        </form>
    );
}
