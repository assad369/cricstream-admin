import React, { useState, useEffect } from 'react';
import { 
    PlusIcon, 
    MagnifyingGlassIcon,
    XMarkIcon,
    MegaphoneIcon,
    CheckCircleIcon,
    XCircleIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import AnnouncementForm from '../components/forms/AnnouncementForm';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import announcementService from '../services/announcementService';
import { formatDate } from '../utils/helpers';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const [formSubmitting, setFormSubmitting] = useState(false);

    const columns = [
        { 
            key: 'title', 
            label: 'Announcement',
            render: (row) => (
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                            <MegaphoneIcon className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">{row.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[250px]">
                            {row.message}
                        </div>
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
        { 
            key: 'priority', 
            label: 'Priority', 
            type: 'number',
            render: (row) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    row.priority >= 8 ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    row.priority >= 5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-400'
                }`}>
                    {row.priority}
                </span>
            )
        },
        {
            key: 'expiryDate',
            label: 'Expires',
            type: 'date',
            render: (row) => (
                <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{row.expiryDate ? formatDate(row.expiryDate) : 'Never'}</span>
                </div>
            )
        },
        { key: 'createdAt', label: 'Created', type: 'date' }
    ];

    useEffect(() => {
        fetchAnnouncements();
    }, [searchTerm]);

    const fetchAnnouncements = async () => {
        setLoading(true);
        setError('');

        try {
            const params = {
                search: searchTerm
            };

            const response = await announcementService.getAnnouncements(params);
            setAnnouncements(response.data.data);
        } catch (err) {
            setError('Failed to load announcements');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddAnnouncement = () => {
        setEditingAnnouncement(null);
        setShowModal(true);
    };

    const handleEditAnnouncement = (announcement) => {
        setEditingAnnouncement(announcement);
        setShowModal(true);
    };

    const handleDeleteAnnouncement = async (id) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            try {
                await announcementService.deleteAnnouncement(id);
                fetchAnnouncements();
            } catch (err) {
                setError('Failed to delete announcement');
                console.error(err);
            }
        }
    };

    const handleSubmit = async (data) => {
        setFormSubmitting(true);

        try {
            if (editingAnnouncement) {
                await announcementService.updateAnnouncement(editingAnnouncement._id, data);
            } else {
                await announcementService.createAnnouncement(data);
            }

            setShowModal(false);
            fetchAnnouncements();
        } catch (err) {
            console.error('Failed to save announcement:', err);
            alert('Failed to save announcement. Please try again.');
        } finally {
            setFormSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Announcements
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage system announcements and notifications
                    </p>
                </div>
                <Button onClick={handleAddAnnouncement} icon={PlusIcon}>
                    Add Announcement
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
                        placeholder="Search announcements..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="card !p-0 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={announcements}
                    loading={loading}
                    onEdit={handleEditAnnouncement}
                    onDelete={handleDeleteAnnouncement}
                    emptyMessage="No announcements found"
                    emptyDescription="Get started by creating a new announcement"
                />
            </div>

            {/* Modal */}
            <Modal
                title={editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
                description={editingAnnouncement ? 'Update the announcement details below' : 'Fill in the details to create a new announcement'}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            >
                <AnnouncementForm
                    onSubmit={handleSubmit}
                    initialData={editingAnnouncement}
                    submitting={formSubmitting}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
        </div>
    );
};
//t
export default Announcements;