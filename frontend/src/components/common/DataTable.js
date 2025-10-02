import React from 'react';
import Button from './Button';
import { formatNumber, formatDate } from '../../utils/helpers';

const DataTable = ({
                       columns,
                       data,
                       loading = false,
                       onEdit,
                       onDelete,
                       onToggle,
                       toggleLabel = 'Toggle',
                       pagination,
                       onPageChange
                   }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No data available</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.label}</th>
                    ))}
                    <th className="text-right">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {data.map((row) => (
                    <tr key={row._id}>
                        {columns.map((column) => {
                            let value = row[column.key];

                            // Format the value based on column type
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
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                );
                            }

                            return (
                                <td key={`${row._id}-${column.key}`}>
                                    {column.render ? column.render(row) : value}
                                </td>
                            );
                        })}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {onToggle && (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => onToggle(row._id)}
                                    className="mr-2"
                                >
                                    {toggleLabel}
                                </Button>
                            )}
                            {onEdit && (
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => onEdit(row)}
                                    className="mr-2"
                                >
                                    Edit
                                </Button>
                            )}
                            {onDelete && (
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete(row._id)}
                                >
                                    Delete
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {pagination && (
                <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <Button
                            variant="secondary"
                            onClick={() => onPageChange(pagination.page - 1)}
                            disabled={!pagination.hasPrev}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => onPageChange(pagination.page + 1)}
                            disabled={!pagination.hasNext}
                        >
                            Next
                        </Button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                                <span className="font-medium">
                  {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span>{' '}
                                of <span className="font-medium">{formatNumber(pagination.total)}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <Button
                                    variant="secondary"
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    onClick={() => onPageChange(pagination.page - 1)}
                                    disabled={!pagination.hasPrev}
                                >
                                    <span className="sr-only">Previous</span>
                                    &larr;
                                </Button>

                                {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                                    .filter(page =>
                                        page === 1 ||
                                        page === pagination.pages ||
                                        (page >= pagination.page - 1 && page <= pagination.page + 1)
                                    )
                                    .map((page, index, array) => {
                                        if (index > 0 && page - array[index - 1] > 1) {
                                            return (
                                                <React.Fragment key={`ellipsis-${page}`}>
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                            ...
                          </span>
                                                    <Button
                                                        variant={page === pagination.page ? "primary" : "secondary"}
                                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                            page === pagination.page
                                                                ? 'z-10 bg-primary-50 dark:bg-primary-900 border-primary-500 text-primary-600 dark:text-primary-300'
                                                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                        }`}
                                                        onClick={() => onPageChange(page)}
                                                    >
                                                        {page}
                                                    </Button>
                                                </React.Fragment>
                                            );
                                        }

                                        return (
                                            <Button
                                                key={page}
                                                variant={page === pagination.page ? "primary" : "secondary"}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    page === pagination.page
                                                        ? 'z-10 bg-primary-50 dark:bg-primary-900 border-primary-500 text-primary-600 dark:text-primary-300'
                                                        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                                onClick={() => onPageChange(page)}
                                            >
                                                {page}
                                            </Button>
                                        );
                                    })}

                                <Button
                                    variant="secondary"
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    onClick={() => onPageChange(pagination.page + 1)}
                                    disabled={!pagination.hasNext}
                                >
                                    <span className="sr-only">Next</span>
                                    &rarr;
                                </Button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;