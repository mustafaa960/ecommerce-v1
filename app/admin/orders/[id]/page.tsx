import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, User, MapPin, Receipt, Clock } from "lucide-react";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export default async function AdminOrderDetailsPage(
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    const supabase = await createClient();

    const { data: order, error } = await supabase
        .from("orders")
        .select(`
            *,
            order_items (
                id,
                quantity,
                price_at_time,
                product_id,
                products (
                    name,
                    image,
                    brand
                )
            )
        `)
        .eq("id", params.id)
        .single();

    if (error || !order) {
        return notFound();
    }

    const items = order.order_items || [];
    const totalAmount = Number.parseFloat(order.total_amount);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-4">
                <Link
                    href="/admin/orders"
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Orders
                </Link>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        Order #{order.id.split('-')[0]}
                    </h1>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {new Date(order.created_at).toLocaleString()}
                        </span>
                        <span>•</span>
                        <span>Full ID: <span className="font-mono text-gray-400">{order.id}</span></span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-600">Current Status:</span>
                    <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Items */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                            <Package className="w-5 h-5 text-gray-500" />
                            <h2 className="text-lg font-bold text-gray-900">Items Ordered ({items.length})</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {items.map((item: any) => {
                                const p = item.products || {};
                                return (
                                    <div key={item.id} className="p-6 flex items-start gap-4">
                                        <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                                            {p.image ? (
                                                <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                                            ) : (
                                                <Package className="w-8 h-8 text-gray-300" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-bold text-gray-900 truncate">{p.name || 'Unknown Product'}</h3>
                                            {p.brand && <p className="text-sm text-gray-500 mt-1">{p.brand}</p>}
                                            <div className="mt-3 flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-sm">
                                                    <span className="text-gray-500">Qty: <span className="font-semibold text-gray-900">{item.quantity}</span></span>
                                                    <span className="text-gray-300">|</span>
                                                    <span className="text-gray-500">Price: <span className="font-semibold text-gray-900">{Number(item.price_at_time).toFixed(2)} KWD</span></span>
                                                </div>
                                                <span className="font-bold text-gray-900">
                                                    {(item.quantity * item.price_at_time).toFixed(2)} KWD
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer & Details */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-gray-500" /> Customer
                        </h2>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-gray-500 mb-1">Name</p>
                                <p className="font-medium text-gray-900">{order.customer_name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Email</p>
                                <a href={`mailto:${order.customer_email}`} className="font-medium text-blue-600 hover:underline break-all">
                                    {order.customer_email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-gray-500" /> Shipping
                        </h2>
                        <p className="text-sm font-medium text-gray-900 leading-relaxed whitespace-pre-wrap">
                            {order.shipping_address || "No address provided."}
                        </p>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Receipt className="w-5 h-5 text-gray-500" /> Payment Summary
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{totalAmount.toFixed(2)} KWD</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-center">
                                <span className="font-bold text-gray-900">Total Paid</span>
                                <span className="text-xl font-black text-amber-500">{totalAmount.toFixed(2)} KWD</span>
                            </div>
                            {order.stripe_payment_intent_id && (
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 font-mono break-all">
                                        Stripe ID: {order.stripe_payment_intent_id}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
