import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { highlightSchema } from '../../utils/validation';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import categoryService from '../../services/categoryService';

const HighlightForm = ({ highlight, onSubmit, onCancel }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(highlightSchema),
        defaultValues: {
            title: highlight?.title || '',
            url: highlight?.url || '',
            thumbnail: highlight?.thumbnail || '',
            category: highlight?.category?._id || '',
            duration: highlight?.duration || '',
            tags: highlight?.tags || ['']
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tags'
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
        // Filter out empty tags
        const filteredData = {
            ...data,
            tags: data.tags.filter(tag => tag.trim() !== '')
        };
        onSubmit(filteredData);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <FormInput
                name="title"
                label="Highlight Title"
                placeholder="Enter highlight title"
                required
                register={register}
                errors={errors}
            />

            <FormInput
                name="url"
                label="Video URL"
                placeholder="https://example.com/video.mp4"
                required
                register={register}
                errors={errors}
            />

            <FormInput
                name="thumbnail"
                label="Thumbnail URL"
                placeholder="https://example.com/thumbnail.jpg"
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

            <FormInput
                name="duration"
                label="Duration"
                placeholder="e.g. 5:30"
                register={register}
                errors={errors}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags
                </label>
                <div className="space-y-2">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center space-x-2">
                            <input
                                {...register(`tags.${index}`)}
                                className="input"
                                placeholder="Enter a tag"
                            />
                            {fields.length > 1 && (
                                <Button
                                    type="button"
                                    variant="danger"
                                    size="sm"
                                    onClick={() => remove(index)}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => append('')}
                    >
                        Add Tag
                    </Button>
                </div>
                {errors.tags && (
                    <p className="mt-1 text-sm text-red-600">{errors.tags.message}</p>
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
                    {isSubmitting ? 'Saving...' : highlight ? 'Update Highlight' : 'Create Highlight'}
                </Button>
            </div>
        </form>
    );
};

export default HighlightForm;