import { Eye } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";
import Link from "next/link";

interface Order {
    id: string;
    created_at: string;
    status: string;
    total_amount: number;
    customer_name: string;
    customer_email: string;
}

export default async function AdminOrdersPage() {
    const supabase = await createClient();

    const { data: ordersData, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to load orders:", error);
    }

    // Explicit map to parse any string numbers
    const orders: Order[] = (ordersData || []).map((o: any) => ({
        ...o,
        total_amount: Number.parseFloat(o.total_amount),
    }));



    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                <p className="text-gray-500 mt-2">View and manage customer orders.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Total (KWD)</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No orders have been placed yet.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                            {order.id.split('-')[0]}...
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{order.customer_name}</div>
                                            <div className="text-xs text-gray-400">{order.customer_email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-gray-900">
                                            {order.total_amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <Link href={`/admin/orders/${order.id}`} className="text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                                                    <Eye className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
