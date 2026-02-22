import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'STEEL.com.kw - Industrial Tools Store',
  description: 'Equip your workshop with the best industrial tools.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
