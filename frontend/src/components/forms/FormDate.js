import React from 'react';
import { Controller } from 'react-hook-form';

const FormDate = ({ name, label, control, errors }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <div className="mt-1">
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <input
                            type="datetime-local"
                            id={name}
                            value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                            className={`input ${errors[name] ? 'border-red-500' : ''}`}
                        />
                    )}
                />
            </div>
            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
            )}
        </div>
    );
};

export default FormDate;