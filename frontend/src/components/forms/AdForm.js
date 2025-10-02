// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { adSchema } from '../../utils/validation';
// import FormInput from '../common/FormInput';
// import ToggleSwitch from '../ui/ToggleSwitch';
// import Button from '../common/Button';
//
// const AdForm = ({ ad, onSubmit, onCancel }) => {
//     const {
//         register,
//         handleSubmit,
//         watch,
//         setValue,
//         formState: { errors, isSubmitting }
//     } = useForm({
//         resolver: yupResolver(adSchema),
//         defaultValues: {
//             type: ad?.type || 'direct',
//             title: ad?.title || '',
//             content: ad?.content || '',
//             isActive: ad?.isActive ?? true,
//             position: ad?.position || 'header',
//             expiryDate: ad?.expiryDate ? new Date(ad.expiryDate).toISOString().slice(0, 16) : ''
//         }
//     });
//
//     const adType = watch('type');
//
//     const onFormSubmit = (data) => {
//         const formattedData = {
//             ...data,
//             expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined
//         };
//         onSubmit(formattedData);
//     };
//
//     return (
//         <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Ad Type <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-1 grid grid-cols-2 gap-3">
//                     <label className="flex items-center">
//                         <input
//                             type="radio"
//                             value="direct"
//                             className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
//                             {...register('type')}
//                         />
//                         <span className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
//               Direct Link
//             </span>
//                     </label>
//                     <label className="flex items-center">
//                         <input
//                             type="radio"
//                             value="banner"
//                             className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
//                             {...register('type')}
//                         />
//                         <span className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
//               Banner Code
//             </span>
//                     </label>
//                 </div>
//                 {errors.type && (
//                     <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
//                 )}
//             </div>
//
//             <FormInput
//                 name="title"
//                 label="Ad Title"
//                 placeholder="Enter ad title"
//                 required
//                 register={register}
//                 errors={errors}
//             />
//
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     {adType === 'direct' ? 'URL' : 'Banner Code'} <span className="text-red-500">*</span>
//                 </label>
//                 {adType === 'direct' ? (
//                     <input
//                         type="url"
//                         {...register('content')}
//                         className="input"
//                         placeholder="https://example.com/ad"
//                     />
//                 ) : (
//                     <textarea
//                         {...register('content')}
//                         rows={6}
//                         className="input font-mono text-sm"
//                         placeholder="<div>...</div>"
//                     ></textarea>
//                 )}
//                 {errors.content && (
//                     <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
//                 )}
//             </div>
//
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Position
//                 </label>
//                 <select
//                     {...register('position')}
//                     className="input"
//                 >
//                     <option value="header">Header</option>
//                     <option value="sidebar">Sidebar</option>
//                     <option value="footer">Footer</option>
//                     <option value="in-stream">In-Stream</option>
//                 </select>
//                 {errors.position && (
//                     <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
//                 )}
//             </div>
//
//             <FormInput
//                 name="expiryDate"
//                 label="Expiry Date"
//                 type="datetime-local"
//                 register={register}
//                 errors={errors}
//             />
//
//             <ToggleSwitch
//                 name="isActive"
//                 label="Active"
//                 register={register}
//             />
//
//             <div className="flex justify-end space-x-3">
//                 <Button
//                     type="button"
//                     variant="secondary"
//                     onClick={onCancel}
//                     disabled={isSubmitting}
//                 >
//                     Cancel
//                 </Button>
//                 <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                 >
//                     {isSubmitting ? 'Saving...' : ad ? 'Update Ad' : 'Create Ad'}
//                 </Button>
//             </div>
//         </form>
//     );
// };
//
// export default AdForm;

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { adSchema } from '../../utils/validation';
import FormInput from '../common/FormInput';
import FormSelect from '../forms/FormSelect';
import FormDate from '../forms/FormDate';
import Button from '../common/Button';
import Loading from '../common/Loading';

const AdForm = ({ onSubmit, initialData, submitting, onCancel }) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(adSchema),
        defaultValues: {
            type: 'direct',
            title: '',
            content: '',
            isActive: true,
            position: 'header',
            expiryDate: null
        }
    });

    useEffect(() => {
        if (initialData) {
            reset({
                type: initialData.type,
                title: initialData.title,
                content: initialData.content,
                isActive: initialData.isActive,
                position: initialData.position,
                expiryDate: initialData.expiryDate ? new Date(initialData.expiryDate) : null
            });
        }
    }, [initialData, reset]);

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    const typeOptions = [
        { value: 'direct', label: 'Direct Link' },
        { value: 'banner', label: 'Banner Ad' }
    ];

    const positionOptions = [
        { value: 'header', label: 'Header' },
        { value: 'sidebar', label: 'Sidebar' },
        { value: 'footer', label: 'Footer' },
        { value: 'in-stream', label: 'In-Stream' }
    ];

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormSelect
                name="type"
                label="Ad Type"
                options={typeOptions}
                required
                register={register}
                errors={errors}
            />

            <FormInput
                name="title"
                label="Title"
                placeholder="Enter ad title"
                required
                register={register}
                errors={errors}
            />

            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Content <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="content"
                    rows={4}
                    {...register('content')}
                    className={`input ${errors.content ? 'border-red-500' : ''}`}
                    placeholder="Enter ad content (URL for direct ads, HTML code for banner ads)"
                />
                {errors.content && (
                    <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                )}
            </div>

            <FormSelect
                name="position"
                label="Position"
                options={positionOptions}
                register={register}
                errors={errors}
            />

            <FormDate
                name="expiryDate"
                label="Expiry Date (Optional)"
                control={control}
                errors={errors}
            />

            <div className="flex items-center">
                <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    {...register('isActive')}
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Ad is Active
                </label>
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={submitting}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? <Loading size="small" /> : initialData ? 'Update Advertisement' : 'Create Advertisement'}
                </Button>
            </div>
        </form>
    );
};

export default AdForm;