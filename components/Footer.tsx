import Link from "next/link";
import { Facebook, Instagram, Youtube, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">About Us</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Store Locations</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Sustainability</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Email Us</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Call Support</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Business Services</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Shipping & Returns</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Return Policy</Link></li>
              <li><Link href="#" className="hover:text-amber-500 transition-colors">Warranty Info</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">Payment Methods</h4>
            <div className="flex gap-4 items-center">
              <CreditCard className="w-8 h-8 text-gray-400" />
              <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">KNET</div>
            </div>
            <p className="text-xs text-gray-500 mt-4">Secure encrypted transactions.</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 STEEL.com.kw. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Facebook className="w-5 h-5" /></Link>
            <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Instagram className="w-5 h-5" /></Link>
            <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors"><Youtube className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
