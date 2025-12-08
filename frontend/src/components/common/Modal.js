import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    size = 'medium',
    footer = null,
    showCloseButton = true,
    closeOnOverlayClick = true
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const sizeClasses = {
        small: 'sm:max-w-md',
        medium: 'sm:max-w-lg',
        large: 'sm:max-w-2xl',
        xlarge: 'sm:max-w-4xl',
        full: 'sm:max-w-[90vw]'
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog 
                as="div" 
                className="relative z-50" 
                onClose={closeOnOverlayClick ? onClose : () => {}}
            >
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel 
                                className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left align-middle shadow-2xl transition-all border border-gray-200/50 dark:border-gray-700/50`}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                                    <div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
                                        >
                                            {title}
                                        </Dialog.Title>
                                        {description && (
                                            <Dialog.Description className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {description}
                                            </Dialog.Description>
                                        )}
                                    </div>
                                    {showCloseButton && (
                                        <button
                                            type="button"
                                            className="ml-4 p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            onClick={onClose}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
                                    {children}
                                </div>

                                {/* Footer */}
                                {footer && (
                                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-200/50 dark:border-gray-700/50">
                                        {footer}
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;