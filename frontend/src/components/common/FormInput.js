import React from 'react';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const FormInput = ({
    name,
    label,
    type = 'text',
    placeholder = '',
    required = false,
    className = '',
    register,
    errors,
    helperText,
    success = false,
    icon: Icon,
    ...props
}) => {
    const error = errors?.[name] || (name.includes('.') && name.split('.').reduce((obj, key) => obj?.[key], errors));
    const hasError = Boolean(error);

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className={`h-5 w-5 ${hasError ? 'text-red-400' : 'text-gray-400 dark:text-gray-500'}`} />
                    </div>
                )}
                
                <input
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    className={`
                        input
                        ${Icon ? 'pl-10' : ''}
                        ${hasError ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500 pr-10' : ''}
                        ${success && !hasError ? 'border-emerald-500 focus:ring-emerald-500/20 focus:border-emerald-500 pr-10' : ''}
                    `}
                    {...(register && register(name))}
                    {...props}
                />

                {/* Status icons */}
                {hasError && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                )}
                {success && !hasError && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CheckCircleIcon className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                    </div>
                )}
            </div>

            {/* Error message */}
            {hasError && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <ExclamationCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                    {error?.message || 'This field is invalid'}
                </p>
            )}

            {/* Helper text */}
            {helperText && !hasError && (
                <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                    {helperText}
                </p>
            )}
        </div>
    );
};

// Textarea variant
export const FormTextarea = ({
    name,
    label,
    placeholder = '',
    required = false,
    className = '',
    register,
    errors,
    rows = 4,
    helperText,
    ...props
}) => {
    const error = errors?.[name];
    const hasError = Boolean(error);

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <textarea
                id={name}
                rows={rows}
                placeholder={placeholder}
                className={`input resize-none ${hasError ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}`}
                {...(register && register(name))}
                {...props}
            />

            {hasError && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <ExclamationCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                    {error?.message}
                </p>
            )}

            {helperText && !hasError && (
                <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                    {helperText}
                </p>
            )}
        </div>
    );
};

// Select variant
export const FormSelect = ({
    name,
    label,
    required = false,
    className = '',
    register,
    errors,
    options = [],
    placeholder = 'Select an option',
    helperText,
    ...props
}) => {
    const error = errors?.[name];
    const hasError = Boolean(error);

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <select
                id={name}
                className={`input ${hasError ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}`}
                {...(register && register(name))}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {hasError && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <ExclamationCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                    {error?.message}
                </p>
            )}

            {helperText && !hasError && (
                <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default FormInput;
