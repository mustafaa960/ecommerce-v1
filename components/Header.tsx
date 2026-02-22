import Link from "next/link";
import { Search, MapPin, ShoppingCart, User, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex-shrink-0">
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            STEEL<span className="text-amber-400 text-lg font-normal">.com.kw</span>
          </span>
        </Link>
        <div className="flex-1 max-w-2xl mx-auto hidden md:block">
          <div className="relative flex items-center">
            <input
              className="w-full pl-4 pr-12 py-2.5 rounded-l-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
              placeholder="Search for tools, brands, or categories..."
              type="text"
            />
            <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium px-6 py-2.5 rounded-r-lg absolute right-0 top-0 bottom-0 flex items-center justify-center transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-6 text-sm font-medium">
          <div className="hidden lg:flex items-center gap-2 hover:text-amber-500 transition-colors cursor-pointer">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-gray-500 font-normal">Deliver to</span>
              <span>Kuwait City</span>
            </div>
          </div>
          <Link href="/cart" className="flex items-center gap-2 hover:text-amber-500 transition-colors relative group">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
            <span className="hidden sm:inline">Cart</span>
          </Link>
          <div className="flex items-center gap-2 hover:text-amber-500 transition-colors cursor-pointer">
            <User className="w-6 h-6" />
            <span className="hidden sm:inline">Sign In</span>
          </div>
          <button className="md:hidden p-1">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="border-t border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-sm font-medium overflow-x-auto hide-scrollbar">
            <div className="group relative py-3 pr-6 cursor-pointer border-r border-gray-100 mr-4">
              <div className="flex items-center gap-2 text-gray-900 group-hover:text-amber-500 transition-colors">
                <Menu className="w-5 h-5" />
                <span>All Categories</span>
              </div>
            </div>
            <ul className="flex items-center space-x-8 whitespace-nowrap">
              <li><Link href="/products" className="block py-3 hover:text-amber-500 transition-colors">Power Tools</Link></li>
              <li><Link href="/products" className="block py-3 hover:text-amber-500 transition-colors">Hand Tools</Link></li>
              <li><Link href="/products" className="block py-3 hover:text-amber-500 transition-colors">Storage Solutions</Link></li>
              <li><Link href="/products" className="block py-3 hover:text-amber-500 transition-colors">Safety Gear</Link></li>
              <li><Link href="/products" className="block py-3 hover:text-amber-500 transition-colors">Brands</Link></li>
              <li><Link href="/products" className="block py-3 text-red-500 hover:text-red-600 font-semibold transition-colors">Deals</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
