import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, XMarkIcon, TagIcon } from '@heroicons/react/24/outline';
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
        { 
            key: 'name', 
            label: 'Category',
            render: (row) => (
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                            <TagIcon className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">{row.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">/{row.slug}</div>
                    </div>
                </div>
            )
        },
        { 
            key: 'description', 
            label: 'Description',
            render: (row) => (
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                    {row.description || 'No description'}
                </p>
            )
        },
        { key: 'createdAt', label: 'Created', type: 'date' }
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
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Categories
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage sports categories for your streaming platform
                    </p>
                </div>
                <Button onClick={handleAddCategory} icon={PlusIcon}>
                    Add Category
                </Button>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="alert alert-error animate-slide-down">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm">{error}</span>
                        </div>
                        <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Search Card */}
            <div className="card">
                <div className="relative">
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

            {/* Data Table */}
            <div className="card !p-0 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={categories}
                    loading={loading}
                    onEdit={handleEditCategory}
                    onDelete={handleDeleteCategory}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    emptyMessage="No categories found"
                    emptyDescription="Get started by creating a new category"
                />
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingCategory ? 'Edit Category' : 'Add New Category'}
                description={editingCategory ? 'Update the category details below' : 'Fill in the details to create a new category'}
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