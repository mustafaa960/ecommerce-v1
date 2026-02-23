import { getCategories } from "@/lib/data";
import CategoryManager from "@/components/admin/CategoryManager";

export default async function AdminCategoriesPage() {
    const categories = await getCategories();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                <p className="text-gray-500 mt-2">Manage the categories available on the store.</p>
            </div>

            <CategoryManager initialCategories={categories} />
        </div>
    );
}
