import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categorySchema } from '../../utils/validation';
import { generateSlug } from '../../utils/helpers';
import FormInput from '../common/FormInput';
import Button from '../common/Button';

const CategoryForm = ({ category, onSubmit, onCancel }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(categorySchema),
        defaultValues: {
            name: category?.name || '',
            slug: category?.slug || '',
            description: category?.description || '',
            icon: category?.icon || ''
        }
    });

    const nameValue = watch('name');

    useEffect(() => {
        if (nameValue && !category) {
            setValue('slug', generateSlug(nameValue));
        }
    }, [nameValue, setValue, category]);

    const onFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <FormInput
                name="name"
                label="Category Name"
                placeholder="Enter category name"
                required
                register={register}
                errors={errors}
            />

            <FormInput
                name="slug"
                label="Slug"
                placeholder="category-slug"
                required
                register={register}
                errors={errors}
            />

            <FormInput
                name="description"
                label="Description"
                placeholder="Enter category description"
                register={register}
                errors={errors}
            />

            <FormInput
                name="icon"
                label="Icon URL"
                placeholder="https://example.com/icon.png"
                register={register}
                errors={errors}
            />

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
                    {isSubmitting ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
                </Button>
            </div>
        </form>
    );
};

export default CategoryForm;