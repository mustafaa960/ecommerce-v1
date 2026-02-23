"use client";

import { useState } from "react";
import { Category } from "@/lib/data";
import { addCategory, deleteCategory } from "@/app/admin/categories/actions";
import { Search, Plus, Trash2, Check, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
    const router = useRouter();
    const [categories, setCategories] = useState(initialCategories);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleAdd(formData: FormData) {
        setLoading(true);
        const result = await addCategory(formData);
        setLoading(false);

        if (result.success) {
            router.refresh(); // this will reload the server props, but we can also handle it locally
            // Reset form
            const form = document.getElementById("add-category-form") as HTMLFormElement;
            form?.reset();
        } else {
            alert(result.error || "Failed to add category");
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this category? Products linked to it might lose this relation.")) return;

        setDeletingId(id);
        const result = await deleteCategory(id);
        setDeletingId(null);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error);
        }
    }

    return (
        <div className="space-y-8">
            {/* Add New Category */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-amber-500" /> Add New Category
                </h2>
                <form id="add-category-form" action={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="name">
                            Category Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="e.g. Power Tools"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all"
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
                            placeholder="e.g. ⚡"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-2.5 px-6 rounded-lg transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap h-[46px]"
                    >
                        {loading ? "Adding..." : "Save Category"}
                    </button>
                </form>
            </div>

            {/* Categories List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Existing Categories</h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                        {initialCategories.length} Total
                    </span>
                </div>
                <div className="divide-y divide-gray-100">
                    {initialCategories.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No categories found. Create your first one above.</div>
                    ) : (
                        initialCategories.map(category => (
                            <div key={category.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-xl text-amber-600 border border-amber-100 uppercase font-bold">
                                        {/* If it starts with http it's an image, else render as text/emoji */}
                                        {category.icon.startsWith('http') ? (
                                            <img src={category.icon} alt={category.name} className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <span>{category.icon.substring(0, 2)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{category.name}</h3>
                                        <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {category.id}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    disabled={deletingId === category.id}
                                    title="Delete Category"
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
