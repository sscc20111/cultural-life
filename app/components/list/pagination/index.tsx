// components/list/Pagination.tsx
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex justify-center items-center gap-1.5">
            <button
                type="button"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded text-sm text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm ${
                        page === currentPage ? "bg-blue-600 text-white font-bold" : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    {page}
                </button>
            ))}
            <button
                type="button"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded text-sm text-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-100"
            >
                &gt;
            </button>
        </div>
    );
}