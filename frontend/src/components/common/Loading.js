import React from 'react';

const Loading = ({ size = 'medium', fullScreen = false, text = '' }) => {
    const sizeClasses = {
        small: 'h-5 w-5',
        medium: 'h-8 w-8',
        large: 'h-12 w-12',
        xlarge: 'h-16 w-16'
    };

    const Spinner = () => (
        <div className="relative">
            <div className={`${sizeClasses[size]} rounded-full border-2 border-gray-200 dark:border-gray-700`} />
            <div className={`${sizeClasses[size]} rounded-full border-2 border-primary-500 border-t-transparent animate-spin absolute top-0 left-0`} />
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="flex flex-col items-center space-y-4">
                    <Spinner />
                    {text && (
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
                            {text}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            <Spinner />
            {text && (
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {text}
                </p>
            )}
        </div>
    );
};

// Skeleton loader for content placeholders
export const Skeleton = ({ className = '', variant = 'text', ...props }) => {
    const variantClasses = {
        text: 'h-4 rounded',
        title: 'h-6 rounded',
        avatar: 'h-10 w-10 rounded-full',
        thumbnail: 'h-24 w-24 rounded-lg',
        card: 'h-32 rounded-xl',
        button: 'h-10 w-24 rounded-lg'
    };

    return (
        <div 
            className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${variantClasses[variant]} ${className}`}
            {...props}
        />
    );
};

// Page loading skeleton
export const PageSkeleton = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
            <div className="space-y-2">
                <Skeleton variant="title" className="w-48" />
                <Skeleton variant="text" className="w-64" />
            </div>
            <Skeleton variant="button" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
                <Skeleton key={i} variant="card" className="h-28" />
            ))}
        </div>
        <Skeleton variant="card" className="h-64" />
    </div>
);

// Table loading skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
    <div className="space-y-3">
        <div className="flex space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-t-xl">
            {[...Array(columns)].map((_, i) => (
                <Skeleton key={i} variant="text" className="flex-1" />
            ))}
        </div>
        {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex space-x-4 p-4 border-b border-gray-100 dark:border-gray-700/50">
                {[...Array(columns)].map((_, j) => (
                    <Skeleton key={j} variant="text" className="flex-1" />
                ))}
            </div>
        ))}
    </div>
);

export default Loading;