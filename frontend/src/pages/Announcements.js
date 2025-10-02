import React, { useState, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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
        { key: 'title', label: 'Title' },
        {
            key: 'message',
            label: 'Message',
            render: (row) => (
                <div className="max-w-xs truncate" title={row.message}>
                    {row.message}
                </div>
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
        { key: 'priority', label: 'Priority', type: 'number' },
        {
            key: 'expiryDate',
            label: 'Expiry Date',
            type: 'date',
            render: (row) => row.expiryDate ? formatDate(row.expiryDate) : 'No expiry'
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
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Announcements</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage system announcements
                    </p>
                </div>
                <Button onClick={handleAddAnnouncement}>
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Announcement
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
                                placeholder="Search announcements..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden">
                    <DataTable
                        columns={columns}
                        data={announcements}
                        loading={loading}
                        onEdit={handleEditAnnouncement}
                        onDelete={handleDeleteAnnouncement}
                    />
                </div>
            </div>

            <Modal
                title={editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
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

export default Announcements;