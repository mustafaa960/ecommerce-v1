import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProducts, getCategories, getProductsCount } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { Pagination } from "@/components/Pagination";

export default async function ProductsPage(props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const search = typeof searchParams?.search === "string" ? searchParams.search : undefined;
    const category = typeof searchParams?.category === "string" ? searchParams.category : undefined;
    const brand = typeof searchParams?.brand === "string" ? searchParams.brand : undefined;
    const sort = typeof searchParams?.sort === "string" ? searchParams.sort : undefined;
    const page = typeof searchParams?.page === "string" ? parseInt(searchParams.page) : 1;
    const pageSize = 6;

    const products = await getProducts({ search, category, brand, sort, page, pageSize });
    const totalCount = await getProductsCount({ search, category, brand });
    const categories = await getCategories();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <nav className="text-xs text-gray-500 mb-2">
                        <ol className="list-none p-0 inline-flex">
                            <li className="flex items-center">
                                <Link href="/" className="hover:text-amber-500">Home</Link>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="flex items-center text-gray-800 font-medium">
                                {category || "All Products"}
                            </li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {search ? `Results for "${search}"` : category || "All Products"}
                        <span className="text-lg font-normal text-gray-500 align-middle ml-2">({totalCount} results)</span>
                    </h1>
                </div>
                <ProductFilters initialSort={sort || "relevant"} type="sort" />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <ProductFilters
                    type="sidebar"
                    categories={categories}
                    activeCategory={category}
                    activeBrand={brand}
                />

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center">
                                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                                <Link href="/products" className="text-amber-500 font-medium hover:underline mt-2 inline-block">
                                    Clear all filters
                                </Link>
                            </div>
                        )}
                    </div>

                    <Pagination
                        totalCount={totalCount}
                        pageSize={pageSize}
                        currentPage={page}
                    />
                </div>
            </div>
        </div>
    );
}
