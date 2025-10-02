import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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
        { key: 'url', label: 'URL' },
        { key: 'description', label: 'Description' },
        {
            key: 'isActive',
            label: 'Active',
            type: 'boolean',
            render: (row) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    row.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
            )
        },
        { key: 'createdAt', label: 'Created At', type: 'date' }
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
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Base URLs</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage base URLs for your streaming platform
                    </p>
                </div>
                <Button onClick={handleAddBaseUrl}>
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Base URL
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
                        placeholder="Search base URLs..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className="flex gap-4">
                    <select
                        className="input"
                        value={isActiveFilter}
                        onChange={handleActiveFilterChange}
                    >
                        <option value="">All Status</option>
                        <option value="true">Active Only</option>
                        <option value="false">Inactive Only</option>
                    </select>

                    {(searchTerm || isActiveFilter) && (
                        <Button variant="secondary" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    )}
                </div>
            </div>

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
            />

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingBaseUrl ? 'Edit Base URL' : 'Add New Base URL'}
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