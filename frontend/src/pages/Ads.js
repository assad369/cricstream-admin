import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import AdForm from '../components/forms/AdForm';
import Button from '../components/common/Button';
import adService from '../services/adService';
import { formatDate } from '../utils/helpers';

const Ads = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingAd, setEditingAd] = useState(null);
    const [formSubmitting, setFormSubmitting] = useState(false);

    const columns = [
        { key: 'title', label: 'Title' },
        {
            key: 'type',
            label: 'Type',
            render: (row) => (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {row.type}
        </span>
            )
        },
        {
            key: 'position',
            label: 'Position',
            render: (row) => (
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
          {row.position}
        </span>
            )
        },
        {
            key: 'isActive',
            label: 'Status',
            type: 'boolean',
            render: (row) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    row.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
            )
        },
        { key: 'clickCount', label: 'Clicks', type: 'number' },
        { key: 'viewCount', label: 'Views', type: 'number' },
        {
            key: 'expiryDate',
            label: 'Expiry Date',
            type: 'date',
            render: (row) => row.expiryDate ? formatDate(row.expiryDate) : 'No expiry'
        },
        { key: 'createdAt', label: 'Created', type: 'date' }
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchAds();
    }, [searchTerm, typeFilter, positionFilter]);

    const fetchAds = async () => {
        setLoading(true);
        setError('');

        try {
            const params = {
                search: searchTerm,
                type: typeFilter,
                position: positionFilter
            };

            const response = await adService.getAds(params);
            setAds(response.data.data);
        } catch (err) {
            setError('Failed to load ads');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleTypeFilterChange = (e) => {
        setTypeFilter(e.target.value);
    };

    const handlePositionFilterChange = (e) => {
        setPositionFilter(e.target.value);
    };

    const handleAddAd = () => {
        setEditingAd(null);
        setShowModal(true);
    };

    const handleEditAd = (ad) => {
        setEditingAd(ad);
        setShowModal(true);
    };

    const handleDeleteAd = async (id) => {
        if (window.confirm('Are you sure you want to delete this ad?')) {
            try {
                await adService.deleteAd(id);
                fetchAds();
            } catch (err) {
                setError('Failed to delete ad');
                console.error(err);
            }
        }
    };

    const handleSubmit = async (data) => {
        setFormSubmitting(true);

        try {
            if (editingAd) {
                await adService.updateAd(editingAd._id, data);
            } else {
                await adService.createAd(data);
            }

            setShowModal(false);
            fetchAds();
        } catch (err) {
            console.error('Failed to save ad:', err);
            alert('Failed to save ad. Please try again.');
        } finally {
            setFormSubmitting(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Advertisements</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage advertisements
                    </p>
                </div>
                <Button onClick={handleAddAd}>
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Advertisement
                </Button>
            </div>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6">
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

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="relative flex-1 max-w-lg">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                placeholder="Search ads..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="flex space-x-3">
                            <div>
                                <select
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-700"
                                    value={typeFilter}
                                    onChange={handleTypeFilterChange}
                                >
                                    <option value="">All Types</option>
                                    <option value="direct">Direct</option>
                                    <option value="banner">Banner</option>
                                </select>
                            </div>

                            <div>
                                <select
                                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-700"
                                    value={positionFilter}
                                    onChange={handlePositionFilterChange}
                                >
                                    <option value="">All Positions</option>
                                    <option value="header">Header</option>
                                    <option value="sidebar">Sidebar</option>
                                    <option value="footer">Footer</option>
                                    <option value="in-stream">In-Stream</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <DataTable
                        columns={columns}
                        data={ads}
                        loading={loading}
                        onEdit={handleEditAd}
                        onDelete={handleDeleteAd}
                    />
                </div>
            </div>

            <Modal
                title={editingAd ? 'Edit Advertisement' : 'Add New Advertisement'}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            >
                <AdForm
                    onSubmit={handleSubmit}
                    initialData={editingAd}
                    submitting={formSubmitting}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );
};
export default Ads;