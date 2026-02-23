"use client";

import { useState, useRef, useEffect } from "react";
import { updateOrderStatus } from "@/app/admin/orders/actions";
import { Loader2, ChevronDown, Check } from "lucide-react";

interface OrderStatusSelectProps {
    orderId: string;
    currentStatus: string;
}

const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'text-amber-700 bg-amber-100 border-amber-200' },
    { value: 'processing', label: 'Processing', color: 'text-blue-700 bg-blue-100 border-blue-200' },
    { value: 'shipped', label: 'Shipped', color: 'text-indigo-700 bg-indigo-100 border-indigo-200' },
    { value: 'delivered', label: 'Delivered', color: 'text-emerald-700 bg-emerald-100 border-emerald-200' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-rose-700 bg-rose-100 border-rose-200' },
];

export default function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
    const [status, setStatus] = useState(currentStatus);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleStatusChange = async (newStatus: string) => {
        setIsOpen(false);
        if (newStatus === status) return;

        setStatus(newStatus);
        setIsUpdating(true);

        const result = await updateOrderStatus(orderId, newStatus);

        if (result.error) {
            alert(`Failed to update status: ${result.error}`);
            setStatus(currentStatus);
        }

        setIsUpdating(false);
    };

    const currentOption = statusOptions.find(opt => opt.value === status) || statusOptions[0];

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={isUpdating}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm transition-all hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed ${currentOption.color}`}
            >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : currentOption.label}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-1 p-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleStatusChange(option.value)}
                                className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${status === option.value ? "bg-gray-50 text-gray-900" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                role="menuitem"
                            >
                                <span className={`flex items-center gap-2`}>
                                    <span className={`w-2 h-2 rounded-full ${option.color.split(' ')[1]}`}></span> {/* little dot indicator */}
                                    {option.label}
                                </span>
                                {status === option.value && <Check className="w-4 h-4 text-gray-900" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
