import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, Tags, Briefcase } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-[calc(100vh-80px)] bg-gray-50 border-t border-gray-200">
            {/* Admin Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Store Admin</h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5 text-gray-500" />
                        Dashboard Overview
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <Package className="w-5 h-5 text-gray-500" />
                        Inventory & Products
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <ShoppingCart className="w-5 h-5 text-gray-500" />
                        Customer Orders
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <Tags className="w-5 h-5 text-gray-500" />
                        Categories
                    </Link>
                    <Link
                        href="/admin/brands"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <Briefcase className="w-5 h-5 text-gray-500" />
                        Brands
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors">
                        <LogOut className="w-5 h-5" />
                        Sign Out (Admin)
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
