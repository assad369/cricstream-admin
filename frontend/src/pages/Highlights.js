import React, { useState, useEffect } from 'react';
import { 
    PlusIcon, 
    MagnifyingGlassIcon, 
    FunnelIcon, 
    XMarkIcon,
    FilmIcon,
    EyeIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import HighlightForm from '../components/forms/HighlightForm';
import Button from '../components/common/Button';
import highlightService from '../services/highlightService';
import categoryService from '../services/categoryService';

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

    const columns = [
        { 
            key: 'title', 
            label: 'Highlight',
            render: (row) => (
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        {row.thumbnail ? (
                            <img src={row.thumbnail} alt={row.title} className="h-12 w-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700" />
                        ) : (
                            <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                                <FilmIcon className="w-6 h-6 text-white" />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">{row.title}</div>
                        <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                            {row.duration && (
                                <span className="flex items-center">
                                    <ClockIcon className="w-3.5 h-3.5 mr-1" />
                                    {row.duration}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'category',
            label: 'Category',
            render: (row) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
                    {row.category?.name || 'Uncategorized'}
                </span>
            )
        },
        { 
            key: 'views', 
            label: 'Views', 
            type: 'number',
            render: (row) => (
                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                    <EyeIcon className="w-4 h-4" />
                    <span className="font-medium">{row.views?.toLocaleString() || 0}</span>
                </div>
            )
        },
        { key: 'createdAt', label: 'Created', type: 'date' }
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Sports Highlights
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage sports highlights and video clips
                    </p>
                </div>
                <Button onClick={handleAddHighlight} icon={PlusIcon}>
                    Add Highlight
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

            {/* Filters Card */}
            <div className="card">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
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

                    {/* Filter Controls */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <FunnelIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">Filters:</span>
                        </div>
                        
                        <select
                            className="input !py-2 !w-auto min-w-[150px]"
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
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={clearFilters}
                                className="text-gray-500"
                            >
                                <XMarkIcon className="h-4 w-4 mr-1" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="card !p-0 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={highlights}
                    loading={loading}
                    onEdit={handleEditHighlight}
                    onDelete={handleDeleteHighlight}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    emptyMessage="No highlights found"
                    emptyDescription="Get started by adding a new highlight"
                />
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingHighlight ? 'Edit Highlight' : 'Add New Highlight'}
                description={editingHighlight ? 'Update the highlight details below' : 'Fill in the details to create a new highlight'}
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