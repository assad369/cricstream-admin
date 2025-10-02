import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { streamSchema } from '../../utils/validation';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import categoryService from '../../services/categoryService';

const StreamForm = ({ stream, onSubmit, onCancel }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(streamSchema),
        defaultValues: {
            title: stream?.title || '',
            team1: {
                name: stream?.team1?.name || '',
                logo: stream?.team1?.logo || ''
            },
            team2: {
                name: stream?.team2?.name || '',
                logo: stream?.team2?.logo || ''
            },
            date: stream?.date ? new Date(stream.date).toISOString().slice(0, 16) : '',
            streamURL: stream?.streamURL || '',
            expiryTime: stream?.expiryTime ? new Date(stream.expiryTime).toISOString().slice(0, 16) : '',
            category: stream?.category?._id || '',
            isLive: stream?.isLive || false
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
        onSubmit({
            ...data,
            date: new Date(data.date),
            expiryTime: new Date(data.expiryTime)
        });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <FormInput
                name="title"
                label="Stream Title"
                placeholder="Enter stream title"
                required
                register={register}
                errors={errors}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Team 1</h3>
                    <FormInput
                        name="team1.name"
                        label="Team Name"
                        placeholder="Enter team name"
                        required
                        register={register}
                        errors={errors}
                    />

                    <FormInput
                        name="team1.logo"
                        label="Team Logo URL"
                        placeholder="https://example.com/logo.png"
                        register={register}
                        errors={errors}
                    />
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Team 2</h3>
                    <FormInput
                        name="team2.name"
                        label="Team Name"
                        placeholder="Enter team name"
                        required
                        register={register}
                        errors={errors}
                    />

                    <FormInput
                        name="team2.logo"
                        label="Team Logo URL"
                        placeholder="https://example.com/logo.png"
                        register={register}
                        errors={errors}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                    name="date"
                    label="Stream Date"
                    type="datetime-local"
                    required
                    register={register}
                    errors={errors}
                />

                <FormInput
                    name="expiryTime"
                    label="Expiry Time"
                    type="datetime-local"
                    required
                    register={register}
                    errors={errors}
                />
            </div>

            <FormInput
                name="streamURL"
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
                    {isSubmitting ? 'Saving...' : stream ? 'Update Stream' : 'Create Stream'}
                </Button>
            </div>
        </form>
    );
};

export default StreamForm;