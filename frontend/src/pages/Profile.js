import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import configService from '../services/configService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { 
    UserCircleIcon, 
    KeyIcon, 
    Cog6ToothIcon,
    CheckCircleIcon,
    EnvelopeIcon,
    UserIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
    const { user, updatePassword } = useAuth();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: { name: user?.name || '', email: user?.email || '' }
    });
    const { register: regPwd, handleSubmit: handlePwdSubmit, reset: resetPwd } = useForm();

    const [appName, setAppName] = useState('');
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPwd, setSavingPwd] = useState(false);
    const [savingApp, setSavingApp] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        reset({ name: user?.name || '', email: user?.email || '' });
    }, [user, reset]);

    useEffect(() => {
        configService.getAppName().then(res => {
            setAppName(res?.data?.data?.appName || 'Sports Admin');
        }).catch(() => {});
    }, []);

    const showSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const onProfileSubmit = async (data) => {
        setSavingProfile(true);
        try {
            await authService.updateProfile(data.name, data.email);
            showSuccess('Profile updated successfully!');
        } finally {
            setSavingProfile(false);
        }
    };

    const onPwdSubmit = async (data) => {
        setSavingPwd(true);
        try {
            await updatePassword(data.currentPassword, data.newPassword);
            resetPwd();
            showSuccess('Password updated successfully!');
        } finally {
            setSavingPwd(false);
        }
    };

    const onAppNameSave = async (e) => {
        e.preventDefault();
        setSavingApp(true);
        try {
            await configService.updateAppName(appName);
            showSuccess('App name updated successfully!');
        } finally {
            setSavingApp(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Profile Settings
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Manage your account and application settings
                </p>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="alert alert-success animate-slide-down">
                    <div className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 mr-2" />
                        <span className="text-sm">{successMessage}</span>
                    </div>
                </div>
            )}

            {/* Profile Section */}
            <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                        <UserCircleIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal details</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input className="input pl-10" {...register('name')} placeholder="Your name" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input className="input pl-10" type="email" {...register('email')} placeholder="you@example.com" />
                        </div>
                    </div>
                    <div className="pt-2">
                        <Button type="submit" loading={savingProfile}>
                            Save Profile
                        </Button>
                    </div>
                </form>
            </div>

            {/* Password Section */}
            <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <KeyIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Keep your account secure</p>
                    </div>
                </div>
                <form onSubmit={handlePwdSubmit(onPwdSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                        <input className="input" type="password" {...regPwd('currentPassword')} placeholder="••••••••" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                        <input className="input" type="password" {...regPwd('newPassword')} placeholder="••••••••" />
                    </div>
                    <div className="pt-2">
                        <Button type="submit" loading={savingPwd}>
                            Update Password
                        </Button>
                    </div>
                </form>
            </div>

            {/* App Settings Section */}
            <div className="card">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                        <Cog6ToothIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">App Settings</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Configure application preferences</p>
                    </div>
                </div>
                <form onSubmit={onAppNameSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">App Name</label>
                        <input className="input" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="Application name" />
                    </div>
                    <div className="pt-2">
                        <Button type="submit" loading={savingApp}>
                            Save App Name
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;

