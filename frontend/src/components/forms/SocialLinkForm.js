// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { socialLinkSchema } from '../../utils/validation';
// import FormInput from '../common/FormInput';
// import ToggleSwitch from '../ui/ToggleSwitch';
// import Button from '../common/Button';
//
// const SocialLinkForm = ({ socialLink, onSubmit, onCancel }) => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting }
//     } = useForm({
//         resolver: yupResolver(socialLinkSchema),
//         defaultValues: {
//             platform: socialLink?.platform || '',
//             url: socialLink?.url || '',
//             icon: socialLink?.icon || '',
//             isActive: socialLink?.isActive ?? true,
//             order: socialLink?.order || 0
//         }
//     });
//
//     const onFormSubmit = (data) => {
//         onSubmit(data);
//     };
//
//     return (
//         <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
//             <FormInput
//                 name="platform"
//                 label="Platform Name"
//                 placeholder="e.g. Facebook, Twitter, Instagram"
//                 required
//                 register={register}
//                 errors={errors}
//             />
//
//             <FormInput
//                 name="url"
//                 label="URL"
//                 placeholder="https://example.com/profile"
//                 required
//                 register={register}
//                 errors={errors}
//             />
//
//             <FormInput
//                 name="icon"
//                 label="Icon URL"
//                 placeholder="https://example.com/icon.png"
//                 register={register}
//                 errors={errors}
//             />
//
//             <FormInput
//                 name="order"
//                 label="Display Order"
//                 type="number"
//                 placeholder="0"
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
//                     {isSubmitting ? 'Saving...' : socialLink ? 'Update Social Link' : 'Create Social Link'}
//                 </Button>
//             </div>
//         </form>
//     );
// };
//
// export default SocialLinkForm;


import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { socialLinkSchema } from '../../utils/validation';
import FormInput from '../common/FormInput';
import FormImageUpload from '../common/FormImageUpload';
import Button from '../common/Button';
import Loading from '../common/Loading';

const SocialLinkForm = ({ onSubmit, initialData, submitting, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(socialLinkSchema),
        defaultValues: {
            platform: '',
            url: '',
            icon: '',
            isActive: true,
            order: 0
        }
    });

    useEffect(() => {
        if (initialData) {
            reset({
                platform: initialData.platform,
                url: initialData.url,
                icon: initialData.icon,
                isActive: initialData.isActive,
                order: initialData.order
            });
        }
    }, [initialData, reset]);

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormInput
                name="platform"
                label="Platform"
                placeholder="Enter platform name"
                required
                register={register}
                errors={errors}
            />

            <FormInput
                name="url"
                label="URL"
                placeholder="Enter social media URL"
                required
                register={register}
                errors={errors}
            />

            <FormImageUpload
                name="icon"
                label="Platform Icon"
                register={register}
                errors={errors}
            />

            <FormInput
                name="order"
                label="Display Order"
                type="number"
                placeholder="Enter display order"
                register={register}
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
                    Link is Active
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
                    {submitting ? <Loading size="small" /> : initialData ? 'Update Social Link' : 'Create Social Link'}
                </Button>
            </div>
        </form>
    );
};

export default SocialLinkForm;