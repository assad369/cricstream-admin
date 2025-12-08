import React, { useState, useEffect } from 'react';
import { 
    PlusIcon, 
    MagnifyingGlassIcon, 
    FunnelIcon,
    XMarkIcon,
    SignalIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
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
            label: 'Stream',
            render: (row) => (
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                            <PlayCircleIcon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">{row.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {row.team1?.name || 'Team 1'} vs {row.team2?.name || 'Team 2'}
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'teams',
            label: 'Teams',
            render: (row) => (
                <div className="flex items-center -space-x-2">
                    {row.team1?.logo ? (
                        <img src={row.team1.logo} alt={row.team1.name} className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800 object-cover" />
                    ) : (
                        <div className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                            {row.team1?.name?.charAt(0) || 'T'}
                        </div>
                    )}
                    {row.team2?.logo ? (
                        <img src={row.team2.logo} alt={row.team2.name} className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800 object-cover" />
                    ) : (
                        <div className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                            {row.team2?.name?.charAt(0) || 'T'}
                        </div>
                    )}
                </div>
            )
        },
        { key: 'date', label: 'Date', type: 'date' },
        {
            key: 'category',
            label: 'Category',
            render: (row) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                    {row.category?.name || 'Uncategorized'}
                </span>
            )
        },
        {
            key: 'isLive',
            label: 'Status',
            type: 'boolean',
            render: (row) => (
                <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    row.isLive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400'
                }`}>
                    {row.isLive ? (
                        <>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span>Live</span>
                        </>
                    ) : (
                        <>
                            <ClockIcon className="w-3.5 h-3.5" />
                            <span>Scheduled</span>
                        </>
                    )}
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
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Sports Streams
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage live and scheduled sports streams
                    </p>
                </div>
                <Button onClick={handleAddStream} icon={PlusIcon}>
                    Add Stream
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
                            placeholder="Search streams..."
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

                        <select
                            className="input !py-2 !w-auto min-w-[140px]"
                            value={isLiveFilter}
                            onChange={handleLiveFilterChange}
                        >
                            <option value="">All Status</option>
                            <option value="true">🔴 Live Only</option>
                            <option value="false">⏰ Scheduled</option>
                        </select>

                        {(searchTerm || selectedCategory || isLiveFilter) && (
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
                    data={streams}
                    loading={loading}
                    onEdit={handleEditStream}
                    onDelete={handleDeleteStream}
                    onToggle={handleToggleLiveStatus}
                    toggleLabel="Toggle Live"
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    emptyMessage="No streams found"
                    emptyDescription="Get started by creating a new stream"
                />
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingStream ? 'Edit Stream' : 'Add New Stream'}
                description={editingStream ? 'Update the stream details below' : 'Fill in the details to create a new stream'}
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