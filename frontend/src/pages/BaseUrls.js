import React, { useState, useEffect } from 'react';
import { 
    PlusIcon, 
    MagnifyingGlassIcon, 
    XMarkIcon,
    LinkIcon,
    FunnelIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import BaseUrlForm from '../components/forms/BaseUrlForm';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import baseUrlService from '../services/baseUrlService';
import { formatDate } from '../utils/helpers';

const BaseUrls = () => {
    const [baseUrls, setBaseUrls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isActiveFilter, setIsActiveFilter] = useState('');
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingBaseUrl, setEditingBaseUrl] = useState(null);
    const [formSubmitting, setFormSubmitting] = useState(false);

    const columns = [
        { 
            key: 'url', 
            label: 'URL',
            render: (row) => (
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                            <LinkIcon className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="font-mono text-sm text-gray-900 dark:text-white truncate max-w-[300px]">{row.url}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{row.description || 'No description'}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'isActive',
            label: 'Status',
            type: 'boolean',
            render: (row) => (
                <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    row.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400'
                }`}>
                    {row.isActive ? (
                        <>
                            <CheckCircleIcon className="w-3.5 h-3.5" />
                            <span>Active</span>
                        </>
                    ) : (
                        <>
                            <XCircleIcon className="w-3.5 h-3.5" />
                            <span>Inactive</span>
                        </>
                    )}
                </span>
            )
        },
        { key: 'createdAt', label: 'Created', type: 'date' }
    ];

    useEffect(() => {
        fetchBaseUrls();
    }, [currentPage, searchTerm, isActiveFilter]);

    const fetchBaseUrls = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: 10,
                search: searchTerm,
                isActive: isActiveFilter
            };

            const response = await baseUrlService.getBaseUrls(params);
            setBaseUrls(response.data.data);
            setPagination(response.data.pagination);
        } catch (err) {
            setError('Failed to load base URLs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddBaseUrl = () => {
        setEditingBaseUrl(null);
        setShowModal(true);
    };

    const handleEditBaseUrl = (baseUrl) => {
        setEditingBaseUrl(baseUrl);
        setShowModal(true);
    };

    const handleDeleteBaseUrl = async (id) => {
        if (window.confirm('Are you sure you want to delete this base URL?')) {
            try {
                await baseUrlService.deleteBaseUrl(id);
                fetchBaseUrls();
            } catch (err) {
                setError('Failed to delete base URL');
                console.error(err);
            }
        }
    };

    const handleToggleActiveStatus = async (id) => {
        try {
            await baseUrlService.toggleActiveStatus(id);
            fetchBaseUrls();
        } catch (err) {
            setError('Failed to toggle active status');
            console.error(err);
        }
    };

    const handleFormSubmit = async (data) => {
        setFormSubmitting(true);
        try {
            if (editingBaseUrl) {
                await baseUrlService.updateBaseUrl(editingBaseUrl._id, data);
            } else {
                await baseUrlService.createBaseUrl(data);
            }
            setShowModal(false);
            fetchBaseUrls();
        } catch (err) {
            setError(`Failed to ${editingBaseUrl ? 'update' : 'create'} base URL`);
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

    const handleActiveFilterChange = (e) => {
        setIsActiveFilter(e.target.value);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setIsActiveFilter('');
        setCurrentPage(1);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Base URLs
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage base URLs for your streaming platform
                    </p>
                </div>
                <Button onClick={handleAddBaseUrl} icon={PlusIcon}>
                    Add Base URL
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
                            placeholder="Search base URLs..."
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
                            className="input !py-2 !w-auto min-w-[140px]"
                            value={isActiveFilter}
                            onChange={handleActiveFilterChange}
                        >
                            <option value="">All Status</option>
                            <option value="true">✅ Active Only</option>
                            <option value="false">⭕ Inactive</option>
                        </select>

                        {(searchTerm || isActiveFilter) && (
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
                    data={baseUrls}
                    loading={loading}
                    onEdit={handleEditBaseUrl}
                    onDelete={handleDeleteBaseUrl}
                    onToggle={handleToggleActiveStatus}
                    toggleLabel="Toggle Active"
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    emptyMessage="No base URLs found"
                    emptyDescription="Get started by adding a new base URL"
                />
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingBaseUrl ? 'Edit Base URL' : 'Add New Base URL'}
                description={editingBaseUrl ? 'Update the base URL details below' : 'Fill in the details to add a new base URL'}
                size="medium"
            >
                <BaseUrlForm
                    baseUrl={editingBaseUrl}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );
};

export default BaseUrls;