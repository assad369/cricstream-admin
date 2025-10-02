import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import configService from '../services/configService';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

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

    useEffect(() => {
        reset({ name: user?.name || '', email: user?.email || '' });
    }, [user, reset]);

    useEffect(() => {
        configService.getAppName().then(res => {
            setAppName(res?.data?.data?.appName || 'Sports Admin');
        }).catch(() => {});
    }, []);

    const onProfileSubmit = async (data) => {
        setSavingProfile(true);
        try {
            await authService.updateProfile(data.name, data.email);
        } finally {
            setSavingProfile(false);
        }
    };

    const onPwdSubmit = async (data) => {
        setSavingPwd(true);
        try {
            await updatePassword(data.currentPassword, data.newPassword);
            resetPwd();
        } finally {
            setSavingPwd(false);
        }
    };

    const onAppNameSave = async (e) => {
        e.preventDefault();
        setSavingApp(true);
        try {
            await configService.updateAppName(appName);
        } finally {
            setSavingApp(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <h2 className="text-lg font-semibold mb-4">Profile</h2>
                <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <input className="input" {...register('name')} placeholder="Your name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input className="input" type="email" {...register('email')} placeholder="you@example.com" />
                    </div>
                    <Button type="submit" disabled={savingProfile}>{savingProfile ? 'Saving...' : 'Save Profile'}</Button>
                </form>
            </Card>

            <Card>
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                <form onSubmit={handlePwdSubmit(onPwdSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                        <input className="input" type="password" {...regPwd('currentPassword')} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                        <input className="input" type="password" {...regPwd('newPassword')} />
                    </div>
                    <Button type="submit" disabled={savingPwd}>{savingPwd ? 'Saving...' : 'Update Password'}</Button>
                </form>
            </Card>

            <Card>
                <h2 className="text-lg font-semibold mb-4">App Settings</h2>
                <form onSubmit={onAppNameSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">App Name</label>
                        <input className="input" value={appName} onChange={(e) => setAppName(e.target.value)} />
                    </div>
                    <Button type="submit" disabled={savingApp}>{savingApp ? 'Saving...' : 'Save App Name'}</Button>
                </form>
            </Card>
        </div>
    );
};

export default Profile;

