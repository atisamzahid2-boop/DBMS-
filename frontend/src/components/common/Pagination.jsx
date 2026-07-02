import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, paginationRange, onPageChange }) {
  if (!paginationRange || totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between px-2 py-3">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Page <span className="font-medium text-slate-700 dark:text-slate-200">{currentPage}</span> of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft size={16} />
        </button>
        {paginationRange.map((page, idx) =>
          page === '...' ? (
            <span key={`dots-${idx}`} className="px-2 text-slate-400 text-sm">…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[36px] h-9 text-sm font-medium rounded-xl transition ${
                page === currentPage
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}
