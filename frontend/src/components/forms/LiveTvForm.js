import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { liveTvSchema } from '../../utils/validation';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import categoryService from '../../services/categoryService';

const LiveTvForm = ({ channel, onSubmit, onCancel }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(liveTvSchema),
        defaultValues: {
            channelName: channel?.channelName || '',
            logo: channel?.logo || '',
            url: channel?.url || '',
            category: channel?.category?._id || '',
            isLive: channel?.isLive ?? true,
            description: channel?.description || ''
        }
    });

    React.useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await categoryService.getCategories();
                setCategories(response.data.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const onFormSubmit = (data) => {
        // Transform null values to empty strings for backend compatibility
        const formData = {
            ...data,
            logo: data.logo || '',
            description: data.description || ''
        };
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <FormInput
                name="channelName"
                label="Channel Name"
                placeholder="Enter channel name"
                required
                register={register}
                errors={errors}
            />

            <FormInput
                name="logo"
                label="Channel Logo URL"
                placeholder="https://example.com/logo.png"
                register={register}
                errors={errors}
            />

            <FormInput
                name="url"
                label="Stream URL"
                placeholder="https://example.com/stream.m3u8"
                required
                register={register}
                errors={errors}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category <span className="text-red-500">*</span>
                </label>
                {loading ? (
                    <div className="animate-pulse h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                ) : (
                    <select
                        {...register('category')}
                        className="input"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                )}
                {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="isLive"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    {...register('isLive')}
                />
                <label htmlFor="isLive" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Is Live Now
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                </label>
                <textarea
                    {...register('description')}
                    rows={3}
                    className="input"
                    placeholder="Enter channel description"
                ></textarea>
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>

            <div className="flex justify-end space-x-3">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : channel ? 'Update Channel' : 'Create Channel'}
                </Button>
            </div>
        </form>
    );
};

export default LiveTvForm;