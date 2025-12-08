import React from 'react';
import Button from './Button';
import { formatNumber, formatDate } from '../../utils/helpers';
import { 
    PencilSquareIcon, 
    TrashIcon, 
    ChevronLeftIcon, 
    ChevronRightIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { TableSkeleton } from './Loading';

const DataTable = ({
    columns,
    data,
    loading = false,
    onEdit,
    onDelete,
    onToggle,
    toggleLabel = 'Toggle',
    pagination,
    onPageChange,
    emptyMessage = 'No data available',
    emptyIcon: EmptyIcon
}) => {
    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                <TableSkeleton rows={5} columns={columns.length} />
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-12">
                <div className="text-center">
                    {EmptyIcon && (
                        <EmptyIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                    )}
                    <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
                        {emptyMessage}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Get started by creating a new item.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-sm">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key}>{column.label}</th>
                            ))}
                            {(onEdit || onDelete || onToggle) && (
                                <th className="text-right">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={row._id} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                                {columns.map((column) => {
                                    let value = row[column.key];

                                    if (column.type === 'date') {
                                        value = formatDate(value);
                                    } else if (column.type === 'number') {
                                        value = formatNumber(value);
                                    } else if (column.type === 'boolean') {
                                        value = value ? 'Yes' : 'No';
                                    } else if (column.type === 'image' && value) {
                                        value = (
                                            <img
                                                src={value}
                                                alt={column.key}
                                                className="h-10 w-10 rounded-lg object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/40?text=No+Image';
                                                }}
                                            />
                                        );
                                    }

                                    return (
                                        <td key={`${row._id}-${column.key}`}>
                                            {column.render ? column.render(row) : value}
                                        </td>
                                    );
                                })}
                                {(onEdit || onDelete || onToggle) && (
                                    <td className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {onToggle && (
                                                <Button
                                                    variant="ghost"
                                                    size="xs"
                                                    onClick={() => onToggle(row._id)}
                                                >
                                                    {toggleLabel}
                                                </Button>
                                            )}
                                            {onEdit && (
                                                <button
                                                    onClick={() => onEdit(row)}
                                                    className="p-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                    title="Edit"
                                                >
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button
                                                    onClick={() => onDelete(row._id)}
                                                    className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                    title="Delete"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                {data.map((row, idx) => (
                    <div 
                        key={row._id} 
                        className="p-4 animate-fade-in"
                        style={{ animationDelay: `${idx * 50}ms` }}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0 space-y-2">
                                {columns.slice(0, 3).map((column) => {
                                    let value = row[column.key];

                                    if (column.type === 'date') {
                                        value = formatDate(value);
                                    } else if (column.type === 'number') {
                                        value = formatNumber(value);
                                    } else if (column.type === 'boolean') {
                                        value = value ? 'Yes' : 'No';
                                    } else if (column.type === 'image' && value) {
                                        value = (
                                            <img
                                                src={value}
                                                alt={column.key}
                                                className="h-10 w-10 rounded-lg object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/40?text=No+Image';
                                                }}
                                            />
                                        );
                                    }

                                    return (
                                        <div key={`${row._id}-${column.key}`} className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-20 flex-shrink-0">
                                                {column.label}:
                                            </span>
                                            <span className="text-sm text-gray-900 dark:text-white truncate">
                                                {column.render ? column.render(row) : value}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                            {(onEdit || onDelete || onToggle) && (
                                <div className="flex items-center gap-1 ml-4">
                                    {onToggle && (
                                        <Button
                                            variant="ghost"
                                            size="xs"
                                            onClick={() => onToggle(row._id)}
                                        >
                                            {toggleLabel}
                                        </Button>
                                    )}
                                    {onEdit && (
                                        <button
                                            onClick={() => onEdit(row)}
                                            className="p-2 text-gray-500 hover:text-primary-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <PencilSquareIcon className="h-4 w-4" />
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(row._id)}
                                            className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-4 py-3 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Showing{' '}
                                <span className="font-medium">
                                    {(pagination.page - 1) * pagination.limit + 1}
                                </span>{' '}
                                to{' '}
                                <span className="font-medium">
                                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                                </span>{' '}
                                of <span className="font-medium">{formatNumber(pagination.total)}</span> results
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => onPageChange(pagination.page - 1)}
                                disabled={!pagination.hasPrev}
                                icon={ChevronLeftIcon}
                            >
                                <span className="hidden sm:inline">Previous</span>
                            </Button>
                            
                            <div className="hidden sm:flex items-center gap-1">
                                {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                                    .filter(page =>
                                        page === 1 ||
                                        page === pagination.pages ||
                                        (page >= pagination.page - 1 && page <= pagination.page + 1)
                                    )
                                    .map((page, index, array) => {
                                        const showEllipsis = index > 0 && page - array[index - 1] > 1;
                                        return (
                                            <React.Fragment key={page}>
                                                {showEllipsis && (
                                                    <span className="px-2 text-gray-400">
                                                        <EllipsisHorizontalIcon className="h-4 w-4" />
                                                    </span>
                                                )}
                                                <button
                                                    onClick={() => onPageChange(page)}
                                                    className={`min-w-[2.25rem] h-9 px-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                                                        page === pagination.page
                                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            </React.Fragment>
                                        );
                                    })}
                            </div>

                            <span className="sm:hidden text-sm text-gray-700 dark:text-gray-300">
                                Page {pagination.page} of {pagination.pages}
                            </span>

                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => onPageChange(pagination.page + 1)}
                                disabled={!pagination.hasNext}
                                icon={ChevronRightIcon}
                                iconPosition="right"
                            >
                                <span className="hidden sm:inline">Next</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;