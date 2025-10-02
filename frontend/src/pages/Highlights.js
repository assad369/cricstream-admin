import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import HighlightForm from '../components/forms/HighlightForm';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import highlightService from '../services/highlightService';
import categoryService from '../services/categoryService';
import { formatDate } from '../utils/helpers';

const Highlights = () => {
    const [highlights, setHighlights] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingHighlight, setEditingHighlight] = useState(null);
    const [formSubmitting, setFormSubmitting] = useState(false);

    const columns = [
        { key: 'title', label: 'Title' },
        {
            key: 'thumbnail',
            label: 'Thumbnail',
            type: 'image',
            render: (row) => row.thumbnail ? (
                <img src={row.thumbnail} alt={row.title} className="h-10 w-10 rounded object-cover" />
            ) : (
                <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                </div>
            )
        },
        { key: 'duration', label: 'Duration' },
        {
            key: 'category',
            label: 'Category',
            render: (row) => row.category?.name || 'N/A'
        },
        { key: 'views', label: 'Views', type: 'number' },
        { key: 'createdAt', label: 'Created At', type: 'date' }
    ];

    useEffect(() => {
        fetchHighlights();
        fetchCategories();
    }, [currentPage, searchTerm, selectedCategory]);

    const fetchHighlights = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: 10,
                search: searchTerm,
                category: selectedCategory
            };

            const response = await highlightService.getHighlights(params);
            setHighlights(response.data.data);
            setPagination(response.data.pagination);
        } catch (err) {
            setError('Failed to load highlights');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getCategories();
            setCategories(response.data.data);
        } catch (err) {
            console.error('Failed to load categories:', err);
        }
    };

    const handleAddHighlight = () => {
        setEditingHighlight(null);
        setShowModal(true);
    };

    const handleEditHighlight = (highlight) => {
        setEditingHighlight(highlight);
        setShowModal(true);
    };

    const handleDeleteHighlight = async (id) => {
        if (window.confirm('Are you sure you want to delete this highlight?')) {
            try {
                await highlightService.deleteHighlight(id);
                fetchHighlights();
            } catch (err) {
                setError('Failed to delete highlight');
                console.error(err);
            }
        }
    };

    const handleFormSubmit = async (data) => {
        setFormSubmitting(true);
        try {
            if (editingHighlight) {
                await highlightService.updateHighlight(editingHighlight._id, data);
            } else {
                await highlightService.createHighlight(data);
            }
            setShowModal(false);
            fetchHighlights();
        } catch (err) {
            setError(`Failed to ${editingHighlight ? 'update' : 'create'} highlight`);
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

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setCurrentPage(1);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sports Highlights</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage sports highlights and video clips
                    </p>
                </div>
                <Button onClick={handleAddHighlight}>
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Highlight
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

            <div className="mb-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="text"
                        className="input pl-10"
                        placeholder="Search highlights..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className="flex gap-4">
                    <select
                        className="input"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {(searchTerm || selectedCategory) && (
                        <Button variant="secondary" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    )}
                </div>
            </div>

            <DataTable
                columns={columns}
                data={highlights}
                loading={loading}
                onEdit={handleEditHighlight}
                onDelete={handleDeleteHighlight}
                pagination={pagination}
                onPageChange={handlePageChange}
            />

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingHighlight ? 'Edit Highlight' : 'Add New Highlight'}
                size="large"
            >
                <HighlightForm
                    highlight={editingHighlight}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );
};

export default Highlights;