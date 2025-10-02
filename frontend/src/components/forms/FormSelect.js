import React from 'react';

const FormSelect = ({ name, label, options, required, register, errors }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="mt-1">
                <select
                    id={name}
                    {...register(name)}
                    className={`input ${errors[name] ? 'border-red-500' : ''}`}
                >
                    <option value="">Select an option</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
            )}
        </div>
    );
};

export default FormSelect;