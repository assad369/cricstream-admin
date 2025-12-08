import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Button from '../components/common/Button';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center animate-fade-in">
                {/* 404 Illustration */}
                <div className="relative mb-8">
                    <div className="text-[180px] font-bold text-gray-100 dark:text-gray-800 select-none leading-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 opacity-20 blur-3xl"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-24 h-24 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Page Not Found
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/">
                        <Button size="lg" icon={HomeIcon}>
                            Go to Dashboard
                        </Button>
                    </Link>
                    <button 
                        onClick={() => window.history.back()} 
                        className="btn-secondary inline-flex items-center px-6 py-3 text-sm font-medium"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2" />
                        Go Back
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="mt-16 flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Lost?</span>
                    <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;