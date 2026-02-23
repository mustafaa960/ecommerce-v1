import { getBrands } from "@/lib/data";
import BrandManager from "@/components/admin/BrandManager";

export default async function AdminBrandsPage() {
    const brands = await getBrands();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Brands</h1>
                <p className="text-gray-500 mt-2">Manage the supply brands available on the store.</p>
            </div>

            <BrandManager initialBrands={brands} />
        </div>
    );
}
