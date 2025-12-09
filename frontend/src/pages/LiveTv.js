import React, { useState, useEffect } from 'react';
import { 
    PlusIcon, 
    MagnifyingGlassIcon, 
    FunnelIcon,
    XMarkIcon,
    TvIcon 
} from '@heroicons/react/24/outline';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import LiveTvForm from '../components/forms/LiveTvForm';
import Button from '../components/common/Button';
import liveTvService from '../services/liveTvService';
import categoryService from '../services/categoryService';

const LiveTv = () => {
    const [channels, setChannels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLiveFilter, setIsLiveFilter] = useState('');
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingChannel, setEditingChannel] = useState(null);

    const columns = [
        { 
            key: 'channelName', 
            label: 'Channel',
            render: (row) => (
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        {row.logo ? (
                            <img src={row.logo} alt={row.channelName} className="h-10 w-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700" />
                        ) : (
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                                <TvIcon className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">{row.channelName}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                            {row.url}
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'category',
            label: 'Category',
            render: (row) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
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
                            <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                            <span>Offline</span>
                        </>
                    )}
                </span>
            )
        },
        { key: 'createdAt', label: 'Created', type: 'date' }
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchChannels();
        fetchCategories();
    }, [currentPage, searchTerm, selectedCategory, isLiveFilter]);

    const fetchChannels = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: 10,
                search: searchTerm,
                category: selectedCategory,
                isLive: isLiveFilter
            };

            const response = await liveTvService.getLiveTvChannels(params);
            setChannels(response.data.data);
            setPagination(response.data.pagination);
        } catch (err) {
            setError('Failed to load TV channels');
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

    const handleAddChannel = () => {
        setEditingChannel(null);
        setShowModal(true);
    };

    const handleEditChannel = (channel) => {
        setEditingChannel(channel);
        setShowModal(true);
    };

    const handleDeleteChannel = async (id) => {
        if (window.confirm('Are you sure you want to delete this channel?')) {
            try {
                await liveTvService.deleteLiveTvChannel(id);
                fetchChannels();
            } catch (err) {
                setError('Failed to delete channel');
                console.error(err);
            }
        }
    };

    const handleToggleLiveStatus = async (id) => {
        try {
            await liveTvService.toggleLiveStatus(id);
            fetchChannels();
        } catch (err) {
            setError('Failed to toggle live status');
            console.error(err);
        }
    };

    const handleFormSubmit = async (data) => {
        try {
            if (editingChannel) {
                await liveTvService.updateLiveTvChannel(editingChannel._id, data);
            } else {
                await liveTvService.createLiveTvChannel(data);
            }
            setShowModal(false);
            fetchChannels();
        } catch (err) {
            setError(`Failed to ${editingChannel ? 'update' : 'create'} channel`);
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
                        Live TV Channels
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage live TV channels for your streaming platform
                    </p>
                </div>
                <Button onClick={handleAddChannel} icon={PlusIcon}>
                    Add Channel
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
                            placeholder="Search channels..."
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
                            <option value="false">⚫ Offline</option>
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
                    data={channels}
                    loading={loading}
                    onEdit={handleEditChannel}
                    onDelete={handleDeleteChannel}
                    onToggle={handleToggleLiveStatus}
                    toggleLabel="Toggle Live"
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    emptyMessage="No channels found"
                    emptyDescription="Get started by adding a new TV channel"
                />
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingChannel ? 'Edit Channel' : 'Add New Channel'}
                description={editingChannel ? 'Update the channel details below' : 'Fill in the details to add a new channel'}
                size="large"
            >
                <LiveTvForm
                    channel={editingChannel}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );
};

export default LiveTv;