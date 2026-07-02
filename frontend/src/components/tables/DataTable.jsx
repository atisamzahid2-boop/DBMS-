import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

export default function DataTable({
  columns,
  data,
  loading,
  sortColumn,
  sortDirection,
  onSort,
  onRowClick,
  emptyMessage = 'No data found',
  actions,
}) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ${
                    col.sortable ? 'cursor-pointer select-none hover:text-slate-700 dark:hover:text-slate-200' : ''
                  } ${col.hidden ? 'hidden md:table-cell' : ''} ${col.className || ''}`}
                  onClick={() => col.sortable && onSort && onSort(col.key)}
                  style={col.width ? { width: col.width } : undefined}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <span className="inline-flex">
                        {sortColumn === col.key ? (
                          sortDirection === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />
                        ) : (
                          <ChevronsUpDown size={13} className="text-slate-300 dark:text-slate-600" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-5 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-5 py-14 text-center">
                  <p className="text-sm text-slate-400 dark:text-slate-500">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-5 py-3.5 text-sm text-slate-700 dark:text-slate-300 ${
                        col.hidden ? 'hidden md:table-cell' : ''
                      } ${col.cellClass || ''}`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
