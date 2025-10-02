// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { announcementSchema } from '../../utils/validation';
// import FormInput from '../common/FormInput';
// import ToggleSwitch from '../ui/ToggleSwitch';
// import Button from '../common/Button';
//
// const AnnouncementForm = ({ announcement, onSubmit, onCancel }) => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting }
//     } = useForm({
//         resolver: yupResolver(announcementSchema),
//         defaultValues: {
//             title: announcement?.title || '',
//             message: announcement?.message || '',
//             isActive: announcement?.isActive ?? true,
//             priority: announcement?.priority || 0,
//             expiryDate: announcement?.expiryDate ? new Date(announcement.expiryDate).toISOString().slice(0, 16) : ''
//         }
//     });
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
//             <FormInput
//                 name="title"
//                 label="Announcement Title"
//                 placeholder="Enter announcement title"
//                 required
//                 register={register}
//                 errors={errors}
//             />
//
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Message <span className="text-red-500">*</span>
//                 </label>
//                 <textarea
//                     {...register('message')}
//                     rows={4}
//                     className="input"
//                     placeholder="Enter announcement message"
//                     required
//                 ></textarea>
//                 {errors.message && (
//                     <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
//                 )}
//             </div>
//
//             <FormInput
//                 name="priority"
//                 label="Priority"
//                 type="number"
//                 placeholder="0"
//                 register={register}
//                 errors={errors}
//             />
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
//                     {isSubmitting ? 'Saving...' : announcement ? 'Update Announcement' : 'Create Announcement'}
//                 </Button>
//             </div>
//         </form>
//     );
// };
//
// export default AnnouncementForm;

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { announcementSchema } from '../../utils/validation';
import FormInput from '../common/FormInput';
import FormDate from '../forms/FormDate';
import Button from '../common/Button';
import Loading from '../common/Loading';

const AnnouncementForm = ({ onSubmit, initialData, submitting, onCancel }) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(announcementSchema),
        defaultValues: {
            title: '',
            message: '',
            isActive: true,
            priority: 0,
            expiryDate: null
        }
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                message: initialData.message,
                isActive: initialData.isActive,
                priority: initialData.priority,
                expiryDate: initialData.expiryDate ? new Date(initialData.expiryDate) : null
            });
        }
    }, [initialData, reset]);

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormInput
                name="title"
                label="Title"
                placeholder="Enter announcement title"
                required
                register={register}
                errors={errors}
            />

            <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    rows={4}
                    {...register('message')}
                    className={`input ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Enter announcement message"
                />
                {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
            </div>

            <FormInput
                name="priority"
                label="Priority"
                type="number"
                placeholder="Enter priority (0 = highest)"
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
                    Announcement is Active
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
                    {submitting ? <Loading size="small" /> : initialData ? 'Update Announcement' : 'Create Announcement'}
                </Button>
            </div>
        </form>
    );
};

export default AnnouncementForm;