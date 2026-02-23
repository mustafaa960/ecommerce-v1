import type { Metadata } from 'next';
import './globals.css'; // Global styles
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { AuthProvider } from '@/lib/auth-context';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'STEEL.com.kw - Industrial Tools Store',
  description: 'Equip your workshop with the best industrial tools.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <div className="flex-1">
                {children}
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
