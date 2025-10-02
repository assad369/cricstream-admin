import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { baseUrlSchema } from '../../utils/validation';
import FormInput from '../common/FormInput';
import ToggleSwitch from '../ui/ToggleSwitch';
import Button from '../common/Button';

const BaseUrlForm = ({ baseUrl, onSubmit, onCancel }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(baseUrlSchema),
        defaultValues: {
            url: baseUrl?.url || '',
            description: baseUrl?.description || '',
            isActive: baseUrl?.isActive ?? true
        }
    });

    const onFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <FormInput
                name="url"
                label="Base URL"
                placeholder="https://example.com"
                required
                register={register}
                errors={errors}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                </label>
                <textarea
                    {...register('description')}
                    rows={3}
                    className="input"
                    placeholder="Enter URL description"
                ></textarea>
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>

            <ToggleSwitch
                name="isActive"
                label="Active"
                control={control}
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
                    {isSubmitting ? 'Saving...' : baseUrl ? 'Update Base URL' : 'Create Base URL'}
                </Button>
            </div>
        </form>
    );
};

export default BaseUrlForm;