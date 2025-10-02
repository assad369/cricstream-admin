import React, { useState } from 'react';

const FormImageUpload = ({ name, label, register, errors }) => {
    const [preview, setPreview] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview('');
        }
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            <div className="mt-1 flex items-center space-x-4">
                <div className="flex-shrink-0">
                    {preview ? (
                        <img className="h-16 w-16 rounded-full object-cover" src={preview} alt="Preview" />
                    ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <input
                        type="file"
                        id={name}
                        accept="image/*"
                        {...register(name)}
                        onChange={(e) => {
                            register(name).onChange(e);
                            handleImageChange(e);
                        }}
                        className="sr-only"
                    />
                    <label
                        htmlFor={name}
                        className="cursor-pointer bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        Upload
                    </label>
                </div>
            </div>
            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
            )}
        </div>
    );
};

export default FormImageUpload;