//
//
//
// import React from 'react';
// import { useFormContext } from 'react-hook-form';
// import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
//
// const FormInput = ({
//                        name,
//                        label,
//                        type = 'text',
//                        placeholder = '',
//                        required = false,
//                        className = '',
//                        ...props
//                    }) => {
//     // Always call useFormContext at the top level
//     const { register, formState: { errors } = {} } = useFormContext() || {};
//
//     // Fallback if useFormContext is not available
//     if (!register) {
//         console.error(
//             `FormInput "${name}" must be used inside a FormProvider or useForm hook.`
//         );
//         return (
//             <input
//                 type={type}
//                 placeholder={placeholder}
//                 className={`input ${className}`}
//                 {...props}
//             />
//         );
//     }
//
//     const error = errors[name];
//
//     return (
//         <div className={className}>
//             {label && (
//                 <label
//                     htmlFor={name}
//                     className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//                 >
//                     {label} {required && <span className="text-red-500">*</span>}
//                 </label>
//             )}
//             <div className="mt-1 relative rounded-md shadow-sm">
//                 <input
//                     type={type}
//                     id={name}
//                     className={`input ${error ? 'border-red-500 pr-10' : ''}`}
//                     placeholder={placeholder}
//                     {...register(name)}
//                     {...props}
//                 />
//                 {error && (
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                         <ExclamationCircleIcon
//                             className="h-5 w-5 text-red-500"
//                             aria-hidden="true"
//                         />
//                     </div>
//                 )}
//             </div>
//             {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
//         </div>
//     );
// };
//
// export default FormInput;


import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const FormInput = ({
                       name,
                       label,
                       type = 'text',
                       placeholder = '',
                       required = false,
                       className = '',
                       register,
                       errors,
                       ...props
                   }) => {
    const error = errors?.[name];

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    type={type}
                    id={name}
                    placeholder={placeholder}
                    className={`appearance-none block w-full px-3 py-2 border ${
                        error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white ${
                        error ? 'pr-10' : ''
                    }`}
                    {...(register && register(name))}
                    {...props}
                />

                {error && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                        />
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default FormInput;
