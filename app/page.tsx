import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { getProducts, getCategories } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export default async function Home() {
    const products = await getProducts();
    const categories = await getCategories();
    const bestDeals = products.slice(0, 4);

    return (
        <main className="container mx-auto px-4 py-8 space-y-12">
            {/* Hero Section */}
            <section className="relative rounded-2xl overflow-hidden bg-gray-900 h-[400px] shadow-lg group">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBw6PyJYoF_vwMe4bF1WNVFOQ3GmBZJHOi8lJ_k9Z4YpbLmUcJ43lPAPM7L59hLBaeVgdFDE-VAkn2FZ3fQVfVecuvVUaUC7HjGEaC12LgJ02tucz3tt62TfivyqMBrmvr-NoUrnoXuRbvpa8BIDAcnYYhMooEL9Z4vuZfXCxg6fJuJzcEmaG_6k7SI4cK6VwI3UuhJq2pBoIaAMxD5qQeWttl71mmhDy18B_tUhMilsFJNAOb5eDk8_5aln8P-9qsJCt6_yPwYcwzX')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
                </div>
                <div className="relative h-full flex items-center px-8 md:px-16">
                    <div className="max-w-xl space-y-6">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
                            Limited Time Offer
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                            Unbeatable Industrial Power.<br />
                            <span className="text-amber-400">Shop Bosch & Makita.</span>
                        </h1>
                        <p className="text-lg text-gray-300">
                            Equip your workshop with the best. Up to 40% Off Select Professional Tools.
                        </p>
                        <Link href="/products" className="inline-block bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-8 py-3 rounded-lg transform transition-all hover:-translate-y-1 shadow-lg hover:shadow-amber-500/50">
                            Shop Now
                        </Link>
                    </div>
                </div>
                <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                    <div className="w-8 h-1 bg-amber-400 rounded-full"></div>
                    <div className="w-2 h-1 bg-white/50 rounded-full"></div>
                    <div className="w-2 h-1 bg-white/50 rounded-full"></div>
                </div>
            </section>

            {/* Categories */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Explore Popular Categories</h2>
                    <Link href="/products" className="text-amber-500 hover:text-amber-600 font-medium text-sm flex items-center">
                        View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            href={`/products?category=${encodeURIComponent(cat.name)}`}
                            className="group flex flex-col items-center gap-3"
                        >
                            <div className="w-24 h-24 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-amber-400/50 transition-all">
                                <img src={cat.icon} alt={cat.name} className="w-12 h-12 opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-amber-500 transition-colors text-center">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Best Deals */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Today&apos;s Best Deals</h2>
                        <p className="text-gray-500 text-sm mt-1">Don&apos;t miss out on daily discounts</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bestDeals.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Banner */}
            <section className="relative rounded-2xl overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-gray-800">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYiMTDN9KSu3Fr0tWpmUb1z_ttSM7BHdzWrBKPtOF5OBCVM_zcxvf_L8GDm_Ja1uT00Xaq1muIJL6yG4WfknY2_XFhHcWZGi0V-lqt0STI_stBa-38fPmDCHLyMh1dyQL-cHaqjMPXRY9R6rnLBlflKjRMbvIXGghqYco-7cF6Tl-QxohxL9MM2m6aQ8W6frM3_aqxhFkJIr_o-V4x4I7hLINcuTFTshH551nURon4wBzFIjWCI9XLDz7b-kFOBWLa_083wA2-mfAP" alt="Workshop banner" className="object-cover w-full h-full opacity-40" />
                </div>
                <div className="relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-6">
                    <div className="max-w-xl">
                        <span className="text-amber-400 font-bold tracking-wider text-sm mb-2 block uppercase">Professional Grade</span>
                        <h2 className="text-3xl font-bold text-white mb-3">INDUSTRIAL STRENGTH SAVINGS</h2>
                        <p className="text-gray-200 text-lg">Equip Your Workshop for Less! Get exclusive discounts on bulk orders.</p>
                    </div>
                    <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-8 py-3 rounded-lg shadow-lg whitespace-nowrap transition-transform hover:scale-105">
                        Shop Deals
                    </button>
                </div>
            </section>

            {/* New Arrivals */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
                    <Link href="/products" className="text-gray-500 hover:text-amber-500 transition-colors text-sm flex items-center">
                        See All <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
                    <div className="flex-shrink-0 bg-white rounded-lg border border-gray-200 px-8 py-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                        <span className="font-bold text-xl text-gray-800">BOSCH</span>
                    </div>
                    <div className="flex-shrink-0 bg-white rounded-lg border border-gray-200 px-8 py-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                        <span className="font-bold text-xl italic text-teal-600">Makita</span>
                    </div>
                    <div className="flex-shrink-0 bg-white rounded-lg border border-gray-200 px-8 py-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                        <span className="font-black text-xl bg-yellow-400 text-black px-1">DEWALT</span>
                    </div>
                    <div className="flex-shrink-0 bg-white rounded-lg border border-gray-200 px-8 py-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                        <span className="font-bold text-xl text-red-600">Milwaukee</span>
                    </div>
                    <div className="flex-shrink-0 bg-white rounded-lg border border-gray-200 px-8 py-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                        <span className="font-bold text-xl text-blue-800">Kobalt</span>
                    </div>
                    <div className="flex-shrink-0 bg-white rounded-lg border border-gray-200 px-8 py-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                        <span className="font-bold text-xl text-red-500">CRAFTSMAN</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg8VOLL2t6AweLtJpk2AXvZn8RTSYRUCo83NN4fLOpdC6iM7dmr0yC55fMpCmSG_MDIBvIhZXSYrbzduQrAOgTsNONPCJgZjJaCclFnWuHG7Edwz-zJuMGUn2Gj2FTJTwZdLKRp2zwvS_Ms1Np4UiduWiUUPRDPHouKDoV09CQxfGDCZXFDaafiivUcOuDBy4QbzH-1Ubm-7rJVsZ5SxY7sXAQ7pM2Jo7mUwNiiMKkNo8uyZz6_pdnHJZGMB0uHn6rI60oeNoctWN1" alt="Router" className="w-32 h-32 object-cover rounded-lg mix-blend-multiply" />
                        <div>
                            <span className="text-xs font-bold text-amber-500 uppercase tracking-wide">Featured</span>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">Precision Routers</h3>
                            <p className="text-gray-500 text-sm mt-2 mb-4">High performance wood routers for professional carpentry.</p>
                            <Link href="/products" className="text-sm font-semibold underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-500 transition-colors">View Collection</Link>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfn9MXPcXFWw37P55pq4Jrk8qr2557831aA5wsYNTZ65aZDeDu5rF6cRAIdhOSCG-jniNFOzC5HBbJsGYAHAOt9Ueds_IU25iCG95x1P3PWeNQ72fLY9i_reCDpG-aKvx24oN_p7V-HTH6kHFBXPvLWgUbN_mATqwCRgupZUyIM3Dwoi1y8NxoycT_5j42PSNdja36UNpr3Gmq6C1xDKu0HzbjQvvGbw2uJp8SnPnqNnkjHcDAsLZcYF6enXxxS1TsN1SQl3T9sv9b" alt="Sander" className="w-32 h-32 object-cover rounded-lg mix-blend-multiply" />
                        <div>
                            <span className="text-xs font-bold text-amber-500 uppercase tracking-wide">New Launch</span>
                            <h3 className="text-xl font-bold text-gray-900 mt-1">Orbital Sanders</h3>
                            <p className="text-gray-500 text-sm mt-2 mb-4">Dust-free sanding solutions with advanced vibration control.</p>
                            <Link href="/products" className="text-sm font-semibold underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-500 transition-colors">View Collection</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
