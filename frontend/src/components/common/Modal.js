import React, { useEffect } from 'react';
import Button from './Button';

const Modal = ({
                   isOpen,
                   onClose,
                   title,
                   children,
                   size = 'medium',
                   footer = null
               }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        small: 'max-w-md',
        medium: 'max-w-lg',
        large: 'max-w-2xl',
        xlarge: 'max-w-4xl'
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

                <div className={`inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} sm:w-full`}>
                    <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                                onClick={onClose}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-2">
                            {children}
                        </div>
                    </div>

                    {footer || (
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <Button
                                variant="secondary"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;