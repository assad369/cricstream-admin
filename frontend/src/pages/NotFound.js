import React from 'react';
import { Link } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
    return (
        <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <div className="max-w-md w-full text-center">
                <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-yellow-500" />
                <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;