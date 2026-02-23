"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface PaginationProps {
    totalCount: number;
    pageSize: number;
    currentPage: number;
}

export function Pagination({ totalCount, pageSize, currentPage }: PaginationProps) {
    const searchParams = useSearchParams();
    const totalPages = Math.ceil(totalCount / pageSize);

    if (totalPages <= 1) return null;

    const createPageUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `/products?${params.toString()}`;
    };

    const renderPageLinks = () => {
        const links = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            links.push(
                <Link
                    key={i}
                    href={createPageUrl(i)}
                    aria-current={i === currentPage ? "page" : undefined}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${i === currentPage
                            ? "z-10 bg-amber-400 border-amber-400 text-gray-900 font-bold"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                >
                    {i}
                </Link>
            );
        }
        return links;
    };

    return (
        <div className="mt-12 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Link
                    href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                        }`}
                >
                    <span className="sr-only">Previous</span>
                    <ChevronRight className="w-4 h-4 rotate-180" />
                </Link>

                {renderPageLinks()}

                <Link
                    href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
                        }`}
                >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </nav>
        </div>
    );
}
