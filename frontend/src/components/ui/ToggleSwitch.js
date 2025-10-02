import React from 'react';
import { Controller } from 'react-hook-form';

// Accept control explicitly to avoid requiring FormProvider context
const ToggleSwitch = ({ name, label, control, disabled = false }) => {

    return (
        <div className="flex items-center">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <input
                            type="checkbox"
                            id={name}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            disabled={disabled}
                        />
                        <label htmlFor={name} className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                            {label}
                        </label>
                    </>
                )}
            />
        </div>
    );
};

export default ToggleSwitch;