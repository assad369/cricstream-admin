import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    UserGroupIcon,
    VideoCameraIcon,
    FilmIcon,
    ClockIcon,
    RectangleStackIcon,
    MegaphoneIcon,
    ArrowRightIcon,
    PlayCircleIcon,
    SignalIcon
} from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import StatCard from '../components/ui/StatCard';
import { PageSkeleton } from '../components/common/Loading';
import statsService from '../services/statsService';
import { formatNumber } from '../utils/helpers';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await statsService.getDashboardStats();
                setStats(response.data.data);
            } catch (err) {
                setError('Failed to load dashboard stats');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <PageSkeleton />;
    }

    if (error) {
        return (
            <div className="alert alert-error">
                <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </div>
            </div>
        );
    }

    const contentItems = [
        {
            label: 'Live Streams',
            value: stats?.liveStreams || 0,
            icon: SignalIcon,
            color: 'from-red-400 to-red-600',
            bgColor: 'bg-red-50 dark:bg-red-900/20',
            textColor: 'text-red-600 dark:text-red-400',
            pulse: true
        },
        {
            label: 'Live TV Channels',
            value: stats?.liveTvChannels || 0,
            icon: PlayCircleIcon,
            color: 'from-emerald-400 to-emerald-600',
            bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
            textColor: 'text-emerald-600 dark:text-emerald-400'
        },
        {
            label: 'Total Highlights',
            value: stats?.totalHighlights || 0,
            icon: ClockIcon,
            color: 'from-violet-400 to-violet-600',
            bgColor: 'bg-violet-50 dark:bg-violet-900/20',
            textColor: 'text-violet-600 dark:text-violet-400'
        },
        {
            label: 'Active Ads',
            value: stats?.activeAds || 0,
            icon: RectangleStackIcon,
            color: 'from-amber-400 to-amber-600',
            bgColor: 'bg-amber-50 dark:bg-amber-900/20',
            textColor: 'text-amber-600 dark:text-amber-400'
        }
    ];

    const quickActions = [
        { name: 'Manage Streams', href: '/streams', icon: VideoCameraIcon, color: 'from-blue-500 to-blue-600' },
        { name: 'Live TV', href: '/live-tv', icon: FilmIcon, color: 'from-emerald-500 to-emerald-600' },
        { name: 'Categories', href: '/categories', icon: RectangleStackIcon, color: 'from-violet-500 to-violet-600' },
        { name: 'Announcements', href: '/announcements', icon: MegaphoneIcon, color: 'from-amber-500 to-amber-600' }
    ];

    return (
        <div className="space-y-6 lg:space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Welcome back! Here's an overview of your streaming platform.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
                        System Online
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <StatCard
                    title="Daily Active Users"
                    value={stats?.dailyActiveUsers || 0}
                    icon={UserGroupIcon}
                    change="+12%"
                    changeType="positive"
                    subtitle="vs last week"
                />
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers || 0}
                    icon={UserGroupIcon}
                    change="+5%"
                    changeType="positive"
                    subtitle="all time"
                />
                <StatCard
                    title="Total Streams"
                    value={stats?.totalStreams || 0}
                    icon={VideoCameraIcon}
                    change="+8%"
                    changeType="positive"
                    subtitle="all content"
                />
                <StatCard
                    title="TV Channels"
                    value={stats?.totalTvChannels || 0}
                    icon={FilmIcon}
                    change="+3%"
                    changeType="positive"
                    subtitle="available"
                />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Content Overview */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Content Overview
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Current platform status
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {contentItems.map((item) => (
                                <div
                                    key={item.label}
                                    className={`relative overflow-hidden rounded-xl p-4 ${item.bgColor} transition-all duration-300 hover:scale-[1.02]`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className={`text-sm font-medium ${item.textColor}`}>
                                                {item.label}
                                            </p>
                                            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                                                {formatNumber(item.value)}
                                            </p>
                                        </div>
                                        <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg ${item.pulse ? 'pulse-live' : ''}`}>
                                            <item.icon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    {item.pulse && item.value > 0 && (
                                        <div className="absolute top-2 right-2">
                                            <span className="flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Quick Actions
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Manage your content
                        </p>
                    </div>
                    <div className="p-4">
                        <div className="space-y-3">
                            {quickActions.map((action) => (
                                <Link
                                    key={action.name}
                                    to={action.href}
                                    className="group flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                                >
                                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                                        <action.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                            {action.name}
                                        </p>
                                    </div>
                                    <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity / Tips */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 lg:p-8 text-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/10 rounded-xl">
                            <PlayIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Ready to go live?</h3>
                            <p className="mt-1 text-primary-100 text-sm">
                                Create a new stream or TV channel to start broadcasting to your audience.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            to="/streams"
                            className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-primary-700 font-medium rounded-xl hover:bg-primary-50 transition-colors"
                        >
                            <VideoCameraIcon className="h-5 w-5 mr-2" />
                            New Stream
                        </Link>
                        <Link
                            to="/live-tv"
                            className="inline-flex items-center justify-center px-5 py-2.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                        >
                            <FilmIcon className="h-5 w-5 mr-2" />
                            New Channel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;