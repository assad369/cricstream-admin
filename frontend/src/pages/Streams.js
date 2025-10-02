import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import StreamForm from '../components/forms/StreamForm';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import streamService from '../services/streamService';
import categoryService from '../services/categoryService';
import { formatDate } from '../utils/helpers';

const Streams = () => {
    const [streams, setStreams] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLiveFilter, setIsLiveFilter] = useState('');
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingStream, setEditingStream] = useState(null);
    const [formSubmitting, setFormSubmitting] = useState(false);

    const columns = [
        {
            key: 'title',
            label: 'Title',
            render: (row) => (
                <div>
                    <div className="font-medium text-gray-900 dark:text-white">{row.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {row.team1.name} vs {row.team2.name}
                    </div>
                </div>
            )
        },
        {
            key: 'teams',
            label: 'Teams',
            render: (row) => (
                <div className="flex items-center space-x-2">
                    {row.team1.logo && (
                        <img src={row.team1.logo} alt={row.team1.name} className="h-8 w-8 rounded-full object-cover" />
                    )}
                    <span className="text-sm">vs</span>
                    {row.team2.logo && (
                        <img src={row.team2.logo} alt={row.team2.name} className="h-8 w-8 rounded-full object-cover" />
                    )}
                </div>
            )
        },
        { key: 'date', label: 'Date', type: 'date' },
        {
            key: 'category',
            label: 'Category',
            render: (row) => row.category?.name || 'N/A'
        },
        {
            key: 'isLive',
            label: 'Live',
            type: 'boolean',
            render: (row) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    row.isLive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
          {row.isLive ? 'Live' : 'Scheduled'}
        </span>
            )
        },
        { key: 'expiryTime', label: 'Expires', type: 'date' }
    ];

    useEffect(() => {
        fetchStreams();
        fetchCategories();
    }, [currentPage, searchTerm, selectedCategory, isLiveFilter]);

    const fetchStreams = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: 10,
                search: searchTerm,
                category: selectedCategory,
                isLive: isLiveFilter
            };

            const response = await streamService.getStreams(params);
            setStreams(response.data.data);
            setPagination(response.data.pagination);
        } catch (err) {
            setError('Failed to load streams');
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

    const handleAddStream = () => {
        setEditingStream(null);
        setShowModal(true);
    };

    const handleEditStream = (stream) => {
        setEditingStream(stream);
        setShowModal(true);
    };

    const handleDeleteStream = async (id) => {
        if (window.confirm('Are you sure you want to delete this stream?')) {
            try {
                await streamService.deleteStream(id);
                fetchStreams();
            } catch (err) {
                setError('Failed to delete stream');
                console.error(err);
            }
        }
    };

    const handleToggleLiveStatus = async (id) => {
        try {
            await streamService.toggleLiveStatus(id);
            fetchStreams();
        } catch (err) {
            setError('Failed to toggle live status');
            console.error(err);
        }
    };

    const handleFormSubmit = async (data) => {
        setFormSubmitting(true);
        try {
            if (editingStream) {
                await streamService.updateStream(editingStream._id, data);
            } else {
                await streamService.createStream(data);
            }
            setShowModal(false);
            fetchStreams();
        } catch (err) {
            setError(`Failed to ${editingStream ? 'update' : 'create'} stream`);
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

    const handleLiveFilterChange = (e) => {
        setIsLiveFilter(e.target.value);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setIsLiveFilter('');
        setCurrentPage(1);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sports Streams</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage live and scheduled sports streams
                    </p>
                </div>
                <Button onClick={handleAddStream}>
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Stream
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
                        placeholder="Search streams..."
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

                    <select
                        className="input"
                        value={isLiveFilter}
                        onChange={handleLiveFilterChange}
                    >
                        <option value="">All Status</option>
                        <option value="true">Live Only</option>
                        <option value="false">Scheduled Only</option>
                    </select>

                    {(searchTerm || selectedCategory || isLiveFilter) && (
                        <Button variant="secondary" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    )}
                </div>
            </div>

            <DataTable
                columns={columns}
                data={streams}
                loading={loading}
                onEdit={handleEditStream}
                onDelete={handleDeleteStream}
                onToggle={handleToggleLiveStatus}
                toggleLabel="Toggle Live"
                pagination={pagination}
                onPageChange={handlePageChange}
            />

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingStream ? 'Edit Stream' : 'Add New Stream'}
                size="large"
            >
                <StreamForm
                    stream={editingStream}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );
};

export default Streams;