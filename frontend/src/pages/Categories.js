import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import CategoryForm from '../components/forms/CategoryForm';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import categoryService from '../services/categoryService';
import { formatDate } from '../utils/helpers';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formSubmitting, setFormSubmitting] = useState(false);

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'slug', label: 'Slug' },
        { key: 'description', label: 'Description' },
        { key: 'createdAt', label: 'Created At', type: 'date' }
    ];

    useEffect(() => {
        fetchCategories();
    }, [currentPage, searchTerm]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: 10,
                search: searchTerm
            };

            const response = await categoryService.getCategories(params);
            setCategories(response.data.data);
            setPagination(response.data.pagination);
        } catch (err) {
            setError('Failed to load categories');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = () => {
        setEditingCategory(null);
        setShowModal(true);
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setShowModal(true);
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await categoryService.deleteCategory(id);
                fetchCategories();
            } catch (err) {
                setError('Failed to delete category');
                console.error(err);
            }
        }
    };

    const handleFormSubmit = async (data) => {
        setFormSubmitting(true);
        try {
            if (editingCategory) {
                await categoryService.updateCategory(editingCategory._id, data);
            } else {
                await categoryService.createCategory(data);
            }
            setShowModal(false);
            fetchCategories();
        } catch (err) {
            setError(`Failed to ${editingCategory ? 'update' : 'create'} category`);
            console.error(err);
        } finally {
            setFormSubmitting(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage sports categories for your streaming platform
                    </p>
                </div>
                <Button onClick={handleAddCategory}>
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Category
                </Button>
            </div>

            {error && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700 dark:text-red-300">
                                {error}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-4">
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        className="input pl-10"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={categories}
                loading={loading}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                pagination={pagination}
                onPageChange={handlePageChange}
            />

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingCategory ? 'Edit Category' : 'Add New Category'}
                size="medium"
            >
                <CategoryForm
                    category={editingCategory}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );
};

export default Categories;