"use client";

import { useState } from "react";
import { Brand } from "@/lib/data";
import { addBrand, deleteBrand } from "@/app/admin/brands/actions";
import { Search, Plus, Trash2, Check, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BrandManager({ initialBrands }: { initialBrands: Brand[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleAdd(formData: FormData) {
        setLoading(true);
        const result = await addBrand(formData);
        setLoading(false);

        if (result.success) {
            router.refresh();
            const form = document.getElementById("add-brand-form") as HTMLFormElement;
            form?.reset();
        } else {
            alert(result.error || "Failed to add brand");
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this brand? Products linked to it might lose this relation.")) return;

        setDeletingId(id);
        const result = await deleteBrand(id);
        setDeletingId(null);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error);
        }
    }

    return (
        <div className="space-y-8">
            {/* Add New Brand */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-indigo-500" /> Add New Brand
                </h2>
                <form id="add-brand-form" action={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="name">
                            Brand Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="e.g. Makita"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="icon">
                            Icon URL (or Emoji)
                        </label>
                        <input
                            id="icon"
                            name="icon"
                            type="text"
                            required
                            placeholder="e.g. 🛠️"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap h-[46px]"
                    >
                        {loading ? "Adding..." : "Save Brand"}
                    </button>
                </form>
            </div>

            {/* Brands List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Existing Brands</h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {initialBrands.length} Total
                    </span>
                </div>
                <div className="divide-y divide-gray-100">
                    {initialBrands.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No brands found. Create your first one above.</div>
                    ) : (
                        initialBrands.map(brand => (
                            <div key={brand.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl text-indigo-600 border border-indigo-100 uppercase font-bold overflow-hidden">
                                        {brand.icon.startsWith('http') ? (
                                            <img src={brand.icon} alt={brand.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{brand.icon.substring(0, 2)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{brand.name}</h3>
                                        <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {brand.id}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(brand.id)}
                                    disabled={deletingId === brand.id}
                                    title="Delete Brand"
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
